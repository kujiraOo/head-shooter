var width = 0, height = 0;
var context = null;
var playerOne = { X: 0, Y: 0, Color:'red' };
var playerTwo = { X: 0, Y: 0, Color:'blue' };
var bullets = {} // array: X, Y, id

function hsStart(playGround) {
  var context = playGround;
  width = context.canvas.clientWidth;
  height = context.canvas.clientHeight;

  playerOne.Y = height - 20;
  playerTwo.Y = 20;
}

function hsUpdate() {

}

function hsRender() {
  // clear field
  context.clearRect(0, 0, width, height);

  // players
  drawTriangle(playerOne.X, playerOne.Y, playerOne.Color, 'up');
  drawTriangle(playerTwo.X, playerTwo.Y, playerTwo.Color, 'down');

  // bullets
  for(var i = 0; i < bullets.length; i++) {
    drawBullet(bullets[i].X, bullets[i].Y);
  }
}

function drawBullet(x, y) {
  context.beginPath();
  context.arc(100, 75, 5, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = "red";
  context.fill();
}

function drawTriangle(oX, oY, color, direction) {
    // the triangle
    context.beginPath();
    context.moveTo(oX + 50, oY);
    if (direction === 'down')
    	context.lineTo(oX, oY + 80);
    else
    	context.lineTo(oX, oY - 80);
    context.lineTo(oX - 50, oY);
    context.closePath();

    // the outline
    context.lineWidth = 10;
    context.strokeStyle = color;
    context.stroke();

    // the fill color
    context.fillStyle = color;
    context.fill();
}
