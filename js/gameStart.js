// gameStart
const gameStartConst = {
  bg: null,
  player: null,
  fish: null,
  enemy: null,
  scoreText: null,
  lifeText: null,
  life: null,
  lifeCount: 3,
  score: 0,
  highScore: 0,
  gameTimer: 0,
  fishPosition: {
    x: 900,
    y: 350,
  },
  enemyPosition: {
    x: 0,
    y: 250,
  },
  level: 1,
  levelUp: 5,
  speed: {
    fish: 20,
    enemy: 30,
  },
};

function gameStart_init() {
  gameStartConst.score = 0;
  gameStartConst.lifeCount = 3;
  gameStartConst.level = 1;
}

function gameStart_preload() {
  this.load.image(BG.key, BG.img);
  this.load.image(LIFE.key, LIFE.img);
  this.load.spritesheet(PLAYER.key, PLAYER.img, {
    frameWidth: PLAYER.frameWidth,
    frameHeight: PLAYER.frameHeight,
  });
  this.load.spritesheet(FISH.key, FISH.img, {
    frameWidth: FISH.frameWidth,
    frameHeight: FISH.frameHeight,
  });
  this.load.spritesheet(ENEMY.key, ENEMY.img, {
    frameWidth: ENEMY.frameWidth,
    frameHeight: ENEMY.frameHeight,
  });
}

function gameStart_create() {
  // bg
  gameStartConst.bg = this.add.tileSprite(
    BG.x,
    BG.y,
    BG.width,
    BG.height,
    BG.key
  );
  // player
  gameStartConst.player = this.physics.add.sprite(
    PLAYER.x,
    PLAYER.y,
    PLAYER.key
  );
  this.anims.create({
    key: "playerFly",
    frames: this.anims.generateFrameNumbers(PLAYER.key, { start: 0, end: 1 }),
    frameRate: 6,
    repeat: -1,
  });
  gameStartConst.player.anims.play("playerFly", true);
  gameStartConst.player.setBounce(0.2);
  gameStartConst.player.setCollideWorldBounds(true);

  // fish
  gameStartConst.fish = this.physics.add.sprite(FISH.x, FISH.y, FISH.key);
  this.anims.create({
    key: "fishFly",
    frames: this.anims.generateFrameNumbers(FISH.key, {
      start: 0,
      end: 1,
    }),
    frameRate: 6,
    repeat: -1,
  });
  // gameStartConst.fish.body.immovable = true;
  gameStartConst.fish.body.moves = false;
  gameStartConst.fish.anims.play("fishFly", true);
  gameStartConst.fish.setScale(0.2);
  gameStartConst.fish.setBounce(0.2);
  gameStartConst.fish.setCollideWorldBounds(true);
  gameStartConst.fish.setSize(FISH.frameWidth, FISH.frameHeight, 0);
  gameStartConst.fish.setPosition(
    gameStartConst.fishPosition.x,
    gameStartConst.fishPosition.y
  );
  this.physics.add.collider(
    gameStartConst.player,
    gameStartConst.fish,
    collectFish,
    null,
    this
  );

  // enemy
  gameStartConst.enemy = this.physics.add.sprite(ENEMY.x, ENEMY.y, ENEMY.key);
  this.anims.create({
    key: "enemyFly",
    frames: this.anims.generateFrameNumbers(ENEMY.key, {
      start: 0,
      end: 1,
    }),
    frameRate: 6,
    repeat: -1,
  });
  gameStartConst.enemy.body.moves = false;
  gameStartConst.enemy.anims.play("enemyFly", true);
  gameStartConst.enemy.setBounce(0.2);
  gameStartConst.enemy.setCollideWorldBounds(true);
  gameStartConst.enemy.setSize(ENEMY.frameWidth, ENEMY.frameHeight, 0);
  gameStartConst.enemy.setPosition(
    gameStartConst.enemyPosition.x,
    gameStartConst.enemyPosition.y
  );
  this.physics.add.collider(
    gameStartConst.player,
    gameStartConst.enemy,
    hitEnemy,
    null,
    this
  );

  // score text
  gameStartConst.scoreText = this.add.text(
    TEXT_SCORE.x,
    TEXT_SCORE.y,
    `Score: ${gameStartConst.score}`,
    {
      fontSize: TEXT_SCORE.fontSize,
      fill: TEXT_SCORE.fill,
      fontFamily: TEXT_SCORE.fontFamily,
    }
  );
  // life image
  gameStartConst.life = this.add.image(LIFE.x, LIFE.y, LIFE.key);
  // life text
  gameStartConst.lifeText = this.add.text(
    TEXT_LIFE.x,
    TEXT_LIFE.y,
    `x${gameStartConst.lifeCount}`,
    {
      fontSize: TEXT_LIFE.fontSize,
      fill: TEXT_LIFE.fill,
      fontFamily: TEXT_LIFE.fontFamily,
    }
  );
}

function setFishPositionDefault() {
  gameStartConst.fishPosition.x = 900;
  gameStartConst.fishPosition.y = Phaser.Math.Between(150, 430);
  gameStartConst.fish.setPosition(
    gameStartConst.fishPosition.x,
    gameStartConst.fishPosition.y
  );
}

function setEnemyPositionDefault() {
  gameStartConst.enemyPosition.x = 0;
  gameStartConst.enemyPosition.y = Phaser.Math.Between(150, 430);
  gameStartConst.enemy.setPosition(
    gameStartConst.enemyPosition.x,
    gameStartConst.enemyPosition.y
  );
}

function collectFish(player, fish) {
  // this.physics.pause();
  setFishPositionDefault();

  // score
  gameStartConst.score++;
  gameStartConst.scoreText.setText(`Score: ${gameStartConst.score}`);
}

function hitEnemy(player, enemy) {
  gameStartConst.lifeCount--;
  gameStartConst.lifeText.setText(`x${gameStartConst.lifeCount}`);

  gameStartConst.bg.setTint(0xba6567);
  // player
  gameStartConst.player.setBounce(1);
  // enemy
  setEnemyPositionDefault();
  // score
  if (gameStartConst.score > gameStartConst.highScore) {
    gameStartConst.highScore = gameStartConst.score;
  }
  gameStartConst.score--;
  gameStartConst.scoreText.setText(`Score: ${gameStartConst.score}`);

  this.time.addEvent({
    delay: 1000,
    repeat: 1,
    loop: false,
    callback: () => {
      gameStartConst.bg.setTint(0xffffff);
    },
  });
}

function gameStart_update() {
  gameStartConst.gameTimer++;
  // bg
  gameStartConst.bg.tilePositionX += 4 * gameStartConst.level;

  // fish
  if (gameStartConst.fishPosition.x <= 0) {
    setFishPositionDefault();
  } else {
    if (gameStartConst.gameTimer === gameStartConst.speed.fish) {
      gameStartConst.fishPosition.x =
        gameStartConst.fishPosition.x - 50 * gameStartConst.level;
      gameStartConst.fish.setPosition(
        gameStartConst.fishPosition.x,
        gameStartConst.fishPosition.y
      );
    }
  }

  // enemy
  if (gameStartConst.enemyPosition.x >= 900) {
    setEnemyPositionDefault();
  } else {
    if (gameStartConst.gameTimer === gameStartConst.speed.enemy) {
      gameStartConst.enemyPosition.x =
        gameStartConst.enemyPosition.x + 50 * gameStartConst.level;
      gameStartConst.enemy.setPosition(
        gameStartConst.enemyPosition.x,
        gameStartConst.enemyPosition.y
      );
      gameStartConst.gameTimer = 0;
    }
  }

  // control
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.space.isDown) {
    gameStartConst.player.setVelocityY(-150);
  }

  // game over
  if (gameStartConst.lifeCount === 0) {
    // player
    gameStartConst.player.setBounce(0.5);
    gameStartConst.player.setTint(0xff4444);
    gameStartConst.player.angle = 30;
    // game status
    gameStartConst.gameTimer = 0;
    let counter = 0;
    this.time.addEvent({
      delay: 1000,
      repeat: 1,
      loop: false,
      callback: () => {
        counter++;
        if (counter === 1) {
          this.scene.start("gameOver");
        }
      },
    });
  } else if (
    gameStartConst.score / gameStartConst.levelUp ===
    gameStartConst.level
  ) {
    gameStartConst.level++;
  }
}

const gameStart = {
  key: "gameStart",
  init: gameStart_init,
  preload: gameStart_preload, // load assets
  create: gameStart_create, // init
  update: gameStart_update, // fps:60
};
