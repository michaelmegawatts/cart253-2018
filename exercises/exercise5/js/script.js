// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
///////// NEW /////////
// added variable for fancy backdrop //
var ball;
var leftPaddle;
var rightPaddle;
var wall;
///////// END NEW /////////

function preload () {
  ///////// NEW /////////
  // added functions for sounds, backdrop and scoreboard //
  fontRegular = loadFont('assets/fonts/lment.otf');
  beepSFX = new Audio("assets/sounds/beep.wav");
  ballRightSFX = new Audio("assets/sounds/bleep.wav");
  ballLeftSFX = new Audio("assets/sounds/laser.wav");
  wall = loadImage("assets/images/wall.jpeg");
  ///////// END NEW /////////
}
// setup()
//
// Creates the ball and paddles
function setup() {
  //createCanvas(700,480);
  ////////// NEW ///////////
  createCanvas(700,700);
  // change ball size and paddle size, brought them out more on canvas //
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,30,30);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-40,height/2,20,60,10,DOWN_ARROW,UP_ARROW,color(0,0,255));
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(20,height/2,20,60,10,83,87,color(255,0,0));
} ////////// END NEW ///////////

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  //background(0);
  image(wall,0,0,700, 700);
  ///////// NEW //////////
  // added text to keep score //
  fill (128, 0, 128);
  textSize(150);
  text(ball.scoreLeft, width/2 -100,35);
  text(ball.scoreRight, width/2 +100,35);
  textAlign(CENTER,CENTER);
  textFont(fontRegular);
  ///////// END NEW //////////

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  /////////  NEW //////////
  // added paddles in function for changing of color //
  var scoreBoard = ball.isOffScreen(leftPaddle, rightPaddle);
  /////////  END NEW //////////

  /////////  NEW //////////
  // statement to calculate when score changes for each side //
  if (scoreBoard == 1) {
    // offscreen left
    //ball.reset();
    ball.scoreRight = ball.scoreRight + 1;
  }

  else if (scoreBoard == 2) {
    // offscreen right
    //ball.reset();
    ball.scoreLeft = ball.scoreLeft + 1;
  }
  ///////// END NEW //////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
