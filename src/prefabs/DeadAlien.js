/* global Phaser */

export default class DeadAlien extends Phaser.Sprite {
    
    constructor(game, x, y) {
    
      super(game, x, y, 'alienMechDead', 0);
      
      this.game.physics.enable(this, Phaser.Physics.ARCADE);
	  this.anchor.set(0.5);
	  this.outOfBoundsKill = true;
	  this.scale.setTo(1.15, 1.15);
        
           
    }
    
    update(){
         //dead aiens animation
        this.body.velocity.x = -50;
        this.angle += 0.5;    
        
    }
        

 
    
}