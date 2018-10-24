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
var ball;
var leftPaddle;
var rightPaddle;


function preload () {
  fontRegular = loadFont('assets/fonts/megrim.ttf');
}
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,color(0,0,255));
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,color(255,0,0));
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  ///////// NEW //////////
  // added text to keep score //
  fill(255);
  textSize(50);
  text(ball.scoreLeft, 250,20);
  text(ball.scoreRight, 400, 20);
  textAlign(CENTER,CENTER);
  textFont(fontRegular);
  ///////// END NEW //////////


  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  var scoreBoard = ball.isOffScreen();

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
