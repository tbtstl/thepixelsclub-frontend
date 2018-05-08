import {observable, action} from 'mobx';

const NUM_PIXELS = 32;

class PixelStore {
  @observable grid;

  @action resetGrid(){
    const color = '#fff';
    this.grid = [];
    for (let x=0; x < NUM_PIXELS; x++){
      this.grid.push([]);
      for (let y=0; y < NUM_PIXELS; y++){
        this.grid[x].push(color);
      }
    }
  }

  @action changePixel(color, x, y){
    const newGrid = JSON.parse(JSON.stringify(this.grid));
    newGrid[x][y] = color;
    this.grid = newGrid;
  }
}

export default new PixelStore();
