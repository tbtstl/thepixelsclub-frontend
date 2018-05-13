import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Flex, Box, Text} from 'rebass';
import {ActionCable} from 'react-actioncable-provider';

@inject('pixelStore')
@inject('colorStore')
@observer
export default class Canvas extends React.Component{
  constructor(props){
    super(props);
    this.canvas = React.createRef();
    this.cable = React.createRef();
  }

  componentWillMount(){
    window.addEventListener('resize', () => {
      if(this.getCanvas()){
        this.refreshCanvas();
      }
    });
  }

  getCanvas(){
    return this.canvas.current;
  }

  getCanvasSize(){
    const canvas = this.getCanvas();
    const canvasContainerSize = canvas.parentElement.getBoundingClientRect();
    console.log('ccs', canvasContainerSize.width, 'wih', window.innerHeight*.9)
    return Math.min(canvasContainerSize.width, window.innerHeight*.9);
  }

  getPixelSize(){
    const {grid} = this.props.pixelStore;
    const canvasSize = this.getCanvasSize();
    const numPixels = grid.length;
    return canvasSize/numPixels;
  }

  getActivePixelCoord(e){
    const canvas = this.getCanvas();
    const pixelSize = this.getPixelSize();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const xCoord = (e.clientX - rect.left) * scaleX;
    const yCoord = (e.clientY - rect.top) * scaleY;
    return {x: Math.floor(xCoord/pixelSize), y: Math.floor(yCoord/pixelSize)};
  }

  subscribeCanvasListeners(){
    const canvas = this.getCanvas();
    canvas.addEventListener('mousemove', this.handleCanvasHover.bind(this))
  }

  resizeCanvas(){
    /*
    Ensure canvas is a square
     */
    const canvas = this.getCanvas();
    const size = this.getCanvasSize();
    canvas.setAttribute('width', size);
    canvas.setAttribute('height', size);
  }

  refreshCanvas(){
    this.resizeCanvas();
    this.renderPixels();
    this.subscribeCanvasListeners();
  }

  componentDidUpdate(prevProps){
    const {oldGrid} = prevProps.pixelStore.grid;
    const {grid} = this.props.pixelStore;
    if(oldGrid && oldGrid.equals(grid)){
      return;
    }
    this.refreshCanvas();
  }

  handleCanvasClick(e){
    const {currentColor, addToPreviousColors} = this.props.colorStore;
    addToPreviousColors(currentColor);
    const pixel = this.getActivePixelCoord(e);
    this.cable.current.perform('receive', {x: pixel.x, y: pixel.y, color: currentColor});
    this.props.pixelStore.changePixel(currentColor, pixel.x, pixel.y);
  }

  handleCanvasHover(e){
    const {currentColor} = this.props.colorStore;
    const pixel = this.getActivePixelCoord(e);
    this.props.pixelStore.hoverPixel(currentColor, pixel.x, pixel.y);
  }

  renderPixels(){
    const {grid} = this.props.pixelStore;
    const canvas = this.getCanvas();
    const pixelSize = this.getPixelSize();
    if(!canvas){
      return;
    }
    const ctx = canvas.getContext('2d');
    for(let i = 0; i < grid.length; i++){
      const row = grid[i];
      for(let j = 0; j < row.length; j++ ){
        const col = row[j];
        ctx.fillStyle = col;
        ctx.fillRect(i*pixelSize, j*pixelSize, pixelSize, pixelSize);
      }
    }
  }

  handleChannelMessageReceive(msg){
    this.props.pixelStore.onPixelChannelMessageReceive(msg);
  }

 render(){
    const _ = this.props.pixelStore.grid; // eslint-disable-line no-unused-vars
   return (
     <Flex alignItems={'center'}>
       <ActionCable
         ref={this.cable}
         channel={{channel: 'PixelsChannel'}}
         onReceived={this.handleChannelMessageReceive.bind(this)}/>
       <Box m={'auto'} w={1}>
         {this.props.pixelStore.grid ? (
           <canvas
             onClick={this.handleCanvasClick.bind(this)}
             ref={this.canvas}
             height={'100%'}
             width={'100%'}/>
         ) : (
           <Text>Loading Canvas...</Text>
         )}
       </Box>
     </Flex>
   )
 }
}
