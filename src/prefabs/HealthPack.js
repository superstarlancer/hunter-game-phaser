/*global Phaser*/

export default class HealthPack extends Phaser.Sprite {
    
    constructor(game, x, y) {
        
        
        super(game, x, y, 'healthPack', 0);
        
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = false;
        this.anchor.set(0.5);
        
        this.outOfBoundsKill = true;
        
        this.healthRecovery = 100;
    
    }
    
    update(){
        
        this.body.velocity.x = -250;
 
        this.angle += 1;
        
        
    }
    
 
    
}



