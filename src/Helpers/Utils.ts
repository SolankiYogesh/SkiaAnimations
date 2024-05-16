const randomColor = () => {
  const colors = [
    ['#009FFF', '#A5888D'],
    ['#a8ff78', '#78ffd6'],
    ['#12c2e9', '#c471ed', '#f64f59'],
    ['#A196E9', '#0D78E3'],
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
export {randomColor};
