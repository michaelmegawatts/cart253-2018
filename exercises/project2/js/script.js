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
///////// NEW //////////
// Create variables for ball and paddles to replace with images //
var floor;
var ballImage;
var leftPaddleImage;
var rightPaddleImage;

///////// END NEW //////////

///////// NEW //////////
// image set up for backdrop, adding images for paddles and ball //
function preload() {
  fontScore = loadFont("assets/fonts/dicefont.ttf");
  floor = loadImage("assets/images/tarot.png")
  ballImage = loadImage("assets/images/ball.jpg");
  leftPaddleImage = loadImage("assets/images/baphomet.jpg");
  rightPaddleImage = loadImage("assets/images/christ.jpg");

}
///////// END NEW //////////
// setup()
//
// Creates the ball and paddles
// adjusted canvas size and shape, made ball larger, made paddles larger and pulled
// them out onto the background for better visual
function setup() {
  createCanvas(700,800);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,40,40);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-60,height/2,40,90,10,DOWN_ARROW,UP_ARROW,rightPaddleImage);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(20,height/2,40,90,10,83,87,leftPaddleImage);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  //background(0);
  ///////// NEW ///////
  // created fancy backdrop for game //
  image(floor,0,0,700,800);

  // Create scoreboard with text //
  fill (255, 255, 255);
  textSize(100);
  text(ball.scoreLeft, width/2 -80,50);
  text(ball.scoreRight, width/2 +100,50);
  textAlign(CENTER,CENTER);
  textFont(fontScore);
  //////// END NEW ////////


  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  ///////// NEW ////////////
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


  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
