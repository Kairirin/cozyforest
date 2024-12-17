function preload() {
  this.load.image("restart", "assets/gameover.png");
  this.load.image("titulo", "assets/titulo.png");
  this.load.image("empezar", "assets/empezar.png");
  this.load.image("final", "assets/completado.png");
  
  this.load.image("tilesTerreno", "assets/tilesetTerreno.png");
  this.load.image("tilesFurniture", "assets/furniture.png");
  this.load.tilemapTiledJSON("map", "assets/cozyForest.json");
  this.load.spritesheet("mainChar", "assets/main.png", { frameWidth: 15, frameHeight: 20 });
  this.load.spritesheet("mainAtaque", "assets/mainAtaque.png", { frameWidth: 27, frameHeight: 16 });
  this.load.spritesheet("manzana", "assets/frutas/Apple.png", { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet("cereza", "assets/frutas/Cherries.png", { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet("naranja", "assets/frutas/Orange.png", { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet("fresa", "assets/frutas/Strawberry.png", { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet("salud", "assets/salud.png", { frameWidth: 16, frameHeight: 16 });
  this.load.spritesheet("power", "assets/compi.png", { frameWidth: 30, frameHeight: 30 });

  this.load.spritesheet("contadorFruta", "assets/contadores/frutaVacio.png", { frameWidth: 68, frameHeight: 13});
   this.load.image("frutaMedio", "assets/contadores/frutaMedio.png");
   this.load.image("frutaCasi", "assets/contadores/frutaCasi.png");
   this.load.image("frutaEntero", "assets/contadores/frutaEntero.png");
   this.load.image("corazon", "assets/contadores/heart.png");

  
  this.load.spritesheet("enemy", "assets/enemy.png", { frameWidth: 20, frameHeight: 26 });
  this.load.audio("forest", "assets/sonidos/forest.mp3");
  this.load.audio("granja", "assets/sonidos/granja.mp3");
  this.load.audio("hit", "assets/sonidos/hit.wav");
  this.load.audio("life", "assets/sonidos/life.flac");
  this.load.audio("recolect", "assets/sonidos/recolect.wav");
  this.load.audio("save", "assets/sonidos/save.wav");
  this.load.audio("comp", "assets/sonidos/comp.wav");
  this.load.plugin('rexvirtualjoystickplugin', 'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@1.1.39/dist/rexvirtualjoystickplugin.min.js', true);
}
function initSounds() {
  forest = this.sound.add('forest', { volume: 0.2 });
  comp = this.sound.add('comp', { volume: 0.2 });
  granja = this.sound.add('granja', { volume: 0.2 });
  hit = this.sound.add('hit', { volume: 0.7 });
  recolect = this.sound.add('recolect', { volume: 0.7 });
  save = this.sound.add('save', { volume: 0.7 });
  life = this.sound.add('life', { volume: 0.7 });
  this.sound.add('granja', { volume: 0.4 }).play({ loop: -1 });
}
