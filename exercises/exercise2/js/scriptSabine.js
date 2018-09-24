/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made

var dodges = 0;
textSize(75);
text(dodges, width/2, height/2);
textAlign(LEFT,BOTTOM);
textFont(Impact, Charcoal, sans-serif)



// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);
  // A pink background
  background(255,220,220);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);



  // No stroke so it looks cleaner
  noStroke();

}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {

  // A pink background
  background(255,220,220);

  // Display the current number of successful in the console
  //console.log(avatarX);

  // The player is black
  fill(0);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);
     //avatarX=avatarX+1;
    //avatarY=avatarY+1;

  // The enemy is red
  fill(255,0,0);
  // Draw the enemy as a circle
  ellipse(enemyX,enemyY,enemySize,enemySize);

  // The text is blue
  fill(0,0,255);


}
