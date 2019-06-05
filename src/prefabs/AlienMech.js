/* global Phaser */

export default class AlienMech extends Phaser.Sprite {
    
    constructor(game, x, y) {
    
      super(game, x, y, 'alienMech', 0);
      
      this.runOnce = false;
      
      this.timeCheckRevert = this.game.time.now;
      
      this.game.physics.enable(this, Phaser.Physics.ARCADE);
	  this.anchor.set(0.5);
	  this.outOfBoundsKill = true;

	  // initialize your prefab herea
	  this.speed = 25;
	  this.scale.setTo(1, 1);
	  this.body.mass = 3;
	  this.isAlive = true;
	  this.alienPlasma = this.game.add.audio('alienPlasma');
	          //create alienMech weapon
        this.alienWeapon = this.game.add.weapon(5, 'alienBullet');
        this.alienWeapon.bullets.anchor = 0.5;
        this.alienWeapon.bulletAngleOffset = 0;
        this.alienWeapon.bulletAngleVariance = 5;
        this.alienWeapon.bulletSpeed = 350;
        this.alienWeapon.fireRate = 10;
        this.alienWeapon.onFireLimit = 10;
        this.alienWeapon.bulletInheritSpriteSpeed = true;
        this.alienWeapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.alienWeapon.bulletKillDistance = 1500;    
        this.alienWeapon.bulletSpeedVariance = 50;
        //this.alienWeapon.fire = this.alienPlasma.play();
        //this.alienWeapon.autofire = true;
        this.alienWeapon.onFire.add(function() {this.alienPlasma.play('', 0.6, 0.35)},this);

	  this.health = { current: 100, max: 100 };
        
      //this.animations.add("attack", [0,1]);
	  //this.animations.play("attack", 1, true);
	  //this.animations.currentAnim.speed = 3;    
        
           
    }
    
    update(){
        
        //remove alien weapon on death
        if(!this.isAlive && !this.runOnce){
            this.alienWeapon = this.game.add.weapon(0, 'alienBullet');
            this.runOnce = true;
        }
        

            //revert alien tint to normal after getting hit
        if(this.game.time.now > this.timeCheckRevert){
            this.tint = 0xffffff;
            this.timeCheckRevert = this.game.time.now + 200;
        }
        
    }
    firePlasma(){
        this.alienPlasma.play();
    }
 
    
}