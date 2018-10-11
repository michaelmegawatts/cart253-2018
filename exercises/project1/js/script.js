/******************************************************

Game - Chaser
Pippin Barr as interpreted by Michael Watts

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 30;
// changed player max radius //
var playerRadiusMax = 200;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 300;


// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
// changed max speed value //
var preyMaxSpeed = 9;
// Prey health
var preyHealth;
// changed max health value //
var preyMaxHealth = 255;
// Prey fill color
var preyFill = 300;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

// Created t (time) variable for Prey to move with noise function //
var t = 0;
var tx = 0;
var ty = 0;

// variable for sound of player when alive and when dead //
var chime;
var heartbeat;

// variable for sky background //
var sky;

// preload chime sound, preload sky image //
function preload() {
  chime = new Audio("assets/sounds/chime.mp3");
  heartbeat = new Audio("assets/sounds/heartbeat.mp3");
  sky = loadImage("assets/images/sky.png");
  fontFinal = loadFont('assets/fonts/Megrim.ttf');
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();
// heartbeat of player starts at beginning of game //
  heartbeat.play();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
// added sky image as background //
    image(sky, 0,0,500,500);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  // Shift key makes player accelerate //
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = +10;
  }
  // bringing player speed back to normal //
  else {
    playerMaxSpeed = 2;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  //playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);

// Created statement to reduce player health faster when shift is pressed //
  if (keyIsDown(SHIFT)) {
    (playerHealth = constrain(playerHealth - 1,0,playerMaxHealth));
  }
  // warning sign for player when player eats too much, it loses its health //
  else if (playerRadius > playerRadiusMax -50) {
    (playerHealth = constrain(playerHealth - 1,0,playerMaxHealth));
  }

  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
    // chime sound when player loses all its health //
    chime.play();
  }
  // if player radius reaches 0 player is dead //
  if (playerRadius <= 0) {
    gameOver = true;
  // heartbeat stops when player dies, chime begins when player reaches 0 size ÉÉ
    heartbeat.pause();
    chime.play();
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // limit the size of the player radius, playerRadiusMax //
  playerRadius = constrain(playerRadius, -.05, playerRadiusMax);

  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    //playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
    // increase player size when it eats prey //
      playerRadius = playerRadius + 0.3;
  }
  else  {
    // decrease the player size when it's not eating //
      playerRadius = playerRadius - 0.01;
  }
  // when player reaches certain size it begins to lose health //
  //if (playerRadius > playerRadiusMax - 20) {
    //playerHealth = playerHealth - .25;
  //}
}

// movePrey()
//
// Moves the prey using the noise function
function movePrey() {
// adjust values for effects with noise function //
  tx += .05;
  ty += .02;

  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
  // changed random with noise function //
    preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);
  }

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
// changed color of prey //
  fill(255, 255, 0,preyHealth);
  ellipse(preyX,preyY,preyRadius*2);
  stroke(255, 0, 0,);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  // changed color of player //
  fill(255, 0, 0,playerHealth);
  ellipse(playerX,playerY,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
// changed text size, font, spacing in text, color //
function showGameOver() {
  textSize(60);
  textAlign(CENTER,CENTER);
  fill(0);
  textFont(fontFinal);
  var gameOverText = " g a m e  o v e r \n";
  gameOverText += " you ate  ";
  gameOverText += preyEaten + "  prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);

  }
