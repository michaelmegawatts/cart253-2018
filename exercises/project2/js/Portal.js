//////////// NEW /////////
// Portal
//
// A class to define how a portal behaves when the apple or ball
// fall into it.

// Portal constructor
//
// Sets the properties with the provided arguments
function Portal(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

// Display ()
// Draw portal as an ellips on the screen
Portal.prototype.display = function () {
  // Create portal
  fill(0,0,0);
  stroke(255,0,0);
  ellipse(this.x,this.y,this.w,this.h);
}

// handle ()
// Check if ball or apple overlap with portal

Portal.prototype.handleCollisionBall = function(ball) {
  // Check if the ball overlaps with the portal, bring back randomly
  // on canvas
  if (dist(ball.x,ball.y,this.x,this.y) < this.w/2) {
    ball.x = random(0,700);
    ball.y = random(0,900);
    ball.vx = random(-15);
    ball.vy = random(-13);
  }
}

Portal.prototype.handleCollisionApple = function(apple) {
  // Check if the apple overlaps with the portal and bring back
  // randomly using noise function
  if (dist(apple.x,apple.y,this.x,this.y) < this.w/2) {
    apple.tx += 130;
    apple.ty += 140;
    apple.x = map(noise(apple.tx),0,1,-200,width+250);
    apple.y = map(noise(apple.ty),0,1,-200,height+250);
  }
}
/////////// END ////////////
