/*global Phaser*/

import Player from "../prefabs/Player.js";
import Meteor from "../prefabs/Meteor.js";
import OrcConvict from "../prefabs/orcConvict.js";
import SlowCloud from "../prefabs/SlowCloud.js";
import PlayerUI from "../prefabs/PlayerUI.js";
import HealthPack from "../prefabs/HealthPack.js";
import AlienMech from "../prefabs/AlienMech.js";

export default class Game extends Phaser.State {
    
    constructor() {
    //object level properties
    super();

  }
    
    
    create() {
        
        this.randomDisplayNumber = (Math.random() * 40) + 15;
        
        this.camera.flash('#000000');
        //timer for the death 5sec delay for the death function
        this.runTimerOnce = 0;
        
        //tracker for enemies killed
        this.enemiesKilled = 0;
        
        //timecheck for timed events like the player flashing red when hit
        this.timeCheckHit = 0;
        this.timeCheckRevert = this.game.time.now;
        
        //meteor spawn chance
        this.spawnChance = 0.02;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.input.mouse.capture = true;
    
        //add background
        this.bg = this.add.tileSprite(0, 0, 5000, 5000, 'game_bg');
        this.bg.scale.setTo(2,2);
        
        this.game.world.setBounds(0, 0, 5000, 5000);
        
        //add ship
        this.ship = this.game.add.sprite(400, 600, 'bountyHunterShip');
        this.game.physics.arcade.enable(this.ship);
        this.ship.enableBody = true;
        this.ship.anchor.set(0.5);
        this.ship.angle = -45;
        
        
        //add player
        this.player = new Player(this.game, 400, 600);
        this.game.add.existing(this.player);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
        //this.player.fixedToCamera = true;
        
        //add player UI
        //this.bountyHunterUI = this.game.add.sprite(200, 200, 'playerUI'); 
        this.playerUI = new PlayerUI(this.game, -100, -60); 
        this.player.addChild(this.playerUI);
        
        //add healthpacks
        //this.healthPack = new HealthPack(this.game, 600, 600);
        //this.game.add.existing(this.healthPack);
        this.healthPacks = this.add.group();
        
        
        
        //add meteors
        this.meteors = this.add.group();
        this.meteors.enableBody = true;
        this.meteors.physicsBodyType = Phaser.Physics.ARCADE;
    
        //add orcs
        this.orc = new OrcConvict(this.game, 500, 500);
        //this.game.add.existing(this.orc);
        
        this.orcs = this.add.group();
        this.orcs.enableBody = true;
        this.orcs.physicsBodyType = Phaser.Physics.ARCADE;
        
        //add red aliens
        //this.mechAliens = this.add.group();
        //this.mechAliens.enableBody = true;
        //this.mechAliens.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.alienMech = new AlienMech(this.game, 1000, 500);
        this.game.add.existing(this.alienMech);
        
        
        //add slow clouds
        //this.cloud = new SlowCloud(this.game, 800, 1200);
        //this.game.add.existing(this.cloud);
        
        this.slowClouds = this.add.group();
        
        
        
        
        //this.meteor = new Meteor(this.game, 600, 300);
        //this.game.add.existing(this.meteor);
        //this.meteor.scale.setTo(3,3);
        
        //  Creates X bullets, using the 'bullet' graphic
        this.weapon = this.add.weapon(10, 'bullet');
        this.weapon.bulletAngleOffset = 0;
        this.weapon.bulletAngleVariance = 10;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 40;
        this.weapon.onFireLimit = 10;
        this.weapon.bulletInheritSpriteSpeed = true;
        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletKillDistance = 760;    
        this.weapon.bulletSpeedVariance = 50;
        this.weapon.trackSprite(this.player, 95, 20, true);
        
        //create alienMech weapon
        this.alienWeapon = this.add.weapon(4, 'alienBullet');
        this.alienWeapon.bullets.anchor = 0.5;
        this.alienWeapon.bulletAngleOffset = 0;
        this.alienWeapon.bulletAngleVariance = 5;
        this.alienWeapon.bulletSpeed = 350;
        this.alienWeapon.fireRate = 10;
        this.alienWeapon.onFireLimit = 10;
        this.alienWeapon.bulletInheritSpriteSpeed = true;
        this.alienWeapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.alienWeapon.bulletKillDistance = 760;    
        this.alienWeapon.bulletSpeedVariance = 50;
        this.alienWeapon.trackSprite(this.alienMech, -100, -10, true);
        //this.alienWeapon.autofire = true;
            
        this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
        this.style = { font: "24px Revalia", fill: "#ffffff", align: "center", backgroundColor: "green"};

        this.text = this.game.add.text(800, 100, " Enemies Killed: " + 0 + " " , this.style);
        this.text.fixedToCamera = true;
        this.text.stroke = '#000000';
        this.text.strokeThickness = 6;


        this.text.anchor.set(0.5);


        //spawn a number of slowClouds in the game world
        for(let i = 0; i < 5; i++){
            var slowCloud = new SlowCloud(this.game, Math.random(this.world.width) * this.world.width, Math.random(this.world.height) * this.world.height);
            this.slowClouds.add(slowCloud);
        }
        
    }
    
    // ----------------------------------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------- UPDATE -------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------------
    
    
    update() {
        //alienMechWeapon TEST CODE
        this.alienWeapon.fireAtSprite(this.player);

        //keeps players hp updated
        this.playerUI.healthBar.scale.y = this.player.playerHealthPercent / 100;
        
        //ship animation
        this.ship.body.velocity.x = -25;
        this.ship.angle += 0.15;
        this.ship.outOfBoundsKill = true;
        
        //Enemies killed tracker
        this.enemiesKilled;
        
        //revert player tint to normal after getting hit
        //also revert player speed after exiting slow cloud
        if(this.game.time.now > this.timeCheckRevert){
            this.player.tint = 0xffffff;
            this.player.speed.current = this.player.speed.max;
            this.timeCheckRevert = this.game.time.now + 200;
        }

        //  Scroll the background
        //this.bg.tilePosition.y += 0.01;
        //this.bg.tilePosition.x += 0.01;
        
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------ UPDATE SPAWNS -------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        //SPAWN RANDOM METEORS
        if(Math.random() < this.spawnChance) {
          //var meteor = new Meteor(this.game, this.game.width + 100, Math.random() * this.game.height);
          //spawn meteors to the right of player location
          var meteor = new Meteor(this.game, this.player.world.x + 1800, Math.random() * this.player.world.y * 2);
          this.meteors.add(meteor);
        }
        
        //SPAWN RANDOM HEALTHPACKS
        if(Math.random() < this.spawnChance / 5) {
          //spawn meteors to the right of player location
          var healthPack = new HealthPack(this.game, this.player.world.x + 1800, Math.random() * this.player.world.y * 2);
          this.healthPacks.add(healthPack);
        }
        
        //SPAWN RANDOM ORCS
        if(Math.random() < (this.spawnChance / 3)) {
          this.orc = new OrcConvict(this.game, this.game.width + 100, Math.random() * this.game.height);
          this.orcs.add(this.orc);
        }
        
        if (this.fireButton.isDown || this.game.input.mousePointer.isDown ) {
            this.weapon.fireAtPointer();
        }
        
        //I players health reaches zero!
        if (this.player.health.current <= 0){
            this.healthZero(this.player, this.weapon);
        }
        
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------- COLLISIONS ---------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        
        //bullet meteor collision
        this.game.physics.arcade.collide(this.weapon.bullets, this.meteors, this.hitEnemy, null, this);
        
        //player meteor collision
        //this.game.physics.arcade.collide(this.player, this.meteors, this.hitPlayer, null, this);
        this.game.physics.arcade.collide(this.player, this.meteors, this.hitPlayer, null, this);
        
        //bullet orc collision
        this.game.physics.arcade.collide(this.weapon.bullets, this.orcs, this.killOrc, null, this);
        //orc player collision
        this.game.physics.arcade.collide(this.player, this.orcs, this.orcHitPlayer, null, this);
        //orc meteor collision
        this.game.physics.arcade.collide(this.meteors, this.orcs, this.meteorHitOrc, null, this);
        //alien meteor collision
        this.game.physics.arcade.collide(this.meteors, this.alienMech, this.meteorHitAlienMech, null, this);
        //player healthpack collision
        this.game.physics.arcade.collide(this.player, this.healthPacks, this.playerPicksUpHealthpack, null, this);
        
        //code below adds homing between orcs and the player
        var angle = this.physics.arcade.angleBetween(this.orc, this.player);
        this.orcAngle = angle * (180/Math.PI);
        this.physics.arcade.velocityFromAngle(this.orcAngle, 250, this.orc.body.velocity);
        
        //code below adds homing between aliens and the player
        var angle2 = this.physics.arcade.angleBetween(this.alienMech, this.player);
        this.alienMechAngle = angle2 * (180/Math.PI);
        this.physics.arcade.velocityFromAngle(this.alienMechAngle, 100, this.alienMech.body.velocity);
        
        //player cloud collision
        this.game.physics.arcade.overlap(this.player, this.slowClouds, this.playerEntersSlow, null, this);
    }
    // ----------------------------------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------- RENDERS ------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------------
    render() {

    this.weapon.debug();
    this.game.debug.text("Left Button: " + this.game.input.mousePointer.isDown, 12, 80);
    this.game.debug.text("Player Health: " + this.player.health.current, 12, 100);
    this.game.debug.text("Player health percent:" + Math.trunc(this.player.playerHealthPercent) + "%", 12, 120);
    this.game.debug.text("Player Location: " + Math.trunc(this.player.world.x) + " X , " + Math.trunc(this.player.world.y) + " Y", 12, 140);
    this.game.debug.text("World size: " + this.world.width + " X " + this.world.height + " Y", 12, 160);
    this.game.debug.text("Random number: " + this.randomDisplayNumber , 12, 180);
    //this.game.debug.text("Orc Angle: " + this.orcAngle, 12, 120);

    }
    
    // ----------------------------------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------- CUSTOM FUNCTIONS ---------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------------------------------------------------
    
    //custom functions here
    hitEnemy(bullet, enemy) {
         
        //this.weapon.bullets.kill();
        //this.meteors.remove(this.meteors, true);
        bullet.kill();
        console.log("Hit");

    }
    hitPlayer(player, meteor){
        
        if(this.game.time.now > this.timeCheckHit){
        console.log("The player has collided with a meteor!");
        this.player.health.current -= 5;
        this.playerUI.healthBar.scale.y = this.player.playerHealthPercent / 100;
        this.player.tint = 0xff0000;
        
        //this event will only allow the hitPlayer function to run every 250ms
        this.timeCheckHit = this.game.time.now + 250;
        
        }
    }
    killOrc(bullet, orc){
        bullet.kill();
        
        orc.health.current -= 5;
        orc.tint = 0xff0000;
        
        
        if(orc.health.current <= 0){
            orc.kill();
            orc.health.current = orc.health.max;
            this.enemiesKilled += 1;
            this.text.setText(" Enemies Killed: " + this.enemiesKilled + " ");
        }
        console.log("Bullet hits orc!");
    }
    orcHitPlayer(player, orc){
        
        if(this.game.time.now > this.timeCheckHit){
            console.log("Orc hit player!");
            this.player.health.current -= 5;
            this.playerUI.healthBar.scale.y = this.player.playerHealthPercent / 100;
            this.player.tint = 0xff0000;
            
            //this event will only allow the hitPlayer function to run every 250ms
            this.timeCheckHit = this.game.time.now + 250;
        }
        
    }
    meteorHitOrc(meteor, orc){
        
    }
    meteorHitAlienMech(meteor, alien){
    
    }
    playerPicksUpHealthpack(player, healthPack){
        console.log("You picked up a health pack!");
        //heal when healthPack gets picked up
        if(player.health.current < player.health.max){
            player.health.current += healthPack.healthRecovery;
            //if playerhealth is more than playerhealth max set health to playerhealth max
            if(player.health.current > player.health.max){
                player.health.current = player.health.max;
            }
        }
        healthPack.kill();
        
    }
    playerEntersSlow(player, slowCloud){
        console.log("Player has entered the slow cloud!");
        player.speed.current = 150;
        
    }
    
    healthZero(player, weapon){
        console.log("THE PLAYER HAS DIED!");
        this.weapon.trackSprite(this.player, -95000000, 20, true);
        player.kill();
        
        //set the 5 second delay before game retart
        while(this.runTimerOnce === 0){
            this.timeCheckHit = this.game.time.now + 5000;
            this.runTimerOnce += 1;
        }
        if(this.game.time.now > this.timeCheckHit){
            this.camera.fade('#000000');
            this.camera.onFadeComplete.add(this.fadeComplete,this);
        
        }
    }
    
    fadeComplete() {
		this.game.state.restart(); 
	}
    
}