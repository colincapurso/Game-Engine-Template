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

function zoom(){
  if ( keysDown['minus'] || keysDown['minus1'] ){
    var now = Date.now();
    if ( game.tileSize.w > 16 && now > game.zoomTimer+100){
      game.tileSize.w = game.tileSize.w/1.1;
      game.tileSize.h = game.tileSize.h/1.1;
      game.zoomTimer = now;
      delete keysDown['minus'];
      delete keysDown['minus1'];
      for (var i=0; i<game.platforms.length; i++){ game.platforms[i].init(); }
    }
  } else if ( keysDown['plus'] || keysDown['plus1']){
    var now = Date.now();
    if ( game.tileSize.w < 256 && now > game.zoomTimer+100){
      game.tileSize.w = game.tileSize.w*1.1;
      game.tileSize.h = game.tileSize.h*1.1;
      game.zoomTimer = now;
      delete keysDown['plus'];
      delete keysDown['plus1'];
      for (var i=0; i<game.platforms.length; i++){ game.platforms[i].init(); }
    }
  }
}

function GridAndUI(blockSize, chunks, blocksUp, blocksAcross){
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
      ctx.moveTo(0, game.tileSize.h * i);
      ctx.lineTo(this.chunks * this.blocksAcross * game.tileSize.w, game.tileSize.h * i);
      ctx.closePath();
      ctx.stroke();
    }
    for (var i=0; i < this.chunks*this.blocksAcross+1; i++){
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(game.tileSize.w * i, 0);
      ctx.lineTo(game.tileSize.w * i, game.tileSize.h * 10);
      ctx.closePath();
      ctx.stroke();
    }
    drawUI();
  };
}

function mapSave(){
  // Saves to localStorage
  storage.set('map', game.map);
}

function mapLoad(){
  // Loads from localStorage
  game.map = storage.get('map');
}

function mapResetDefault(){
  var chunk0 = chunk1 = chunk2 = chunk3 = chunk4 = []; // A fix type mismatch bug in Eclipse.
  chunk0 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
  chunk1 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
  chunk2 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0],[1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0],[1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1]];
  chunk3 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,0],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
  chunk4 = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
  game.map = [ chunk0,chunk1,chunk2,chunk3,chunk4 ];
}

function mapClear(){
  var chunkTotal = game.map.length;
  var mapHeight = game.map[0].length;
  var mapWidth = game.map[0][0].length;

  // Wipes Map Data
  for (var chunk=0; chunk < chunkTotal; chunk++){
    for (var y=0; y < mapHeight; y++){
      for (var x=0; x < mapWidth; x++){
        game.map[chunk][y][x] = 0;
      }
    }
  }

  // Wipes Objects from game.platforms
  for (var i=0; i<game.platforms.length; i++){
    game.platforms[i].removeFromWorld = true;
  }
}

function mapReload(){
  if (!game.map){ mapLoad(); }
  if (!game.tileSize){ game.tileSize = { w: 32 , h: 32 }; }

  var chunkTotal = game.map.length;
  var mapHeight = game.map[0].length;
  var mapWidth = game.map[0][0].length;

  for (var chunk=0; chunk < chunkTotal; chunk++){
    for (var y=0; y < mapHeight; y++){
      for (var x=0; x < mapWidth; x++){
        switch( game.map[chunk][y][x] ){
          case 1: platformEngine.add( new MapTile(x, y, chunk, 1) ); break;
          case 2: platformEngine.add( new MapTile(x, y, chunk, 2) ); break;
          case 3: platformEngine.add( new MapTile(x, y, chunk, 3) ); break;
          case 4: platformEngine.add( new MapTile(x, y, chunk, 4) ); break;
          case 5: platformEngine.add( new MapTile(x, y, chunk, 5) ); break;
          case 6: platformEngine.add( new MapTile(x, y, chunk, 6) ); break;
          case 7: platformEngine.add( new MapTile(x, y, chunk, 7) ); break;
        }
      }
    }
  }
}

function mapGameReload(){
  if (!game.map){ mapLoad(); }
  if (!game.tileSize){ game.tileSize =  { w: 60 , h: 50 }; }

  var map = game.map;
  var blockSizeW = game.tileSize.w;
  var blockSizeH = game.tileSize.h;
  var mapWidth; 
  mapWidth = blockSizeW * map[0][0].length;

  for (var i=0; i<map.length; i++){
    for (var y=0; y<map[0].length; y++){
      for (var x=0; x<map[0][0].length; x++){
        var px = x*blockSizeW+i*mapWidth;
        var py = y*blockSizeH;
        var pw = blockSizeW-2;
        var ph = blockSizeH-2;
        switch( map[i][y][x] ){
          case 1: platformEngine.add( new Platform(px, py, pw, ph, 1) ); break;
          // case 2: platformEngine.add( new Spring(px, py, pw, ph, 0) ); break;
          case 2: platformEngine.add( new Platform(px, py, pw, ph, 2) ); break;
          case 3: platformEngine.add( new Platform(px, py, pw, ph, 3) ); break;
          case 4: platformEngine.add( new Platform(px, py, pw, ph, 4) ); break;
          case 5: platformEngine.add( new Platform(px, py, pw, ph, 5) ); break;
          case 6: platformEngine.add( new Platform(px, py, pw, ph, 6) ); break;
          case 7: platformEngine.add( new Platform(px, py, pw, ph, 7) ); break;
        }
      }
    }
  }
}

function mapTileAdd(x, y, chunk,type){
  // Add new tile to game.map[]
  game.map[chunk][y][x] = type;
  
  // Add new tile to Platform Engine (game.platforms[])
  platformEngine.add( new MapTile(x, y, chunk, type) );
}

function mapTileRemove(x,y,chunk){
  // Remove tile from game.map[]
  game.map[chunk][y][x] = 0;
  
  // Expands [y][x] position to pixel position
  var gamex = (x * game.tileSize.w) + (chunk * game.map[0][0].length * game.tileSize.w);
  var gamey = y * game.tileSize.h;

  // Scan game.platforms[] for current tile and then flag for removal
  for (var i=0; i<game.platforms.length; i++){
    if (game.platforms[i].chunk == chunk
        && game.platforms[i].y == gamey
        && game.platforms[i].x == gamex){
      game.platforms[i].removeFromWorld = true;
    }
  }
}