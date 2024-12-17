const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const numFrutas = 10;
const numHealth = 5;
const numMonsters = 10;
const numCompi = 1;

const config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true
};

const game = new Phaser.Game(config);
let worldWidth, worldHeight, joystickSize = 40, scale = 1.50, speed = 150;
let mar, suelo, suelo2, jugador, limitesMapa, sobreJugador, detalles, cofre;
let tilesetTerreno, tilesetFurniture, emptyTiles, objects;
let map, player, playerAtaque, cursors, timeout;
let forest, granja, hit, recolect, save, life, comp;
let joyStick = { up: false, down: false, left: false, right: false };
let score = 0, lives = 5, scoreText = null, gameOver = false;
let contFruta, fondoC, corazon;
let timeoutPower, inmunidad = false, timeoutCol, colisionAtaque = false;