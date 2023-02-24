// gameOver
const gameOverConst = {
  bg: null,
  button: null,
  text: null,
  textCountdown: null,
  textAlert: null,
  countdownTimer: null,
  countdown: 3,
};

function gameOver_init() {}

function gameOver_preload() {
  this.load.image(BG.key, BG.img);
}

function gameOver_create() {
  // bg
  gameOverConst.bg = this.add.tileSprite(
    BG.x,
    BG.y,
    BG.width,
    BG.height,
    BG.key
  );
  gameOverConst.bg.setTint(0x5e5e5e);
  // button
  gameOverConst.button = this.add
    .text(BUTTON_START.x, BUTTON_START.y, " Try Again ", {
      fontSize: BUTTON_START.fontSize,
      fill: BUTTON_START.fill,
      backgroundColor: BUTTON_START.backgroundColor,
      padding: BUTTON_START.padding,
      fontFamily: BUTTON_START.fontFamily,
    })
    .setInteractive()
    .on("pointerdown", () => {
      gameOverConst.bg.setTint(0xffffff);
      gameOverConst.textAlert.visible = false;
      gameOverConst.button.visible = false;
      gameOverConst.textCountdown.visible = true;
      gameOverConst.text.visible = false;

      // countdown 3000ms
      gameOverConst.countdown = 3;
      gameOverConst.countdownTimer = this.time.addEvent({
        delay: 1000,
        repeat: 3,
        loop: false,
        callback: () => {
          gameOverConst.countdown--;
        },
      });
    });
  gameOverConst.button.setDepth(1);
  // countdown text
  gameOverConst.textCountdown = this.add.text(
    TEXT_COUNTDOWN.x,
    TEXT_COUNTDOWN.y,
    gameOverConst.countdown,
    {
      fontSize: TEXT_COUNTDOWN.fontSize,
      fill: TEXT_COUNTDOWN.fill,
      fontFamily: TEXT_COUNTDOWN.fontFamily,
    }
  );
  gameOverConst.textCountdown.visible = false;
  // alert text
  gameOverConst.textAlert = this.add.text(
    TEXT_ALERT.x,
    TEXT_ALERT.y,
    "CLICK BUTTON TO RESTART",
    {
      fontSize: TEXT_ALERT.fontSize,
      fill: TEXT_ALERT.fill,
      fontFamily: TEXT_ALERT.fontFamily,
    }
  );
  // high score text
  gameOverConst.text = this.add.text(
    TEXT_SCORE.x,
    TEXT_SCORE.y,
    `High Score: ${gameStartConst.highScore}`,
    {
      fontSize: TEXT_SCORE.fontSize,
      fill: TEXT_ALERT.fill,
      fontFamily: TEXT_SCORE.fontFamily,
    }
  );
  gameOverConst.text.setDepth(1);
}

function gameOver_update() {
  // countdown
  gameOverConst.textCountdown.setText(gameOverConst.countdown);
  if (gameOverConst.countdown === 1) {
    gameOverConst.countdownTimer.remove();
    this.scene.start("gameStart");
    gameOverConst.countdown = 3;
  }
}

const gameOver = {
  key: "gameOver",
  init: gameOver_init,
  preload: gameOver_preload, // load assets
  create: gameOver_create, // init
  update: gameOver_update, // fps:60
};
