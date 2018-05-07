import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {Flex, Box} from 'rebass';

@inject('pixelStore')
@observer
export default class Canvas extends React.Component{
  constructor(props){
    super(props);
    this.canvas = React.createRef();
  }

  getCanvas(){
    return this.canvas.current;
  }

  getCanvasSize(){
    const canvas = this.getCanvas();
    const canvasContainerSize = canvas.parentElement.getBoundingClientRect();
    return Math.min(canvasContainerSize.width, window.innerHeight*.9);
  }

  getPixelSize(){
    const {grid} = this.props.pixelStore;
    const canvasSize = this.getCanvasSize();
    const numPixels = grid.length;
    return canvasSize/numPixels;
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

  componentDidMount(){
    this.props.pixelStore.resetGrid();
    this.resizeCanvas();
    this.renderPixels();
  }

  componentDidUpdate(prevProps){
    const {oldGrid} = prevProps.pixelStore.grid;
    const {grid} = this.props.pixelStore;
    if(!oldGrid.equals(grid)){
      this.renderCanvas();
    }
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

 render(){
   return (
     <Flex alignItems={'center'}>
       <Box m={'auto'} w={1}>
         <canvas ref={this.canvas} style={{height: '100%', width: '100%', maxHeight: '90vh'}} height={'100%'} width={'100%'}/>
       </Box>
     </Flex>
   )
 }
}
