window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload('img/playerPlaceholder.png');

var game = new GameEngine();
var platformEngine = new PlatformEngine();
var player = new Player(3000,100, 54, 84);
var tileSize = { w: 60 , h: 50 };

game.init = function(ctx){
  game.width = canvas.width;
  game.height = canvas.height;
  game.context = ctx;
  game.platforms = [];
  
  // Event Listeners
  keyListener();

  // Active Objects
  game.addEntity( platformEngine );
  game.addEntity( player );
  game.camera = { x: 500, y: 150, obj: player };
  
  // Assign Images
  player.image = ASSET_MANAGER.getAsset('img/playerPlaceholder.png');

  // Load Map
  game.tileSize = tileSize;
  mapGameReload();
};

ASSET_MANAGER.downloadAll(function(){
  game.init(context);
  game.start();
});
