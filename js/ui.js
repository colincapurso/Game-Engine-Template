function isCollide(a,b){
  if (a.x <= (b.x + b.w) 
    && b.x <= (a.x + a.w) 
    && a.y <= (b.y + b.h) 
    && b.y <= (a.y + a.h)){
    return true;
  }
}
// Currently called in function Grid()
function drawUI(){
  var p = { x: player.x, y: player.y };
  var mouse = {
    x: Math.floor(latestCoords[0].x + player.x),
    y: Math.floor(latestCoords[0].y + player.y),
    w: 0,
    h: 0
  };
  var mchunk = cursor.chunk;
  var mx = cursor.x;
  var my = cursor.y;
  var mapWidth = game.map[0][0].length;
  var save = { x: p.x+30, y: p.y+30, w: 100, h: 30, offset: 0 };
  var load = { x: p.x+30+110, y: p.y+30, w: 100, h: 30, offset: 1 };
  var clear = { x: p.x+30+220, y: p.y+30, w: 100, h: 30, offset: 2 };
  var reset = { x: p.x+game.width-180, y: p.y+30, w: 100, h: 30, offset: 3 };
  var help = { x: p.x+game.width-40-30, y: p.y+30, w: 40, h: 30, offset: 4 };

  // Conditions
  var aboveZero = (mchunk >= 0) && (mx >= 0) && (my >= 0);
  var belowMax = (mchunk < game.map.length) && (mx < mapWidth * game.map.length) && (my < game.map[0].length);
  
  // Draws
  drawSelectedTileOnGrid(aboveZero, belowMax);
  drawSelectedTile(aboveZero, belowMax);
  drawButtons(mouse,save);
  drawButtons(mouse,load);
  drawButtons(mouse,clear);
  drawButtons(mouse,reset);
  drawButtons(mouse,help);
  
  drawTileSelectors(mouse,p);
  
  // EVENTS - Check for Mouse/Keyboard zoom input
  zoom();
  
  if ( isMouseDown ){
    var now = Date.now();
    
    if (now > game.clickTimer+200){
      game.clickTimer = now;
      
      if ( isCollide(mouse,save) ){ mapSave(); mapReload(); }
        else if ( isCollide(mouse,load) ){ mapClear(); mapLoad(); mapReload(); }
        else if ( isCollide(mouse,clear) ){ mapClear(); }
        else if ( isCollide(mouse,reset) ){ mapClear(); mapResetDefault(); mapReload(); }
        else if (aboveZero && belowMax){
          var newmx = mx - mapWidth * mchunk;
          actionAddRemoveTile(newmx, my, mchunk, game.currentlySelected);
        }
      
      for (var i=1; i<8; i++){
        var screenTileSize = 96;
        var space = 10;
        var xoffset = 170;
        var yoffset = 512;
        var x = p.x + xoffset + ( screenTileSize + space ) * (i-1);
        var y = p.y + yoffset;
        var tile = { x: x, y: y, w: screenTileSize, h: screenTileSize };
        if (isCollide(mouse,tile)){
          game.currentlySelected = i;
        }
      }
    }
  }
}

function actionAddRemoveTile(x,y,chunk, type){
  if ( game.map[chunk][y][x] ){
    mapTileRemove(x,y,chunk);
  } else {
    mapTileAdd(x,y,chunk,type);
  }
}

function drawTileSelectors(mouse, p){
  var imgWidth = 64;
  var imgHeight = 64;
  var screenTileSize = 96;
  var space = 10;
  var xoffset = 64;
  var yoffset = 512;
  for (var i=1; i<8; i++){
    var x = p.x + xoffset + ( screenTileSize + space ) * i;
    var y = p.y + yoffset;
    var tile = { x: x, y: y, w: screenTileSize, h: screenTileSize };
    if ( isCollide(mouse,tile) ){
      // MouseOver
      game.context.drawImage(game.img.tiles, imgWidth*1, imgHeight*i, imgWidth, imgHeight,
          x, y, screenTileSize, screenTileSize);
    } else if(game.currentlySelected == i) {
      // Selected
      game.context.drawImage(game.img.tiles, imgWidth*2, imgHeight*i, imgWidth, imgHeight,
          x, y, screenTileSize, screenTileSize);
    } else {
      // Not Selected
      game.context.drawImage(game.img.tiles, imgWidth*0, imgHeight*i, imgWidth, imgHeight,
          x, y, screenTileSize, screenTileSize);
    }
  }
}

function drawButtons(mouse, button){
  if (isCollide(mouse,button)){
    game.context.drawImage(
      game.img.buttons, 
      button.w,
      button.h*button.offset,
      button.w,
      button.h,
      button.x,
      button.y,
      button.w,
      button.h);
  } else {
    game.context.drawImage(
      game.img.buttons,
      0,
      button.h*button.offset,
      button.w,
      button.h,
      button.x,
      button.y,
      button.w,
      button.h);
  }
}

function drawSelectedTile(aboveZero, belowMax){
  // var type;
  // Outputs Current Tile
  if ( aboveZero && belowMax ){
    var mapWidth = game.map[0][0].length;
    var type = game.map[cursor.chunk][cursor.y][(cursor.x - mapWidth * cursor.chunk)];
    var obj = {
      x: player.x + 32 + (96+10)*0,
      y: player.y + 512,
      w: 96,
      h: 96 };
      game.context.fillStyle = "#222";
      game.context.fillRect(obj.x-8, obj.y-8, obj.w+16, obj.h+16);
      game.context.clearRect(obj.x, obj.y, obj.w, obj.h);
    switch(type){
      case 1:
        game.context.fillStyle = "brown";
        game.context.fillRect(obj.x, obj.y, obj.w, obj.h);
        break;
      case 2:
        game.context.fillStyle = "green";
        game.context.fillRect(obj.x, obj.y, obj.w, obj.h);
        break;
    }
  }
}

function drawSelectedTileOnGrid(){
  if (game.map){
    var chunkCount = game.map.length;
    var mapHeight = game.map[0].length;
    var mapWidth = game.map[0][0].length;
    var tileWidth = game.tileSize.w;
    var tileHeight = game.tileSize.h;
    var aboveZero = (cursor.chunk >= 0) && (cursor.x >= 0) && (cursor.y >= 0);
    var belowMax = (cursor.chunk < chunkCount) && (cursor.x < mapWidth * chunkCount) && (cursor.y < mapHeight);

    if ( aboveZero && belowMax ){
      var type = game.map[cursor.chunk][cursor.y][(cursor.x - mapWidth * cursor.chunk)];
      var mx = Math.floor((latestCoords[0].x + player.x)/tileWidth)*tileWidth;
      var my = Math.floor((latestCoords[0].y + player.y)/tileHeight)*tileHeight;

      switch(type){
        case 0:
          game.context.fillStyle = "grey";
          game.context.fillRect(mx-2, my-2, tileWidth+4, tileHeight+4);
          break;
        case 1:
          // game.context.fillStyle = "brown";
          game.context.fillStyle = "yellow";
          game.context.fillRect(mx-2, my-2, tileWidth+4, tileHeight+4);
          break;
        case 2:
          // game.context.fillStyle = "green";
          game.context.fillStyle = "yellow";
          game.context.fillRect(mx-2, my-2, tileWidth+4, game.tileSize.h+4);
          break;
      }
    }
  }
}
