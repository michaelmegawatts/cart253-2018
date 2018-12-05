// Mushroom
//
// A class to define how a mushroom behaves. Including bouncing on all
// sides of the canvas


// Mushroom constructor
//
// Sets the properties with the provided arguments
function Mushroom(x,y,vx,vy,size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on sides
Mushroom.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain x + y position to be on screen
  this.x = constrain(this.x,0,width-this.size);
  this.y = constrain(this.y,0,height-this.size);


  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
    }
  // Check for touching left or right of screen and reverse velocity if so
  if (this.x === 0 || this.x + this.size === width) {
      this.vx = -this.vx;
      }
  }

// display()
//
// Draw the Mushroom as an image on screen
Mushroom.prototype.display = function () {
  image(mushroomImage,this.x,this.y,this.size,this.size);
}
