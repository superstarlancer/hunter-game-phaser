/* global Phaser */

export default class DeadOrc extends Phaser.Sprite {
    
    constructor(game, x, y) {
    
      super(game, x, y, 'orcConvictDead', 0);
      
      this.game.physics.enable(this, Phaser.Physics.ARCADE);
	  this.anchor.set(0.5);
	  this.outOfBoundsKill = true;
	  this.scale.setTo(1.25, 1.25);
        
           
    }
    
    update(){
         //dead orcs animation
        this.body.velocity.x = -50;
        this.angle += 0.5;    
        
    }
        

 
    
}