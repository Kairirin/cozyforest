function createWorld() {
    map = this.make.tilemap({ key: "map" });
    scale *= Math.max(screenWidth / map.widthInPixels, screenHeight / map.heightInPixels);
    worldWidth = map.widthInPixels * scale;
    worldHeight = map.heightInPixels * scale;
    speed *= scale;
    joystickSize *= scale;
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    tilesetTerreno = map.addTilesetImage("terreno", "tilesTerreno");
    tilesetFurniture = map.addTilesetImage("furniture", "tilesFurniture");
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    mar = map.createLayer("Mar", [tilesetTerreno, tilesetFurniture], 0, 0).setScale(scale).setDepth(1);
    suelo = map.createLayer("Suelo", [tilesetTerreno, tilesetFurniture], 0, 0).setScale(scale).setDepth(1);
    suelo2 = map.createLayer("Suelo2", [tilesetTerreno, tilesetFurniture], 0, 0).setScale(scale).setDepth(1);
    jugador = map.createLayer("Jugador", [tilesetTerreno, tilesetFurniture], 0, 0).setScale(scale).setDepth(2);
    cofre = map.createLayer("Cofre", [tilesetTerreno, tilesetFurniture], 0, 0).setScale(scale).setPipeline("Light2D").setDepth(2);
    limitesMapa = map.createLayer("LimitesMapa", [tilesetTerreno, tilesetFurniture], 0, 0).setScale(scale).setDepth(2);
    sobreJugador = map.createLayer("SobreJugador", [tilesetTerreno, tilesetFurniture], 0, 0).setScale(scale).setDepth(3);
    detalles = map.createLayer("Detalles", [tilesetTerreno, tilesetFurniture], 0, 0).setScale(scale).setDepth(3);

    jugador.setCollisionByProperty({ collides: true });
    limitesMapa.setCollisionByProperty({ collides: true });

    jugador.setCollisionByExclusion([-1]);
    limitesMapa.setCollisionByExclusion([-1]);

    // Find empty tiles
    emptyTiles = jugador.filterTiles(tile => (tile.index === -1 || !tile.collides));

    this.lights.enable().setAmbientColor(0xFFFFFF);
}

function createAnimations() {
    const anims = this.anims;
    // Player
    anims.create({
        key: "left", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('mainChar', { start: 11, end: 21 }),
    });
    anims.create({
        key: "right", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('mainChar', { start: 0, end: 10 }),
    });
    anims.create({
        key: "up", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('mainChar', { start: 0, end: 10 }),
    });
    anims.create({
        key: "down", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('mainChar', { start: 0, end: 10 }),
    });
    anims.create({
        key: "waiting", frameRate: 3, repeat: -1,
        frames: this.anims.generateFrameNumbers('mainChar', { start: 6, end: 8 }),
    });
    anims.create({
        key: "attack", frameRate: 3, repeat: -1,
        frames: this.anims.generateFrameNumbers('mainAtaque', { start: 0, end: 3 }),
    });
    // Fruta
    anims.create({
        key: "flyingManzana", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('manzana', { start: 0, end: 16 }),
    });
    anims.create({
        key: "flyingFresa", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('fresa', { start: 0, end: 16 }),
    });
    anims.create({
        key: "flyingCereza", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('cereza', { start: 0, end: 16 }),
    });
    anims.create({
        key: "flyingNaranja", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('naranja', { start: 0, end: 16 }),
    });
    // Health
    anims.create({
        key: "filling", frameRate: 3, repeat: -1,
        frames: this.anims.generateFrameNumbers('salud', { start: 0, end: 2 }),
    });
    // Power
    anims.create({
        key: "walk", frameRate: 5, repeat: -1,
        frames: this.anims.generateFrameNumbers('power', { start: 0, end: 3 }),
    });
    // Monster
    anims.create({
        key: "moving", frameRate: 5, repeat: -1,
        frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 11 }),
    });
}
function createPlayer() {
    const spawnPoint = map.findObject("Objects", obj => obj.name === "spawn");

    player = this.physics.add
        .sprite(spawnPoint.x * scale, spawnPoint.y * scale, "mainChar")
        .setSize(8, 16).setOffset(4, 3).setScale(scale)
        .setCollideWorldBounds(true).setDepth(2);
    // Watch collisions, for the duration of the scene
    this.physics.add.collider(player, jugador);
    this.physics.add.collider(player, limitesMapa);
    const camera = this.cameras.main;
    const world = this.physics.world;
    camera.startFollow(player);
    camera.setBounds(0, 0, worldWidth, worldHeight);
    world.setBounds(0, 0, worldWidth, worldHeight);
    cursors = this.input.keyboard.createCursorKeys();

    // Do not show the joysticks on desktop devices
    if (!this.sys.game.device.os.desktop) {
        joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: screenWidth - joystickSize * 2,
            y: screenHeight - joystickSize * 2,
            radius: joystickSize,
            base: this.add.circle(0, 0, joystickSize, 0x888888).setAlpha(0.5).setDepth(4),
            thumb: this.add.circle(0, 0, joystickSize, 0xcccccc).setAlpha(0.5).setDepth(4)
        }).on('update', update, this);
    }
}

function createFruta() {
    let tipos = ['Naranja', 'Manzana', 'Cereza', 'Fresa'];
    let aleatorio = Phaser.Utils.Array.GetRandom(tipos);
    let anim = 'flying' + aleatorio;

    let fruta = newObject(aleatorio, anim, this).setSize(10, 10).setScale(scale / 1.3).setBounce(1);
    fruta.tipo = aleatorio;
    fruta.body.setAllowGravity(false).setCollideWorldBounds(true);
    this.physics.add.collider(fruta, jugador);
    this.physics.add.overlap(player, fruta, collectFruta, null, this);
}

function collectFruta(player, fruta) {
    recolect.play();
    fruta.destroy();
    createFruta.call(this);

    switch (fruta.tipo) {
        case 'Naranja':
            score++;
            break;
        case 'Manzana':
            score += 2;
            break;
        case 'Cereza':
            score += 3;
            break;
        case 'Fresa':
            score += 5;
            break;
    }
    actualizarContadorFruta.call(this);
}

function createContadorFruta() {
    contFruta = this.add.sprite(50, 25, 'contadorFruta')
        .setOrigin(0).setScale(scale).setDepth(5);
    contFruta.setScrollFactor(0);
}

function introducirFrutasEnCofre() {
    let cofrePoint = map.findObject("Objects", obj => obj.name === "cofre");
    let cofre = this.add.text(cofrePoint.x * scale, cofrePoint.y * scale, 'HERE', { fontSize: 32 }).setPadding(4).setDepth(5);
    this.light = this.lights.addLight(cofrePoint.x * scale, cofrePoint.y * scale, 5000, 0xFFAAAA, 1.0);

    cofre.setInteractive().on('pointerdown', () => {
        this.physics.pause();
        gameOver = true;
        this.add.image(screenWidth / 2, screenHeight / 2, 'final')
            .setScale(1).setScrollFactor(0).setDepth(4)
            .setInteractive().on('pointerdown', () => location.reload());
    });
}

function protect(color) {
    player.setTint(color);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => { timeout = false; player.clearTint() }, 5000);
}

function newObject(type, animation, context) {
    let tile = Phaser.Utils.Array.GetRandom(emptyTiles);

    return context.physics.add.sprite(tile.pixelX * scale, tile.pixelY * scale, type).anims.play(animation, true).setDepth(2);
}

function createMonster() {
    const v = Phaser.Math.Between(-speed / 4, -speed / 3);
    // Light: Illuminate the spider
    let monster = newObject('enemy', 'moving', this).setSize(20, 20).setOffset(1, 2).setScale(0.8 * scale).setBounce(1).setVelocity(v, 0).setCollideWorldBounds(true).setDepth(2);

    monster.body.setAllowGravity(false);
    this.physics.add.collider(monster, jugador);
    this.physics.add.collider(monster, limitesMapa);

    this.physics.add.overlap(player, monster, hitMonster, null, this);
}

function hitMonster(player, monster) {
    // If the player is already hurt, it cannot be hurt again for a while
    if (player.tintTopLeft == 0xFF0000) return;

    if (inmunidad) {
        colisionAtaque = true;
        timeoutCol = setTimeout(() => {
            colisionAtaque = false;
        }, 1000);
        comp.play();
    }
    else {
        protect(0xFF0000);
        lives--;
        hit.play();
        showLives.call(this);
    }

    if (lives == 0) {
        this.physics.pause();
        gameOver = true;
        this.add.image(screenWidth / 2, screenHeight / 2, 'restart')
            .setScale(4).setScrollFactor(0).setDepth(4)
            .setInteractive().on('pointerdown', () => location.reload());
    }
    else {
        monster.destroy();
        createMonster.call(this);
        showLives.call(this);
    }
}

function showLives() {
    corazon = this.add.sprite(50 + contFruta.width * scale, 27, 'corazon')
        .setOrigin(0).setScale(scale).setDepth(5);
    corazon.setScrollFactor(0);

    if (!scoreText) {
        scoreText = this.add.text(corazon.x + corazon.width * scale + 10, corazon.y, '',
            { fontSize: (10 * scale) + 'px', fill: '#FFF' });

        scoreText.setShadow(3, 3, 'rgba(0,0,0,1)', 3)
            .setOrigin(0)
            .setScrollFactor(0)
            .setDepth(4);
    }
    scoreText.setText(lives);
}

function createHealth() {
    let salud = newObject('salud', 'filling', this).setSize(16, 16).setScale(0.7 * scale);
    salud.body.setAllowGravity(false);
    this.physics.add.overlap(player, salud, collectHealth, null, this);
}

function collectHealth(player, salud) {
    life.play();
    if (lives >= 5) return;

    salud.destroy();
    createHealth.call(this);
    lives++;
    showLives.call(this);
}

function createPower() {
    let power = newObject('power', 'walk', this).setSize(32, 34).setScale(scale);
    power.body.setAllowGravity(false);
    this.physics.add.overlap(player, power, collectPower, null, this);
}

function collectPower(player, power) {
    if (timeoutPower) clearTimeout(timeoutPower);
    comp.play();
    power.destroy();
    createPower.call(this);
    inmunidad = true;
    timeoutPower = setTimeout(() => {
        inmunidad = false;
    }, 3000);
}

function pantallaInicio() {
    let titulo = this.add.image(screenWidth / 2, screenHeight / 3, 'titulo')
        .setScale(scale / 3).setScrollFactor(0).setDepth(4);

    let boton = this.add.image(screenWidth / 2, screenHeight / 3 + titulo.height, 'empezar')
        .setScale(scale / 3).setScrollFactor(0).setDepth(4)
        .setInteractive().on('pointerdown', () => { titulo.destroy(); boton.destroy(); this.physics.resume() });
}

function create() {
    initSounds.call(this);
    createWorld.call(this);
    this.physics.pause();
    pantallaInicio.call(this);

    createAnimations.call(this);
    createPlayer.call(this);
    createContadorFruta.call(this);
    showLives.call(this);

    for (i = 0; i < numMonsters; i++) setTimeout(() => createMonster.call(this), Phaser.Math.Between(0, 5000));
    for (i = 0; i < numFrutas; i++) setTimeout(() => createFruta.call(this), Phaser.Math.Between(0, 5000));
    for (i = 0; i < numHealth; i++) setTimeout(() => createHealth.call(this), Phaser.Math.Between(0, 5000));
    for (i = 0; i < numCompi; i++) setTimeout(() => createPower.call(this), Phaser.Math.Between(0, 5000));
}