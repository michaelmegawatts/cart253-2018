/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr as interpreted by Michael Watts

Starter code for exercise 2.

*********************************************************/
// Setting canvas color
var canvasColor;

// The position and size of our Arnold Schwarzenegger
var avatarX;
var avatarY;
var avatarSize = 100;

// Create new avater with Arnold Schwarzenegger
var avatarImage;
var avatarImageSize = 20;

// The speed and velocity of our avatar Arnold
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;
// var avatarSizeIncrease = 20;
// var avatarSpeedIncrease = 0.5;

// The position and size of the enemy Beyonce
var enemyX;
var enemyY;
var enemySize = 100;
// How much bigger the enemy Beyonce gets with each successful dodge
var enemySizeIncrease = 20;
// The enemy Beyonce Pizza image
var enemyImage;

// The speed and velocity of our enemy Beyonce
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy Beyonce gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made

var dodges = 0;


function preload() {
  fontRegular = loadFont('assets/fonts/cubicblock_s.ttf');
  enemyImage = loadImage("assets/images/enemy.png");
  avatarImage = loadImage("assets/images/avatar.png");
}

// setup()
//
// Make the canvas, position the avatar and enemy
function setup() {
  // Create our playing area
  createCanvas(500,500);
  canvasColor = color(255,225,0);

  // Put the avatar in the centre
  avatarX = width/0;
  avatarY = height/0;

  // Size of avatar changes randomly
  // avatarSize = random;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
// Create new canvas color
// Canvas color change for special circumstance with Beyonce
// add number score with new font
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A yellow background
  // Change Pippin's background to ...
  background(canvasColor);
  if (enemyX > width/1.5) {
    canvasColor = color(255,0,0);
  }
  else {
    canvasColor = color(255,225,0);
  }

  textSize(60);
  text(dodges, 1, 499);
  textAlign(LEFT,BOTTOM);
  textFont(fontRegular)

  // The enemy is Beyonce Pizza
  image(enemyImage,enemyX,enemyY,enemySize,enemySize);
  // The avatar is Arnold Schwarzenegger
  image(avatarImage,avatarX,avatarY,avatarSize,avatarSize);


  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;


  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 75;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    avatarSize = 100;
    avatarSpeed = 10;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 150;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    avatarSize = 100;
    avatarSpeed = 10;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
    // Increasing or decreasing size and speed of Arnold
    avatarSize = random(1,100);
    avatarSpeed = random(5,25);

  }



  // Display the current number of successful in the console
  console.log(dodges);


  // The text is blue
  fill(0,0,255);


}
