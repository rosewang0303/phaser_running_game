// mainpage
const mainpageConst = {
  bg: null,
  player: null,
  button: null,
  textCountdown: null,
  textAlert: null,
  countdownTimer: null,
  countdown: 3,
};

function mainpage_init() {}

function mainpage_preload() {
  this.load.image(BG.key, BG.img);
  this.load.spritesheet(PLAYER.key, PLAYER.img, {
    frameWidth: PLAYER.frameWidth,
    frameHeight: PLAYER.frameHeight,
  });
}

function mainpage_create() {
  // bg
  mainpageConst.bg = this.add.tileSprite(
    BG.x,
    BG.y,
    BG.width,
    BG.height,
    BG.key
  );
  // player
  mainpageConst.player = this.add.sprite(PLAYER.x, PLAYER.y, PLAYER.key);
  this.anims.create({
    key: "playerFly",
    frames: this.anims.generateFrameNumbers(PLAYER.key, { start: 0, end: 1 }),
    frameRate: 6,
    repeat: -1,
  });
  mainpageConst.player.anims.play("playerFly", true);
  // button
  mainpageConst.button = this.add
    .text(BUTTON_START.x, BUTTON_START.y, "Game Start", {
      fontSize: BUTTON_START.fontSize,
      fill: BUTTON_START.fill,
      backgroundColor: BUTTON_START.backgroundColor,
      padding: BUTTON_START.padding,
      fontFamily: BUTTON_START.fontFamily,
    })
    .setInteractive()
    .on("pointerdown", () => {
      mainpageConst.textAlert.visible = false;
      mainpageConst.button.visible = false;
      mainpageConst.textCountdown.visible = true;

      // countdown 3000ms
      mainpageConst.countdown = 3;
      mainpageConst.countdownTimer = this.time.addEvent({
        delay: 1000,
        repeat: 3,
        loop: false,
        callback: () => {
          mainpageConst.countdown--;
        },
      });
    });
  mainpageConst.button.setDepth(1);
  // countdown text
  mainpageConst.textCountdown = this.add.text(
    TEXT_COUNTDOWN.x,
    TEXT_COUNTDOWN.y,
    mainpageConst.countdown,
    {
      fontSize: TEXT_COUNTDOWN.fontSize,
      fill: TEXT_COUNTDOWN.fill,
      fontFamily: TEXT_COUNTDOWN.fontFamily,
    }
  );
  mainpageConst.textCountdown.visible = false;
  // alert text
  mainpageConst.textAlert = this.add.text(
    TEXT_ALERT.x,
    TEXT_ALERT.y,
    "PRESS SPACE TO START",
    {
      fontSize: TEXT_ALERT.fontSize,
      fill: TEXT_ALERT.fill,
      fontFamily: TEXT_ALERT.fontFamily,
    }
  );
}

function mainpage_update() {
  // countdown
  mainpageConst.textCountdown.setText(mainpageConst.countdown);
  if (mainpageConst.countdown === 1) {
    mainpageConst.countdownTimer.remove();
    this.scene.start("gameStart");
  }
  // control
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.space.isDown) {
    mainpageConst.textAlert.visible = false;
    mainpageConst.button.visible = false;
    mainpageConst.textCountdown.visible = true;
    // countdown 3000ms
    countdown = 3;
    mainpageConst.countdownTimer = this.time.addEvent({
      delay: 1000,
      repeat: 3,
      loop: false,
      callback: () => {
        mainpageConst.countdown--;
      },
    });
  }
}

const mainpage = {
  key: "mainpage",
  init: mainpage_init,
  preload: mainpage_preload, // load assets
  create: mainpage_create, // init
  update: mainpage_update, // fps:60
};
