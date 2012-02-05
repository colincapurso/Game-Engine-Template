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
  var ctx = game.context;
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
  var inTileArea = latestCoords[0].y > 60 && latestCoords[0].y < game.height - 130;
  
  // Draws
  drawSelectedTile(ctx, aboveZero, belowMax);
  drawButtons(mouse,save);
  drawButtons(mouse,load);
  drawButtons(mouse,clear);
  drawButtons(mouse,reset);
  drawButtons(mouse,help);
  
  if ( inTileArea ){
    drawSelectedTileOnGrid(ctx);
  }
  drawTileSelectors(ctx, mouse,p);
  
  // EVENTS - Check for Mouse/Keyboard zoom input
  zoom();
  
  if ( isMouseDown ){
    var now = Date.now();
    
    if ( now > game.clickTimer+200 ){
      game.clickTimer = now;

      if ( isCollide(mouse,save) ){ mapSave(); mapReload(); }
        else if ( isCollide(mouse,load) ){ mapClear(); mapLoad(); mapReload(); }
        else if ( isCollide(mouse,clear) ){ mapClear(); }
        else if ( isCollide(mouse,reset) ){ mapClear(); mapResetDefault(); mapReload(); }
        else if ( aboveZero && belowMax && inTileArea){
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
        if ( isCollide(mouse,tile) ){
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
