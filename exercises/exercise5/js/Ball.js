// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

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
  /////////  NEW //////////
  // objects for keeping score and creating score board //
  this.scoreLeft = 0;
  this.scoreRight = 0;
}
/////////  END NEW //////////

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
    //////////// NEW //////////
    // Play the bouncing effect when this is true
    beepSFX.currentTime = 0;
    beepSFX.play();
    /////////// END NEW ////////////
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
//Ball.prototype.isOffScreen = function () {
// Check for going off screen and reset if so
//  if (this.x + this.size < 0 || this.x > width) {
//  return true;
//}
//  else {
//return false;
//}

//}

//isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
/////////// NEW ////////////
// Changing the direction of the ball after left or right side score, adding sound effects
// for launching of ball from each side //
Ball.prototype.isOffScreen = function (leftPaddle, rightPaddle) {
  // Check for going off screen and reset if so, bring ball back on screen in opposite direction
  // play sound effect, and fade paddle //
  if (this.x + this.size < 0 ) {
    this.x = 10;
    this.y = random(0,480);
    this.vx = random(10);
    this.vy = random(10);
    ballLeftSFX.play();
    leftPaddle.fade();
    return 1;
  }

  else if(this.x > width){
    this.x = width;
    this.y = random (0,480);
    this.vx = random(-11);
    this.vy = random(-10);
    ballRightSFX.play();
    rightPaddle.fade();
    return 2;
  }
  else {
    return 0;
  }
  ///////// END NEW //////////

}

// display()
//
// Draw the ball as a rectangle on the screen
/////////  NEW //////////
// change color of ball //
Ball.prototype.display = function () {
  fill(255,255,0);
  rect(this.x,this.y,this.size,this.size);
}
/////////  END NEW //////////

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
