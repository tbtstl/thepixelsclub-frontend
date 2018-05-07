import {observable, action} from 'mobx';

class ColorStore {
  @observable currentColor;

  @action setColor(color){
    this.currentColor = color;
  }

  @action resetColor(){
    this.currentColor = '#000';
  }
}

export default new ColorStore();
