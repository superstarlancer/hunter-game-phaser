/* global Phaser */

export default class SlowCloud extends Phaser.Sprite {
    
    constructor(game, x, y) {
    
      super(game, x, y, 'slowCloud', 0);
      
      this.game.physics.enable(this, Phaser.Physics.ARCADE);
      this.body.moves = true;
      this.body.width = 0;
      this.body.height = 0;
	    this.anchor.set(0.5);
	    this.alpha = 0.5;
	  //this.outOfBoundsKill = true;

	  // initialize your prefab here
	  this.scale.setTo(3, 3);
        
           
    }
    
    update(){
      //make slowclouds move and when they reach the right edge kill them and spawn them on the other side of the map.
      this.body.velocity.x = -20;   
            
      //horizontal check
      if(this.position.x <= -500){
        this.position.x = this.game.world.width;
      } else if(this.position.x >= this.game.world.width) {
        this.position.x = 0;
      }
        
    }
 
    
 
 
 
    
}