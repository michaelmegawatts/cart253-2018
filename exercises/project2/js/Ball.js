// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles. The ball falls into the portal and re-enters
// at a random location. There is also a 50% chance a new ball joins
// the game

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;

  //////// NEW ////////
  // Create objects for keeping score and creating score board //
  this.scoreLeft = 0;
  this.scoreRight = 0;
}
/////// END NEW ///////

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
    ////////// NEW /////////
    // play effect when this is true
    beepSFX.currentTime = 0;
    beepSFX.play();
    ///////// END NEW ///////
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so

  /////////// NEW ////////
  // create statement for when ball goes off screen to track scoreboard,
  // and options to bring ball back in opposite direction //
  if (this.x + this.size < 0) {
    this.x = 10;
    this.y = random(0,480);
    this.vx = random(5);
    this.vy = random(3);
    ballLeftSFX.play();
    return 1;
  }
  if (this.x > width) {
    this.x = width;
    this.y = random (0,480);
    this.vx = random(-12);
    this.vy = random(-10);
    ballRightSFX.play();
    return 2;
  }
  else {
    return 0;
  }
}
/////////// END NEW /////////

//////// NEW //////////
// display()
//
// Draw the ball as an image on screen
Ball.prototype.display = function () {
  fill(255);
  image(ballImage,this.x,this.y,this.size,this.size);
}
////////// END NEW /////////

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
}
