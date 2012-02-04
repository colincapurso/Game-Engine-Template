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
  var save = { x: p.x+30, y: p.y+30, w: 100, h: 30, offset: 0 };
  var load = { x: p.x+30+110, y: p.y+30, w: 100, h: 30, offset: 1 };
  var clear = { x: p.x+30+220, y: p.y+30, w: 100, h: 30, offset: 2 };
  var reset = { x: p.x+game.width-180, y: p.y+30, w: 100, h: 30, offset: 3 };
  var help = { x: p.x+game.width-40-30, y: p.y+30, w: 40, h: 30, offset: 4 };
  // var tile0 = { x: p.x + 48 + (96+10)*0, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile1 = { x: p.x + 48 + (96+10)*1, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile2 = { x: p.x + 48 + (96+10)*2, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile3 = { x: p.x + 48 + (96+10)*3, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile4 = { x: p.x + 48 + (96+10)*4, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile5 = { x: p.x + 48 + (96+10)*5, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile6 = { x: p.x + 48 + (96+10)*6, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile7 = { x: p.x + 48 + (96+10)*7, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var aboveZero = (mchunk >= 0) && (mx >= 0) && (my >= 0);
  var belowMax = (mchunk < game.map.length) && (mx < game.map[0][0].length * game.map.length) && (my < game.map[0].length);
  
  // Draws
  drawSelectedTileOnGrid(aboveZero, belowMax);
  drawSelectedTile(aboveZero, belowMax);
  drawButtons(mouse,save);
  drawButtons(mouse,load);
  drawButtons(mouse,clear);
  drawButtons(mouse,reset);
  drawButtons(mouse,help);
  drawTileSelectors(mouse,tile1);
  drawTileSelectors(mouse,tile2);
  drawTileSelectors(mouse,tile3);
  drawTileSelectors(mouse,tile4);
  drawTileSelectors(mouse,tile5);
  drawTileSelectors(mouse,tile6);
  drawTileSelectors(mouse,tile7);
  
  // EVENTS - Check for Mouse/Keyboard zoom input
  zoom();
  
  if ( isMouseDown ){
    var now = Date.now();
    if (now > game.clickTimer+200){
      game.clickTimer = now;
      if ( isCollide(mouse,clear) ){ mapClear(); }
        else if ( isCollide(mouse,load) ){ mapLoad(); mapReload(); }
        else if ( isCollide(mouse,save) ){ mapSave(); mapReload(); }
        else if ( isCollide(mouse,reset) ){ mapReset(); mapReload(); }
        else if (aboveZero && belowMax){
          var newMX = mx - game.map[0][0].length * mchunk;
          var gamex = mx;
          if ( game.map[mchunk][my][newMX] ){
            mapTileRemove(mchunk,my,newMX, gamex);
          } else {
            mapTileAdd(mchunk,my,newMX,1);
          }
        }
    }
  }
}
function drawTileSelectors(mouse, tile){
  if (isCollide(mouse,tile)){
    game.context.drawImage(
      game.img.tiles, 
      tile.w,
      tile.h*tile.offset,
      tile.w,
      tile.h,
      tile.x,
      tile.y,
      tile.w,
      tile.h);
  } else {
    game.context.drawImage(
      game.img.tiles,
      0,
      tile.h*tile.offset,
      tile.w,
      tile.h,
      tile.x,
      tile.y,
      tile.w,
      tile.h);
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
    var mapXlength = game.map[0][0].length;
    var type = game.map[cursor.chunk][cursor.y][(cursor.x - mapXlength * cursor.chunk)];
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
    // var type;
    // Outputs Current Tile
    var aboveZero = cursor.chunk >= 0 
                    && cursor.x >= 0 
                    && cursor.y >= 0;
    var belowMax = cursor.chunk < game.map.length 
                    && cursor.x < game.map[0][0].length*game.map.length
                    && cursor.y < game.map[0].length;
    
    if ( aboveZero && belowMax ){
      var mapXlength = game.map[0][0].length;
      var type = game.map[cursor.chunk][cursor.y][(cursor.x - mapXlength * cursor.chunk)];
      var mx = Math.floor((latestCoords[0].x + player.x)/game.tileSize.w)*game.tileSize.w;
      var my = Math.floor((latestCoords[0].y + player.y)/game.tileSize.h)*game.tileSize.h;

      switch(type){
        case 0:
          game.context.fillStyle = "grey";
          game.context.fillRect(mx-2, my-2, game.tileSize.w+4, game.tileSize.h+4);
          break;
        case 1:
          // game.context.fillStyle = "brown";
          game.context.fillStyle = "yellow";
          game.context.fillRect(mx-2, my-2, game.tileSize.w+4, game.tileSize.h+4);
          break;
        case 2:
          // game.context.fillStyle = "green";
          game.context.fillStyle = "yellow";
          game.context.fillRect(mx-2, my-2, game.tileSize.w+4, game.tileSize.h+4);
          break;
      }
    }
  }
}
