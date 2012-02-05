window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload('img/buttons.png');
ASSET_MANAGER.queueDownload('img/tiles.png');
ASSET_MANAGER.queueDownload('img/playerPlaceholder.png');

ASSET_MANAGER.downloadAll(function(){
  game.init(context);
  game.start();
});
