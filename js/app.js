// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    // Enemy can appear randomly in each of the 3 chosen rows
    this.y =  randomRow() || 54;
    this.speed = randomSpeed();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 80 * this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
        this.y = randomRow();
        this.speed = randomSpeed();
    }
}

function randomRow() {
    var yLocations = [220, 137, 54];
    var randomIndex = Math.floor((Math.random() * 10)/4);
    return yLocations[randomIndex];
}

function randomSpeed() {
    return Math.ceil((Math.random() * 10)/2);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 386;
}

Player.prototype.update = function() {
    if (this.x < 0) this.x += 101;
    else if (this.x > 404) this.x -= 101;
    if (this.y > 386) this.y = 386;
    else if (this.y <= -29) {
        this.x = 202;
        this.y = 386;
    }
}

Player.prototype.render = function() {    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left')
        this.x -= 101;
    else if (key === 'right')
        this.x += 101;
    else if (key === 'up') 
        this.y -= 83;
    else this.y += 83;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 6; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
