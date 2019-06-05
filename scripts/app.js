(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _statesBootJs = require("./states/Boot.js");

var _statesBootJs2 = _interopRequireDefault(_statesBootJs);

var _statesPreloadJs = require("./states/Preload.js");

var _statesPreloadJs2 = _interopRequireDefault(_statesPreloadJs);

var _statesGameJs = require("./states/Game.js");

var _statesGameJs2 = _interopRequireDefault(_statesGameJs);

var _statesMainMenuJs = require("./states/MainMenu.js");

var _statesMainMenuJs2 = _interopRequireDefault(_statesMainMenuJs);

var game;

window.onload = function () {

    //loadwebfont configuration object
    this.WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function active() {
            game.time.events.add(Phaser.Timer.SECOND, this.text, this);
        },

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
            families: ['Revalia']
        }

    };

    game = new Phaser.Game(window.outerWidth - 100, window.outerHeight - 100, Phaser.WEBGL, 'game');
    game.state.add('boot', _statesBootJs2["default"]);
    game.state.add('preload', _statesPreloadJs2["default"]);
    game.state.add('mainMenu', _statesMainMenuJs2["default"]);
    game.state.add('game', _statesGameJs2["default"]);
    game.state.start('boot');
};

},{"./states/Boot.js":12,"./states/Game.js":13,"./states/MainMenu.js":14,"./states/Preload.js":15}],2:[function(require,module,exports){
/* global Phaser */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlienMech = (function (_Phaser$Sprite) {
    _inherits(AlienMech, _Phaser$Sprite);

    function AlienMech(game, x, y) {
        _classCallCheck(this, AlienMech);

        _get(Object.getPrototypeOf(AlienMech.prototype), 'constructor', this).call(this, game, x, y, 'alienMech', 0);

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
        this.alienWeapon.onFire.add(function () {
            this.alienPlasma.play('', 0.6, 0.35);
        }, this);

        this.health = { current: 100, max: 100 };

        //this.animations.add("attack", [0,1]);
        //this.animations.play("attack", 1, true);
        //this.animations.currentAnim.speed = 3;  
    }

    _createClass(AlienMech, [{
        key: 'update',
        value: function update() {

            //remove alien weapon on death
            if (!this.isAlive && !this.runOnce) {
                this.alienWeapon = this.game.add.weapon(0, 'alienBullet');
                this.runOnce = true;
            }

            //revert alien tint to normal after getting hit
            if (this.game.time.now > this.timeCheckRevert) {
                this.tint = 0xffffff;
                this.timeCheckRevert = this.game.time.now + 200;
            }
        }
    }, {
        key: 'firePlasma',
        value: function firePlasma() {
            this.alienPlasma.play();
        }
    }]);

    return AlienMech;
})(Phaser.Sprite);

exports['default'] = AlienMech;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
/* global Phaser */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeadAlien = (function (_Phaser$Sprite) {
    _inherits(DeadAlien, _Phaser$Sprite);

    function DeadAlien(game, x, y) {
        _classCallCheck(this, DeadAlien);

        _get(Object.getPrototypeOf(DeadAlien.prototype), 'constructor', this).call(this, game, x, y, 'alienMechDead', 0);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.set(0.5);
        this.outOfBoundsKill = true;
        this.scale.setTo(1.15, 1.15);
    }

    _createClass(DeadAlien, [{
        key: 'update',
        value: function update() {
            //dead aiens animation
            this.body.velocity.x = -50;
            this.angle += 0.5;
        }
    }]);

    return DeadAlien;
})(Phaser.Sprite);

exports['default'] = DeadAlien;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
/* global Phaser */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeadOrc = (function (_Phaser$Sprite) {
    _inherits(DeadOrc, _Phaser$Sprite);

    function DeadOrc(game, x, y) {
        _classCallCheck(this, DeadOrc);

        _get(Object.getPrototypeOf(DeadOrc.prototype), 'constructor', this).call(this, game, x, y, 'orcConvictDead', 0);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.set(0.5);
        this.outOfBoundsKill = true;
        this.scale.setTo(1.25, 1.25);
    }

    _createClass(DeadOrc, [{
        key: 'update',
        value: function update() {
            //dead orcs animation
            this.body.velocity.x = -50;
            this.angle += 0.5;
        }
    }]);

    return DeadOrc;
})(Phaser.Sprite);

exports['default'] = DeadOrc;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
/*global Phaser*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HealthPack = (function (_Phaser$Sprite) {
    _inherits(HealthPack, _Phaser$Sprite);

    function HealthPack(game, x, y) {
        _classCallCheck(this, HealthPack);

        _get(Object.getPrototypeOf(HealthPack.prototype), 'constructor', this).call(this, game, x, y, 'healthPack', 0);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = false;
        this.anchor.set(0.5);

        this.outOfBoundsKill = true;

        this.healthRecovery = 100;
    }

    _createClass(HealthPack, [{
        key: 'update',
        value: function update() {

            this.body.velocity.x = -250;

            this.angle += 1;
        }
    }]);

    return HealthPack;
})(Phaser.Sprite);

exports['default'] = HealthPack;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
/*global Phaser*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Meteor = (function (_Phaser$Sprite) {
    _inherits(Meteor, _Phaser$Sprite);

    function Meteor(game, x, y) {
        _classCallCheck(this, Meteor);

        var randomSize = Math.random() * 2 + 1;

        _get(Object.getPrototypeOf(Meteor.prototype), 'constructor', this).call(this, game, x, y, 'meteor', 0);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = false;
        this.body.mass = 3;
        this.anchor.set(0.5);

        this.randomNumber = Math.random() * 40 + 15;
        this.speedRandom = this.randomNumber;

        if (this.randomNumber < 24) {
            this.speedRandom = 1500;
        }

        this.outOfBoundsKill = true;
        this.scale.setTo(randomSize, randomSize);

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;

        if (randomSize > 2) {
            this.rotationSpeed = 0.75;
        }
        if (randomSize <= 2) {
            this.rotationSpeed = -0.75;
        }
    }

    _createClass(Meteor, [{
        key: 'update',
        value: function update() {

            this.body.velocity.x = -this.speedRandom;
            this.body.velocity.y = 35;

            this.angle += this.rotationSpeed;
        }
    }]);

    return Meteor;
})(Phaser.Sprite);

exports['default'] = Meteor;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
/*global Phaser*/

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = (function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(game, x, y) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), "constructor", this).call(this, game, x, y, 'player', 0);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 400;
        this.body.drag.y = 400;
        this.body.mass = 6;
        this.body.collideWorldBounds = true;
        this.anchor.set(0.5);

        // initialize your prefab herea
        this.speed = { current: 300, max: 300 };

        this.health = { current: 300, max: 300 };

        this.cursors = this.game.input.keyboard.createCursorKeys();

        //animations
        this.animations.add("idle", [0, 1]);
        this.animations.play("idle", 1, true);
        this.animations.currentAnim.speed = 12;

        //add an emitter to the players trail
        this.playerTrail = game.add.emitter(this.world.x, this.world.y, 400);
        this.playerTrail.width = 15;
        this.playerTrail.makeParticles('bullet');
        this.playerTrail.setXSpeed(-200, -180);
        this.playerTrail.setYSpeed(160, 130);
        this.playerTrail.setRotation(90, 90);
        this.playerTrail.setAlpha(1, 0.01, 800);
        this.playerTrail.setScale(0.5, 0.4, 3, 0.4, 2000, Phaser.Easing.Quintic.Out);
        this.playerTrail.start(false, 5000, 1);
    }

    _createClass(Player, [{
        key: "update",
        value: function update() {
            //  Keep the shipTrail lined up with the ship
            this.playerTrail.x = this.world.x - 50;
            this.playerTrail.y = this.world.y + 15;

            // write your prefab's specific update code here
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -this.speed.current;
            }
            if (this.cursors.right.isDown) {
                this.body.velocity.x = this.speed.current;
            }
            if (this.cursors.up.isDown) {
                this.body.velocity.y = -this.speed.current;
            }
            if (this.cursors.down.isDown) {
                this.body.velocity.y = this.speed.current;
            }
            this.playerHealthPercent = this.health.current / this.health.max * 100;
        }
    }]);

    return Player;
})(Phaser.Sprite);

exports["default"] = Player;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
/*global Phaser*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerUI = (function (_Phaser$Sprite) {
    _inherits(PlayerUI, _Phaser$Sprite);

    function PlayerUI(game, x, y) {
        _classCallCheck(this, PlayerUI);

        _get(Object.getPrototypeOf(PlayerUI.prototype), 'constructor', this).call(this, game, x, y, 'playerUI', 0);
        this.anchor.set(0.5);

        //put in the actual health bar
        this.healthBar = this.game.add.sprite(0, -15, 'healthBar');
        //this.healthBar.anchor.setTo(0.5, 1);  
        this.healthBar.anchor.setTo(0.5, 0);
        //the healthbar scale needed for %
        this.healthBar.scale.y = 1;
        this.addChild(this.healthBar);
    }

    _createClass(PlayerUI, [{
        key: 'update',
        value: function update() {

            // write your prefab's specific update code here

        }
    }]);

    return PlayerUI;
})(Phaser.Sprite);

exports['default'] = PlayerUI;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
/* global Phaser */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlowCloud = (function (_Phaser$Sprite) {
  _inherits(SlowCloud, _Phaser$Sprite);

  function SlowCloud(game, x, y) {
    _classCallCheck(this, SlowCloud);

    _get(Object.getPrototypeOf(SlowCloud.prototype), 'constructor', this).call(this, game, x, y, 'slowCloud', 0);

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

  _createClass(SlowCloud, [{
    key: 'update',
    value: function update() {
      //make slowclouds move and when they reach the right edge kill them and spawn them on the other side of the map.
      this.body.velocity.x = -20;

      //horizontal check
      if (this.position.x <= -500) {
        this.position.x = this.game.world.width;
      } else if (this.position.x >= this.game.world.width) {
        this.position.x = 0;
      }
    }
  }]);

  return SlowCloud;
})(Phaser.Sprite);

exports['default'] = SlowCloud;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
/*global Phaser*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StimPack = (function (_Phaser$Sprite) {
    _inherits(StimPack, _Phaser$Sprite);

    function StimPack(game, x, y) {
        _classCallCheck(this, StimPack);

        _get(Object.getPrototypeOf(StimPack.prototype), 'constructor', this).call(this, game, x, y, 'stimPack', 0);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = false;
        this.anchor.set(0.5);

        this.outOfBoundsKill = true;

        this.speedBoost = 300;
        this.stimPackActive = false;
    }

    _createClass(StimPack, [{
        key: 'update',
        value: function update() {

            this.body.velocity.x = -250;

            this.angle += 1;
        }
    }]);

    return StimPack;
})(Phaser.Sprite);

exports['default'] = StimPack;
module.exports = exports['default'];

},{}],11:[function(require,module,exports){
/* global Phaser */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrcConvict = (function (_Phaser$Sprite) {
    _inherits(OrcConvict, _Phaser$Sprite);

    function OrcConvict(game, x, y) {
        _classCallCheck(this, OrcConvict);

        _get(Object.getPrototypeOf(OrcConvict.prototype), "constructor", this).call(this, game, x, y, 'orcConvict', 0);

        this.timeCheckRevert = this.game.time.now;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.set(0.5);
        this.outOfBoundsKill = true;

        // initialize your prefab herea
        this.speed = 50;
        this.scale.setTo(1, 1);
        this.body.mass = 3;

        this.health = { current: 50, max: 50 };

        this.animations.add("attack", [0, 1]);
        this.animations.play("attack", 1, true);
        this.animations.currentAnim.speed = 3;
    }

    _createClass(OrcConvict, [{
        key: "update",
        value: function update() {

            //revert orc tint to normal after getting hit
            if (this.game.time.now > this.timeCheckRevert) {
                this.tint = 0xffffff;
                this.timeCheckRevert = this.game.time.now + 200;
            }
        }
    }]);

    return OrcConvict;
})(Phaser.Sprite);

exports["default"] = OrcConvict;
module.exports = exports["default"];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Boot = (function () {
    function Boot() {
        _classCallCheck(this, Boot);
    }

    _createClass(Boot, [{
        key: 'preload',
        value: function preload() {
            this.load.image('preloader', 'assets/images/loading_bar.png');
        }
    }, {
        key: 'create',
        value: function create() {
            this.game.input.maxPointers = 1;
            this.game.state.start('preload');
        }
    }]);

    return Boot;
})();

exports['default'] = Boot;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
/*global Phaser*/

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsMeteorJs = require("../prefabs/Meteor.js");

var _prefabsMeteorJs2 = _interopRequireDefault(_prefabsMeteorJs);

var _prefabsOrcConvictJs = require("../prefabs/orcConvict.js");

var _prefabsOrcConvictJs2 = _interopRequireDefault(_prefabsOrcConvictJs);

var _prefabsSlowCloudJs = require("../prefabs/SlowCloud.js");

var _prefabsSlowCloudJs2 = _interopRequireDefault(_prefabsSlowCloudJs);

var _prefabsPlayerUIJs = require("../prefabs/PlayerUI.js");

var _prefabsPlayerUIJs2 = _interopRequireDefault(_prefabsPlayerUIJs);

var _prefabsHealthPackJs = require("../prefabs/HealthPack.js");

var _prefabsHealthPackJs2 = _interopRequireDefault(_prefabsHealthPackJs);

var _prefabsStimPackJs = require("../prefabs/StimPack.js");

var _prefabsStimPackJs2 = _interopRequireDefault(_prefabsStimPackJs);

var _prefabsAlienMechJs = require("../prefabs/AlienMech.js");

var _prefabsAlienMechJs2 = _interopRequireDefault(_prefabsAlienMechJs);

var _prefabsDeadOrcJs = require("../prefabs/DeadOrc.js");

var _prefabsDeadOrcJs2 = _interopRequireDefault(_prefabsDeadOrcJs);

var _prefabsDeadAlienJs = require("../prefabs/DeadAlien.js");

var _prefabsDeadAlienJs2 = _interopRequireDefault(_prefabsDeadAlienJs);

var Game = (function (_Phaser$State) {
    _inherits(Game, _Phaser$State);

    function Game() {
        _classCallCheck(this, Game);

        //object level properties
        _get(Object.getPrototypeOf(Game.prototype), "constructor", this).call(this);
    }

    _createClass(Game, [{
        key: "create",
        value: function create() {
            //don't overwrite any speed changes with stimpack active
            this.dontOverwritePlayerSpeed = false;
            this.removeStimpack = this.game.time.now;

            this.randomDisplayNumber = Math.random() * 40 + 15;

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
            this.bg.scale.setTo(2, 2);

            this.game.world.setBounds(0, 0, 5000, 5000);

            //add ship
            this.ship = this.game.add.sprite(400, 600, 'bountyHunterShip');
            this.game.physics.arcade.enable(this.ship);
            this.ship.enableBody = true;
            this.ship.anchor.set(0.5);
            this.ship.angle = -45;

            //add player
            this.player = new _prefabsPlayerJs2["default"](this.game, 400, 600);
            this.game.add.existing(this.player);
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
            //this.player.fixedToCamera = true;

            //add player UI
            //this.bountyHunterUI = this.game.add.sprite(200, 200, 'playerUI');
            this.playerUI = new _prefabsPlayerUIJs2["default"](this.game, -100, -60);
            this.player.addChild(this.playerUI);

            //add healthpacks
            //this.healthPack = new HealthPack(this.game, 600, 600);
            //this.game.add.existing(this.healthPack);
            this.healthPacks = this.add.group();

            //add stimpacks
            this.stimPack = new _prefabsStimPackJs2["default"](this.game, 800, 600);
            //this.game.add.existing(this.stimPack);
            this.stimPacks = this.add.group();

            //add meteors
            this.meteors = this.add.group();
            this.meteors.enableBody = true;
            this.meteors.physicsBodyType = Phaser.Physics.ARCADE;

            //add orcs
            this.orc = new _prefabsOrcConvictJs2["default"](this.game, 500, 500);
            //this.game.add.existing(this.orc);

            this.deadOrcs = this.add.group();
            this.deadAliens = this.add.group();

            //this.deadOrc = this.game.add.sprite(-500, 500, 'orcConvictDead');
            //this.game.physics.enable(this.deadOrc, Phaser.Physics.ARCADE);
            //this.deadOrc.enableBody = true;
            //this.deadOrc.outOfBoundsKill = true;

            //this.deadOrc = this.game.add.sprite(orc.world.x, orc.world.y, 'orcConvictDead');

            this.orcs = this.add.group();
            this.orcs.enableBody = true;
            this.orcs.physicsBodyType = Phaser.Physics.ARCADE;

            //add red aliens
            this.alienMech = new _prefabsAlienMechJs2["default"](this.game, 1000, 500);
            //this.game.add.existing(this.alienMech);

            this.mechAliens = this.add.group();
            this.mechAliens.enableBody = true;
            this.mechAliens.physicsBodyType = Phaser.Physics.ARCADE;

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

            this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

            this.style = { font: "24px Arial", fill: "#ffffff", align: "center", backgroundColor: "green" };

            this.text = this.game.add.text(window.outerWidth / 2, 100, " Enemies Killed: " + 0 + " ", this.style);
            this.text.fixedToCamera = true;
            this.text.stroke = '#000000';
            this.text.strokeThickness = 6;

            this.text.anchor.set(0.5);

            //spawn a number of slowClouds in the game world
            for (var i = 0; i < 5; i++) {
                this.slowCloud = new _prefabsSlowCloudJs2["default"](this.game, Math.random(this.world.width) * this.world.width, Math.random(this.world.height) * this.world.height);
                this.slowClouds.add(this.slowCloud);
            }

            //Create Sounds
            this.playerMachinegun = this.game.add.audio('playerMachinegun');
            this.orcDeath = this.game.add.audio('orcDeath');
            this.alienDeath = this.game.add.audio('alienDeath');
            this.stimPackPickup = this.game.add.audio('stimPackPickup');
            this.healthPackPickup = this.game.add.audio('healthPackPickup');
            this.playerHit = this.game.add.audio('playerHit');

            //Game over text
            this.gameOver = this.game.add.text(window.outerWidth / 2, window.outerHeight / 2, 'GAME OVER!', { font: '84px Arial', fill: '#fff' });
            this.gameOver.fixedToCamera = true;
            this.gameOver.anchor.setTo(0.5, 0.5);
            this.gameOver.visible = false;

            //this.gameMusic = this.game.add.audio('soundTrack01');
            //this.gameMusic.play('', 0, 0.2, 0.2, true); //plays forever
        }

        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------- UPDATE -------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------------------------------------------------

    }, {
        key: "update",
        value: function update() {

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
            if (this.game.time.now > this.timeCheckRevert) {
                this.player.tint = 0xffffff;
                if (!this.dontOverwritePlayerSpeed) {
                    this.player.speed.current = this.player.speed.max;
                }
                this.timeCheckRevert = this.game.time.now + 200;
            }
            if (this.dontOverwritePlayerSpeed) {
                //if stimpack is active keep player speed boost
                console.log("Stimpack Is Active");
                this.player.speed.current = 600;
                //change player tints from having stimpack active
                this.player.tint = 0xffff00;
                //if its been long enough since player picked up stimpack
                if (this.game.time.now > this.removeStimpack) {
                    this.player.speed.current = this.player.speed.max;
                    this.dontOverwritePlayerSpeed = false;
                }
            }

            //  Scroll the background
            //this.bg.tilePosition.y += 0.01;
            //this.bg.tilePosition.x += 0.01;

            // ----------------------------------------------------------------------------------------------------------------------------------------------------
            // ------------------------------------------------------ UPDATE SPAWNS -------------------------------------------------------------------------------
            // ----------------------------------------------------------------------------------------------------------------------------------------------------
            //SPAWN RANDOM METEORS
            if (Math.random() < this.spawnChance) {
                //spawn meteors to the right of player location
                var meteor = new _prefabsMeteorJs2["default"](this.game, this.player.world.x + 1800, Math.random() * this.player.world.y * 2);
                this.meteors.add(meteor);
            }

            //SPAWN RANDOM HEALTHPACKS
            if (Math.random() < this.spawnChance / 15) {
                //spawn meteors to the right of player location
                var healthPack = new _prefabsHealthPackJs2["default"](this.game, this.player.world.x + 1800, Math.random() * this.player.world.y * 2);
                this.healthPacks.add(healthPack);
            }
            //SPAWN RANDOM STIMPACKS
            if (Math.random() < this.spawnChance / 10) {
                //spawn meteors to the right of player location
                var stimPack = new _prefabsStimPackJs2["default"](this.game, this.player.world.x + 1800, Math.random() * this.player.world.y * 2);
                this.stimPacks.add(stimPack);
            }

            //SPAWN RANDOM ORCS
            if (Math.random() < this.spawnChance / 5) {
                this.orc = new _prefabsOrcConvictJs2["default"](this.game, this.player.world.x + 1800, Math.random() * this.player.world.y * 2);
                this.orcs.add(this.orc);
            }
            //SPAWN RANDOM ALIENS - old code: this.game, this.game.width + 100, Math.random() * this.game.height
            if (Math.random() < this.spawnChance / 8) {
                this.alienMech = new _prefabsAlienMechJs2["default"](this.game, this.player.world.x + 1800, Math.random() * this.player.world.y * 2);
                this.mechAliens.add(this.alienMech);
            }
            //fire player weapon
            if (this.fireButton.isDown || this.game.input.mousePointer.isDown) {

                if (this.game.time.now > this.timeCheckHit) {
                    this.weapon.fireAtPointer();
                    this.playerMachinegun.play('', 0.475, 0.5);

                    this.timeCheckHit = this.game.time.now + 50;
                }
            }

            //I players health reaches zero!
            if (this.player.health.current <= 0) {
                this.healthZero(this.player, this.weapon);
            }

            // ----------------------------------------------------------------------------------------------------------------------------------------------------
            // ------------------------------------------------------------- COLLISIONS ---------------------------------------------------------------------------
            // ----------------------------------------------------------------------------------------------------------------------------------------------------

            //bullet meteor collision
            this.game.physics.arcade.collide(this.weapon.bullets, this.meteors, this.hitEnemy, null, this);

            //player meteor collision
            this.game.physics.arcade.collide(this.player, this.meteors, this.hitPlayer, null, this);

            //bullet orc collision
            this.game.physics.arcade.collide(this.weapon.bullets, this.orcs, this.killOrc, null, this);
            //bullet alien collision
            this.game.physics.arcade.collide(this.weapon.bullets, this.mechAliens, this.killAlien, null, this);
            //orc player collision
            this.game.physics.arcade.collide(this.player, this.orcs, this.orcHitPlayer, null, this);
            //orc meteor collision
            this.game.physics.arcade.collide(this.meteors, this.orcs, this.meteorHitOrc, null, this);
            //alien meteor collision
            this.game.physics.arcade.collide(this.meteors, this.alienMech, this.meteorHitAlienMech, null, this);
            //player healthpack collision
            this.game.physics.arcade.collide(this.player, this.healthPacks, this.playerPicksUpHealthpack, null, this);
            //player stimpack collision
            this.game.physics.arcade.collide(this.player, this.stimPacks, this.playerPicksUpStimpack, null, this);
            //code below adds homing between orcs and the player
            //var angle = this.physics.arcade.angleBetween(this.orc, this.player);
            //this.orcAngle = angle * (180/Math.PI);
            //this.physics.arcade.velocityFromAngle(this.orcAngle, 250, this.orc.body.velocity);
            //UPDATED ORC HOMING CODE
            for (var i = 0; i < this.orcs.children.length; i++) {
                this.orc = this.orcs.children[i];
                this.game.physics.arcade.moveToObject(this.orc, this.player, 250);
            }
            //Alien homing and attack code
            for (var j = 0; j < this.mechAliens.children.length; j++) {
                this.alienMech = this.mechAliens.children[j];
                this.game.physics.arcade.moveToObject(this.alienMech, this.player, 150);

                //alienMechWeapon TEST CODE
                this.alienMech.alienWeapon.trackSprite(this.alienMech, -100, -10, true);
                this.alienMech.alienWeapon.fireAtSprite(this.player);

                //alien weapon code THIS NEEDS TO BE INSIDE THE ALIEN HOMING IN ORDER TO APPLY TO ALL BULLET PROJECTILES!
                for (var k = 0; k < this.alienMech.alienWeapon.bullets.children.length; k++) {
                    var alienBullet = this.alienMech.alienWeapon.bullets.children[k];
                    this.game.physics.arcade.collide(this.player, alienBullet, this.alienWeaponHitsPlayer, null, this);
                }
            }

            //player cloud collision
            this.game.physics.arcade.overlap(this.player, this.slowClouds, this.playerEntersSlow, null, this);
        }

        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------- RENDERS ------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
    }, {
        key: "render",
        value: function render() {

            this.weapon.debug();
            this.game.debug.text("Left Button: " + this.game.input.mousePointer.isDown, 12, 80);
            this.game.debug.text("Player Health: " + this.player.health.current, 12, 100);
            this.game.debug.text("Player health percent:" + Math.trunc(this.player.playerHealthPercent) + "%", 12, 120);
            this.game.debug.text("Player Location: " + Math.trunc(this.player.world.x) + " X , " + Math.trunc(this.player.world.y) + " Y", 12, 140);
            this.game.debug.text("World size: " + this.world.width + " X " + this.world.height + " Y", 12, 160);
            this.game.debug.text("Controls: ", 12, 280);
            this.game.debug.text("Keyboard arrows + mouse to aim and shoot. ", 12, 300);

            //this.game.debug.text("Orc Angle: " + this.orcAngle, 12, 120);
        }

        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------- CUSTOM FUNCTIONS ---------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------------------------------------------------------------

        //custom functions here
    }, {
        key: "hitEnemy",
        value: function hitEnemy(bullet, enemy) {

            //this.weapon.bullets.kill();
            //this.meteors.remove(this.meteors, true);
            bullet.kill();
            console.log("Hit");
        }
    }, {
        key: "hitPlayer",
        value: function hitPlayer(player, meteor) {

            if (this.game.time.now > this.timeCheckHit) {
                console.log("The player has collided with a meteor!");
                this.player.health.current -= 5;
                this.playerUI.healthBar.scale.y = this.player.playerHealthPercent / 100;
                this.player.tint = 0xff0000;

                //this event will only allow the hitPlayer function to run every 250ms
                this.timeCheckHit = this.game.time.now + 250;
                this.playerHit.play('', 0.2, 0.2);
            }
        }
    }, {
        key: "killOrc",
        value: function killOrc(bullet, orc) {
            bullet.kill();

            orc.health.current -= 5;
            orc.tint = 0xff0000;

            if (orc.health.current <= 0) {
                orc.kill();
                this.orcDeath.play('', 0.475, 0.5);
                orc.health.current = orc.health.max;
                this.enemiesKilled += 1;
                this.text.setText(" Enemies Killed: " + this.enemiesKilled + " ");
                //this.deadOrc = this.deadOrcs.create(orc.world.x, orc.world.y, 'orcConvictDead');
                var deadOrc = new _prefabsDeadOrcJs2["default"](this.game, orc.world.x, orc.world.y);
                this.deadOrcs.add(deadOrc);
                deadOrc.tint = 0x828282;
            }
            console.log("Bullet hits orc!");
        }
    }, {
        key: "killAlien",
        value: function killAlien(bullet, alien) {
            bullet.kill();

            alien.health.current -= 5;
            alien.tint = 0xff0000;

            if (alien.health.current <= 0) {
                alien.kill();
                this.alienDeath.play('', 0.475, 0.5);
                alien.health.current = alien.health.max;
                alien.isAlive = false;
                this.enemiesKilled += 1;
                this.text.setText(" Enemies Killed: " + this.enemiesKilled + " ");
                var deadAlien = new _prefabsDeadAlienJs2["default"](this.game, alien.world.x, alien.world.y);
                this.deadAliens.add(deadAlien);
                deadAlien.tint = 0x828282;
            }
        }
    }, {
        key: "orcHitPlayer",
        value: function orcHitPlayer(player, orc) {

            if (this.game.time.now > this.timeCheckHit) {
                console.log("Orc hit player!");
                this.player.health.current -= 5;
                this.playerUI.healthBar.scale.y = this.player.playerHealthPercent / 100;
                this.player.tint = 0xff0000;

                //this event will only allow the hitPlayer function to run every 250ms
                this.timeCheckHit = this.game.time.now + 250;
                this.playerHit.play('', 0.2, 0.2);
            }
        }
    }, {
        key: "meteorHitOrc",
        value: function meteorHitOrc(meteor, orc) {}
    }, {
        key: "meteorHitAlienMech",
        value: function meteorHitAlienMech(meteor, alien) {}
    }, {
        key: "playerPicksUpHealthpack",
        value: function playerPicksUpHealthpack(player, healthPack) {
            console.log("You picked up a health pack!");
            //heal when healthPack gets picked up
            if (player.health.current < player.health.max) {
                player.health.current += healthPack.healthRecovery;
                //if playerhealth is more than playerhealth max set health to playerhealth max
                if (player.health.current > player.health.max) {
                    player.health.current = player.health.max;
                }
            }
            healthPack.kill();
            this.healthPackPickup.play('', 0.1, 0.75);
        }
    }, {
        key: "playerPicksUpStimpack",
        value: function playerPicksUpStimpack(player, stimPack) {
            console.log("You picked up a stim pack!");
            this.stimPack.stimPackActive = true;
            this.dontOverwritePlayerSpeed = true;
            //time it takes for stimpack to be active in ms
            this.removeStimpack = this.game.time.now + 10000;
            stimPack.kill();
            this.stimPackPickup.play('', 0.1, 0.75);
        }
    }, {
        key: "playerEntersSlow",
        value: function playerEntersSlow(player, slowCloud) {
            if (!this.dontOverwritePlayerSpeed) {
                console.log("Player has entered the slow cloud!");
                player.speed.current = 150;
            }
        }
    }, {
        key: "healthZero",
        value: function healthZero(player, weapon) {
            console.log("THE PLAYER HAS DIED!");
            this.weapon.trackSprite(this.player, -95000000, 20, true);
            player.kill();
            this.gameOver.visible = true;
            //this.gameMusic.restart();

            //set the 5 second delay before game retart
            while (this.runTimerOnce === 0) {
                this.timeCheckHit = this.game.time.now + 5000;
                this.runTimerOnce += 1;
            }
            if (this.game.time.now > this.timeCheckHit) {
                this.camera.fade('#000000');
                this.camera.onFadeComplete.add(this.fadeComplete, this);
            }
        }
    }, {
        key: "alienWeaponHitsPlayer",
        value: function alienWeaponHitsPlayer(player, bullet) {

            bullet.kill();
            player.tint = 0xff0000;
            console.log("Alien weapon hit player.");
            player.health.current -= 10;
            this.playerUI.healthBar.scale.y = player.playerHealthPercent / 100;
            this.playerHit.play('', 0.2, 0.2);
        }
    }, {
        key: "fadeComplete",
        value: function fadeComplete() {
            this.game.state.restart();
            //this.gameMusic.restart();
        }
    }]);

    return Game;
})(Phaser.State);

exports["default"] = Game;
module.exports = exports["default"];

},{"../prefabs/AlienMech.js":2,"../prefabs/DeadAlien.js":3,"../prefabs/DeadOrc.js":4,"../prefabs/HealthPack.js":5,"../prefabs/Meteor.js":6,"../prefabs/Player.js":7,"../prefabs/PlayerUI.js":8,"../prefabs/SlowCloud.js":9,"../prefabs/StimPack.js":10,"../prefabs/orcConvict.js":11}],14:[function(require,module,exports){
/*global Phaser*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainMenu = (function (_Phaser$State) {
    _inherits(MainMenu, _Phaser$State);

    function MainMenu() {
        _classCallCheck(this, MainMenu);

        //object level properties
        _get(Object.getPrototypeOf(MainMenu.prototype), 'constructor', this).call(this);
    }

    _createClass(MainMenu, [{
        key: 'create',
        value: function create() {
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
            this.style = { font: "90px Arial", fill: "#ffffff", align: "center" };
            this.title = this.game.add.text(window.outerWidth / 2, 150, "Asteroid Hunter", this.style);
            this.title.anchor.set(0.5, 0.5);
            this.title.fixedToCamera = true;
            this.title.stroke = '#000000';
            this.title.strokeThickness = 6;

            //press enter
            this.style2 = { font: "45px Arial", fill: "#ffffff", align: "center" };
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
            this.shipTrail.setRotation(50, 0);
            this.shipTrail.setAlpha(1, 0.01, 800);
            this.shipTrail.setScale(5, 5, 3, 5, 2000, Phaser.Easing.Quintic.Out);
            this.shipTrail.gravity = 5;
            this.shipTrail.start(false, 5000, 10);

            this.shipTrail2 = this.game.add.emitter(this.bountyHunterShip.x - 325, this.bountyHunterShip.y + 65, 400);
            this.shipTrail2.width = 40;
            this.shipTrail2.makeParticles('bullet');
            this.shipTrail2.setXSpeed(-200, -180);
            this.shipTrail2.setYSpeed(-10, -30);
            this.shipTrail2.setRotation(50, 0);
            this.shipTrail2.setAlpha(1, 0.01, 800);
            this.shipTrail2.setScale(5, 5, 3, 5, 2000, Phaser.Easing.Quintic.Out);
            this.shipTrail2.gravity = 5;
            this.shipTrail2.start(false, 5000, 10);

            this.shipTrail3 = this.game.add.emitter(this.bountyHunterShip.x - 325, this.bountyHunterShip.y + -55, 400);
            this.shipTrail3.width = 40;
            this.shipTrail3.makeParticles('bullet');
            this.shipTrail3.setXSpeed(-200, -180);
            this.shipTrail3.setYSpeed(-10, -30);
            this.shipTrail3.setRotation(50, 0);
            this.shipTrail3.setAlpha(1, 0.01, 800);
            this.shipTrail3.setScale(5, 5, 3, 5, 2000, Phaser.Easing.Quintic.Out);
            this.shipTrail3.gravity = 5;
            this.shipTrail3.start(false, 5000, 10);
        }
    }, {
        key: 'update',
        value: function update() {
            this.mainMenu.tilePosition.x -= 20;

            if (this.startButton.isDown) {
                this.game.state.start('game');
            }
        }
    }, {
        key: 'render',
        value: function render() {}
    }]);

    return MainMenu;
})(Phaser.State);

exports['default'] = MainMenu;
module.exports = exports['default'];

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Preload = (function () {
    function Preload() {
        _classCallCheck(this, Preload);

        this.asset = null;
        this.ready = false;
    }

    _createClass(Preload, [{
        key: 'preload',
        value: function preload() {
            this.load.image('loading_bg', 'assets/images/loading_bg.png');

            //  Load the Google WebFont Loader script
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        }
    }, {
        key: 'create',
        value: function create() {

            //background for game
            this.background = this.add.sprite(0, 0, 'loading_bg');
            this.background.height = this.game.height;
            this.background.width = this.game.width;

            this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');

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
            this.game.load.image('stimPack', 'assets/images/stimPack.png');

            //SOUNDS
            //weapon sounds
            this.game.load.audio('playerMachinegun', ['assets/audio/playerMachinegun.mp3', 'assets/audio/playerMachinegun.ogg']);
            this.game.load.audio('alienPlasma', ['assets/audio/alienPlasma.mp3', 'assets/audio/alienPlasma.ogg']);
            //death sounds
            this.game.load.audio('orcDeath', ['assets/audio/orcDeath.mp3', 'assets/audio/orcDeath.ogg']);
            this.game.load.audio('alienDeath', ['assets/audio/alienMechDeath.mp3', 'assets/audio/alienMechDeath.ogg']);
            this.game.load.audio('playerHit', ['assets/audio/playerHit.mp3', 'assets/audio/playerHit.ogg']);
            //item Pickups
            this.game.load.audio('stimPackPickup', ['assets/audio/stimPack.mp3', 'assets/audio/stimPack.ogg']);
            this.game.load.audio('healthPackPickup', ['assets/audio/healthPack.mp3', 'assets/audio/healthPack.ogg']);

            //music
            this.game.load.audio('soundTrack01', ['assets/audio/ParvusDecree-SpaceTravel.mp3', 'assets/audio/ParvusDecree-SpaceTravel.ogg']);

            //start load
            this.load.start();
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.ready) {
                //this.game.state.start('game');
                this.game.state.start('mainMenu');
            }
        }
    }, {
        key: 'onLoadComplete',
        value: function onLoadComplete() {
            this.ready = true;
            this.gameMusic = this.game.add.audio('soundTrack01');
            this.gameMusic.play('', 0, 0.2, 0.2, true); //plays forever
        }
    }]);

    return Preload;
})();

exports['default'] = Preload;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL2FzdGVyb2lkSHVudGVyLWJlZ2lubmluZy9zcmMvYXBwLmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hc3Rlcm9pZEh1bnRlci1iZWdpbm5pbmcvc3JjL3ByZWZhYnMvQWxpZW5NZWNoLmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hc3Rlcm9pZEh1bnRlci1iZWdpbm5pbmcvc3JjL3ByZWZhYnMvRGVhZEFsaWVuLmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hc3Rlcm9pZEh1bnRlci1iZWdpbm5pbmcvc3JjL3ByZWZhYnMvRGVhZE9yYy5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvYXN0ZXJvaWRIdW50ZXItYmVnaW5uaW5nL3NyYy9wcmVmYWJzL0hlYWx0aFBhY2suanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL2FzdGVyb2lkSHVudGVyLWJlZ2lubmluZy9zcmMvcHJlZmFicy9NZXRlb3IuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL2FzdGVyb2lkSHVudGVyLWJlZ2lubmluZy9zcmMvcHJlZmFicy9QbGF5ZXIuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL2FzdGVyb2lkSHVudGVyLWJlZ2lubmluZy9zcmMvcHJlZmFicy9QbGF5ZXJVSS5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvYXN0ZXJvaWRIdW50ZXItYmVnaW5uaW5nL3NyYy9wcmVmYWJzL1Nsb3dDbG91ZC5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvYXN0ZXJvaWRIdW50ZXItYmVnaW5uaW5nL3NyYy9wcmVmYWJzL1N0aW1QYWNrLmpzIiwiL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hc3Rlcm9pZEh1bnRlci1iZWdpbm5pbmcvc3JjL3ByZWZhYnMvb3JjQ29udmljdC5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvYXN0ZXJvaWRIdW50ZXItYmVnaW5uaW5nL3NyYy9zdGF0ZXMvQm9vdC5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvYXN0ZXJvaWRIdW50ZXItYmVnaW5uaW5nL3NyYy9zdGF0ZXMvR2FtZS5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvYXN0ZXJvaWRIdW50ZXItYmVnaW5uaW5nL3NyYy9zdGF0ZXMvTWFpbk1lbnUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL2FzdGVyb2lkSHVudGVyLWJlZ2lubmluZy9zcmMvc3RhdGVzL1ByZWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzRCQ0VpQixrQkFBa0I7Ozs7K0JBQ2YscUJBQXFCOzs7OzRCQUN4QixrQkFBa0I7Ozs7Z0NBQ2Qsc0JBQXNCOzs7O0FBTDNDLElBQUksSUFBSSxDQUFDOztBQU9ULE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWTs7O0FBR3hCLFFBQUksQ0FBQyxhQUFhLEdBQUc7Ozs7O0FBS2pCLGNBQU0sRUFBRSxrQkFBVztBQUFFLGdCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUFFOzs7QUFHbEYsY0FBTSxFQUFFO0FBQ04sb0JBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUN0Qjs7S0FFSixDQUFDOztBQUVGLFFBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoRyxRQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLDRCQUFPLENBQUM7QUFDN0IsUUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUywrQkFBVSxDQUFDO0FBQ25DLFFBQUksQ0FBQyxLQUFLLENB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QUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLFlBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7OztBQUd2QyxZQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ3pFLFlBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUN6QixZQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxZQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLFlBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNyQyxZQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEMsWUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxZQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdFLFlBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFFLENBQUM7S0FF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QUcsQ0FBQyxDQUFDO0FBQzFHLGdCQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDM0IsZ0JBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLGdCQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLGdCQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLGdCQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkMsZ0JBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEUsZ0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUM1QixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFdkMsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0csZ0JBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUMzQixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFB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NUIsQ0FDSixDQUFDOzs7QUFHRixnQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFDL0IsQ0FDQSwyQ0FBMkMsRUFDM0MsMkNBQTJDLENBQzFDLENBQ0osQ0FBQzs7O0FBSUYsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FFekI7OztlQUVLLGtCQUFHO0FBQ0wsZ0JBQUcsSUFBSSxDQUFDLEtBQUssRUFBQzs7QUFFVixvQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7OztlQUVhLDBCQUFHO0FBQ2IsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLGdCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNyRCxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlDOzs7V0EzSWdCLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBnYW1lO1xuXG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZXMvQm9vdC5qc1wiO1xuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGVzL1ByZWxvYWQuanNcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL3N0YXRlcy9HYW1lLmpzXCI7XG5pbXBvcnQgTWFpbk1lbnUgZnJvbSBcIi4vc3RhdGVzL01haW5NZW51LmpzXCI7XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgXG4gICAgLy9sb2Fkd2ViZm9udCBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgIHRoaXMuV2ViRm9udENvbmZpZyA9IHtcblxuICAgICAgICAvLyAgJ2FjdGl2ZScgbWVhbnMgYWxsIHJlcXVlc3RlZCBmb250cyBoYXZlIGZpbmlzaGVkIGxvYWRpbmdcbiAgICAgICAgLy8gIFdlIHNldCBhIDEgc2Vjb25kIGRlbGF5IGJlZm9yZSBjYWxsaW5nICdjcmVhdGVUZXh0Jy5cbiAgICAgICAgLy8gIEZvciBzb21lIHJlYXNvbiBpZiB3ZSBkb24ndCB0aGUgYnJvd3NlciBjYW5ub3QgcmVuZGVyIHRoZSB0ZXh0IHRoZSBmaXJzdCB0aW1lIGl0J3MgY3JlYXRlZC5cbiAgICAgICAgYWN0aXZlOiBmdW5jdGlvbigpIHsgZ2FtZS50aW1lLmV2ZW50cy5hZGQoUGhhc2VyLlRpbWVyLlNFQ09ORCwgdGhpcy50ZXh0LCB0aGlzKTsgfSxcbiAgICBcbiAgICAgICAgLy8gIFRoZSBHb29nbGUgRm9udHMgd2Ugd2FudCB0byBsb2FkIChzcGVjaWZ5IGFzIG1hbnkgYXMgeW91IGxpa2UgaW4gdGhlIGFycmF5KVxuICAgICAgICBnb29nbGU6IHtcbiAgICAgICAgICBmYW1pbGllczogWydSZXZhbGlhJ11cbiAgICAgICAgfVxuXG4gICAgfTsgXG4gICAgXG4gICAgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSh3aW5kb3cub3V0ZXJXaWR0aCAtIDEwMCwgd2luZG93Lm91dGVySGVpZ2h0IC0gMTAwLCBQaGFzZXIuV0VCR0wsICdnYW1lJyk7XG4gICAgZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcbiAgICBnYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIFByZWxvYWQpO1xuICAgIGdhbWUuc3RhdGUuYWRkKCdtYWluTWVudScsIE1haW5NZW51KTtcbiAgICBnYW1lLnN0YXRlLmFkZCgnZ2FtZScsIEdhbWUpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcbn07XG4iLCIvKiBnbG9iYWwgUGhhc2VyICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsaWVuTWVjaCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHkpIHtcbiAgICBcbiAgICAgIHN1cGVyKGdhbWUsIHgsIHksICdhbGllbk1lY2gnLCAwKTtcbiAgICAgIFxuICAgICAgdGhpcy5ydW5PbmNlID0gZmFsc2U7XG4gICAgICBcbiAgICAgIHRoaXMudGltZUNoZWNrUmV2ZXJ0ID0gdGhpcy5nYW1lLnRpbWUubm93O1xuICAgICAgXG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblx0ICB0aGlzLmFuY2hvci5zZXQoMC41KTtcblx0ICB0aGlzLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XG5cblx0ICAvLyBpbml0aWFsaXplIHlvdXIgcHJlZmFiIGhlcmVhXG5cdCAgdGhpcy5zcGVlZCA9IDI1O1xuXHQgIHRoaXMuc2NhbGUuc2V0VG8oMSwgMSk7XG5cdCAgdGhpcy5ib2R5Lm1hc3MgPSAzO1xuXHQgIHRoaXMuaXNBbGl2ZSA9IHRydWU7XG5cdCAgdGhpcy5hbGllblBsYXNtYSA9IHRoaXMuZ2FtZS5hZGQuYXVkaW8oJ2FsaWVuUGxhc21hJyk7XG5cdCAgICAgICAgICAvL2NyZWF0ZSBhbGllbk1lY2ggd2VhcG9uXG4gICAgICAgIHRoaXMuYWxpZW5XZWFwb24gPSB0aGlzLmdhbWUuYWRkLndlYXBvbig1LCAnYWxpZW5CdWxsZXQnKTtcbiAgICAgICAgdGhpcy5hbGllbldlYXBvbi5idWxsZXRzLmFuY2hvciA9IDAuNTtcbiAgICAgICAgdGhpcy5hbGllbldlYXBvbi5idWxsZXRBbmdsZU9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuYWxpZW5XZWFwb24uYnVsbGV0QW5nbGVWYXJpYW5jZSA9IDU7XG4gICAgICAgIHRoaXMuYWxpZW5XZWFwb24uYnVsbGV0U3BlZWQgPSAzNTA7XG4gICAgICAgIHRoaXMuYWxpZW5XZWFwb24uZmlyZVJhdGUgPSAxMDtcbiAgICAgICAgdGhpcy5hbGllbldlYXBvbi5vbkZpcmVMaW1pdCA9IDEwO1xuICAgICAgICB0aGlzLmFsaWVuV2VhcG9uLmJ1bGxldEluaGVyaXRTcHJpdGVTcGVlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYWxpZW5XZWFwb24uYnVsbGV0S2lsbFR5cGUgPSBQaGFzZXIuV2VhcG9uLktJTExfRElTVEFOQ0U7XG4gICAgICAgIHRoaXMuYWxpZW5XZWFwb24uYnVsbGV0S2lsbERpc3RhbmNlID0gMTUwMDsgICAgXG4gICAgICAgIHRoaXMuYWxpZW5XZWFwb24uYnVsbGV0U3BlZWRWYXJpYW5jZSA9IDUwO1xuICAgICAgICAvL3RoaXMuYWxpZW5XZWFwb24uZmlyZSA9IHRoaXMuYWxpZW5QbGFzbWEucGxheSgpO1xuICAgICAgICAvL3RoaXMuYWxpZW5XZWFwb24uYXV0b2ZpcmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmFsaWVuV2VhcG9uLm9uRmlyZS5hZGQoZnVuY3Rpb24oKSB7dGhpcy5hbGllblBsYXNtYS5wbGF5KCcnLCAwLjYsIDAuMzUpfSx0aGlzKTtcblxuXHQgIHRoaXMuaGVhbHRoID0geyBjdXJyZW50OiAxMDAsIG1heDogMTAwIH07XG4gICAgICAgIFxuICAgICAgLy90aGlzLmFuaW1hdGlvbnMuYWRkKFwiYXR0YWNrXCIsIFswLDFdKTtcblx0ICAvL3RoaXMuYW5pbWF0aW9ucy5wbGF5KFwiYXR0YWNrXCIsIDEsIHRydWUpO1xuXHQgIC8vdGhpcy5hbmltYXRpb25zLmN1cnJlbnRBbmltLnNwZWVkID0gMzsgICAgXG4gICAgICAgIFxuICAgICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCl7XG4gICAgICAgIFxuICAgICAgICAvL3JlbW92ZSBhbGllbiB3ZWFwb24gb24gZGVhdGhcbiAgICAgICAgaWYoIXRoaXMuaXNBbGl2ZSAmJiAhdGhpcy5ydW5PbmNlKXtcbiAgICAgICAgICAgIHRoaXMuYWxpZW5XZWFwb24gPSB0aGlzLmdhbWUuYWRkLndlYXBvbigwLCAnYWxpZW5CdWxsZXQnKTtcbiAgICAgICAgICAgIHRoaXMucnVuT25jZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgICAgIC8vcmV2ZXJ0IGFsaWVuIHRpbnQgdG8gbm9ybWFsIGFmdGVyIGdldHRpbmcgaGl0XG4gICAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMudGltZUNoZWNrUmV2ZXJ0KXtcbiAgICAgICAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmO1xuICAgICAgICAgICAgdGhpcy50aW1lQ2hlY2tSZXZlcnQgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAyMDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIGZpcmVQbGFzbWEoKXtcbiAgICAgICAgdGhpcy5hbGllblBsYXNtYS5wbGF5KCk7XG4gICAgfVxuIFxuICAgIFxufSIsIi8qIGdsb2JhbCBQaGFzZXIgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVhZEFsaWVuIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSkge1xuICAgIFxuICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgJ2FsaWVuTWVjaERlYWQnLCAwKTtcbiAgICAgIFxuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cdCAgdGhpcy5hbmNob3Iuc2V0KDAuNSk7XG5cdCAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuXHQgIHRoaXMuc2NhbGUuc2V0VG8oMS4xNSwgMS4xNSk7XG4gICAgICAgIFxuICAgICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCl7XG4gICAgICAgICAvL2RlYWQgYWllbnMgYW5pbWF0aW9uXG4gICAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLTUwO1xuICAgICAgICB0aGlzLmFuZ2xlICs9IDAuNTsgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICAgICAgXG5cbiBcbiAgICBcbn0iLCIvKiBnbG9iYWwgUGhhc2VyICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlYWRPcmMgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7XG4gICAgXG4gICAgICBzdXBlcihnYW1lLCB4LCB5LCAnb3JjQ29udmljdERlYWQnLCAwKTtcbiAgICAgIFxuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cdCAgdGhpcy5hbmNob3Iuc2V0KDAuNSk7XG5cdCAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuXHQgIHRoaXMuc2NhbGUuc2V0VG8oMS4yNSwgMS4yNSk7XG4gICAgICAgIFxuICAgICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCl7XG4gICAgICAgICAvL2RlYWQgb3JjcyBhbmltYXRpb25cbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtNTA7XG4gICAgICAgIHRoaXMuYW5nbGUgKz0gMC41OyAgICBcbiAgICAgICAgXG4gICAgfVxuICAgICAgICBcblxuIFxuICAgIFxufSIsIi8qZ2xvYmFsIFBoYXNlciovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWx0aFBhY2sgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgc3VwZXIoZ2FtZSwgeCwgeSwgJ2hlYWx0aFBhY2snLCAwKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5oZWFsdGhSZWNvdmVyeSA9IDEwMDtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0yNTA7XG4gXG4gICAgICAgIHRoaXMuYW5nbGUgKz0gMTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICBcbiBcbiAgICBcbn1cblxuXG5cbiIsIi8qZ2xvYmFsIFBoYXNlciovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldGVvciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHkpIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB2YXIgcmFuZG9tU2l6ZSA9ICgoTWF0aC5yYW5kb20oKSAqIDIpICsgMSk7XG4gICAgICAgIFxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCAnbWV0ZW9yJywgMCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICAgICAgdGhpcy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvZHkubWFzcyA9IDM7XG4gICAgICAgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yYW5kb21OdW1iZXIgPSAoKE1hdGgucmFuZG9tKCkgKiA0MCkgKyAxNSk7XG4gICAgICAgIHRoaXMuc3BlZWRSYW5kb20gPSB0aGlzLnJhbmRvbU51bWJlcjtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMucmFuZG9tTnVtYmVyIDwgMjQgKXtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRSYW5kb20gPSAxNTAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NhbGUuc2V0VG8ocmFuZG9tU2l6ZSwgcmFuZG9tU2l6ZSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgICB0aGlzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbiAgICAgICAgXG4gICAgICAgIGlmKHJhbmRvbVNpemUgPiAyKXtcbiAgICAgICAgICAgIHRoaXMucm90YXRpb25TcGVlZCA9IDAuNzU7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKHJhbmRvbVNpemUgPD0gMikge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvblNwZWVkID0gLTAuNzU7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy5zcGVlZFJhbmRvbTtcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAzNTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYW5nbGUgKz0gdGhpcy5yb3RhdGlvblNwZWVkO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuICAgIFxuIFxuICAgIFxufVxuXG5cblxuIiwiLypnbG9iYWwgUGhhc2VyKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7ICBcbiAgICAgICAgXG5cblx0ICBzdXBlcihnYW1lLCB4LCB5LCAncGxheWVyJywgMCk7XG5cblx0ICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblx0ICB0aGlzLmJvZHkuZHJhZy54ID0gNDAwO1xuXHQgIHRoaXMuYm9keS5kcmFnLnkgPSA0MDA7XG5cdCAgdGhpcy5ib2R5Lm1hc3MgPSA2O1xuXHQgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuXHQgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xuXG5cdCAgLy8gaW5pdGlhbGl6ZSB5b3VyIHByZWZhYiBoZXJlYVxuXHQgIHRoaXMuc3BlZWQgPSB7IGN1cnJlbnQ6IDMwMCwgbWF4OiAzMDAgfTtcblxuXHQgIHRoaXMuaGVhbHRoID0geyBjdXJyZW50OiAzMDAsIG1heDogMzAwIH07XG5cdCAgXG5cdCAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcblx0ICBcblx0ICAvL2FuaW1hdGlvbnNcblx0ICB0aGlzLmFuaW1hdGlvbnMuYWRkKFwiaWRsZVwiLCBbMCwxXSk7XG5cdCAgdGhpcy5hbmltYXRpb25zLnBsYXkoXCJpZGxlXCIsIDEsIHRydWUpO1xuXHQgIHRoaXMuYW5pbWF0aW9ucy5jdXJyZW50QW5pbS5zcGVlZCA9IDEyO1xuXHQgIFxuXHQgIC8vYWRkIGFuIGVtaXR0ZXIgdG8gdGhlIHBsYXllcnMgdHJhaWxcblx0ICB0aGlzLnBsYXllclRyYWlsID0gZ2FtZS5hZGQuZW1pdHRlcigodGhpcy53b3JsZC54KSwgKHRoaXMud29ybGQueSksIDQwMCk7XG5cdCAgdGhpcy5wbGF5ZXJUcmFpbC53aWR0aCA9IDE1O1xuICAgICAgdGhpcy5wbGF5ZXJUcmFpbC5tYWtlUGFydGljbGVzKCdidWxsZXQnKTtcbiAgICAgIHRoaXMucGxheWVyVHJhaWwuc2V0WFNwZWVkKC0yMDAsIC0xODApO1xuICAgICAgdGhpcy5wbGF5ZXJUcmFpbC5zZXRZU3BlZWQoMTYwLCAxMzApO1xuICAgICAgdGhpcy5wbGF5ZXJUcmFpbC5zZXRSb3RhdGlvbig5MCw5MCk7XG4gICAgICB0aGlzLnBsYXllclRyYWlsLnNldEFscGhhKDEsIDAuMDEsIDgwMCk7XG4gICAgICB0aGlzLnBsYXllclRyYWlsLnNldFNjYWxlKDAuNSwgMC40LCAzLCAwLjQsIDIwMDAsIFBoYXNlci5FYXNpbmcuUXVpbnRpYy5PdXQpO1xuICAgICAgdGhpcy5wbGF5ZXJUcmFpbC5zdGFydChmYWxzZSwgNTAwMCwgMVx0KTtcbiAgICAgXG5cdH1cbiAgICBcbiAgICB1cGRhdGUoKSB7XG4gICAgICAgICBcdC8vICBLZWVwIHRoZSBzaGlwVHJhaWwgbGluZWQgdXAgd2l0aCB0aGUgc2hpcFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJUcmFpbC54ID0gdGhpcy53b3JsZC54IC0gNTA7XG4gICAgICAgICAgICB0aGlzLnBsYXllclRyYWlsLnkgPSB0aGlzLndvcmxkLnkgKyAxNTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyB3cml0ZSB5b3VyIHByZWZhYidzIHNwZWNpZmljIHVwZGF0ZSBjb2RlIGhlcmVcbiAgICBcdFx0aWYodGhpcy5jdXJzb3JzLmxlZnQuaXNEb3duKSB7XG4gICAgXHRcdFx0dGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtdGhpcy5zcGVlZC5jdXJyZW50O1xuICAgIFx0XHR9XG4gICAgXHRcdGlmKHRoaXMuY3Vyc29ycy5yaWdodC5pc0Rvd24pIHtcbiAgICBcdFx0XHR0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMuc3BlZWQuY3VycmVudDtcbiAgICBcdFx0fVxuICAgIFx0XHRpZih0aGlzLmN1cnNvcnMudXAuaXNEb3duKSB7XG4gICAgXHRcdFx0dGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtdGhpcy5zcGVlZC5jdXJyZW50O1xuICAgIFx0XHR9XG4gICAgXHRcdGlmKHRoaXMuY3Vyc29ycy5kb3duLmlzRG93bikge1xuICAgIFx0XHRcdHRoaXMuYm9keS52ZWxvY2l0eS55ID0gdGhpcy5zcGVlZC5jdXJyZW50O1xuICAgIFx0XHR9XG4gICAgXHRcdHRoaXMucGxheWVySGVhbHRoUGVyY2VudCA9ICh0aGlzLmhlYWx0aC5jdXJyZW50IC8gdGhpcy5oZWFsdGgubWF4KSAqIDEwMDtcbiAgICAgICAgfVxuXG59IiwiLypnbG9iYWwgUGhhc2VyKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyVUkgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHkpIHsgIFxuICAgICAgICBcblxuXHQgIHN1cGVyKGdhbWUsIHgsIHksICdwbGF5ZXJVSScsIDApO1xuXHQgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xuXG4gICAgICAvL3B1dCBpbiB0aGUgYWN0dWFsIGhlYWx0aCBiYXJcbiAgICAgIHRoaXMuaGVhbHRoQmFyID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwtMTUsICdoZWFsdGhCYXInKTtcbiAgICAgIC8vdGhpcy5oZWFsdGhCYXIuYW5jaG9yLnNldFRvKDAuNSwgMSk7ICAgXG4gICAgICB0aGlzLmhlYWx0aEJhci5hbmNob3Iuc2V0VG8oMC41LCAwKTtcbiAgICAgIC8vdGhlIGhlYWx0aGJhciBzY2FsZSBuZWVkZWQgZm9yICVcbiAgICAgIHRoaXMuaGVhbHRoQmFyLnNjYWxlLnkgPSAxOyBcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5oZWFsdGhCYXIpO1xuXHQgIFxuXHR9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIHdyaXRlIHlvdXIgcHJlZmFiJ3Mgc3BlY2lmaWMgdXBkYXRlIGNvZGUgaGVyZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIFxuXG59IiwiLyogZ2xvYmFsIFBoYXNlciAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbG93Q2xvdWQgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7XG4gICAgXG4gICAgICBzdXBlcihnYW1lLCB4LCB5LCAnc2xvd0Nsb3VkJywgMCk7XG4gICAgICBcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgICAgdGhpcy5ib2R5Lm1vdmVzID0gdHJ1ZTtcbiAgICAgIHRoaXMuYm9keS53aWR0aCA9IDA7XG4gICAgICB0aGlzLmJvZHkuaGVpZ2h0ID0gMDtcblx0ICAgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xuXHQgICAgdGhpcy5hbHBoYSA9IDAuNTtcblx0ICAvL3RoaXMub3V0T2ZCb3VuZHNLaWxsID0gdHJ1ZTtcblxuXHQgIC8vIGluaXRpYWxpemUgeW91ciBwcmVmYWIgaGVyZVxuXHQgIHRoaXMuc2NhbGUuc2V0VG8oMywgMyk7XG4gICAgICAgIFxuICAgICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCl7XG4gICAgICAvL21ha2Ugc2xvd2Nsb3VkcyBtb3ZlIGFuZCB3aGVuIHRoZXkgcmVhY2ggdGhlIHJpZ2h0IGVkZ2Uga2lsbCB0aGVtIGFuZCBzcGF3biB0aGVtIG9uIHRoZSBvdGhlciBzaWRlIG9mIHRoZSBtYXAuXG4gICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0yMDsgICBcbiAgICAgICAgICAgIFxuICAgICAgLy9ob3Jpem9udGFsIGNoZWNrXG4gICAgICBpZih0aGlzLnBvc2l0aW9uLnggPD0gLTUwMCl7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IHRoaXMuZ2FtZS53b3JsZC53aWR0aDtcbiAgICAgIH0gZWxzZSBpZih0aGlzLnBvc2l0aW9uLnggPj0gdGhpcy5nYW1lLndvcmxkLndpZHRoKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDA7XG4gICAgICB9XG4gICAgICAgIFxuICAgIH1cbiBcbiAgICBcbiBcbiBcbiBcbiAgICBcbn0iLCIvKmdsb2JhbCBQaGFzZXIqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGltUGFjayBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHkpIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBzdXBlcihnYW1lLCB4LCB5LCAnc3RpbVBhY2snLCAwKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgICAgICB0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zcGVlZEJvb3N0ID0gMzAwO1xuICAgICAgICB0aGlzLnN0aW1QYWNrQWN0aXZlID0gZmFsc2U7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAtMjUwO1xuIFxuICAgICAgICB0aGlzLmFuZ2xlICs9IDE7XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gICAgXG4gXG4gICAgXG59XG5cblxuXG4iLCIvKiBnbG9iYWwgUGhhc2VyICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yY0NvbnZpY3QgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7XG4gICAgXG4gICAgICBzdXBlcihnYW1lLCB4LCB5LCAnb3JjQ29udmljdCcsIDApO1xuICAgICAgXG4gICAgICB0aGlzLnRpbWVDaGVja1JldmVydCA9IHRoaXMuZ2FtZS50aW1lLm5vdztcbiAgICAgIFxuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cdCAgdGhpcy5hbmNob3Iuc2V0KDAuNSk7XG5cdCAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuXG5cdCAgLy8gaW5pdGlhbGl6ZSB5b3VyIHByZWZhYiBoZXJlYVxuXHQgIHRoaXMuc3BlZWQgPSA1MDtcblx0ICB0aGlzLnNjYWxlLnNldFRvKDEsIDEpO1xuXHQgIHRoaXMuYm9keS5tYXNzID0gMztcblxuXHQgIHRoaXMuaGVhbHRoID0geyBjdXJyZW50OiA1MCwgbWF4OiA1MCB9O1xuICAgICAgICBcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJhdHRhY2tcIiwgWzAsMV0pO1xuXHQgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwiYXR0YWNrXCIsIDEsIHRydWUpO1xuXHQgIHRoaXMuYW5pbWF0aW9ucy5jdXJyZW50QW5pbS5zcGVlZCA9IDM7ICAgIFxuICAgICAgICBcbiAgICAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBcblxuICAgICAgICAgICAgLy9yZXZlcnQgb3JjIHRpbnQgdG8gbm9ybWFsIGFmdGVyIGdldHRpbmcgaGl0XG4gICAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMudGltZUNoZWNrUmV2ZXJ0KXtcbiAgICAgICAgICAgIHRoaXMudGludCA9IDB4ZmZmZmZmO1xuICAgICAgICAgICAgdGhpcy50aW1lQ2hlY2tSZXZlcnQgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAyMDA7XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBcbiAgICB9XG4gXG4gICAgXG4gXG4gXG4gXG4gICAgXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCB7XG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdwcmVsb2FkZXInLCAnYXNzZXRzL2ltYWdlcy9sb2FkaW5nX2Jhci5wbmcnKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKCkge1xuICAgICAgICB0aGlzLmdhbWUuaW5wdXQubWF4UG9pbnRlcnMgPSAxO1xuICAgICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnKTtcbiAgICB9XG59IiwiLypnbG9iYWwgUGhhc2VyKi9cblxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vcHJlZmFicy9QbGF5ZXIuanNcIjtcbmltcG9ydCBNZXRlb3IgZnJvbSBcIi4uL3ByZWZhYnMvTWV0ZW9yLmpzXCI7XG5pbXBvcnQgT3JjQ29udmljdCBmcm9tIFwiLi4vcHJlZmFicy9vcmNDb252aWN0LmpzXCI7XG5pbXBvcnQgU2xvd0Nsb3VkIGZyb20gXCIuLi9wcmVmYWJzL1Nsb3dDbG91ZC5qc1wiO1xuaW1wb3J0IFBsYXllclVJIGZyb20gXCIuLi9wcmVmYWJzL1BsYXllclVJLmpzXCI7XG5pbXBvcnQgSGVhbHRoUGFjayBmcm9tIFwiLi4vcHJlZmFicy9IZWFsdGhQYWNrLmpzXCI7XG5pbXBvcnQgU3RpbVBhY2sgZnJvbSBcIi4uL3ByZWZhYnMvU3RpbVBhY2suanNcIjtcbmltcG9ydCBBbGllbk1lY2ggZnJvbSBcIi4uL3ByZWZhYnMvQWxpZW5NZWNoLmpzXCI7XG5pbXBvcnQgRGVhZE9yYyBmcm9tIFwiLi4vcHJlZmFicy9EZWFkT3JjLmpzXCI7XG5pbXBvcnQgRGVhZEFsaWVuIGZyb20gXCIuLi9wcmVmYWJzL0RlYWRBbGllbi5qc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vb2JqZWN0IGxldmVsIHByb3BlcnRpZXNcbiAgICBzdXBlcigpO1xuXG4gIH1cbiAgICBcbiAgICBcbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIC8vZG9uJ3Qgb3ZlcndyaXRlIGFueSBzcGVlZCBjaGFuZ2VzIHdpdGggc3RpbXBhY2sgYWN0aXZlXG4gICAgICAgIHRoaXMuZG9udE92ZXJ3cml0ZVBsYXllclNwZWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVtb3ZlU3RpbXBhY2sgPSB0aGlzLmdhbWUudGltZS5ub3c7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJhbmRvbURpc3BsYXlOdW1iZXIgPSAoTWF0aC5yYW5kb20oKSAqIDQwKSArIDE1O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYW1lcmEuZmxhc2goJyMwMDAwMDAnKTtcbiAgICAgICAgLy90aW1lciBmb3IgdGhlIGRlYXRoIDVzZWMgZGVsYXkgZm9yIHRoZSBkZWF0aCBmdW5jdGlvblxuICAgICAgICB0aGlzLnJ1blRpbWVyT25jZSA9IDA7XG4gICAgICAgIFxuICAgICAgICAvL3RyYWNrZXIgZm9yIGVuZW1pZXMga2lsbGVkXG4gICAgICAgIHRoaXMuZW5lbWllc0tpbGxlZCA9IDA7XG4gICAgICAgIFxuICAgICAgICAvL3RpbWVjaGVjayBmb3IgdGltZWQgZXZlbnRzIGxpa2UgdGhlIHBsYXllciBmbGFzaGluZyByZWQgd2hlbiBoaXRcbiAgICAgICAgdGhpcy50aW1lQ2hlY2tIaXQgPSAwO1xuICAgICAgICB0aGlzLnRpbWVDaGVja1JldmVydCA9IHRoaXMuZ2FtZS50aW1lLm5vdztcbiAgICAgICAgXG4gICAgICAgIC8vbWV0ZW9yIHNwYXduIGNoYW5jZVxuICAgICAgICB0aGlzLnNwYXduQ2hhbmNlID0gMC4wMjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgICAgIHRoaXMuZ2FtZS5pbnB1dC5tb3VzZS5jYXB0dXJlID0gdHJ1ZTtcbiAgICBcbiAgICAgICAgLy9hZGQgYmFja2dyb3VuZFxuICAgICAgICB0aGlzLmJnID0gdGhpcy5hZGQudGlsZVNwcml0ZSgwLCAwLCA1MDAwLCA1MDAwLCAnZ2FtZV9iZycpO1xuICAgICAgICB0aGlzLmJnLnNjYWxlLnNldFRvKDIsMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUud29ybGQuc2V0Qm91bmRzKDAsIDAsIDUwMDAsIDUwMDApO1xuICAgICAgICBcbiAgICAgICAgLy9hZGQgc2hpcFxuICAgICAgICB0aGlzLnNoaXAgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSg0MDAsIDYwMCwgJ2JvdW50eUh1bnRlclNoaXAnKTtcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzLnNoaXApO1xuICAgICAgICB0aGlzLnNoaXAuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hpcC5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRoaXMuc2hpcC5hbmdsZSA9IC00NTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvL2FkZCBwbGF5ZXJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuZ2FtZSwgNDAwLCA2MDApO1xuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5nYW1lLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIsIFBoYXNlci5DYW1lcmEuRk9MTE9XX1RPUERPV04pO1xuICAgICAgICAvL3RoaXMucGxheWVyLmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgLy9hZGQgcGxheWVyIFVJXG4gICAgICAgIC8vdGhpcy5ib3VudHlIdW50ZXJVSSA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDIwMCwgMjAwLCAncGxheWVyVUknKTsgXG4gICAgICAgIHRoaXMucGxheWVyVUkgPSBuZXcgUGxheWVyVUkodGhpcy5nYW1lLCAtMTAwLCAtNjApOyBcbiAgICAgICAgdGhpcy5wbGF5ZXIuYWRkQ2hpbGQodGhpcy5wbGF5ZXJVSSk7XG4gICAgICAgIFxuICAgICAgICAvL2FkZCBoZWFsdGhwYWNrc1xuICAgICAgICAvL3RoaXMuaGVhbHRoUGFjayA9IG5ldyBIZWFsdGhQYWNrKHRoaXMuZ2FtZSwgNjAwLCA2MDApO1xuICAgICAgICAvL3RoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5oZWFsdGhQYWNrKTtcbiAgICAgICAgdGhpcy5oZWFsdGhQYWNrcyA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgICAgIFxuICAgICAgICAvL2FkZCBzdGltcGFja3NcbiAgICAgICAgdGhpcy5zdGltUGFjayA9IG5ldyBTdGltUGFjayh0aGlzLmdhbWUsIDgwMCwgNjAwKTtcbiAgICAgICAgLy90aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMuc3RpbVBhY2spO1xuICAgICAgICB0aGlzLnN0aW1QYWNrcyA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy9hZGQgbWV0ZW9yc1xuICAgICAgICB0aGlzLm1ldGVvcnMgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgICAgICB0aGlzLm1ldGVvcnMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICAgIHRoaXMubWV0ZW9ycy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG4gICAgXG4gICAgICAgIC8vYWRkIG9yY3NcbiAgICAgICAgdGhpcy5vcmMgPSBuZXcgT3JjQ29udmljdCh0aGlzLmdhbWUsIDUwMCwgNTAwKTtcbiAgICAgICAgLy90aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMub3JjKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGVhZE9yY3MgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgICAgICB0aGlzLmRlYWRBbGllbnMgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgICAgICBcbiAgICAgICAgLy90aGlzLmRlYWRPcmMgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgtNTAwLCA1MDAsICdvcmNDb252aWN0RGVhZCcpO1xuICAgICAgICAvL3RoaXMuZ2FtZS5waHlzaWNzLmVuYWJsZSh0aGlzLmRlYWRPcmMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgICAgIC8vdGhpcy5kZWFkT3JjLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgICAvL3RoaXMuZGVhZE9yYy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vdGhpcy5kZWFkT3JjID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUob3JjLndvcmxkLngsIG9yYy53b3JsZC55LCAnb3JjQ29udmljdERlYWQnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMub3JjcyA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgICAgIHRoaXMub3Jjcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vcmNzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbiAgICAgICAgXG4gICAgICAgIC8vYWRkIHJlZCBhbGllbnNcbiAgICAgICAgdGhpcy5hbGllbk1lY2ggPSBuZXcgQWxpZW5NZWNoKHRoaXMuZ2FtZSwgMTAwMCwgNTAwKTtcbiAgICAgICAgLy90aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMuYWxpZW5NZWNoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubWVjaEFsaWVucyA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgICAgIHRoaXMubWVjaEFsaWVucy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tZWNoQWxpZW5zLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbiAgICAgICAgXG4gICAgICAgIC8vYWRkIHNsb3cgY2xvdWRzXG4gICAgICAgIC8vdGhpcy5jbG91ZCA9IG5ldyBTbG93Q2xvdWQodGhpcy5nYW1lLCA4MDAsIDEyMDApO1xuICAgICAgICAvL3RoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5jbG91ZCk7XG4gICAgICAgIHRoaXMuc2xvd0Nsb3VkcyA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgICAgIFxuICAgICAgICAvL3RoaXMubWV0ZW9yID0gbmV3IE1ldGVvcih0aGlzLmdhbWUsIDYwMCwgMzAwKTtcbiAgICAgICAgLy90aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMubWV0ZW9yKTtcbiAgICAgICAgLy90aGlzLm1ldGVvci5zY2FsZS5zZXRUbygzLDMpO1xuICAgICAgICBcbiAgICAgICAgLy8gIENyZWF0ZXMgWCBidWxsZXRzLCB1c2luZyB0aGUgJ2J1bGxldCcgZ3JhcGhpY1xuICAgICAgICB0aGlzLndlYXBvbiA9IHRoaXMuYWRkLndlYXBvbigxMCwgJ2J1bGxldCcpO1xuICAgICAgICB0aGlzLndlYXBvbi5idWxsZXRBbmdsZU9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMud2VhcG9uLmJ1bGxldEFuZ2xlVmFyaWFuY2UgPSAxMDtcbiAgICAgICAgdGhpcy53ZWFwb24uYnVsbGV0U3BlZWQgPSA2MDA7XG4gICAgICAgIHRoaXMud2VhcG9uLmZpcmVSYXRlID0gNDA7XG4gICAgICAgIHRoaXMud2VhcG9uLm9uRmlyZUxpbWl0ID0gMTA7XG4gICAgICAgIHRoaXMud2VhcG9uLmJ1bGxldEluaGVyaXRTcHJpdGVTcGVlZCA9IHRydWU7XG4gICAgICAgIHRoaXMud2VhcG9uLmJ1bGxldEtpbGxUeXBlID0gUGhhc2VyLldlYXBvbi5LSUxMX0RJU1RBTkNFO1xuICAgICAgICB0aGlzLndlYXBvbi5idWxsZXRLaWxsRGlzdGFuY2UgPSA3NjA7ICAgIFxuICAgICAgICB0aGlzLndlYXBvbi5idWxsZXRTcGVlZFZhcmlhbmNlID0gNTA7XG4gICAgICAgIHRoaXMud2VhcG9uLnRyYWNrU3ByaXRlKHRoaXMucGxheWVyLCA5NSwgMjAsIHRydWUpO1xuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZmlyZUJ1dHRvbiA9IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlDb2RlLlNQQUNFQkFSKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3R5bGUgPSB7IGZvbnQ6IFwiMjRweCBBcmlhbFwiLCBmaWxsOiBcIiNmZmZmZmZcIiwgYWxpZ246IFwiY2VudGVyXCIsIGJhY2tncm91bmRDb2xvcjogXCJncmVlblwifTtcblxuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQod2luZG93Lm91dGVyV2lkdGggLyAyLCAxMDAsIFwiIEVuZW1pZXMgS2lsbGVkOiBcIiArIDAgKyBcIiBcIiAsIHRoaXMuc3R5bGUpO1xuICAgICAgICB0aGlzLnRleHQuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG4gICAgICAgIHRoaXMudGV4dC5zdHJva2UgPSAnIzAwMDAwMCc7XG4gICAgICAgIHRoaXMudGV4dC5zdHJva2VUaGlja25lc3MgPSA2O1xuXG5cbiAgICAgICAgdGhpcy50ZXh0LmFuY2hvci5zZXQoMC41KTtcblxuXG4gICAgICAgIC8vc3Bhd24gYSBudW1iZXIgb2Ygc2xvd0Nsb3VkcyBpbiB0aGUgZ2FtZSB3b3JsZFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMuc2xvd0Nsb3VkID0gbmV3IFNsb3dDbG91ZCh0aGlzLmdhbWUsIE1hdGgucmFuZG9tKHRoaXMud29ybGQud2lkdGgpICogdGhpcy53b3JsZC53aWR0aCwgTWF0aC5yYW5kb20odGhpcy53b3JsZC5oZWlnaHQpICogdGhpcy53b3JsZC5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5zbG93Q2xvdWRzLmFkZCh0aGlzLnNsb3dDbG91ZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vQ3JlYXRlIFNvdW5kc1xuICAgICAgICB0aGlzLnBsYXllck1hY2hpbmVndW4gPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdwbGF5ZXJNYWNoaW5lZ3VuJyk7XG4gICAgICAgIHRoaXMub3JjRGVhdGggPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdvcmNEZWF0aCcpO1xuICAgICAgICB0aGlzLmFsaWVuRGVhdGggPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdhbGllbkRlYXRoJyk7XG4gICAgICAgIHRoaXMuc3RpbVBhY2tQaWNrdXAgPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdzdGltUGFja1BpY2t1cCcpO1xuICAgICAgICB0aGlzLmhlYWx0aFBhY2tQaWNrdXAgPSB0aGlzLmdhbWUuYWRkLmF1ZGlvKCdoZWFsdGhQYWNrUGlja3VwJyk7XG4gICAgICAgIHRoaXMucGxheWVySGl0ID0gdGhpcy5nYW1lLmFkZC5hdWRpbygncGxheWVySGl0Jyk7XG4gICAgICAgIFxuICAgICAgICAvL0dhbWUgb3ZlciB0ZXh0XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0aGlzLmdhbWUuYWRkLnRleHQod2luZG93Lm91dGVyV2lkdGggLyAyICwgd2luZG93Lm91dGVySGVpZ2h0IC8gMiwgJ0dBTUUgT1ZFUiEnLCB7IGZvbnQ6ICc4NHB4IEFyaWFsJywgZmlsbDogJyNmZmYnIH0pO1xuICAgICAgICB0aGlzLmdhbWVPdmVyLmZpeGVkVG9DYW1lcmEgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWVPdmVyLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgLy90aGlzLmdhbWVNdXNpYyA9IHRoaXMuZ2FtZS5hZGQuYXVkaW8oJ3NvdW5kVHJhY2swMScpO1xuICAgICAgICAvL3RoaXMuZ2FtZU11c2ljLnBsYXkoJycsIDAsIDAuMiwgMC4yLCB0cnVlKTsgLy9wbGF5cyBmb3JldmVyXG4gICAgfVxuICAgIFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFVQREFURSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIFxuICAgIFxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgXG4gICAgICAgIC8va2VlcHMgcGxheWVycyBocCB1cGRhdGVkXG4gICAgICAgIHRoaXMucGxheWVyVUkuaGVhbHRoQmFyLnNjYWxlLnkgPSB0aGlzLnBsYXllci5wbGF5ZXJIZWFsdGhQZXJjZW50IC8gMTAwO1xuICAgICAgICBcbiAgICAgICAgLy9zaGlwIGFuaW1hdGlvblxuICAgICAgICB0aGlzLnNoaXAuYm9keS52ZWxvY2l0eS54ID0gLTI1O1xuICAgICAgICB0aGlzLnNoaXAuYW5nbGUgKz0gMC4xNTtcbiAgICAgICAgdGhpcy5zaGlwLm91dE9mQm91bmRzS2lsbCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICAvL0VuZW1pZXMga2lsbGVkIHRyYWNrZXJcbiAgICAgICAgdGhpcy5lbmVtaWVzS2lsbGVkO1xuICAgICAgICBcbiAgICAgICAgLy9yZXZlcnQgcGxheWVyIHRpbnQgdG8gbm9ybWFsIGFmdGVyIGdldHRpbmcgaGl0XG4gICAgICAgIC8vYWxzbyByZXZlcnQgcGxheWVyIHNwZWVkIGFmdGVyIGV4aXRpbmcgc2xvdyBjbG91ZFxuICAgICAgICBpZih0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLnRpbWVDaGVja1JldmVydCl7XG4gICAgICAgICAgICB0aGlzLnBsYXllci50aW50ID0gMHhmZmZmZmY7XG4gICAgICAgICAgICBpZighdGhpcy5kb250T3ZlcndyaXRlUGxheWVyU3BlZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnNwZWVkLmN1cnJlbnQgPSB0aGlzLnBsYXllci5zcGVlZC5tYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRpbWVDaGVja1JldmVydCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDIwMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kb250T3ZlcndyaXRlUGxheWVyU3BlZWQpe1xuICAgICAgICAgICAgLy9pZiBzdGltcGFjayBpcyBhY3RpdmUga2VlcCBwbGF5ZXIgc3BlZWQgYm9vc3RcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0aW1wYWNrIElzIEFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5zcGVlZC5jdXJyZW50ID0gNjAwO1xuICAgICAgICAgICAgICAgIC8vY2hhbmdlIHBsYXllciB0aW50cyBmcm9tIGhhdmluZyBzdGltcGFjayBhY3RpdmVcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci50aW50ID0gMHhmZmZmMDA7XG4gICAgICAgICAgICAgICAgLy9pZiBpdHMgYmVlbiBsb25nIGVub3VnaCBzaW5jZSBwbGF5ZXIgcGlja2VkIHVwIHN0aW1wYWNrXG4gICAgICAgICAgICAgICAgaWYodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5yZW1vdmVTdGltcGFjayl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnNwZWVkLmN1cnJlbnQgPSB0aGlzLnBsYXllci5zcGVlZC5tYXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9udE92ZXJ3cml0ZVBsYXllclNwZWVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyAgU2Nyb2xsIHRoZSBiYWNrZ3JvdW5kXG4gICAgICAgIC8vdGhpcy5iZy50aWxlUG9zaXRpb24ueSArPSAwLjAxO1xuICAgICAgICAvL3RoaXMuYmcudGlsZVBvc2l0aW9uLnggKz0gMC4wMTtcbiAgICAgICAgXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFVQREFURSBTUEFXTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vU1BBV04gUkFORE9NIE1FVEVPUlNcbiAgICAgICAgaWYoTWF0aC5yYW5kb20oKSA8IHRoaXMuc3Bhd25DaGFuY2UpIHtcbiAgICAgICAgICAvL3NwYXduIG1ldGVvcnMgdG8gdGhlIHJpZ2h0IG9mIHBsYXllciBsb2NhdGlvblxuICAgICAgICAgIHZhciBtZXRlb3IgPSBuZXcgTWV0ZW9yKHRoaXMuZ2FtZSwgdGhpcy5wbGF5ZXIud29ybGQueCArIDE4MDAsIE1hdGgucmFuZG9tKCkgKiB0aGlzLnBsYXllci53b3JsZC55ICogMik7XG4gICAgICAgICAgdGhpcy5tZXRlb3JzLmFkZChtZXRlb3IpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL1NQQVdOIFJBTkRPTSBIRUFMVEhQQUNLU1xuICAgICAgICBpZihNYXRoLnJhbmRvbSgpIDwgdGhpcy5zcGF3bkNoYW5jZSAvIDE1KSB7XG4gICAgICAgICAgLy9zcGF3biBtZXRlb3JzIHRvIHRoZSByaWdodCBvZiBwbGF5ZXIgbG9jYXRpb25cbiAgICAgICAgICB2YXIgaGVhbHRoUGFjayA9IG5ldyBIZWFsdGhQYWNrKHRoaXMuZ2FtZSwgdGhpcy5wbGF5ZXIud29ybGQueCArIDE4MDAsIE1hdGgucmFuZG9tKCkgKiB0aGlzLnBsYXllci53b3JsZC55ICogMik7XG4gICAgICAgICAgdGhpcy5oZWFsdGhQYWNrcy5hZGQoaGVhbHRoUGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgLy9TUEFXTiBSQU5ET00gU1RJTVBBQ0tTXG4gICAgICAgIGlmKE1hdGgucmFuZG9tKCkgPCB0aGlzLnNwYXduQ2hhbmNlIC8gMTApIHtcbiAgICAgICAgICAvL3NwYXduIG1ldGVvcnMgdG8gdGhlIHJpZ2h0IG9mIHBsYXllciBsb2NhdGlvblxuICAgICAgICAgIHZhciBzdGltUGFjayA9IG5ldyBTdGltUGFjayh0aGlzLmdhbWUsIHRoaXMucGxheWVyLndvcmxkLnggKyAxODAwLCBNYXRoLnJhbmRvbSgpICogdGhpcy5wbGF5ZXIud29ybGQueSAqIDIpO1xuICAgICAgICAgIHRoaXMuc3RpbVBhY2tzLmFkZChzdGltUGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vU1BBV04gUkFORE9NIE9SQ1NcbiAgICAgICAgaWYoTWF0aC5yYW5kb20oKSA8ICh0aGlzLnNwYXduQ2hhbmNlIC8gNSkpIHtcbiAgICAgICAgICB0aGlzLm9yYyA9IG5ldyBPcmNDb252aWN0KHRoaXMuZ2FtZSwgdGhpcy5wbGF5ZXIud29ybGQueCArIDE4MDAsIE1hdGgucmFuZG9tKCkgKiB0aGlzLnBsYXllci53b3JsZC55ICogMik7XG4gICAgICAgICAgdGhpcy5vcmNzLmFkZCh0aGlzLm9yYyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9TUEFXTiBSQU5ET00gQUxJRU5TIC0gb2xkIGNvZGU6IHRoaXMuZ2FtZSwgdGhpcy5nYW1lLndpZHRoICsgMTAwLCBNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLmhlaWdodFxuICAgICAgICBpZihNYXRoLnJhbmRvbSgpIDwgKHRoaXMuc3Bhd25DaGFuY2UgLyA4KSkge1xuICAgICAgICAgIHRoaXMuYWxpZW5NZWNoID0gbmV3IEFsaWVuTWVjaCh0aGlzLmdhbWUsIHRoaXMucGxheWVyLndvcmxkLnggKyAxODAwLCBNYXRoLnJhbmRvbSgpICogdGhpcy5wbGF5ZXIud29ybGQueSAqIDIpO1xuICAgICAgICAgIHRoaXMubWVjaEFsaWVucy5hZGQodGhpcy5hbGllbk1lY2gpO1xuICAgICAgICB9XG4gICAgICAgIC8vZmlyZSBwbGF5ZXIgd2VhcG9uXG4gICAgICAgIGlmICh0aGlzLmZpcmVCdXR0b24uaXNEb3duIHx8IHRoaXMuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIuaXNEb3duICkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLnRpbWVDaGVja0hpdCl7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24uZmlyZUF0UG9pbnRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTWFjaGluZWd1bi5wbGF5KCcnLCAwLjQ3NSwgMC41KTsgICAgXG4gICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudGltZUNoZWNrSGl0ID0gdGhpcy5nYW1lLnRpbWUubm93ICsgNTA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vSSBwbGF5ZXJzIGhlYWx0aCByZWFjaGVzIHplcm8hXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5oZWFsdGguY3VycmVudCA8PSAwKXtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoWmVybyh0aGlzLnBsYXllciwgdGhpcy53ZWFwb24pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ09MTElTSU9OUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBcbiAgICAgICAgLy9idWxsZXQgbWV0ZW9yIGNvbGxpc2lvblxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLndlYXBvbi5idWxsZXRzLCB0aGlzLm1ldGVvcnMsIHRoaXMuaGl0RW5lbXksIG51bGwsIHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgLy9wbGF5ZXIgbWV0ZW9yIGNvbGxpc2lvblxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5tZXRlb3JzLCB0aGlzLmhpdFBsYXllciwgbnVsbCwgdGhpcyk7XG4gICAgICAgIFxuICAgICAgICAvL2J1bGxldCBvcmMgY29sbGlzaW9uXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMud2VhcG9uLmJ1bGxldHMsIHRoaXMub3JjcywgdGhpcy5raWxsT3JjLCBudWxsLCB0aGlzKTtcbiAgICAgICAgLy9idWxsZXQgYWxpZW4gY29sbGlzaW9uXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMud2VhcG9uLmJ1bGxldHMsIHRoaXMubWVjaEFsaWVucywgdGhpcy5raWxsQWxpZW4sIG51bGwsIHRoaXMpO1xuICAgICAgICAvL29yYyBwbGF5ZXIgY29sbGlzaW9uXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLm9yY3MsIHRoaXMub3JjSGl0UGxheWVyLCBudWxsLCB0aGlzKTtcbiAgICAgICAgLy9vcmMgbWV0ZW9yIGNvbGxpc2lvblxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLm1ldGVvcnMsIHRoaXMub3JjcywgdGhpcy5tZXRlb3JIaXRPcmMsIG51bGwsIHRoaXMpO1xuICAgICAgICAvL2FsaWVuIG1ldGVvciBjb2xsaXNpb25cbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5tZXRlb3JzLCB0aGlzLmFsaWVuTWVjaCwgdGhpcy5tZXRlb3JIaXRBbGllbk1lY2gsIG51bGwsIHRoaXMpO1xuICAgICAgICAvL3BsYXllciBoZWFsdGhwYWNrIGNvbGxpc2lvblxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5oZWFsdGhQYWNrcywgdGhpcy5wbGF5ZXJQaWNrc1VwSGVhbHRocGFjaywgbnVsbCwgdGhpcyk7XG4gICAgICAgIC8vcGxheWVyIHN0aW1wYWNrIGNvbGxpc2lvblxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5zdGltUGFja3MsIHRoaXMucGxheWVyUGlja3NVcFN0aW1wYWNrLCBudWxsLCB0aGlzKTtcbiAgICAgICAgLy9jb2RlIGJlbG93IGFkZHMgaG9taW5nIGJldHdlZW4gb3JjcyBhbmQgdGhlIHBsYXllclxuICAgICAgICAvL3ZhciBhbmdsZSA9IHRoaXMucGh5c2ljcy5hcmNhZGUuYW5nbGVCZXR3ZWVuKHRoaXMub3JjLCB0aGlzLnBsYXllcik7XG4gICAgICAgIC8vdGhpcy5vcmNBbmdsZSA9IGFuZ2xlICogKDE4MC9NYXRoLlBJKTtcbiAgICAgICAgLy90aGlzLnBoeXNpY3MuYXJjYWRlLnZlbG9jaXR5RnJvbUFuZ2xlKHRoaXMub3JjQW5nbGUsIDI1MCwgdGhpcy5vcmMuYm9keS52ZWxvY2l0eSk7XG4gICAgICAgIC8vVVBEQVRFRCBPUkMgSE9NSU5HIENPREVcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9yY3MuY2hpbGRyZW4ubGVuZ3RoOyBpKyspeyBcbiAgICAgICAgICAgIHRoaXMub3JjID0gdGhpcy5vcmNzLmNoaWxkcmVuW2ldOyBcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9PYmplY3QodGhpcy5vcmMsIHRoaXMucGxheWVyLCAyNTApO1xuICAgICAgICB9XG4gICAgICAgIC8vQWxpZW4gaG9taW5nIGFuZCBhdHRhY2sgY29kZVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubWVjaEFsaWVucy5jaGlsZHJlbi5sZW5ndGg7IGorKyl7IFxuICAgICAgICAgICAgdGhpcy5hbGllbk1lY2ggPSB0aGlzLm1lY2hBbGllbnMuY2hpbGRyZW5bal07IFxuICAgICAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb09iamVjdCh0aGlzLmFsaWVuTWVjaCwgdGhpcy5wbGF5ZXIsIDE1MCk7XG4gICAgICAgIFxuICAgICAgICAvL2FsaWVuTWVjaFdlYXBvbiBURVNUIENPREVcbiAgICAgICAgdGhpcy5hbGllbk1lY2guYWxpZW5XZWFwb24udHJhY2tTcHJpdGUodGhpcy5hbGllbk1lY2gsIC0xMDAsIC0xMCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuYWxpZW5NZWNoLmFsaWVuV2VhcG9uLmZpcmVBdFNwcml0ZSh0aGlzLnBsYXllcik7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9hbGllbiB3ZWFwb24gY29kZSBUSElTIE5FRURTIFRPIEJFIElOU0lERSBUSEUgQUxJRU4gSE9NSU5HIElOIE9SREVSIFRPIEFQUExZIFRPIEFMTCBCVUxMRVQgUFJPSkVDVElMRVMhXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuYWxpZW5NZWNoLmFsaWVuV2VhcG9uLmJ1bGxldHMuY2hpbGRyZW4ubGVuZ3RoOyBrKyspeyBcbiAgICAgICAgICAgICAgICB2YXIgYWxpZW5CdWxsZXQgPSB0aGlzLmFsaWVuTWVjaC5hbGllbldlYXBvbi5idWxsZXRzLmNoaWxkcmVuW2tdO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCBhbGllbkJ1bGxldCwgdGhpcy5hbGllbldlYXBvbkhpdHNQbGF5ZXIsIG51bGwsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3BsYXllciBjbG91ZCBjb2xsaXNpb25cbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuc2xvd0Nsb3VkcywgdGhpcy5wbGF5ZXJFbnRlcnNTbG93LCBudWxsLCB0aGlzKTtcbiAgICB9XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUkVOREVSUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgcmVuZGVyKCkge1xuXG4gICAgdGhpcy53ZWFwb24uZGVidWcoKTtcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dChcIkxlZnQgQnV0dG9uOiBcIiArIHRoaXMuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIuaXNEb3duLCAxMiwgODApO1xuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KFwiUGxheWVyIEhlYWx0aDogXCIgKyB0aGlzLnBsYXllci5oZWFsdGguY3VycmVudCwgMTIsIDEwMCk7XG4gICAgdGhpcy5nYW1lLmRlYnVnLnRleHQoXCJQbGF5ZXIgaGVhbHRoIHBlcmNlbnQ6XCIgKyBNYXRoLnRydW5jKHRoaXMucGxheWVyLnBsYXllckhlYWx0aFBlcmNlbnQpICsgXCIlXCIsIDEyLCAxMjApO1xuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KFwiUGxheWVyIExvY2F0aW9uOiBcIiArIE1hdGgudHJ1bmModGhpcy5wbGF5ZXIud29ybGQueCkgKyBcIiBYICwgXCIgKyBNYXRoLnRydW5jKHRoaXMucGxheWVyLndvcmxkLnkpICsgXCIgWVwiLCAxMiwgMTQwKTtcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dChcIldvcmxkIHNpemU6IFwiICsgdGhpcy53b3JsZC53aWR0aCArIFwiIFggXCIgKyB0aGlzLndvcmxkLmhlaWdodCArIFwiIFlcIiwgMTIsIDE2MCk7XG4gICAgdGhpcy5nYW1lLmRlYnVnLnRleHQoXCJDb250cm9sczogXCIgLCAxMiwgMjgwKTtcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dChcIktleWJvYXJkIGFycm93cyArIG1vdXNlIHRvIGFpbSBhbmQgc2hvb3QuIFwiICwgMTIsIDMwMCk7XG4gICAgXG4gICAgLy90aGlzLmdhbWUuZGVidWcudGV4dChcIk9yYyBBbmdsZTogXCIgKyB0aGlzLm9yY0FuZ2xlLCAxMiwgMTIwKTtcblxuICAgIH1cbiAgICBcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBDVVNUT00gRlVOQ1RJT05TIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBcbiAgICAvL2N1c3RvbSBmdW5jdGlvbnMgaGVyZVxuICAgIGhpdEVuZW15KGJ1bGxldCwgZW5lbXkpIHtcbiAgICAgICAgIFxuICAgICAgICAvL3RoaXMud2VhcG9uLmJ1bGxldHMua2lsbCgpO1xuICAgICAgICAvL3RoaXMubWV0ZW9ycy5yZW1vdmUodGhpcy5tZXRlb3JzLCB0cnVlKTtcbiAgICAgICAgYnVsbGV0LmtpbGwoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJIaXRcIik7XG5cbiAgICB9XG4gICAgaGl0UGxheWVyKHBsYXllciwgbWV0ZW9yKXtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMudGltZUNoZWNrSGl0KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGUgcGxheWVyIGhhcyBjb2xsaWRlZCB3aXRoIGEgbWV0ZW9yIVwiKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuaGVhbHRoLmN1cnJlbnQgLT0gNTtcbiAgICAgICAgdGhpcy5wbGF5ZXJVSS5oZWFsdGhCYXIuc2NhbGUueSA9IHRoaXMucGxheWVyLnBsYXllckhlYWx0aFBlcmNlbnQgLyAxMDA7XG4gICAgICAgIHRoaXMucGxheWVyLnRpbnQgPSAweGZmMDAwMDtcbiAgICAgICAgXG4gICAgICAgIC8vdGhpcyBldmVudCB3aWxsIG9ubHkgYWxsb3cgdGhlIGhpdFBsYXllciBmdW5jdGlvbiB0byBydW4gZXZlcnkgMjUwbXNcbiAgICAgICAgdGhpcy50aW1lQ2hlY2tIaXQgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAyNTA7XG4gICAgICAgIHRoaXMucGxheWVySGl0LnBsYXkoJycsIDAuMiwgMC4yICk7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIGtpbGxPcmMoYnVsbGV0LCBvcmMpe1xuICAgICAgICBidWxsZXQua2lsbCgpO1xuICAgICAgICBcbiAgICAgICAgb3JjLmhlYWx0aC5jdXJyZW50IC09IDU7XG4gICAgICAgIG9yYy50aW50ID0gMHhmZjAwMDA7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYob3JjLmhlYWx0aC5jdXJyZW50IDw9IDApe1xuICAgICAgICAgICAgb3JjLmtpbGwoKTtcbiAgICAgICAgICAgIHRoaXMub3JjRGVhdGgucGxheSgnJywgMC40NzUsIDAuNSk7IFxuICAgICAgICAgICAgb3JjLmhlYWx0aC5jdXJyZW50ID0gb3JjLmhlYWx0aC5tYXg7XG4gICAgICAgICAgICB0aGlzLmVuZW1pZXNLaWxsZWQgKz0gMTtcbiAgICAgICAgICAgIHRoaXMudGV4dC5zZXRUZXh0KFwiIEVuZW1pZXMgS2lsbGVkOiBcIiArIHRoaXMuZW5lbWllc0tpbGxlZCArIFwiIFwiKTtcbiAgICAgICAgICAgIC8vdGhpcy5kZWFkT3JjID0gdGhpcy5kZWFkT3Jjcy5jcmVhdGUob3JjLndvcmxkLngsIG9yYy53b3JsZC55LCAnb3JjQ29udmljdERlYWQnKTtcbiAgICAgICAgICAgIHZhciBkZWFkT3JjID0gbmV3IERlYWRPcmModGhpcy5nYW1lLCBvcmMud29ybGQueCwgb3JjLndvcmxkLnkpO1xuICAgICAgICAgICAgdGhpcy5kZWFkT3Jjcy5hZGQoZGVhZE9yYyk7XG4gICAgICAgICAgICBkZWFkT3JjLnRpbnQgPSAweDgyODI4MjtcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJCdWxsZXQgaGl0cyBvcmMhXCIpO1xuICAgIH1cbiAgICBraWxsQWxpZW4oYnVsbGV0LCBhbGllbil7XG4gICAgICAgIGJ1bGxldC5raWxsKCk7XG4gICAgICAgIFxuICAgICAgICBhbGllbi5oZWFsdGguY3VycmVudCAtPSA1O1xuICAgICAgICBhbGllbi50aW50ID0gMHhmZjAwMDA7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYoYWxpZW4uaGVhbHRoLmN1cnJlbnQgPD0gMCl7XG4gICAgICAgICAgICBhbGllbi5raWxsKCk7XG4gICAgICAgICAgICB0aGlzLmFsaWVuRGVhdGgucGxheSgnJywgMC40NzUsIDAuNSk7IFxuICAgICAgICAgICAgYWxpZW4uaGVhbHRoLmN1cnJlbnQgPSBhbGllbi5oZWFsdGgubWF4O1xuICAgICAgICAgICAgYWxpZW4uaXNBbGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmVtaWVzS2lsbGVkICs9IDE7XG4gICAgICAgICAgICB0aGlzLnRleHQuc2V0VGV4dChcIiBFbmVtaWVzIEtpbGxlZDogXCIgKyB0aGlzLmVuZW1pZXNLaWxsZWQgKyBcIiBcIik7XG4gICAgICAgICAgICB2YXIgZGVhZEFsaWVuID0gbmV3IERlYWRBbGllbih0aGlzLmdhbWUsIGFsaWVuLndvcmxkLngsIGFsaWVuLndvcmxkLnkpO1xuICAgICAgICAgICAgdGhpcy5kZWFkQWxpZW5zLmFkZChkZWFkQWxpZW4pO1xuICAgICAgICAgICAgZGVhZEFsaWVuLnRpbnQgPSAweDgyODI4MjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgb3JjSGl0UGxheWVyKHBsYXllciwgb3JjKXtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMudGltZUNoZWNrSGl0KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3JjIGhpdCBwbGF5ZXIhXCIpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaGVhbHRoLmN1cnJlbnQgLT0gNTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyVUkuaGVhbHRoQmFyLnNjYWxlLnkgPSB0aGlzLnBsYXllci5wbGF5ZXJIZWFsdGhQZXJjZW50IC8gMTAwO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudGludCA9IDB4ZmYwMDAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3RoaXMgZXZlbnQgd2lsbCBvbmx5IGFsbG93IHRoZSBoaXRQbGF5ZXIgZnVuY3Rpb24gdG8gcnVuIGV2ZXJ5IDI1MG1zXG4gICAgICAgICAgICB0aGlzLnRpbWVDaGVja0hpdCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDI1MDtcbiAgICAgICAgICAgIHRoaXMucGxheWVySGl0LnBsYXkoJycsIDAuMiwgMC4yICk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIG1ldGVvckhpdE9yYyhtZXRlb3IsIG9yYyl7XG4gICAgICAgIFxuICAgIH1cbiAgICBtZXRlb3JIaXRBbGllbk1lY2gobWV0ZW9yLCBhbGllbil7XG4gICAgXG4gICAgfVxuICAgIHBsYXllclBpY2tzVXBIZWFsdGhwYWNrKHBsYXllciwgaGVhbHRoUGFjayl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHBpY2tlZCB1cCBhIGhlYWx0aCBwYWNrIVwiKTtcbiAgICAgICAgLy9oZWFsIHdoZW4gaGVhbHRoUGFjayBnZXRzIHBpY2tlZCB1cFxuICAgICAgICBpZihwbGF5ZXIuaGVhbHRoLmN1cnJlbnQgPCBwbGF5ZXIuaGVhbHRoLm1heCl7XG4gICAgICAgICAgICBwbGF5ZXIuaGVhbHRoLmN1cnJlbnQgKz0gaGVhbHRoUGFjay5oZWFsdGhSZWNvdmVyeTtcbiAgICAgICAgICAgIC8vaWYgcGxheWVyaGVhbHRoIGlzIG1vcmUgdGhhbiBwbGF5ZXJoZWFsdGggbWF4IHNldCBoZWFsdGggdG8gcGxheWVyaGVhbHRoIG1heFxuICAgICAgICAgICAgaWYocGxheWVyLmhlYWx0aC5jdXJyZW50ID4gcGxheWVyLmhlYWx0aC5tYXgpe1xuICAgICAgICAgICAgICAgIHBsYXllci5oZWFsdGguY3VycmVudCA9IHBsYXllci5oZWFsdGgubWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGhlYWx0aFBhY2sua2lsbCgpO1xuICAgICAgICB0aGlzLmhlYWx0aFBhY2tQaWNrdXAucGxheSgnJywgMC4xLCAwLjc1ICk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBwbGF5ZXJQaWNrc1VwU3RpbXBhY2socGxheWVyLCBzdGltUGFjayl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHBpY2tlZCB1cCBhIHN0aW0gcGFjayFcIik7XG4gICAgICAgIHRoaXMuc3RpbVBhY2suc3RpbVBhY2tBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvbnRPdmVyd3JpdGVQbGF5ZXJTcGVlZCA9IHRydWU7XG4gICAgICAgIC8vdGltZSBpdCB0YWtlcyBmb3Igc3RpbXBhY2sgdG8gYmUgYWN0aXZlIGluIG1zXG4gICAgICAgIHRoaXMucmVtb3ZlU3RpbXBhY2sgPSB0aGlzLmdhbWUudGltZS5ub3cgKyAxMDAwMDtcbiAgICAgICAgc3RpbVBhY2sua2lsbCgpO1xuICAgICAgICB0aGlzLnN0aW1QYWNrUGlja3VwLnBsYXkoJycsIDAuMSwgMC43NSApOyBcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICBwbGF5ZXJFbnRlcnNTbG93KHBsYXllciwgc2xvd0Nsb3VkKXtcbiAgICAgICAgaWYoIXRoaXMuZG9udE92ZXJ3cml0ZVBsYXllclNwZWVkKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIGhhcyBlbnRlcmVkIHRoZSBzbG93IGNsb3VkIVwiKTtcbiAgICAgICAgICAgIHBsYXllci5zcGVlZC5jdXJyZW50ID0gMTUwO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGhlYWx0aFplcm8ocGxheWVyLCB3ZWFwb24pe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRIRSBQTEFZRVIgSEFTIERJRUQhXCIpO1xuICAgICAgICB0aGlzLndlYXBvbi50cmFja1Nwcml0ZSh0aGlzLnBsYXllciwgLTk1MDAwMDAwLCAyMCwgdHJ1ZSk7XG4gICAgICAgIHBsYXllci5raWxsKCk7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5nYW1lTXVzaWMucmVzdGFydCgpO1xuICAgICAgICBcbiAgICAgICAgLy9zZXQgdGhlIDUgc2Vjb25kIGRlbGF5IGJlZm9yZSBnYW1lIHJldGFydFxuICAgICAgICB3aGlsZSh0aGlzLnJ1blRpbWVyT25jZSA9PT0gMCl7XG4gICAgICAgICAgICB0aGlzLnRpbWVDaGVja0hpdCA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDUwMDA7XG4gICAgICAgICAgICB0aGlzLnJ1blRpbWVyT25jZSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMudGltZUNoZWNrSGl0KXtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmZhZGUoJyMwMDAwMDAnKTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLm9uRmFkZUNvbXBsZXRlLmFkZCh0aGlzLmZhZGVDb21wbGV0ZSx0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgYWxpZW5XZWFwb25IaXRzUGxheWVyKHBsYXllciwgYnVsbGV0KXtcblxuICAgICAgICBidWxsZXQua2lsbCgpO1xuICAgICAgICBwbGF5ZXIudGludCA9IDB4ZmYwMDAwO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFsaWVuIHdlYXBvbiBoaXQgcGxheWVyLlwiKTtcbiAgICAgICAgcGxheWVyLmhlYWx0aC5jdXJyZW50IC09IDEwO1xuICAgICAgICB0aGlzLnBsYXllclVJLmhlYWx0aEJhci5zY2FsZS55ID0gcGxheWVyLnBsYXllckhlYWx0aFBlcmNlbnQgLyAxMDA7XG4gICAgICAgIHRoaXMucGxheWVySGl0LnBsYXkoJycsIDAuMiwgMC4yICk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBmYWRlQ29tcGxldGUoKSB7XG5cdFx0dGhpcy5nYW1lLnN0YXRlLnJlc3RhcnQoKTsgXG5cdFx0Ly90aGlzLmdhbWVNdXNpYy5yZXN0YXJ0KCk7XG5cdH1cbiAgICBcbn0iLCIvKmdsb2JhbCBQaGFzZXIqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTWVudSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgLy9vYmplY3QgbGV2ZWwgcHJvcGVydGllc1xuICAgIHN1cGVyKCk7XG5cbiAgfVxuICAgIFxuICAgIFxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgLy9hZGQgYmFja2dyb3VuZFxuICAgICAgICB0aGlzLm1haW5NZW51ID0gdGhpcy5nYW1lLmFkZC50aWxlU3ByaXRlKDAsIDAsIHRoaXMuZ2FtZS5oZWlnaHQgKiA0LCB0aGlzLmdhbWUud2lkdGggKiA0LCAnbWFpbk1lbnUnKTtcbiAgICAgICAgLy90aGlzLm1haW5NZW51LmhlaWdodCA9IHRoaXMuZ2FtZS5oZWlnaHQgKiA0O1xuICAgICAgICAvL3RoaXMubWFpbk1lbnUud2lkdGggPSB0aGlzLmdhbWUud2lkdGggKiA0O1xuICAgICAgICAvL3N0YXJ0IGJ1dHRvblxuICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uID0gdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleUNvZGUuRU5URVIpO1xuICAgICAgICAvL2xvYWQgc2hpcFxuICAgICAgICB0aGlzLmJvdW50eUh1bnRlclNoaXAgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSh3aW5kb3cub3V0ZXJXaWR0aCAvIDIsIHdpbmRvdy5vdXRlckhlaWdodCAvIDIsICdib3VudHlIdW50ZXJTaGlwJyk7XG4gICAgICAgIHRoaXMuYm91bnR5SHVudGVyU2hpcC5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGhpcy5ib3VudHlIdW50ZXJTaGlwLmFuZ2xlID0gLTkwO1xuICAgICAgICAvL3RpdGxlXG4gICAgICAgIHRoaXMuc3R5bGUgPSB7IGZvbnQ6IFwiOTBweCBBcmlhbFwiLCBmaWxsOiBcIiNmZmZmZmZcIiwgYWxpZ246IFwiY2VudGVyXCJ9O1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5nYW1lLmFkZC50ZXh0KHdpbmRvdy5vdXRlcldpZHRoIC8gMiwgMTUwLCBcIkFzdGVyb2lkIEh1bnRlclwiLCB0aGlzLnN0eWxlKTtcbiAgICAgICAgdGhpcy50aXRsZS5hbmNob3Iuc2V0KDAuNSwgMC41KTtcbiAgICAgICAgdGhpcy50aXRsZS5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aXRsZS5zdHJva2UgPSAnIzAwMDAwMCc7XG4gICAgICAgIHRoaXMudGl0bGUuc3Ryb2tlVGhpY2tuZXNzID0gNjtcbiAgICAgICAgXG4gICAgICAgIC8vcHJlc3MgZW50ZXJcbiAgICAgICAgdGhpcy5zdHlsZTIgPSB7IGZvbnQ6IFwiNDVweCBBcmlhbFwiLCBmaWxsOiBcIiNmZmZmZmZcIiwgYWxpZ246IFwiY2VudGVyXCJ9O1xuICAgICAgICB0aGlzLnByZXNzRW50ZXIgPSB0aGlzLmdhbWUuYWRkLnRleHQod2luZG93Lm91dGVyV2lkdGggLyAyLCA4NTAsIFwiUHJlc3MgRW50ZXJcIiwgdGhpcy5zdHlsZTIpO1xuICAgICAgICB0aGlzLnByZXNzRW50ZXIuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gICAgICAgIHRoaXMucHJlc3NFbnRlci5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcmVzc0VudGVyLnN0cm9rZSA9ICcjMDAwMDAwJztcbiAgICAgICAgdGhpcy5wcmVzc0VudGVyLnN0cm9rZVRoaWNrbmVzcyA9IDY7XG4gICAgICAgIFxuICAgICAgICAvL3NoaXAgdHJhaWxzIGVtaXR0ZXJcbiAgICAgICAgIC8vICBBZGQgYW4gZW1pdHRlciBmb3IgdGhlIHNoaXAncyB0cmFpbFxuICAgIHRoaXMuc2hpcFRyYWlsID0gdGhpcy5nYW1lLmFkZC5lbWl0dGVyKHRoaXMuYm91bnR5SHVudGVyU2hpcC54IC0gMzUwLCB0aGlzLmJvdW50eUh1bnRlclNoaXAueSArIDEwLCA0MDApO1xuICAgIHRoaXMuc2hpcFRyYWlsLndpZHRoID0gNDA7XG4gICAgdGhpcy5zaGlwVHJhaWwubWFrZVBhcnRpY2xlcygnYnVsbGV0Jyk7XG4gICAgdGhpcy5zaGlwVHJhaWwuc2V0WFNwZWVkKC0yMDAsIC0xODApO1xuICAgIHRoaXMuc2hpcFRyYWlsLnNldFlTcGVlZCgtMTAsIC0zMCk7XG4gICAgdGhpcy5zaGlwVHJhaWwuc2V0Um90YXRpb24oNTAsMCk7XG4gICAgdGhpcy5zaGlwVHJhaWwuc2V0QWxwaGEoMSwgMC4wMSwgODAwKTtcbiAgICB0aGlzLnNoaXBUcmFpbC5zZXRTY2FsZSg1LCA1LCAzLCA1LCAyMDAwLCBQaGFzZXIuRWFzaW5nLlF1aW50aWMuT3V0KTtcbiAgICB0aGlzLnNoaXBUcmFpbC5ncmF2aXR5ID0gNTtcbiAgICB0aGlzLnNoaXBUcmFpbC5zdGFydChmYWxzZSwgNTAwMCwgMTApO1xuICAgIFxuICAgIHRoaXMuc2hpcFRyYWlsMiA9IHRoaXMuZ2FtZS5hZGQuZW1pdHRlcih0aGlzLmJvdW50eUh1bnRlclNoaXAueCAtIDMyNSwgdGhpcy5ib3VudHlIdW50ZXJTaGlwLnkgKyA2NSwgNDAwKTtcbiAgICB0aGlzLnNoaXBUcmFpbDIud2lkdGggPSA0MDtcbiAgICB0aGlzLnNoaXBUcmFpbDIubWFrZVBhcnRpY2xlcygnYnVsbGV0Jyk7XG4gICAgdGhpcy5zaGlwVHJhaWwyLnNldFhTcGVlZCgtMjAwLCAtMTgwKTtcbiAgICB0aGlzLnNoaXBUcmFpbDIuc2V0WVNwZWVkKC0xMCwgLTMwKTtcbiAgICB0aGlzLnNoaXBUcmFpbDIuc2V0Um90YXRpb24oNTAsMCk7XG4gICAgdGhpcy5zaGlwVHJhaWwyLnNldEFscGhhKDEsIDAuMDEsIDgwMCk7XG4gICAgdGhpcy5zaGlwVHJhaWwyLnNldFNjYWxlKDUsIDUsIDMsIDUsIDIwMDAsIFBoYXNlci5FYXNpbmcuUXVpbnRpYy5PdXQpO1xuICAgIHRoaXMuc2hpcFRyYWlsMi5ncmF2aXR5ID0gNTtcbiAgICB0aGlzLnNoaXBUcmFpbDIuc3RhcnQoZmFsc2UsIDUwMDAsIDEwKTtcbiAgICBcbiAgICB0aGlzLnNoaXBUcmFpbDMgPSB0aGlzLmdhbWUuYWRkLmVtaXR0ZXIodGhpcy5ib3VudHlIdW50ZXJTaGlwLnggLSAzMjUsIHRoaXMuYm91bnR5SHVudGVyU2hpcC55ICsgLTU1LCA0MDApO1xuICAgIHRoaXMuc2hpcFRyYWlsMy53aWR0aCA9IDQwO1xuICAgIHRoaXMuc2hpcFRyYWlsMy5tYWtlUGFydGljbGVzKCdidWxsZXQnKTtcbiAgICB0aGlzLnNoaXBUcmFpbDMuc2V0WFNwZWVkKC0yMDAsIC0xODApO1xuICAgIHRoaXMuc2hpcFRyYWlsMy5zZXRZU3BlZWQoLTEwLCAtMzApO1xuICAgIHRoaXMuc2hpcFRyYWlsMy5zZXRSb3RhdGlvbig1MCwwKTtcbiAgICB0aGlzLnNoaXBUcmFpbDMuc2V0QWxwaGEoMSwgMC4wMSwgODAwKTtcbiAgICB0aGlzLnNoaXBUcmFpbDMuc2V0U2NhbGUoNSwgNSwgMywgNSwgMjAwMCwgUGhhc2VyLkVhc2luZy5RdWludGljLk91dCk7XG4gICAgdGhpcy5zaGlwVHJhaWwzLmdyYXZpdHkgPSA1O1xuICAgIHRoaXMuc2hpcFRyYWlsMy5zdGFydChmYWxzZSwgNTAwMCwgMTApO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMubWFpbk1lbnUudGlsZVBvc2l0aW9uLnggLT0gMjA7XG4gICAgICAgIFxuICAgICAgICAgaWYgKHRoaXMuc3RhcnRCdXR0b24uaXNEb3duICkge1xuICAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnZ2FtZScpO1xuICAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG5cbiAgICB9XG4gICAgXG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hc3NldCA9IG51bGw7XG4gICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgcHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdsb2FkaW5nX2JnJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iZy5wbmcnKTtcblxuICAgICAgICBcbiAgICAgICAgLy8gIExvYWQgdGhlIEdvb2dsZSBXZWJGb250IExvYWRlciBzY3JpcHRcbiAgICAgICAgdGhpcy5nYW1lLmxvYWQuc2NyaXB0KCd3ZWJmb250JywgJy8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvd2ViZm9udC8xLjQuNy93ZWJmb250LmpzJyk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAvL2JhY2tncm91bmQgZm9yIGdhbWVcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5hZGQuc3ByaXRlKDAsMCwgJ2xvYWRpbmdfYmcnKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCA9IHRoaXMuZ2FtZS5oZWlnaHQ7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC53aWR0aCA9IHRoaXMuZ2FtZS53aWR0aDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXNzZXQgPSB0aGlzLmFkZC5zcHJpdGUoXG4gICAgICAgICAgICB0aGlzLmdhbWUud2lkdGgvMixcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5oZWlnaHQvMixcbiAgICAgICAgICAgICdwcmVsb2FkZXInKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hc3NldC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkT25jZSh0aGlzLm9uTG9hZENvbXBsZXRlLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5zZXRQcmVsb2FkU3ByaXRlKHRoaXMuYXNzZXQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2RvIGFsbCB5b3VyIGxvYWRpbmcgaGVyZVxuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdidWxsZXQnLCAnYXNzZXRzL2ltYWdlcy9idWxsZXQucG5nJyk7XG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2FsaWVuQnVsbGV0JywgJ2Fzc2V0cy9pbWFnZXMvYWxpZW5CdWxsZXQucG5nJyk7XG4gICAgICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ3BsYXllcicsICdhc3NldHMvaW1hZ2VzL2JvdW50eUh1bnRlcklkbGUucG5nJywgMjAxLCAxODMpOyAvL3dpZHRoIGFuZCBoZWlnaHQgb2Ygc3ByaXRlXG4gICAgICAgICAgICAvL3RoaXMubG9hZC5pbWFnZSgncGxheWVyJywgJ2Fzc2V0cy9pbWFnZXMvYm91bnR5SHVudGVyLnBuZycpO1xuICAgICAgICAgICAgLy9wbGF5ZXIgVUlcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGxheWVyVUknLCAnYXNzZXRzL2ltYWdlcy9ib3VudHlIdW50ZXJVSS5wbmcnKTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnaGVhbHRoQmFyJywgJ2Fzc2V0cy9pbWFnZXMvaGVhbHRoX2Jhci5wbmcnKTtcbiAgICAgICAgICAgIC8vcGxheWVyIHNoaXBcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYm91bnR5SHVudGVyU2hpcCcsICdhc3NldHMvaW1hZ2VzL2JvdW50eUh1bnRlclNoaXAucG5nJyk7XG4gICAgICAgICAgICAvL2dhbWUgQkdcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZ2FtZV9iZycsICdhc3NldHMvaW1hZ2VzL2JnLnBuZycpO1xuICAgICAgICAgICAgLy9NYWluIG1lbnVcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbWFpbk1lbnUnLCAnYXNzZXRzL2ltYWdlcy9tYWluTWVudS5wbmcnKTtcbiAgICAgICAgICAgIC8vZW5lbWllc1xuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdtZXRlb3InLCAnYXNzZXRzL2ltYWdlcy9tZXRlb3IucG5nJyk7XG4gICAgICAgICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ29yY0NvbnZpY3QnLCAnYXNzZXRzL2ltYWdlcy9vcmNDb252aWN0QXR0YWNrLnBuZycsIDI1MCwgMjAwKTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgnYWxpZW5NZWNoJywgJ2Fzc2V0cy9pbWFnZXMvYWxpZW5NZWNoLnBuZycsIDI2MCwgMTg0KTtcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkLmltYWdlKCdvcmNDb252aWN0JywgJ2Fzc2V0cy9pbWFnZXMvb3JjQ29udmljdC5wbmcnKTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnb3JjQ29udmljdERlYWQnLCAnYXNzZXRzL2ltYWdlcy9vcmNDb252aWN0RGVhZC5wbmcnKTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYWxpZW5NZWNoRGVhZCcsICdhc3NldHMvaW1hZ2VzL2FsaWVuTWVjaERlYWQucG5nJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vc2xvdyBjbG91ZHNcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc2xvd0Nsb3VkJywgJ2Fzc2V0cy9pbWFnZXMvc2xvd0Nsb3VkLnBuZycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL1BSRUxPQUQgRklMVEVSXG4gICAgICAgICAgICB0aGlzLmdhbWUubG9hZC5zY3JpcHQoJ2ZpbHRlcicsICdodHRwczovL2Nkbi5yYXdnaXQuY29tL3Bob3RvbnN0b3JtL3BoYXNlci9tYXN0ZXIvdjIvZmlsdGVycy9NYXJibGUuanMnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9JVEVNU1xuICAgICAgICAgICAgLy9oZWFsdGggcGFja1xuICAgICAgICAgICAgdGhpcy5nYW1lLmxvYWQuaW1hZ2UoJ2hlYWx0aFBhY2snLCAnYXNzZXRzL2ltYWdlcy9oZWFsdGhQYWNrLnBuZycpO1xuICAgICAgICAgICAgLy9zdGltIHBhY2tcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5sb2FkLmltYWdlKCdzdGltUGFjaycsJ2Fzc2V0cy9pbWFnZXMvc3RpbVBhY2sucG5nJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vU09VTkRTXG4gICAgICAgICAgICAvL3dlYXBvbiBzb3VuZHNcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5sb2FkLmF1ZGlvKCdwbGF5ZXJNYWNoaW5lZ3VuJyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2Fzc2V0cy9hdWRpby9wbGF5ZXJNYWNoaW5lZ3VuLm1wMycsXG4gICAgICAgICAgICAgICAgJ2Fzc2V0cy9hdWRpby9wbGF5ZXJNYWNoaW5lZ3VuLm9nZydcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ2FsaWVuUGxhc21hJyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2Fzc2V0cy9hdWRpby9hbGllblBsYXNtYS5tcDMnLFxuICAgICAgICAgICAgICAgICdhc3NldHMvYXVkaW8vYWxpZW5QbGFzbWEub2dnJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvL2RlYXRoIHNvdW5kc1xuICAgICAgICAgICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ29yY0RlYXRoJyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2Fzc2V0cy9hdWRpby9vcmNEZWF0aC5tcDMnLFxuICAgICAgICAgICAgICAgICdhc3NldHMvYXVkaW8vb3JjRGVhdGgub2dnJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmdhbWUubG9hZC5hdWRpbygnYWxpZW5EZWF0aCcsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdhc3NldHMvYXVkaW8vYWxpZW5NZWNoRGVhdGgubXAzJyxcbiAgICAgICAgICAgICAgICAnYXNzZXRzL2F1ZGlvL2FsaWVuTWVjaERlYXRoLm9nZydcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ3BsYXllckhpdCcsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdhc3NldHMvYXVkaW8vcGxheWVySGl0Lm1wMycsXG4gICAgICAgICAgICAgICAgJ2Fzc2V0cy9hdWRpby9wbGF5ZXJIaXQub2dnJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvL2l0ZW0gUGlja3Vwc1xuICAgICAgICAgICAgdGhpcy5nYW1lLmxvYWQuYXVkaW8oJ3N0aW1QYWNrUGlja3VwJyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2Fzc2V0cy9hdWRpby9zdGltUGFjay5tcDMnLFxuICAgICAgICAgICAgICAgICdhc3NldHMvYXVkaW8vc3RpbVBhY2sub2dnJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmdhbWUubG9hZC5hdWRpbygnaGVhbHRoUGFja1BpY2t1cCcsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdhc3NldHMvYXVkaW8vaGVhbHRoUGFjay5tcDMnLFxuICAgICAgICAgICAgICAgICdhc3NldHMvYXVkaW8vaGVhbHRoUGFjay5vZ2cnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL211c2ljXG4gICAgICAgICAgICB0aGlzLmdhbWUubG9hZC5hdWRpbygnc291bmRUcmFjazAxJyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ2Fzc2V0cy9hdWRpby9QYXJ2dXNEZWNyZWUtU3BhY2VUcmF2ZWwubXAzJyxcbiAgICAgICAgICAgICAgICAnYXNzZXRzL2F1ZGlvL1BhcnZ1c0RlY3JlZS1TcGFjZVRyYXZlbC5vZ2cnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgLy9zdGFydCBsb2FkXG4gICAgICAgICAgICB0aGlzLmxvYWQuc3RhcnQoKTtcbiAgICAgICAgICAgIFxuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmKHRoaXMucmVhZHkpe1xuICAgICAgICAgICAgLy90aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnbWFpbk1lbnUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkxvYWRDb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2FtZU11c2ljID0gdGhpcy5nYW1lLmFkZC5hdWRpbygnc291bmRUcmFjazAxJyk7XG4gICAgICAgIHRoaXMuZ2FtZU11c2ljLnBsYXkoJycsIDAsIDAuMiwgMC4yLCB0cnVlKTsgLy9wbGF5cyBmb3JldmVyXG4gICAgfVxufSJdfQ==
