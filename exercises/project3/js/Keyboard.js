// Keyboard
//
// A class that defines how certain keys behave, including

// keyboard constructor
//
// Sets the properties with the provided arguments or defaults
function Keyboard(x,y,w,h,leftKey,rightKey,currentStamp) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.downKey = leftKey;
  this.upKey = rightKey;
  this.keyboardImage = keyboardImage;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Keyboard.prototype.handleInput = function() {

}

// update()

Keyboard.prototype.update = function() {

}

// display()
//
//
Keyboard.prototype.display = function() {
  /////// NEW /////////
  // Use image for keyboard
  //image(this.paddleImage,this.x,this.y,this.w,this.h);
}
