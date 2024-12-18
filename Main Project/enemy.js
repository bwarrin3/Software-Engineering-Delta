/// Enemy object
/// used for the enemy

class Enemy {
    constructor(x, y, health, enemyImage) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.size = 50;     //used for hitbox
        this.sizeW = 60;
        this.sizeH = 100;
        this.collision = true;
        this.angle = 0;  // Angle the enemy is traveling
        this.health = health;
		this.currencyValue = 5;							// Currency value of the enemy
        this.enemyImage = enemyImage;
		this.string;
		
    }

    /*drawEnemy() {
        fill(255, 0, 0);
        imageMode(CENTER);  //sets the image to be drawn ontop of the enemy x, y
        // circle(this.x, this.y, this.size);
        image(enemyImage, this.x, this.y, this.sizeW, this.sizeH);
        imageMode(CORNER);  //returns draw mode to default
        tint('none');
    }*/

		drawEnemy() {
			console.log("not cortana");
			push(); // Save the current drawing state
			translate(this.x, this.y); // Move the origin to the enemy's position
			rotate(this.angle + 90); // Rotate the canvas by the angle toward the player
			imageMode(CENTER); // Set the image mode to CENTER
			image(this.enemyImage, 0, 0, this.sizeW, this.sizeH); // Draw the image at the new origin
			pop(); // Restore the original drawing state
			
		}

    /*drawMinion() {
        fill(255, 0, 0);
        imageMode(CENTER);  //sets the image to be drawn ontop of the enemy x, y
        //tint('green');
        image(minionImage, this.x, this.y, this.size, this.size);
        imageMode(CORNER);  //returns draw mode to default
        tint('none');
		    //console.log("Enemy health: " + this.health);

		// fill(255, 0, 0); // Set the fill color to red
        // ellipseMode(CENTER); // Set the ellipse mode to center
        // ellipse(this.x, this.y, this.size, this.size); // Draw a red circle
        // console.log("Enemy health: " + this.health);

    }*/
		drawMinion() {
			push(); // Save the current drawing state
			translate(this.x, this.y); // Move the origin to the enemy's position
			rotate(this.angle+90); // Rotate the canvas by the angle toward the player
			imageMode(CENTER); // Set the image mode to CENTER
			image(minionImage, 0, 0, this.sizeW, this.sizeH); // Draw the image at the new origin
			pop(); // Restore the original drawing state
		}

    moveEnemy(player) {
        // Calculate the distance between the enemy and the player
        let distanceX = player.x - this.x;
        let distanceY = player.y - this.y;

        // Calculate the angle in radians (atan2 handles cases where distanceX is 0)
        this.angle = Math.atan2(distanceY, distanceX);

        // Calculate the movement in the x and y direction based on the angle
        let moveX = this.speed * Math.cos(this.angle);
        let moveY = this.speed * Math.sin(this.angle);

        // Update the enemy's position
        this.x += moveX;
        this.y += moveY;
    }

    checkCollisionProjectiles(projectiles, player) {
        projectiles.forEach((projectile, index) => {
            // Calculate the distance between the enemy and the projectile using the distance formula
            let distance = Math.sqrt((projectile.x - this.x) * (projectile.x - this.x) +
                (projectile.y - this.y) * (projectile.y - this.y));

            // Check if there is a collision
            if (distance < projectile.size / 2 + this.size / 2) {
                this.health -= player.cannonDamage;
				//console.log("Enemy hit! Health: " + this.health);
                projectiles.splice(index, 1);
				
            }
        });
    }
}

//module.exports = Enemy;
