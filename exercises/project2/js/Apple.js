// Temptation
//
// A class to define how a second ball called Apple behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Temptation constructor
//
// Sets the properties with the provided arguments
function Apple(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Apple.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

Apple.prototype.display = function () {
  // Display the ball here
  image(appleImage,this.x,this.y,this.size,this.size);
}

Apple.prototype.reset = function () {
  // Reset the ball here
}
