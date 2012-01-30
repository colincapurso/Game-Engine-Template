window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// Basic Active Object
// This is the minimum required to work with the engine
function ObjActive(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.removeFromWorld = false;
	this.last = { x: null, y: null };
	this.color = 'red';
	this.update;
	this.draw;
	this.clear;
}

// function setLastPosition(obj)
// Sets the last position of the object
// This is used for clearRect to reduce full screen redraws
function setLastPosition(obj){
	obj.last.y = obj.y;
	obj.last.x = obj.x;
}

function ObjClear(){
	if (this.last.x && this.last.y){
		var x = (0.5 + this.last.x) | 0; // Bitwise rounding hack
		var y = (0.5 + this.last.y) | 0; // Bitwise rounding hack
		var padding = 20;
		game.context.clearRect(
									x - padding,
									y - padding,
									this.w + padding + padding,
									this.h + padding + padding
									);
	}
}

function ObjDraw(){
	var x = (0.5 + this.x) | 0; // Bitwise rounding hack
	var y = (0.5 + this.y) | 0; // Bitwise rounding hack
}

function ObjUpdatePlayer(){
	setLastPosition(this);
}

function Player(x,y){
	ObjActive.call( this, x,y,87,87 );
	PhysicsPlatform.call(this);
	this.update = ObjUpdatePlayer;
	this.draw = ObjDraw;

	this.clear = ObjClear;
	this.name = 'player';
	// TEST STUFF
	this.update = platformUpdate;
	this.draw = testDraw;
	this.clear = ObjClear;
	this.camera = { x: 512, y: 280 };
}

// THIS IS FOR TESTING
function platformUpdate(){
	setLastPosition(this);
	// These functions are in physicsPlatformer.js
	this.setDirection();
	this.screenEdgeCheck();
	this.applyGravity();
	this.inputCheck();
	
	// Move
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	document.getElementById('output').innerHTML = 'x: ' + this.x + '<br/>y: ' + this.y;
}
function testDraw(){
	game.context.clearRect(0,0,1024,480);

	game.context.save();
	game.context.translate(-this.x + this.camera.x - this.w, -this.y + this.camera.y);
	for (var i=-50; i < 500; i++){
		// Background 
		game.context.fillStyle = 'green';
		game.context.fillRect(i*50, 0, 5, 480);
	}
	// Ground
	game.context.fillStyle = 'green';
	game.context.fillRect(-2500, 480, 25000, 80);
	// Wall
	game.context.fillStyle = 'green';
	game.context.fillRect(-100, 0, 100, 480);
	game.context.fillRect(game.width + 1000, 0, 100, 480);
	
	game.context.fillStyle = 'red';
	game.context.fillRect(this.x, this.y, this.w, this.h);
	
	game.context.restore();
}

////////////////////////////////////////////////////////////////
//////////////////// Starting Game Stuff ///////////////////////
////////////////////////////////////////////////////////////////
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var ASSET_MANAGER = new AssetManager();
// ASSET_MANAGER.queueDownload('img/SpriteSheet.png'); // Images for the game go in here, 1 image per line

var game = new GameEngine();

game.init = function(ctx){
	game.width = canvas.width;
	game.height = canvas.height;
	game.context = ctx;
	keyListener();
	game.addEntity( new Player(400,300) );
}

ASSET_MANAGER.downloadAll(function(){ 
	game.init(context);
	game.start();
});