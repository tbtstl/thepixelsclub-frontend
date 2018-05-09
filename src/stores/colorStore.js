import {observable, action} from 'mobx';

// Just for the heck of it
function changeThemeColor(color){
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  metaThemeColor.setAttribute("content", color);
}

class ColorStore {
  @observable currentColor;
  @observable previousColors = [];

  @action setColor(color){
    changeThemeColor(color);
    this.currentColor = color;
  }

  @action.bound addToPreviousColors(color){
    const previousColors = [...this.previousColors];

    if (previousColors.includes(color)) {
      const idx = previousColors.indexOf(color);
      previousColors.splice(idx, 1);
    }
    previousColors.unshift(color);

    this.previousColors = previousColors;
  }

  @action resetColor(){
    this.currentColor = '#000';
  }
}

export default new ColorStore();
