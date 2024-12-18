// import Player from './player.js';

class Pirate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 45;
        this.img;
        this.speed = 5;
        this.direction = 'left';
        this.currency = parseInt(localStorage.getItem('playerCurrency')) || 100; // Retrieve from localStorage or default to 100
    }

    draw() {
        
        push();
        translate(this.x, this.y);
        if(this.direction === 'right'){
            scale(-1,1);
        }

        imageMode(CENTER);
        image(this.img, 0, 0, this.size, this.size);

        pop();
        // //debuging hitbox
        // circle(this.x, this.y, this.size);
    }

    move() {
        let futureX;
        let futureY;
        let yMove = 0;
        let xMove = 0;

        if (keyIsDown(87)) { yMove = -1; }  //W
        if (keyIsDown(83)) { yMove = 1; }   //s
        if (keyIsDown(65)) {
             xMove = -1;
             this.setDirection("left");
             }  //a
        if (keyIsDown(68)) {
             xMove = 1;
             this.setDirection("right");
             }   //d

        if (xMove != 0 && yMove != 0) {
            futureX = this.x + xMove * this.speed * .7071;
            futureY = this.y + yMove * this.speed * .7071;
        }
        else {
            futureX = this.x + xMove * this.speed;
            futureY = this.y + yMove * this.speed;
        }

        if(futureX > 0 && futureX < mapXSize && futureY > 0 && futureY < mapYSize) {
            this.x = futureX;
            this.y = futureY;
        }
    }

    setDirection(direction){
        this.direction = direction;
    }

    isColliding(islandObj) {
        //returns bool, true if colliding with passed game islandObject
                                //(rx, ry, rw, rh, cx, cy, diameter)
        return collideRectCircle(islandObj.x, islandObj.y, islandObj.sizeW, islandObj.sizeH, this.x, this.y, this.size)
    }

    updateCoinCount() {
        document.getElementById('coinCountBarracks').innerText = this.currency;
        document.getElementById('coinCountPier').innerText = this.currency;

        localStorage.setItem('playerCurrency', this.currency); // Store in localStorage
         console.log("Coin count updated to: ",this.currency);
    }

    buyUpgrade(cost) {
        if (pirate.currency >= cost) {
            pirate.currency -= cost;
            pirate.updateCoinCount();
            return true;
        }
        else {s
            alert('Not enough coins!');
            return false;
        }
    }

}

window.Pirate = Pirate;
