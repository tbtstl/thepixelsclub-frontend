import {observable, action} from 'mobx';
import blendColor from "../utils/blendColor";

const NUM_PIXELS = 32;

class PixelStore {
  @observable grid;
  @observable activePixel;

  @action onPixelChannelMessageReceive(msg){
    if (msg && msg.canvas) {
      this.setGrid(msg.canvas)
    }
  }

  @action resetGrid(){
    const color = '#ffffff';
    this.grid = [];
    for (let x=0; x < NUM_PIXELS; x++){
      this.grid.push([]);
      for (let y=0; y < NUM_PIXELS; y++){
        this.grid[x].push(color);
      }
    }
  }

  @action setGrid(msg){
    try {
      this.grid = JSON.parse(msg.pixels);
    } catch (SyntaxError) {
      this.resetGrid();
    }
  }

  @action changePixel(color, x, y){
    const newGrid = JSON.parse(JSON.stringify(this.grid));
    newGrid[x][y] = color;
    if(this.activePixel){
      this.activePixel.originalColor = color;
    }
    this.grid = newGrid;
  }

  @action setActivePixel(x,y, originalColor){
    this.activePixel = {x, y, originalColor};
  }

  @action hoverPixel(color, x, y){
    try {
      const newGrid = JSON.parse(JSON.stringify(this.grid));
      if(this.activePixel && this.activePixel.x === x && this.activePixel.y === y){
        return;
      }
      if(this.activePixel){
        newGrid[this.activePixel.x][this.activePixel.y] = this.activePixel.originalColor
      }
      this.setActivePixel(x, y, this.grid[x][y]);
      const blendedColor = blendColor(color, this.grid[x][y], 25);
      newGrid[x][y] = blendedColor;
      this.grid = newGrid;
    } catch(TypeError){
      return;
    }
  }
}

export default new PixelStore();
