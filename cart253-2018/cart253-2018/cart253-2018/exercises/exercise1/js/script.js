// Exercise 1 - Moving pictures
// Michael Watts
//
// Starter code for exercise 1.
// It moves four pictures around on the canvas.
// One moves linearly from left to right.
// One moves toward the mouse cursor.
// One is displayed at the current mouse location
// One follows mouse cursor at different speed

// The image of Beyonce serving pizza, called pizza
var pizzaImage;
// The starting position of pizza
var pizzaImageX;
var pizzaImageY;

// The image of a monkey
var monkeyImage;
// The starting position of the monkey
var monkeyImageX;
var monkeyImageY;

// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The image of a muscle man
var muscleImageX;
var muscleImageY;


// preload()
//
// Load the new red monkey image

function preload() {
  muscleImage = loadImage("assets/images/muscle.png");
  pizzaImage = loadImage("assets/images/pizza.png");
  monkeyImage = loadImage("assets/images/monkey.png");
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start muscles image at center of canvas
  muscleImageX = width/2;
  muscleImageY = height/2;

  // Start pizza image at center of canvas
  pizzaImageX = width/2;
  pizzaImageY = height/2;

  // Start monkey image at the left of canvas and off screen
  monkeyImageX = 0 - monkeyImage.width/2;
  monkeyImageY = height/2;

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move monkey image from left to right
  monkeyImageX += 1;

  // Display monkey image
  image(monkeyImage,monkeyImageX,monkeyImageY);

  // Move the pizza by moving the mouseX

  // Calculate the distance in X and in Y
  var xDistance = mouseX - pizzaImageX;
  var yDistance = mouseY - pizzaImageY;

  // Add 2/10th of the x and y distance to the pizza's current (x,y) location
  pizzaImageX = pizzaImageX + 2*xDistance/10;
  pizzaImageY = pizzaImageY + 2*yDistance/10;

  // Dispay Beyonce serving pizza, pizza image
  image(pizzaImage,pizzaImageX,pizzaImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);


  // Show muscle man in middle of canvas
  image(muscleImage,muscleImageX,muscleImageY);

}
