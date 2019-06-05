export default class Preload {
    
    constructor() {
        this.asset = null;
        this.ready = false;
    }
    
    preload() {
        this.load.image('loading_bg', 'assets/images/loading_bg.png');

        
        //  Load the Google WebFont Loader script
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }
    
    create() {
            
        //background for game
        this.background = this.add.sprite(0,0, 'loading_bg');
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        
        this.asset = this.add.sprite(
            this.game.width/2,
            this.game.height/2,
            'preloader');
            
            this.asset.anchor.setTo(0.5, 0.5);
            
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);
            
            //do all your loading here
            this.load.image('bullet', 'assets/images/bullet.png');
            this.load.image('alienBullet', 'assets/images/alienBullet.png');
            this.load.spritesheet('player', 'assets/images/bountyHunterIdle.png', 201, 183); //width and height of sprite
            //this.load.image('player', 'assets/images/bountyHunter.png');
            //player UI
            this.load.image('playerUI', 'assets/images/bountyHunterUI.png');
            this.load.image('healthBar', 'assets/images/health_bar.png');
            //player ship
            this.load.image('bountyHunterShip', 'assets/images/bountyHunterShip.png');
            //game BG
            this.load.image('game_bg', 'assets/images/bg.png');
            //Main menu
            this.load.image('mainMenu', 'assets/images/mainMenu.png');
            //enemies
            this.load.image('meteor', 'assets/images/meteor.png');
            this.load.spritesheet('orcConvict', 'assets/images/orcConvictAttack.png', 250, 200);
            this.load.spritesheet('alienMech', 'assets/images/alienMech.png', 260, 184);
            //this.load.image('orcConvict', 'assets/images/orcConvict.png');
            this.load.image('orcConvictDead', 'assets/images/orcConvictDead.png');
            this.load.image('alienMechDead', 'assets/images/alienMechDead.png');
            
            //slow clouds
            this.load.image('slowCloud', 'assets/images/slowCloud.png');
            
            //PRELOAD FILTER
            this.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js');
            
            //ITEMS
            //health pack
            this.game.load.image('healthPack', 'assets/images/healthPack.png');
            //stim pack
            this.game.load.image('stimPack','assets/images/stimPack.png');
            
            //SOUNDS
            //weapon sounds
            this.game.load.audio('playerMachinegun',
                [
                'assets/audio/playerMachinegun.mp3',
                'assets/audio/playerMachinegun.ogg'
                ]
            );
            this.game.load.audio('alienPlasma',
                [
                'assets/audio/alienPlasma.mp3',
                'assets/audio/alienPlasma.ogg'
                ]
            );
            //death sounds
            this.game.load.audio('orcDeath',
                [
                'assets/audio/orcDeath.mp3',
                'assets/audio/orcDeath.ogg'
                ]
            );
            this.game.load.audio('alienDeath',
                [
                'assets/audio/alienMechDeath.mp3',
                'assets/audio/alienMechDeath.ogg'
                ]
            );
            this.game.load.audio('playerHit',
                [
                'assets/audio/playerHit.mp3',
                'assets/audio/playerHit.ogg'
                ]
                
            );
            //item Pickups
            this.game.load.audio('stimPackPickup',
                [
                'assets/audio/stimPack.mp3',
                'assets/audio/stimPack.ogg'
                ]
            );
            this.game.load.audio('healthPackPickup',
                [
                'assets/audio/healthPack.mp3',
                'assets/audio/healthPack.ogg'
                ]
            );
        
            //music
            this.game.load.audio('soundTrack01',
                [
                'assets/audio/ParvusDecree-SpaceTravel.mp3',
                'assets/audio/ParvusDecree-SpaceTravel.ogg'
                ]
            );
        
        
            //start load
            this.load.start();
            
    }
    
    update() {
        if(this.ready){
            //this.game.state.start('game');
            this.game.state.start('mainMenu');
        }
    }
    
    onLoadComplete() {
        this.ready = true;
        this.gameMusic = this.game.add.audio('soundTrack01');
        this.gameMusic.play('', 0, 0.2, 0.2, true); //plays forever
    }
}