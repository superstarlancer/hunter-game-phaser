var game;

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import MainMenu from "./states/MainMenu.js";

window.onload = function () {
    
    //loadwebfont configuration object
    this.WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function() { game.time.events.add(Phaser.Timer.SECOND, this.text, this); },
    
        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
          families: ['Revalia']
        }

    }; 
    
    game = new Phaser.Game(window.outerWidth - 100, window.outerHeight - 100, Phaser.WEBGL, 'game');
    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('mainMenu', MainMenu);
    game.state.add('game', Game);
    game.state.start('boot');
};
