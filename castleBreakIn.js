import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("grass.png");



class Wall extends Sprite {
    constructor(x, y, name, image) {
        super();
        this.name = name;
        this.setImage(image);
        this.x = x;
        this.y = y;
        this.accelerateOnBounce = false;
    }
}

new Wall(0, 0, "A spooky castle wall", "castle.png");
new Wall(0, 200, "Left side wall", "wall.png");
new Wall(game.displayWidth - 48, 200, "Right side wall", "wall.png");


class Princess extends Sprite {
    constructor() {
        super();
        this.name = "Princess ann";
        this.setImage("ann.png");
        this.height = 48;
        this.width = 48;
        this.x = game.displayWidth / 2;
        this.y = game.displayHeight - 48;
        this.speedWhenWalking = 200;
        this.lives = 3;
        this.accelerateOnBounce = false;
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
    }
    handleLeftArrowKey() {
        this.angle = 180;
        this.speed = this.speedWhenWalking;
        this.playAnimation("left");
    }
    handleRightArrowKey() {
        this.angle = 0;
        this.speed = this.speedWhenWalking;
        this.playAnimation("right");
    }
    handleUpArrowKey() {
        this.y = this.y - 10;
    }
    handleGameLoop() {
        this.x = Math.min(game.displayWidth - 96, this.x);
        this.x = Math.max(48, this.x);
        this.speed = 0;
        if (this.y < game.displayHeight - 48) {
            this.y = this.y + 4;
        }
    }
    handleCollision(otherSprite) {
        let horizontalOffset = this.x - otherSprite.x;
        let verticalOffset = this.y - otherSprite.y;
        if (Math.abs(horizontalOffset) < this.width / 3 &&
            verticalOffset > this.height / 4) {
            otherSprite.angle = 90 + 2 * horizontalOffset;
        }
        return false;
    }
    handleFirstGameLoop() {
        this.livesDisplay = game.createTextArea(game.displayWidth / 2, 20);
        this.updateLivesDisplay();
    }
    updateLivesDisplay() {
        game.writeToTextArea(this.livesDisplay, "Lives = " + this.lives);
    }
    LoseALife() {
        this.lives = this.lives - 1;
        this.updateLivesDisplay;
        if (this.lives > 0) {
            new Ball(); 
        }
        if(this.lives <= 0) {
            game.end("The mysterious stranger has escaped\nPrincess " +
            "Ann for now!\n\nBetter luck next time.");
        }
    }
    addALife() {
        this.lives = this.lives + 1;
        this.updateLivesDisplay();
    }
}

let ann = new Princess();

class Ball extends Sprite {
    constructor() {
        super();
        this.x = 400;
        this.y = 400;
        this.height = 48;
        this.width = 48;
        this.name = "Soccer ball";
        this.setImage("ball.png");
        this.defineAnimation("spin", 0, 12);
        this.speed = 1;
        this.angle = 50 + Math.random() * 80;
        this.playAnimation("spin", true);
        Ball.ballsInPlay = Ball.ballsInPlay + 1;
    }
    handleGameLoop() {
        if (this.speed < 200) {
            this.speed = this.speed + 2;
        }
    }
    handleBoundaryContact() {
        game.removeSprite(this);
        Ball.ballsInPlay = Ball.ballsInPlay - 1;
        if (Ball.ballsInPlay == 0) {
            ann.LoseALife();
        }
    }
}


Ball.ballsInPlay = 0;
new Ball();

class Block extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.name = "block1";
        this.setImage("block1.png");
        this.accelerateOnBounce = false;
        Block.blocksToDestroy = Block.blocksToDestroy + 1;
    }
    handleCollision() {
        game.removeSprite(this);
        Block.blocksToDestroy = Block.blocksToDestroy - 1;
        if (Block.blocksToDestroy <= 0) {
            game.end("Congradulations!\n\nPrincess Ann can continue her " +
            "pursuit\nof the mysterious stranger");
        }
        return true;
    }
}

Block.blocksToDestroy = 0;

for (let i = 0; i < 5; i = i + 1) {
    new Block(200 + i * 48, 200);
}

class ExtraBallBlock extends Block {
    constructor(x, y) {
        super();
        
    }
}
new Block (300, 250,);

class ExtraLifeBlock extends Block {
    constructor(x, y, name, image) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.setImage(image);
        Block.blocksToDestroy = Block.blocksToDestroy - 1;
    }
    handleCollision() {
        ann.addALife = true;
    }
}
new Block(200, 250, "block2", "block2.png");