function drawGrid(ctx, obj){
  var t = { w: game.tileSize.w, h: game.tileSize.h };
  var chunks = obj.chunks;
  var blocksAcross = obj.blocksAcross;
  var blocksDown = obj.blocksUp;
  
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (var i=0; i < blocksDown+1; i++){
    ctx.moveTo(0, t.h * i);
    ctx.lineTo(chunks * blocksAcross * t.w, t.h * i);
  }
  for (var i=0; i < chunks * blocksAcross+1; i++){
    ctx.moveTo(t.w * i, 0);
    ctx.lineTo(t.w * i, t.h * 10);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawPlayer(ctx, obj){
  // Body
  ctx.fillStyle = 'orange';
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
  // Sword
  ctx.fillStyle = '#CCC';
  ctx.fillRect(obj.x-12, obj.y-12, 18, 45);
  ctx.fillStyle = 'darkgreen';
  ctx.fillRect(obj.x-18, obj.y+33, 30, 9);
  ctx.fillStyle = 'orange';
  ctx.fillRect(obj.x-12, obj.y+42, 18, 13);
  // Shield
  ctx.fillStyle = '#CCC';
  ctx.fillRect(obj.x+45, obj.y+34, 27, 33);
}


function drawPlatform(ctx, obj){
  var tileWidth = game.img.tiles.width / 3;
  var tileHeight = tileWidth;
  // Extra Features such as Spring Block
  switch(obj.type){
    case 2:
      // Spring Block, set player state to spring if falling on block
      var p = { x: player.x, y: player.y + player.velocity.y, w: player.w, h: player.h };
      if ( isCollide(obj, p) ){ player.spring = 0; }
      break;
  }
  switch(obj.type){
    case 0: break;
    case 1: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*1, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 2: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*2, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 3: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*3, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 4: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*4, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 5: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*5, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 6: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*6, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 7: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*7, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
  }

 /*  // Block Colour
  switch(obj.type){
    case 1: ctx.fillStyle = "#9D5F17"; break;
    case 2: ctx.fillStyle = "#E4B872"; break;
    case 3: ctx.fillStyle = "FF00FF"; break;
    case 4: ctx.fillStyle = "ED1C24"; break;
    case 5: ctx.fillStyle = "F7931E"; break;
    case 6: ctx.fillStyle = "FCEE21"; break;
    case 7: ctx.fillStyle = "0071BC"; break;
  }
  
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
  */
}

function drawMapTile(ctx, obj){
  var tileWidth = game.img.tiles.width / 3;
  var tileHeight = tileWidth;
  switch(obj.type){
    case 0: break;
    case 1: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*1, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 2: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*2, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 3: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*3, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 4: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*4, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 5: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*5, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 6: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*6, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
    case 7: ctx.drawImage(game.img.tiles, tileWidth*2, tileHeight*7, tileWidth, tileHeight, obj.x, obj.y, obj.w, obj.h); break;
  }
  /* Output Colours
  switch(obj.type){
    case 0: ctx.fillStyle = "#000"; break;
    case 1: ctx.fillStyle = "#9D5F17"; break;
    case 2: ctx.fillStyle = "#E4B872"; break;
    case 3: ctx.fillStyle = "FF00FF"; break;
    case 4: ctx.fillStyle = "ED1C24"; break;
    case 5: ctx.fillStyle = "F7931E"; break;
    case 6: ctx.fillStyle = "FCEE21"; break;
    case 7: ctx.fillStyle = "0071BC"; break;
  }
  */
  // ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function drawTileSelectors(ctx, mouse, p){
  var imgWidth = 96;
  var imgHeight = 96;
  var screenTileSize = 96;
  var space = 10;
  var xoffset = 64;
  var yoffset = 512;
  for (var i=1; i<8; i++){
    var x = p.x + xoffset + ( screenTileSize + space ) * i;
    var y = p.y + yoffset;
    var tile = { x: x, y: y, w: screenTileSize, h: screenTileSize };
    var sx = imgWidth;
    var sy = imgHeight*i;
    var sw = imgWidth;
    var sh = imgHeight;
    if ( isCollide(mouse,tile) ){ // MouseOver
      ctx.globalAlpha = 1;
      ctx.drawImage(game.img.tiles, sx*1, sy, sw, sh, x, y, screenTileSize, screenTileSize);
    } else if(game.currentlySelected == i) { // Selected
      ctx.globalAlpha = 1;
      ctx.drawImage(game.img.tiles, sx*2, sy, sw, sh, x, y, screenTileSize, screenTileSize);
    } else { // Not Selected
      ctx.globalAlpha = 0.2;
      ctx.drawImage(game.img.tiles, sx*0, sy, sw, sh, x, y, screenTileSize, screenTileSize);
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

function drawSelectedTile(ctx, aboveZero, belowMax){
  // var type;
  // Outputs Current Tile
  if ( aboveZero && belowMax ){
    var mapWidth = game.map[0][0].length;
    var type = game.map[cursor.chunk][cursor.y][(cursor.x - mapWidth * cursor.chunk)];
    var obj = {
      x: player.x + 32 + (96+10)*0,
      y: player.y + 512,
      w: 96,
      h: 96,
      type: type };
    drawMapTile(ctx, obj);
  }
}

function drawSelectedTileOnGrid(ctx){
  if (game.map){
    var chunkCount = game.map.length;
    var mapHeight = game.map[0].length;
    var mapWidth = game.map[0][0].length;
    var aboveZero = (cursor.chunk >= 0) && (cursor.x >= 0) && (cursor.y >= 0);
    var belowMax = (cursor.chunk < chunkCount) && (cursor.x < mapWidth * chunkCount) && (cursor.y < mapHeight);

    if ( aboveZero && belowMax ){
      var type = game.map[cursor.chunk][cursor.y][(cursor.x - mapWidth * cursor.chunk)];
      var tileWidth = game.tileSize.w;
      var tileHeight = game.tileSize.h;
      var mx = Math.floor((latestCoords[0].x + player.x)/tileWidth)*tileWidth;
      var my = Math.floor((latestCoords[0].y + player.y)/tileHeight)*tileHeight;

      switch(type){
        case 0: ctx.fillStyle = "grey"; break;
        case 1: ctx.fillStyle = "yellow"; break;
        case 2: ctx.fillStyle = "yellow"; break;
        case 3: ctx.fillStyle = "yellow"; break;
        case 4: ctx.fillStyle = "yellow"; break;
        case 5: ctx.fillStyle = "yellow"; break;
        case 6: ctx.fillStyle = "yellow"; break;
        case 7: ctx.fillStyle = "yellow"; break;
      }
      ctx.fillRect(mx - 2, my - 2, tileWidth + 4, tileHeight + 4);
    }
  }
}