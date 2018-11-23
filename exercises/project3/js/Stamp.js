// Stamp
//
// A class to define how the stamps behaves. This will include when they appear
// on the screen and how they are moved into a selected position.

// Stamp constructor
//
// Sets the properties with the provided arguments for the stamp
function Stamp(x,y,stampImage) {
  this.x = x;
  this.y = y;
  //this.size = size;
  this.stampImage = stampImage;
  }

// Updates stamp function images
  Stamp.prototype.update = function (stampImage) {
    this.stampImage = stampImage;
  }

  // Draw images using stamp function
  Stamp.prototype.display = function () {
    image(this.stampImage,this.x,this.y);
  }
