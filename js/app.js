
//this above function is to randomize the speed of the ladybugs
var randomSpeed = function(){
    var runSpeed = (Math.floor(Math.random()* 5) + 1) * 75;
    return runSpeed;
}

//this is to randomize the row of the gem
var row = [60, 145, 230];
var randomRow = function(){
    getRandomRow = row[Math.floor(Math.random()* row.length)];
    return getRandomRow;
}
//this is to randomize the column of the gem
//these two took a while to figure out
var column = [0,101, 202, 303, 404, 505, 606];
var randomColumn = function(){
    getRandomColumn = column[Math.floor(Math.random()* column.length)];
    return getRandomColumn;
}
//this is a gem....this is its object
var Gem = function(x,y){
    this.sprite = "images/Gem-Blue.png";
    this.x = x;
    this.y = y;
}
//enemy object
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.sprite = "images/enemy-bug.png";
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < ctx.canvas.width){
        this.x += this.speed * dt;
    }
    else {
        this.x = -100;
        this.speed = randomSpeed();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//this is my player
var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}
//this contains the player reset...you hit the water you reset
Player.prototype.update = function(dt){
    if(this.y < 50){
        player.reset();
    }
    playerPosition = {
        'left':   this.x,
        'top': this.y,
        'right':  this.x+50,
        'bottom':    this.y+70,
    }
    for(e=0; e<allEnemies.length; e++){
        bugPosition = {
            'left':   allEnemies[e].x,
            'top': allEnemies[e].y,
            'right':  allEnemies[e].x+70,
            'bottom':    allEnemies[e].y+70,
        }
        if(playerPosition.left<bugPosition.right &&
            playerPosition.top<bugPosition.bottom &&
            playerPosition.right>bugPosition.left &&
            playerPosition.bottom>bugPosition.top){
            player.reset();
    }
}
  
}
//the above collision took forever to figure out
//below is my movment
Player.prototype.handleInput = function(direction){
    if(direction === 'left' && this.x > 25){
        this.x -=100;
    }
    if(direction === 'up' && this.y > 0){
        this.y -= 82.5;
    }
    if(direction === 'right' && this.x < 400){
        this.x += 100;
    }
    if(direction === 'down' && this.y < 400){
        this.y +=82.5;
    }
}


//renders the gem

Gem.prototype.render= function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}




Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}


//6 emenys, yeah thats right 6 enemeys on a small board it will make the game hard

var enemy1 = new Enemy(0, 60, 100);
var enemy2 = new Enemy(0, 145, 200);
var enemy3 = new Enemy(0, 230, 300);
var enemy4 = new Enemy(0, 145, 350);
var enemy5 = new Enemy(0, 60, 120);
var enemy6 = new Enemy(0, 230, 250);

var allEnemies = [enemy1,enemy2,enemy3,enemy4, enemy5, enemy6];
// new player
var player = new Player(200, 400);

var gem = new Gem(randomColumn(), randomRow());

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
};

    player.handleInput(allowedKeys[e.keyCode]);
});