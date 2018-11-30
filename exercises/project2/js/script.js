// Basic OO Pong
// by Pippin Barr spiced up by Michael Watts
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
// Press Space Bar to start game. Game goes until 33points to allow
// time for numerous balls to enter game
//
// Written with JavaScript OOP.
/////// NEW //////////
// Variables to contain the objects representing the ball, paddles,
// apple, and portal, and all visual accessories for the game
var ball;
var leftPaddle;
var rightPaddle;
var apple;
var portal;
var portalGif;

// Create variables for ball, apple, and paddles to be replaced with images
var floor;
var ballImage;
var appleImage;
var leftPaddleImage;
var rightPaddleImage;
var ballArray = []
var startingBalls = 0;
///////// END NEW //////////

////////// NEW //////////
// Setup for titles to appear at beginning and end of game
var state = "TITLE";
//////// END NEW //////////


///////// NEW //////////
// image set up for backdrop, adding images for paddles and ball, special
// fonts for score and game display, and sound effects
function preload() {
  fontScore = loadFont("assets/fonts/dicefont.ttf");
  fontGame = loadFont("assets/fonts/hultogital.ttf");
  floor = loadImage("assets/images/tarot.png");
  ballImage = loadImage("assets/images/ball.jpg");
  appleImage = loadImage("assets/images/apple.png");
  leftPaddleImage = loadImage("assets/images/baphomet.jpg");
  rightPaddleImage = loadImage("assets/images/christ.jpg");
  portalGif = createImg("assets/images/portal.gif");
  beepSFX = new Audio("assets/sounds/beep.wav");
  ballLeftSFX = new Audio("assets/sounds/baphometsound.wav");
  ballRightSFX = new Audio("assets/sounds/christsound.wav");
  appleSFX = new Audio("assets/sounds/applesound.wav");
  ///////// END NEW //////////
}

// setup()
//
// Creates the ball and paddles
// adjusted canvas size and shape, made ball larger, made paddles larger and pulled
// them out onto the background for better visual
////////// NEW ///////////
function setup() {
  createCanvas(700,900);
  // Create a ball
  ball = new Ball(width/2,height/7,5,5,40,40);
  // Create apple
  apple = new Apple(width/2,height/4,5,5,60,60);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-40,height/2,40,90,30,DOWN_ARROW,UP_ARROW,rightPaddleImage);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,40,90,30,83,87,leftPaddleImage);
  // Create portal in middle of cross
  portal = new Portal(354,370,120,120);
  //portalGif.position(354,370,120,120);

  for (var i = 0; i < startingBalls; i++) {
    ballArray.push (new Ball(i*50,i*20,10,10,40,40));
  }
}
////////// END NEW ///////////
// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  //background(0);
  ///////// NEW ///////
  // created fancy backdrop for game //
  image(floor,0,0,700,900);
  portalGif.position(294,310);
  portalGif.size(120,120);
  //image(portalGif,354,370,120,120);
  // Create scoreboard with text //
  fill (255, 255, 255);
  stroke(0,0,255);
  textSize(100);
  text(ball.scoreLeft, width/2 -80,50);
  text(ball.scoreRight, width/2 +100,50);
  textAlign(CENTER,CENTER);
  textFont(fontScore);
  //////// END NEW ////////


  /////////// NEW //////////
  // added updates for apple, ball, portal
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  apple.update();
  leftPaddle.update();
  rightPaddle.update();

  apple.handleCollision(leftPaddle);
  apple.handleCollision(rightPaddle);
  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);
  portal.handleCollisionBall(ball);
  portal.handleCollisionApple(apple);

  apple.display();
  leftPaddle.display();
  rightPaddle.display();
  portal.display();
  //////// END NEW ////////
  // array to add multiple balls to the game that also relate to score
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
    ballArray[i].handleCollision(leftPaddle);
    ballArray[i].handleCollision(rightPaddle);
    ballArray[i].display();
    var scoreBoard = ballArray[i].isOffScreen();

    if (scoreBoard == 1) {
      ball.scoreRight = ball.scoreRight +1;
    }

    else if (scoreBoard == 2) {
      ball.scoreLeft = ball.scoreLeft +1;
    }

    if (ball.scoreRight == 33 || ball.scoreLeft == 33) {
      state = "GAME OVER"
    }
    portal.handleCollisionBall(ballArray[i]);
  }

  //////// NEW /////////
  // Set up display for title and where players are in game //
  switch (state) {
    case "TITLE":
    displayTitle();
    break;

    case "GAME":
    displayGame();
    ball.update();
    ball.display();
    break;

    case "GAME OVER":
    displayGameOver();
    break;
  }
}
//////// END NEW ////////

//////// NEW //////////
// Displays the title and controls on the screen
function displayTitle() {
  // Create elements for display
  push();
  textAlign(CENTER,CENTER);
  textSize(70);
  fill(255);
  stroke(255,0,0);
  textFont(fontGame);
  // Display the text
  text("AS ABOVE SO BELOW",width/2,height/4);
  // Font size goes down
  textSize(40);
  // Display the instructions
  text("Press SPACE to play \n Baphomet   W  for  UP     S  for DOWN \n Jesus   UP or DOWN arrow keys",width/2,3*height/4);
  pop();

  // Check whether the spacebar was pressed to start the game...
  if (keyIsPressed && key === ' ') {
    // ... if it was, change the state to "GAME" so the switch statement in draw()
    // will display the game instead
    state = "GAME";
  }
}
//////// END NEW ////////

///////// NEW ////////////
// displayGame()
// Handle the display of the score
function displayGame() {
  // calling the OffScreen function for apple to return on screen
  apple.isOffScreen();
  // Create variable to calculate when score changes for each side //
  var scoreBoard = ball.isOffScreen();
  //if (ball.isOffScreen()) {
  //ball.reset();
  if (scoreBoard == 1) {
    ball.scoreRight = ball.scoreRight +1;
  }

  else if (scoreBoard == 2) {
    ball.scoreLeft = ball.scoreLeft +1;
  }

  if (ball.scoreRight == 33 || ball.scoreLeft == 33) {
    state = "GAME OVER"
  }
}
//////// END NEW ////////

/////////// NEW ///////////
// displayGameOver()
//
// Displays game over text
function displayGameOver() {
  push();
  textAlign(CENTER,CENTER);
  textSize(80);
  fill(255);
  stroke(255,0,0);
  textFont(fontGame);
  text("TISK! TISK! TISK! \n GAME OVER \n Refresh",width/2,height/1.3);
  pop();
}
///////////// END NEW ///////////
