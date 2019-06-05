/* global Phaser */

export default class OrcConvict extends Phaser.Sprite {
    
    constructor(game, x, y) {
    
      super(game, x, y, 'orcConvict', 0);
      
      this.timeCheckRevert = this.game.time.now;
      
      this.game.physics.enable(this, Phaser.Physics.ARCADE);
	  this.anchor.set(0.5);
	  this.outOfBoundsKill = true;

	  // initialize your prefab herea
	  this.speed = 50;
	  this.scale.setTo(1, 1);
	  this.body.mass = 3;

	  this.health = { current: 50, max: 50 };
        
      this.animations.add("attack", [0,1]);
	  this.animations.play("attack", 1, true);
	  this.animations.currentAnim.speed = 3;    
        
           
    }
    
    update(){
        

            //revert orc tint to normal after getting hit
        if(this.game.time.now > this.timeCheckRevert){
            this.tint = 0xffffff;
            this.timeCheckRevert = this.game.time.now + 200;
        }
            
        
    }
 
    
 
 
 
    
}