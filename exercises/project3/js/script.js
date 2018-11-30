/*****************

CLICK ART MASTERPIECE
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

// Display for opening of game and end
var masterpiece = "TITLE";



// preload()
//
// Description of preload

// Set up canvas called "mural", text for introduction, set up sound ambiance, and array containing images for collage action
function preload() {
  mural = loadImage("assets/images/mural.png");
  fontGame = loadFont("assets/fonts/cabin.ttf");

  ambianceSFX = loadSound("assets/sounds/ambiance.wav");

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
    loadImage("assets/images/astroboy.png"),
    loadImage("assets/images/atlas.png"),
    loadImage("assets/images/keith.png"),
  ]
}

// setup()
//
// Description of setup

function setup() {
  // Create canvas
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);

  //reverb = new p5.Reverb();
  //ambianceSFX.disconnect();

  // Create stamp function
  currentStamp = new Stamp(width/2,height/2,imageArray[0]);
}

// draw()
//
// Description of draw()
function draw() {
  // background for display
  background (255, 255, 255);


  // Set up instructions for when player experience begins and ends
  switch (masterpiece) {
    case "TITLE":
    displayTitle();
    break;

    case "GAME":
    displayGame();
    break;

    case "GAME OVER":
    displayGameOver();
    break;
  }

  // create mural to frame game
  image(mural,width/2,height/2,windowWidth,windowHeight);
}

// Calls random image to stamp and allows user to place image
function mousePressed() {
  stamped =true;
  // calls array for new image and to keep image displayed on canvas after mouse is pressed
  collageStamps.push(currentStamp);
  var randomIndex = floor(random(0,imageArray.length));
  currentStamp = new Stamp (mouseX,mouseY,imageArray[randomIndex]);
}

// function that adds new image to mouse
function mouseReleased() {
  stamped =false;
}
// displayTitle()
//
// Displays the title and controls on screen
function displayTitle() {
  // Create elements for display
  push();
  textAlign(CENTER,CENTER);
  textSize(100);
  fill(0,0,0);
  //stroke(255,0,0);
  textFont(fontGame);
  // Display the text
  text("CLKRT MSTRPC!",width/2,height/4);
  // Font size goes down
  textSize(30);
  stroke(255,0,0);
  // Display the instructions
  text("Collage without the glue and scissors. Yaaasssss! \n LEFT ARROW = rotate-L \n RIGHT ARROW = rotate-R \n UP ARROW = expand \n DOWN ARROW = shrink \n CLICK on your mouse to stamp \n and don't stop, EVER ! \n Press spacebar to begin a chef-d'oeuvre \n NOW ! ",width/2,height/2+50);
  pop();

  // Check whether the spacebar was pressed to start the game...
  if (keyIsPressed && key === ' ') {
    // ... if it was, change the state to "GAME" so the switch statement in draw()
    // will display the game instead
    masterpiece = "GAME";

    // Loop for ambiance music for collage experience
    ambianceSFX.play();
    ambianceSFX.loop = true;
  }
}
// displayGame()
//
function displayGame() {
  //Create introductory text on screen
  fill(0, 0, 0);
  stroke(255,0,0);
  textFont(fontGame);
  textSize(100);
  textAlign(CENTER,CENTER);

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

  handleInput();
}
// handleInput ()
//
// Set up for arrow keys to rotate or scale stamps
function handleInput() {
  if(keyIsDown(LEFT_ARROW)) {
    currentStamp.stampAngle -= 0.1;
  }
  if(keyIsDown(RIGHT_ARROW)) {
    currentStamp.stampAngle += 0.1;
  }
  if(keyIsDown(UP_ARROW)) {
    currentStamp.stampSize += 0.1;
  }
  if(keyIsDown(DOWN_ARROW)) {
    currentStamp.stampSize -= 0.1;

    //ambianceSFX.connect();
    //reverb.process(ambianceSFX,10,20);
    //ambianceSFX.play();
  }
}

// TO BE DETERMINED LATER -- displayGameOver()
//
// Displays game over text
function displayGameOver() {
  push();
  textAlign(CENTER,CENTER);
  textSize(80);
  fill(255);
  stroke(255,0,0);
  textFont(fontGame);
  text("Your artistic experience is over \n what is the point? \n Don't give up your day job",width/2,height/2);
  pop();
}

// set up canvas size to fit in window
function windowResized() {
  // We can use the resizeCanvas() function to resize our canvas to the new window dimensions
  resizeCanvas(windowWidth,windowHeight);
}
