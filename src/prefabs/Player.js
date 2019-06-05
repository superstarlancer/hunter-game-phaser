/*global Phaser*/

export default class Player extends Phaser.Sprite {

    constructor(game, x, y) {  
        

	  super(game, x, y, 'player', 0);

	  this.game.physics.enable(this, Phaser.Physics.ARCADE);
	  this.body.drag.x = 400;
	  this.body.drag.y = 400;
	  this.body.mass = 6;
	  this.body.collideWorldBounds = true;
	  this.anchor.set(0.5);

	  // initialize your prefab herea
	  this.speed = { current: 300, max: 300 };

	  this.health = { current: 300, max: 300 };
	  
	  this.cursors = this.game.input.keyboard.createCursorKeys();
	  
	  //animations
	  this.animations.add("idle", [0,1]);
	  this.animations.play("idle", 1, true);
	  this.animations.currentAnim.speed = 12;
	  
	  //add an emitter to the players trail
	  this.playerTrail = game.add.emitter((this.world.x), (this.world.y), 400);
	  this.playerTrail.width = 15;
      this.playerTrail.makeParticles('bullet');
      this.playerTrail.setXSpeed(-200, -180);
      this.playerTrail.setYSpeed(160, 130);
      this.playerTrail.setRotation(90,90);
      this.playerTrail.setAlpha(1, 0.01, 800);
      this.playerTrail.setScale(0.5, 0.4, 3, 0.4, 2000, Phaser.Easing.Quintic.Out);
      this.playerTrail.start(false, 5000, 1	);
     
	}
    
    update() {
         	//  Keep the shipTrail lined up with the ship
            this.playerTrail.x = this.world.x - 50;
            this.playerTrail.y = this.world.y + 15;
        
            // write your prefab's specific update code here
    		if(this.cursors.left.isDown) {
    			this.body.velocity.x = -this.speed.current;
    		}
    		if(this.cursors.right.isDown) {
    			this.body.velocity.x = this.speed.current;
    		}
    		if(this.cursors.up.isDown) {
    			this.body.velocity.y = -this.speed.current;
    		}
    		if(this.cursors.down.isDown) {
    			this.body.velocity.y = this.speed.current;
    		}
    		this.playerHealthPercent = (this.health.current / this.health.max) * 100;
        }

}