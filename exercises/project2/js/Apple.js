///////// NEW /////////
// Apple
//
// A class to define how a second ball called Apple behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Apple
//
// Sets the properties with the provided arguments
function Apple(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.tx = 0;
  this.ty = 0;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Apple.prototype.update = function () {
  // Update position with velocity using noise function to move apple
  // randomly
  this.tx += .007;
  this.ty += .007;
  this.x = map(noise(this.tx),0,1,-200,width+250);
  this.y = map(noise(this.ty),0,1,-200,height+250);

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

Apple.prototype.isOffScreen = function () {
  // Check for apple going off screen and reset if so
  // Create statement for when apple goes off screen and options
  // to bring apple back in opposite direction //
  if (this.x + this.size < 0) {
    this.x = 10;
    this.y = random(0,280);
    this.vx = random(10);
    this.vy = random(5);
  }
  if (this.x > width) {
    this.x = width;
    this.y = random (0,280);
    this.vx = random(-13);
    this.vy = random(-5);
  }
}
//////// NEW /////////////
Apple.prototype.display = function () {
  // Display the apple here
  image(appleImage,this.x,this.y,this.size,this.size);
  // Loop for apple buzzing sound
  appleSFX.play();
  appleSFX.loop = true;
}
/////////// NEW ///////////
Apple.prototype.handleCollision = function(paddle) {
  // Check if the apple overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the apple overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move apple back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      // Slow down the paddle when it is touched by the apple
      if (paddle.speed > 0){
        paddle.speed = paddle.speed - 1;
      }
    }
  }
}
/////////// END NEW ////////////
Apple.prototype.reset = function () {
  // Reset the apple here
  this.x = width/2;
  this.y = height/4;
}
///////// END NEW //////////
