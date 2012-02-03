var chunk0 = [];
var chunk1 = [];
var chunk2 = [];
var chunk3 = [];
var chunk4 = [];
/*
1 chunk = 16x10
[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
*/
chunk0 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
chunk1 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
chunk2 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0],[1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0],[1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1]];
chunk3 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,0],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
chunk4 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

var templateMap = [ chunk0,chunk1,chunk2,chunk3,chunk4 ];

function zoom(){
  if ( keysDown['minus'] || keysDown['minus1'] ){
    var now = Date.now();
    if ( game.tileSize > 16 && now > game.zoomTimer+100){
      game.tileSize = game.tileSize/1.1;
      game.zoomTimer = now;
      delete keysDown['minus'];
      delete keysDown['minus1'];
      for (var i=0; i<game.platforms.length; i++){ game.platforms[i].init(); }
    }
  } else if ( keysDown['plus'] || keysDown['plus1']){
    var now = Date.now();
    if ( game.tileSize < 256 && now > game.zoomTimer+100){
      game.tileSize = game.tileSize*1.1;
      game.zoomTimer = now;
      delete keysDown['plus'];
      delete keysDown['plus1'];
      for (var i=0; i<game.platforms.length; i++){ game.platforms[i].init(); }
    }
  }
}

function Grid(blockSize, chunks, blocksUp, blocksAcross){
  this.x = 0;
  this.y = 0;
  this.last = { x: 0, y: 0 };
  this.chunks = chunks;
  this.blocksUp = blocksUp;
  this.blocksAcross = blocksAcross;
  this.removeFromWorld = false;
  this.update = function(){
	  // Updates not required for grid
  };
  this.draw = function(ctx){
    for (var i=0; i < this.blocksUp+1; i++){
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, game.tileSize * i);
      ctx.lineTo(this.chunks * this.blocksAcross * game.tileSize, game.tileSize * i);
      ctx.closePath();
      ctx.stroke();
    }
    for (var i=0; i < this.chunks*this.blocksAcross+1; i++){
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(game.tileSize * i, 0);
      ctx.lineTo(game.tileSize * i, game.tileSize * 10);
      ctx.closePath();
      ctx.stroke();
    }
    drawUI();
  };
}

function mapSave(){
  // Saves to localStorage
  setMap(game.map);
}

function mapLoad(){
  // Loads from localStorage
  game.map = getMap();
}

function mapReset(){
  mapClear();
  game.map = [ chunk0,chunk1,chunk2,chunk3,chunk4 ];
}

function mapReload(){
  if (!game.map){ mapLoad(); }
  if (!game.tileSize){ game.tileSize = 32; }
  var map = game.map;
  var mapWidth;
  mapWidth = map[0][0].length;

  for (var i=0; i<map.length; i++){
    for (var y=0; y<map[0].length; y++){
      for (var x=0; x<map[0][0].length; x++){
        switch( map[i][y][x] ){
          case 1: platformEngine.add( new MapTile(x, y, i, mapWidth, mapWidth) ); break;
          case 2: platformEngine.add( new MapSpring(x, y, i, mapWidth, mapWidth) ); break;
        }
      }
    }
  }
}

function mapGameReload(){
  if (!game.map){ mapLoad(); }
  if (!game.tileSize){ game.tileSize = 64; }

  var map = game.map;
  var blockSize = game.tileSize;
  var mapWidth; 
  mapWidth = blockSize * map[0][0].length;
  var px = x*blockSize+i*mapWidth;
  var py = y*blockSize;
  var pw = blockSize-2;
  var ph = blockSize-2;

  for (var i=0; i<map.length; i++){
    for (var y=0; y<map[0].length; y++){
      for (var x=0; x<map[0][0].length; x++){
        switch( map[i][y][x] ){
          case 1: platformEngine.add( new Platform(x*blockSize+i*mapWidth, y*blockSize, blockSize-2, blockSize-2) ); break;
          case 2: platformEngine.add( new Spring(x*blockSize+i*mapWidth, y*blockSize, blockSize-2, blockSize-2, 0) ); break;
        }
      }
    }
  }
}

/*
function createMap(){
  var map = game.map;
  var mapWidth = map[0][0].length;
  var tileSize = game.tileSize;
  for (var chunk=0; chunk<map.length; chunk++){
    for (var y=0; y<map[0].length; y++){
      for (var x=0; x<map[0][0].length; x++){
        switch( map[chunk][y][x] ){
          case 1: platformEngine.add( new Tiles(x, y, chunk, tileSize, mapWidth) ); break;
          case 2: platformEngine.add( new Spring(x, y, chunk, tileSize, mapWidth) ); break;
        }
      }
    }
  }
}
*/

function mapClear(){
  var map = game.map;

  // Wipes Map Data
  for (var chunk=0; chunk<map.length; chunk++){
    for (var y=0; y<map[0].length; y++){
      for (var x=0; x<map[0][0].length; x++){
        game.map[chunk][y][x] = 0;
      }
    }
  }

  // Wipes Objects from game.platforms
  for (var i=0; i<game.platforms.length; i++){
    game.platforms[i].removeFromWorld = true;
  }
}

function mapTileAdd(chunk,y,x,tile){
  var map = game.map;
  var mapWidth = map[0][0].length;
  
  // Update Map
  game.map[chunk][y][x] = tile;
  
  // Update Game Platforms
  platformEngine.add( new MapTile(x, y, chunk, mapWidth, mapWidth) );
}

function mapTileRemove(chunk,y,x){
  // Update Map
  game.map[chunk][y][x] = 0;
  
  var gamex = (x * game.tileSize) + (chunk * game.map[0][0].length * game.tileSize);;
  var gamey = y * game.tileSize;

  // Update Game Platforms
  for (var i=0; i<game.platforms.length; i++){
    if (game.platforms[i].chunk == chunk
        && game.platforms[i].y == gamey
        && game.platforms[i].x == gamex){
      game.platforms[i].removeFromWorld = true;
    }
  }
}

function getMap(){
  return storage.get('map');
}
function setMap(map){
  storage.set('map', map);
}