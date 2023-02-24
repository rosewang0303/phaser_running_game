// image
const bgImg = "https://i.postimg.cc/7YGLfHFM/bg.png";
const playerImg = "https://i.postimg.cc/dtvZHqdH/pingu-sprite.png";
const fishImg = "https://i.postimg.cc/WbP2bLCJ/fish-sprite.png";
const enemyImg = "https://i.postimg.cc/SsrWX8KJ/enemy-sprite.png";
const lifeImg = "https://i.postimg.cc/tgm6MCG7/life.png";
// color
const white = "#ffffff";
const black = "#121627";
const gray = "#D2D2D2";

const BG = {
  key: "bg",
  img: bgImg,
  x: 400,
  y: 300,
  width: 800,
  height: 600,
};

const PLAYER = {
  key: "player",
  img: playerImg,
  x: 400,
  y: 150,
  //   width: 800,
  //   height: 200,
  frameWidth: 160,
  frameHeight: 63,
};

const BUTTON_START = {
  fontSize: "50px",
  fill: white,
  backgroundColor: black,
  x: 280,
  y: 230,
  padding: { x: 15, y: 15 },
  fontFamily: "VT323",
};

const TEXT_COUNTDOWN = {
  fontSize: "70px",
  fill: black,
  x: 370,
  y: 250,
  fontFamily: "VT323",
};

const TEXT_ALERT = {
  fontSize: "25px",
  fill: gray,
  x: 295,
  y: 330,
  fontFamily: "VT323",
};

const TEXT_SCORE = {
  fontSize: "40px",
  fill: black,
  x: 10,
  y: 10,
  fontFamily: "VT323",
};

const FISH = {
  key: "fish",
  img: fishImg,
  frameWidth: 308.5,
  frameHeight: 120,
};

const ENEMY = {
  key: "enemy",
  img: enemyImg,
  frameWidth: 209,
  frameHeight: 90,
};

const TEXT_LIFE = {
  fontSize: "40px",
  fill: black,
  x: 710,
  y: 10,
  fontFamily: "VT323",
};

const LIFE = {
  key: "life",
  img: lifeImg,
  x: 680,
  y: 30,
  width: 45,
  height: 40,
};
