function update(time, delta) {
  if (gameOver) return;

  changeMusic(player);
  // if (score > 15) speed = 90;

  let vX = 0, vY = 0;
  // Horizontal movement
  if (cursors.left.isDown || joyStick.left) vX = -speed;
  else if (cursors.right.isDown || joyStick.right) vX = speed;
  // Vertical movement
  if (cursors.up.isDown || joyStick.up) vY = -speed;
  else if (cursors.down.isDown || joyStick.down) vY = speed;
  // Set and normalize the velocity so that player can't move faster along a diagonal
  player.setVelocity(vX, vY).body.velocity.normalize().scale(speed);
  // Choose the right player's animation
  if (vX < 0)
    if (colisionAtaque)
      player.anims.play('attack', true);
    else
      player.anims.play('left', true);
  else if (vX > 0)
    if (colisionAtaque)
      player.anims.play('attack', true);
    else
      player.anims.play('right', true);
  else if (vY < 0)
    if (colisionAtaque)
      player.anims.play('attack', true);
    else
      player.anims.play('up', true);
  else if (vY > 0)
    if (colisionAtaque)
      player.anims.play('attack', true);
    else
      player.anims.play('down', true);
  else player.anims.play('waiting', true);
}

function changeMusic(player) {
  if (player.y < worldHeight / 3) {
    forest.play({ loop: -1 });
  }
  else {
    granja.play({ loop: -1 });
  }
}

function actualizarContadorFruta() {
  let fondo;

  if (score < 5) return;

  if (score >= 5 && score < 10) {
    fondo = 'frutaMedio';
  }
  else if (score >= 10 && score < 15) {
    fondo = 'frutaCasi';
  }
  else {
    fondo = 'frutaEntero';
    introducirFrutasEnCofre.call(this);
  }

  fondoC = this.add.sprite(50, 25, fondo)
    .setOrigin(0).setScale(scale).setDepth(5);
  fondoC.setScrollFactor(0);
}