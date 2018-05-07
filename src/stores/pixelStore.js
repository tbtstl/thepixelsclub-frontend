import {observable, action} from 'mobx';

class PixelStore {
  @observable grid;

  @action resetGrid(){
    const color = '#fff';
    this.grid = [];
    for (let x=0; x < 64; x++){
      this.grid.push([]);
      for (let y=0; y < 64; y++){
        this.grid[x].push(color);
      }
    }
  }
}

export default new PixelStore();
