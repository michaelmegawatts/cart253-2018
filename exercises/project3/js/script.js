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
var collageStamps = [];


// preload()
//
// Description of preload

// Set up canvas called "mural" along array containing images for collage action
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
    loadImage("assets/images/bolt.png"),
    loadImage("assets/images/steve.png"),
    loadImage("assets/images/clown.png"),
  ]
}


// setup()
//
// Description of setup

function setup() {
  // Create canvas
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);

  // Create stamp function
  currentStamp = new Stamp(width/2,height/2,imageArray[0]);
}

// draw()
//
// Description of draw()

function draw() {
  // background for display
  background (255, 255, 255);

  // Sets up the conditions for the stamps to follow mouse and
  // be stamped when mouse is pressed

  // call the collageStamps array to keep them displayed on canvas
  for(var i = 0; i < collageStamps.length; i++) {
    collageStamps[i].display();
  }

  // add a random image to mouse location
  if (stamped === false) {
    currentStamp.x = mouseX;
    currentStamp.y = mouseY;
    currentStamp.display();
  }
  // create mural to frame game
  image(mural,width/2,height/2,windowWidth,windowHeight);
}

// Calls random image to stamp and allows user to place image
function mousePressed() {
  stamped =true;
  var randomIndex = floor(random(0,imageArray.length));
  console.log("test");
  // calls array for new image and to keep image displayed on canvas after mouse is pressed
  collageStamps.push(new Stamp (currentStamp.x,currentStamp.y,currentStamp.stampImage));
  currentStamp.update(imageArray[randomIndex]);
}
// function that adds new image to mouse
function mouseReleased() {
  stamped =false;
}

// set up canvas size to fit in window
function windowResized() {
  // We can use the resizeCanvas() function to resize our canvas to the new window dimensions
  resizeCanvas(windowWidth,windowHeight);
}
