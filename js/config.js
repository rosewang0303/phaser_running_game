const config = {
  parent: "app", // canvas wrapper
  type: Phaser.AUTO, // Phaser.WEBGL or Phaser.CANVAS
  width: 800, // game size
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [mainpage, gameStart, gameOver],
};

const game = new Phaser.Game(config);
