// Stamp
//
// A class to define how the stamps behaves. This will include when they appear
// on the screen and how they are moved into a selected position.

// Stamp constructor
//
// Sets the properties with the provided arguments for the stamp
function Stamp(x,y,stampImage,stampSize) {
  this.x = x;
  this.y = y;
  this.stampAngle = 0;
  this.stampImage = stampImage;
  this.stampSize = this.stampSize;
  }

// Updates stamp function images
  Stamp.prototype.update = function (stampImage) {
    this.stampImage = stampImage;
  }

  // Draw images using stamp function
  Stamp.prototype.display = function () {
    push();
    translate(this.x,this.y);
    rotate(this.stampAngle);
    image(this.stampImage,0,0);
    pop();
  }
