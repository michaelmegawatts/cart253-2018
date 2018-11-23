// Stamp
//
// A class to define how the stamps behaves. This will include when they appear
// on the screen and how they are moved into a selected position.

// Halo constructor
//
// Sets the properties with the provided arguments
function Stamp(x,y,stampImage) {
  this.x = x;
  this.y = y;
  //this.size = size;
  this.stampImage = stampImage;
  }

  Stamp.prototype.update = function (stampImage) {
    this.stampImage = stampImage;
  }

  // Draw the halo as an image on screen
  Stamp.prototype.display = function () {
    image(this.stampImage,this.x,this.y);
  }
