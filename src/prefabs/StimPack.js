/*global Phaser*/

export default class StimPack extends Phaser.Sprite {
    
    constructor(game, x, y) {
        
        
        super(game, x, y, 'stimPack', 0);
        
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = false;
        this.anchor.set(0.5);
        
        this.outOfBoundsKill = true;
        
        this.speedBoost = 300;
        this.stimPackActive = false;
    
    }
    
    update(){
        
        this.body.velocity.x = -250;
 
        this.angle += 1;
        
        
    }
    
 
    
}



