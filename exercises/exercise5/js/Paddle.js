// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults

function Paddle(x,y,w,h,speed,downKey,upKey,color) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  ///////// END NEW //////////
  // added color option command for paddles //
  this.color = color;
  ///////// END NEW //////////
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//////////// NEW ////////////
// Draw the paddle as a rectangle on the screen, and set functions to fade color of paddles//
Paddle.prototype.display = function() {
  fill(this.color);
  rect(this.x,this.y,this.w,this.h);
}

Paddle.prototype.fade = function() {
  var r = red (this.color) -10;
  var b = blue (this.color) -10;
  this.color.setRed(r);
  this.color.setBlue(b);
}
//////////// END NEW ////////////
