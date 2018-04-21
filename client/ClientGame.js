var width = 0, height = 0;
var context = null;
var playerOne = { X: 0, Y: 0, Color:'red' };
var playerTwo = { X: 0, Y: 0, Color:'blue' };
var bullets = {} // array: X, Y, id
const GAME_HEIGHT = 500

function hsStart(playGround) {
  var context = playGround;
  width = context.canvas.clientWidth;
  height = context.canvas.clientHeight;

  playerOne.Y = height - 20;
  playerTwo.Y = 20;


}

function hsUpdate() {

}


function hsRender(socket) {
  // clear field
  context.clearRect(0, 0, width, height);

  // players

  const inverseY = playerOne.id !== 2

  drawTriangle(playerOne.X, playerOne.Y, playerOne.Color, 'up');
  drawTriangle(playerTwo.X, playerTwo.Y, playerTwo.Color, 'down');


  // if (!inverseY) {
  //   drawTriangle(playerOne.X, playerOne.Y, playerOne.Color, 'up');
  //   drawTriangle(playerTwo.X, playerTwo.Y, playerTwo.Color, 'down');
  // } else {
  //   drawTriangle(playerOne.X, GAME_HEIGHT - playerOne.Y, playerOne.Color, 'up');
  //   drawTriangle(playerTwo.X, GAME_HEIGHT - playerTwo.Y, playerTwo.Color, 'down');
  // }

  // bullets
  const bulletIds = Object.keys(bullets)

  for(let i = 0; i < bulletIds.length; i++) {
    const bulletId = bulletIds[i]

    const bulletY = inverseY ? GAME_HEIGHT - bullets[bulletId].y : bullets[bulletId].y
    bullets[bulletId].context = drawBullet(bullets[bulletId].x, bulletY, inverseY);
  }
}

function drawBullet(x, y) {
  context.beginPath();
  context.arc(x, y, 5, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = "red";
  context.fill();

  return context
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
