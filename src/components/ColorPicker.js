import * as React from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import {Heading, Divider, Text, ButtonTransparent} from 'rebass';
import {ChromePicker} from 'react-color';
import {colors} from '../theme';
import Panel from './Panel';

const Button = ButtonTransparent.extend`
  &:hover{
    background-color: ${colors.lightGrey};
    cursor: pointer;
  }
`;

const Popover = styled('div')`
  position: absolute;
  z-index: 2
`;

const Cover = styled('div')`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
`;

@inject('colorStore')
@observer
export default class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  componentWillMount(){
    this.props.colorStore.resetColor();
  }

  handleColorChange(color){
    this.props.colorStore.setColor(color.hex);
  }

  handleDisplayClick(){
    this.setState({displayColorPicker :!this.state.displayColorPicker});
  }

  handleCoverClick(){
    this.setState({displayColorPicker: false});
  }

  render (){
    const {currentColor} = this.props.colorStore;
    return (
      <Panel p={2} accent={currentColor}>
        <Heading fontSize={[2, 3, 4]}>The Pixels .Club</Heading>
        <Text>The Pixels .Club is a public pixel canvas. To participate, select a color below and place your pixels on the artboard </Text>
        <Divider/>
        <Button onClick={this.handleDisplayClick.bind(this)}>Select a Color</Button>
        { this.state.displayColorPicker ? (
          <Popover>
            <Cover onClick={this.handleCoverClick.bind(this)}/>
            <ChromePicker color={currentColor} disableAlpha={true} onChangeComplete={this.handleColorChange.bind(this)}/>
          </Popover>
        ) : null}
      </Panel>
    )
  }
}
