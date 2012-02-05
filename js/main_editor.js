window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload('img/buttons.png'); // Images for the game go in here, 1 image per line
ASSET_MANAGER.queueDownload('img/tiles.png');

var game = new GameEngine();
var platformEngine = new PlatformEngine();

ASSET_MANAGER.downloadAll(function(){ 
  game.init(context);
  game.start();
});
