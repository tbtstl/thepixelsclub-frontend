function convertToSixDigitHex(shorthand){
  const toFull = (hex) => {
    if (hex.length === 4 && hex.charAt(0) === '#'){
      hex = `#${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}${hex.charAt(3)}${hex.charAt(3)}`
      return hex;
    }
  };
  return toFull(shorthand);
}

export default function blendColor(color1, color2, weight=50){
  /*
  https://github.com/codsen/color-shorthand-hex-to-six-digit/blob/master/src/main.js
   */
  if (color1.length === 4){
    color1 = convertToSixDigitHex(color1);
  }
  if(color2.length === 4){
    color2 = convertToSixDigitHex(color2);
  }
  const decimal2Hex = (d) => d.toString(16);
  const hex2Decimal = (h) => parseInt(h, 16);

  let color = '#';
  color1 = color1.slice(1);
  color2 = color2.slice(1);
  for (let i = 0; i <= 5; i+=2){
    // Loop through each of the 3 hex pairs
    const v1 = hex2Decimal(color1.substr(i, 2));
    const v2 = hex2Decimal(color2.substr(i, 2));
    // Combin the current pairs from each sourec color
    // according to the weight
    let val = decimal2Hex(Math.floor(v2 + (v1 - v2) * (weight/100.0)));

    while(val.length < 2){
      // prepend a '0' if val results in a single digit
      val = '0' + val;
    }

    color += val;

  }
  return color;
}

