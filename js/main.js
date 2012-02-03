window.requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var ASSET_MANAGER = new AssetManager();

var game = new GameEngine();
var platformEngine = new PlatformEngine();
var player = new Player(0,100);

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

  // Load Map
  mapGameReload();
};

window.onload = function(){
  game.init(context);
  game.start();
};
// ASSET_MANAGER.downloadAll(function(){ });