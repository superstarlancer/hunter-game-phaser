/*global Phaser*/

export default class Meteor extends Phaser.Sprite {
    
    constructor(game, x, y) {
        
        
        var randomSize = ((Math.random() * 2) + 1);
        
        super(game, x, y, 'meteor', 0);
        
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = false;
        this.body.mass = 3;
        this.anchor.set(0.5);
        
        this.randomNumber = ((Math.random() * 40) + 15);
        this.speedRandom = this.randomNumber;
        
        if(this.randomNumber < 24 ){
            this.speedRandom = 1500;
        }
        
        this.outOfBoundsKill = true;
        this.scale.setTo(randomSize, randomSize);
        
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        
        if(randomSize > 2){
            this.rotationSpeed = 0.75;
        } 
        if(randomSize <= 2) {
            this.rotationSpeed = -0.75;
        }
    
        
    }
    
    update(){
        
        this.body.velocity.x = -this.speedRandom;
        this.body.velocity.y = 35;
        
        
        
        
        this.angle += this.rotationSpeed;
        
        
    }
    
 
    
}



