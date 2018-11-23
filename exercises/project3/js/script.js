/*****************

Stamp
Created by Michael Watts

// Artistic collage using random images/stamps that appear and the user
// can select where on the canvas they want the stamps to appear

******************/
// Variables to contain the canvas and stamps that will be
// used during the experience
var mural;

var imageArray = [];

var currentStamp;
var stamped = false;


// preload()
//
// Description of preload

// Set up canvas called "mural" along with images for collage
function preload() {
  mural = loadImage("assets/images/mural.png");

 imageArray = [
   loadImage("assets/images/muscle.png"),
   loadImage("assets/images/heart.png"),
   loadImage("assets/images/banana.png"),
   loadImage("assets/images/arch.png"),
   loadImage("assets/images/crystal.png"),
   loadImage("assets/images/david.png"),
   loadImage("assets/images/diva.png"),
   loadImage("assets/images/fuck.png"),
   loadImage("assets/images/mercury.png"),
   loadImage("assets/images/sun.png"),
   loadImage("assets/images/tilt.png"),
 ]
}


// setup()
//
// Description of setup

function setup() {
  // Create canvas
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);

  // Create halo stamp
  currentStamp = new Stamp(width/2,height/2,imageArray[0]);
}

// draw()
//
// Description of draw()

function draw() {
  // background for display
    //background (255, 255, 255);

  // Sets up the conditions for the stamps to follow mouse and
  // be stamped when mouse is pressed

    currentStamp.x = mouseX;
    currentStamp.y = mouseY;


  // create mural to frame game
  image(mural,width/2,height/2,windowWidth,windowHeight);
}

// Calls when mouse is pressed to stamp image
function mousePressed() {
  var randomIndex = floor(random(0,imageArray.length));
  console.log("test");
  currentStamp.display();
  currentStamp.update(imageArray[randomIndex]);

}

// set up canvas size to fit in window
function windowResized() {
  // We can use the resizeCanvas() function to resize our canvas to the new window dimensions
  resizeCanvas(windowWidth,windowHeight);
}
