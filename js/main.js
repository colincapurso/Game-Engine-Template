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
	this.update = ObjUpdatePlayer;
	this.draw = ObjDraw;
	this.clear = ObjClear;
	this.name = 'player';
	
	// TEST STUFF
	// MovePlatform.call(this); // Scrolling Platformer
	Move8Dir.call(this); // Overrides Update and adds a bunch of things
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
	// game.camera = { x: game.width/2, y: game.height/2, obj: game.entities[0] };
}

ASSET_MANAGER.downloadAll(function(){ 
	game.init(context);
	game.start();
});