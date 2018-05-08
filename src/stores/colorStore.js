import {observable, action} from 'mobx';

class ColorStore {
  @observable currentColor;
  @observable previousColors = [];

  @action setColor(color){
    this.currentColor = color;
    const previousColors = [...this.previousColors];

    if (previousColors.includes(color)) {
      const idx = previousColors.indexOf(color);
      previousColors.splice(idx, 1);
    }
    previousColors.unshift(color);

    this.previousColors = previousColors;

    // if(this.previousColors.length > 10){
    //   this.previousColors.splice(-1,1);
    // }
  }

  @action resetColor(){
    this.currentColor = '#000';
  }
}

export default new ColorStore();
