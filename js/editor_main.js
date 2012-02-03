window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload('img/buttons.png'); // Images for the game go in here, 1 image per line
ASSET_MANAGER.queueDownload('img/tiles.png');

var game = new GameEngine();
var platformEngine = new PlatformEngine();
var player = new Player(-100,-100 );
var cursor = new Cursor();


game.init = function(ctx){
  // Additional Properties
	game.width = canvas.width;
	game.height = canvas.height;
	game.context = ctx;
	game.platforms = [];
  
  // Event Listeners
	keyListener();
  mouseTouchListener();

  // Active Objects
	game.addEntity( platformEngine );
	game.addEntity( player );
	// game.camera = { x: game.width/2, y: game.height/2, obj: player };
  game.camera = { x: 0, y: 0, obj: player };

  // Map
  game.tileSize = 32;
  game.map = getMap(templateMap);
  
  // DrawUI is in the Grid() object
  game.addEntity( new Grid(game.tileSize, game.map.length, game.map[0].length, game.map[0][0].length) );

  game.addEntity( cursor );
  createMap();
  game.zoomTimer = Date.now();
  game.clickTimer = Date.now();
  
  // Set Images
  game.img = {
    buttons: ASSET_MANAGER.getAsset('img/buttons.png'),
    tiles: ASSET_MANAGER.getAsset('img/tiles.png')
  };
}

ASSET_MANAGER.downloadAll(function(){ 
	game.init(context);
	game.start();
});
