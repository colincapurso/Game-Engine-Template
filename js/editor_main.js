window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// var ASSET_MANAGER = new AssetManager();
// ASSET_MANAGER.queueDownload('img/SpriteSheet.png'); // Images for the game go in here, 1 image per line

var game = new GameEngine();
var platformEngine = new PlatformEngine();
var player = new Player(0,128 );

game.init = function(ctx){
  // Additional Properties
	game.width = canvas.width;
	game.height = canvas.height;
	game.context = ctx;
	game.platforms = [];
  game.tileSize = 32;
  
  // Event Listeners
	keyListener();
  mouseTouchListener();

  // Active Objects
	game.addEntity( platformEngine );
	game.addEntity( player );
	// game.camera = { x: game.width/2, y: game.height/2, obj: player };
  game.camera = { x: 0, y: 0, obj: player };

  // Grid
  game.addEntity( new Grid(game.tileSize, map.length, map[0].length, map[0][0].length) );
  // Map
	createMap(game.tileSize);
  game.zoomTimer = Date.now();
}

// ASSET_MANAGER.downloadAll(function(){ });
window.onload = function(){
	game.init(context);
	game.start();
}
