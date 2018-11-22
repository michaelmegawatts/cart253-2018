/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var mural;
var muscle;
var halo;

// preload()
//
// Description of preload

// Set up canvas called "mural"
function preload() {
  mural = loadImage("assets/images/mural.png");
  muscle = loadImage("assets/images/muscle.png");
  halo = loadImage("assets/images/halo.png");

}


// setup()
//
// Description of setup

function setup() {
// Create canvas
createCanvas(windowWidth,windowHeight);
imageMode(CENTER);


}


// draw()
//
// Description of draw()

function draw() {
// create mural to frame game
image(mural,width/2,height/2,windowWidth,windowHeight);
image(halo,width/2-10,height/2-170);
image(muscle,width/2,height/2);
}

function windowResized() {
  // We can use the resizeCanvas() function to resize our canvas to the new window dimensions
  resizeCanvas(windowWidth,windowHeight);
}
