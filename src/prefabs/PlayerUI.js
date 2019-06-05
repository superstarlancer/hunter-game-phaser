/*global Phaser*/

export default class PlayerUI extends Phaser.Sprite {

    constructor(game, x, y) {  
        

	  super(game, x, y, 'playerUI', 0);
	  this.anchor.set(0.5);

      //put in the actual health bar
      this.healthBar = this.game.add.sprite(0,-15, 'healthBar');
      //this.healthBar.anchor.setTo(0.5, 1);   
      this.healthBar.anchor.setTo(0.5, 0);
      //the healthbar scale needed for %
      this.healthBar.scale.y = 1; 
      this.addChild(this.healthBar);
	  
	}
    
    update() {
        
            // write your prefab's specific update code here
            
            
        }
        

    

}