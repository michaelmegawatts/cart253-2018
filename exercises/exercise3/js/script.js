/******************************************************************************
Where's Sausage Dog?
by Pippin Barr as interpreted by Michael Watts

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
// Size increase of Sausage dog and target for winning //
var targetX;
var targetY;
var targetImage;
var targetSize = 500;
var targetSizeIncrease = 20;

// Target speed and velocity
var targetSpeed = 20;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// Rectangle exists in the game, top right corner, forever!
var rectX = 0;
//var imgW;
//var imgH;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");
  //imgW = targetImage.width;
  //imgH = targetImage.height;
  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();

    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    // Added variety of sizes to mix things up //
    if (r < 0.1) {
      image(decoyImage1,x,y, 80, 80);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y, 300, 300);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y, 100, 100);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y, 160, 160);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y, 70, 70);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y, 80, 80);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y, 200, 200);
    }
  }

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);


  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);

  // Create rect to display Sausage dog on rectangle top right corner at all times //
  noStroke();
  fill(255,0,0);
  rectX = width-200;
  rect (rectX, 0, 200, 150);
  image(targetImage, rectX+80, 80);

  // Added Target text and changed typography with image displayed in rectangle //
  textFont("Georgia");
  textAlign(LEFT, TOP);
  var lostSausage = "Lost Sausage, meow!";
  fill(0, 0, 0);
  textSize(17);
  text(lostSausage, rectX+10, 20);
}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(20);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);
    //ellipse(targetX,targetY,imgW,imgH); - created a new variable

    // Draw target Image so it can increase in size with ellipse when winned //
    image(targetImage,targetX,targetY,targetImage.width,targetImage.height);
    //image(targetImage,targetX,targetY,imgW,imgH); used variable

    targetImage.width = targetImage.width + targetSpeed;
    targetImage.height = targetImage.height + targetSpeed;


  // Special notes for the future //
  /*if (imgW > windowWidth + 300 && imgH > windowHeight + 300){
    targetSpeed = -targetSpeed;
  } else if (imgW < 0 && imgH < 0 )  {
    targetSpeed = -targetSpeed;
  }

  imgW = imgW + targetSpeed;
  imgH = imgH + targetSpeed;*/

  /*if (targetImage.width > windowWidth+300 && targetImage.height > windowHeight+300){
    targetSpeed = -targetSpeed;
  }else if(targetImage.width < 0 && targetImage.height < 0) {
    targetSpeed = -targetSpeed;
  }*/

  // Added a decrease in size of target Sausage so it doesn't go into infinity //
  if (targetImage.width > windowWidth+300 && targetImage.height > windowHeight+300){
    targetImage.width = -targetImage.width + targetSpeed;
    targetImage.height = -targetImage.height + targetSpeed;
  }

    // Generate a random loop if this condition is not true for the target image //
    while (targetX > rectX || targetY < 150) {
      targetX = random (0,width);
      targetY = random (0,height);
    }
  }
}


// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
