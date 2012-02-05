var game = new GameEngine();
var platformEngine = new PlatformEngine();

var player = new Player(3000,100, 54, 84);
var tileSize = { w: 64 , h: 64 };

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
  
  // Add Images
  player.image = ASSET_MANAGER.getAsset('img/playerPlaceholder.png');
  
  // Load Map
  game.tileSize = tileSize;
  mapGameReload();
};