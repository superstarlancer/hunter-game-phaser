/*global Phaser*/

export default class MainMenu extends Phaser.State {
    
    constructor() {
    //object level properties
    super();

  }
    
    
    create() {
        //add background
        this.mainMenu = this.game.add.tileSprite(0, 0, this.game.height * 4, this.game.width * 4, 'mainMenu');
        //this.mainMenu.height = this.game.height * 4;
        //this.mainMenu.width = this.game.width * 4;
        //start button
        this.startButton = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        //load ship
        this.bountyHunterShip = this.game.add.sprite(window.outerWidth / 2, window.outerHeight / 2, 'bountyHunterShip');
        this.bountyHunterShip.anchor.set(0.5, 0.5);
        this.bountyHunterShip.angle = -90;
        //title
        this.style = { font: "90px Arial", fill: "#ffffff", align: "center"};
        this.title = this.game.add.text(window.outerWidth / 2, 150, "Asteroid Hunter", this.style);
        this.title.anchor.set(0.5, 0.5);
        this.title.fixedToCamera = true;
        this.title.stroke = '#000000';
        this.title.strokeThickness = 6;
        
        //press enter
        this.style2 = { font: "45px Arial", fill: "#ffffff", align: "center"};
        this.pressEnter = this.game.add.text(window.outerWidth / 2, 850, "Press Enter", this.style2);
        this.pressEnter.anchor.set(0.5, 0.5);
        this.pressEnter.fixedToCamera = true;
        this.pressEnter.stroke = '#000000';
        this.pressEnter.strokeThickness = 6;
        
        //ship trails emitter
         //  Add an emitter for the ship's trail
    this.shipTrail = this.game.add.emitter(this.bountyHunterShip.x - 350, this.bountyHunterShip.y + 10, 400);
    this.shipTrail.width = 40;
    this.shipTrail.makeParticles('bullet');
    this.shipTrail.setXSpeed(-200, -180);
    this.shipTrail.setYSpeed(-10, -30);
    this.shipTrail.setRotation(50,0);
    this.shipTrail.setAlpha(1, 0.01, 800);
    this.shipTrail.setScale(5, 5, 3, 5, 2000, Phaser.Easing.Quintic.Out);
    this.shipTrail.gravity = 5;
    this.shipTrail.start(false, 5000, 10);
    
    this.shipTrail2 = this.game.add.emitter(this.bountyHunterShip.x - 325, this.bountyHunterShip.y + 65, 400);
    this.shipTrail2.width = 40;
    this.shipTrail2.makeParticles('bullet');
    this.shipTrail2.setXSpeed(-200, -180);
    this.shipTrail2.setYSpeed(-10, -30);
    this.shipTrail2.setRotation(50,0);
    this.shipTrail2.setAlpha(1, 0.01, 800);
    this.shipTrail2.setScale(5, 5, 3, 5, 2000, Phaser.Easing.Quintic.Out);
    this.shipTrail2.gravity = 5;
    this.shipTrail2.start(false, 5000, 10);
    
    this.shipTrail3 = this.game.add.emitter(this.bountyHunterShip.x - 325, this.bountyHunterShip.y + -55, 400);
    this.shipTrail3.width = 40;
    this.shipTrail3.makeParticles('bullet');
    this.shipTrail3.setXSpeed(-200, -180);
    this.shipTrail3.setYSpeed(-10, -30);
    this.shipTrail3.setRotation(50,0);
    this.shipTrail3.setAlpha(1, 0.01, 800);
    this.shipTrail3.setScale(5, 5, 3, 5, 2000, Phaser.Easing.Quintic.Out);
    this.shipTrail3.gravity = 5;
    this.shipTrail3.start(false, 5000, 10);
    }
    update() {
        this.mainMenu.tilePosition.x -= 20;
        
         if (this.startButton.isDown ) {
             this.game.state.start('game');
         }
    }
    render() {

    }
    

}