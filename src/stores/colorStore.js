import {observable, action} from 'mobx';

class ColorStore {
  @observable currentColor;

  @action setColor(color){
    this.currentColor = color;
  }

  @action resetColor(){
    this.currentColor = '#fff';
  }
}

export default new ColorStore();
