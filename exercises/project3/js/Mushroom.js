// Mushroom
//
// A class to define how a mushroom behaves. Including bouncing on all
// sides of the canvas
// and bouncing off paddles.

// Mushroom constructor
//
// Sets the properties with the provided arguments
function Mushroom(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on sides
Mushroom.prototype.update = function () {
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

// display()
//
// Draw the Mushroom as an image on screen
Mushroom.prototype.display = function () {
  fill(255);
  image(mushroomImage,this.x,this.y,this.size,this.size);
}
