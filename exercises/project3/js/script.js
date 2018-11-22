/*****************

Stamp
Created by Michael Watts

// Artistic collage using random images/stamps that appear and the user
// can select where on the canvas they want the stamps to appear

******************/
// Variables to contain the canvas and stamps that will be
// used during the experience
var mural;
var muscle;

var haloImage;
var haloStamp;
var stamped = false;


// preload()
//
// Description of preload

// Set up canvas called "mural" along with images for collage
function preload() {
  mural = loadImage("assets/images/mural.png");
  muscle = loadImage("assets/images/muscle.png");
  haloImage = loadImage("assets/images/halo.png");
}


// setup()
//
// Description of setup

function setup() {
  // Create canvas
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);

  // Create halo stamp
  haloStamp = new Stamp(width/2,height/2,haloImage);
}


// draw()
//
// Description of draw()

function draw() {
  // background for display
  background (255, 255, 255);

  // Sets up the conditions for the stamps to follow mouse and
  // be stamped when mouse is pressed 
  if (stamped === false) {
    haloStamp.x = mouseX;
    haloStamp.y = mouseY;
  }
  // set up display for stamps
  haloStamp.display ();

  // create mural to frame game and muscle image as main starting piece
  image(muscle,width/2,height/2);
  image(mural,width/2,height/2,windowWidth,windowHeight);
}

// Calls when mouse is pressed to stamp image
function mousePressed() {
  stamped = true;
}

// set up canvas size to fit in window
function windowResized() {
  // We can use the resizeCanvas() function to resize our canvas to the new window dimensions
  resizeCanvas(windowWidth,windowHeight);
}
