// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Temptation() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.size = 10;
  this.speed = 5;
}

Temptation.prototype.update = function () {
  // Move the ball here
}

Temptation.prototype.display = function () {
  // Display the ball here
}

Temptation.prototype.reset = function () {
  // Reset the ball here
}
