/*****************

CLICK ART MASTERPIECE
Created by Michael Watts

Special thanks to Pippin, Sabine, Samuel, and Michael for the help!!!

// Artistic collage using random images/stamps that appear and the user
// can select where on the canvas they want the stamps to appear

******************/
// Variables to contain the canvas and stamps that will be
// used during the experience. Variables for mushrooms and array for multiple
// mushrooms.
var mural;
var mushroomImage;

var imageArray = [];
var mushroomArray = [];

var currentStamp;
var stamped = false;
var collageStamps = [];

// Display for opening of game and end
var masterpiece = "TITLE";
// Set up variable for voice recording
var mic, recorder, soundFile;
var state = 0;

// preload()
//
// Description of preload
// Set up canvas called "mural", text for introduction, set up sound ambiance,
// and array containing images for collage action
function preload() {
  mural = loadImage("assets/images/mural.png");
  fontGame = loadFont("assets/fonts/cabin.ttf");
  mushroomImage = loadImage("assets/images/mushroom.png");
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

  // set up mic input
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();

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

// Calls new image to mouse
function mouseReleased() {
  stamped =false;
}
// Calls mic to enable, record, stop, and save file for replay
function keyPressed() {
  // make sure user enabled the mic
  if (state === 0 && mic.enabled) {
    // record to our p5.SoundFile
    recorder.record(soundFile);
    state++;
  }
  else if (state === 1) {
    // stop recorder and
    // send result to soundFile
    recorder.stop();
    save(soundFile, 'mySound.wav');
    mic.stop();
    state++;
  }
  else if (state === 2) {
    //soundFile.play(); // play the result!
    //save(soundFile, 'mySound.wav');
    state++;
    //mic.stop();
  }
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
  textFont(fontGame);
  // Display the text
  text("CLKRT MSTRPC!",width/2,height/4);
  textSize(30);
  stroke(255,0,0);
  // Display the instructions for the experience
  text("Collage without the glue and scissors. Yaaasssss! \n LEFT ARROW = rotate-L \n RIGHT ARROW = rotate-R \n UP ARROW = expand \n DOWN ARROW = shrink \n SHIFT = a little magic \n CLICK on your mouse to stamp \n and don't stop, EVER ! \n \n Start by recording your voice... speak loud or use mic for best result \n Press any button to record - Say something silly or poetic - press any button to stop \n Now, press spacebar to begin a chef-d'oeuvre",width/2,height/2+50);
  pop();

  // Check whether the spacebar was pressed to start the game...
  if (keyIsPressed && key === ' ') {
    // ... if it was, change the state to "GAME" so the switch statement in draw()
    // will display the game instead
    masterpiece = "GAME";
    //Call ambiance music for collage experience
    ambianceSFX.play();
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
  // Sets up the conditions for the mushrooms to appear when key is pressed
  for (var i = 0; i < mushroomArray.length; i++) {
    mushroomArray[i].update();
    mushroomArray[i].display();
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
// Set up for arrow keys to rotate or scale stamps, and add mushrooms
function handleInput() {
  if(keyIsDown(LEFT_ARROW)) {
    currentStamp.stampAngle -= 0.1;
    //play recorded sound when key is pressed
    if (soundFile.isPlaying() === false) {
      soundFile.play();
    }
  }
  if(keyIsDown(RIGHT_ARROW)) {
    currentStamp.stampAngle += 0.1;
  }
  if(keyIsDown(UP_ARROW)) {
    currentStamp.stampSize += 0.1;
  }
  if(keyIsDown(DOWN_ARROW)) {
    currentStamp.stampSize -= 0.1;
  }
  if(keyIsDown(SHIFT)) {
    mushroomArray.push(new Mushroom(random(width),random(height),random(10),random(10),40,40));
  }
}

// mouseClick triggers envelope
function mouseClicked() {
  // is mouse over canvas?

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
  text("Your artistic experience is terminated \n sorry Warhol? \n Don't give up your day job \n REFRESH to play again :)",width/2,height/2);
  pop();
}

// set up canvas size to fit in window
function windowResized() {
  // We can use the resizeCanvas() function to resize our canvas to the new window dimensions
  resizeCanvas(windowWidth,windowHeight);
}
