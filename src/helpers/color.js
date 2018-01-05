export const colorAtPoint = (p, rgb_beginning, rgb_end) => {
  const w = p * 2 - 1;
  const w1 = (w + 1) / 2.0;
  const w2 = 1 - w1;
  const rgb = [
    parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2, 10),
    parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2, 10),
    parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2, 10)
  ];
  return rgb2hex(rgb);
};

export const hex2rgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
};

export const rgb2hex = (RGB) => {
  return "#" + ((1 << 24) + (RGB[0] << 16) + (RGB[1] << 8) + RGB[2]).toString(16).slice(1);
};

export const getCssGradient = (gradient) => {
  let {colors,degree} = gradient;
  if(isNaN(parseInt(degree,10))){
    degree = 0
  }
  const gradientColors = colors.map((color, index) => `${color.color} ${index / (colors.length - 1) * 100}%`).join(',')
  return `linear-gradient(${degree}deg, ${gradientColors})`;
};