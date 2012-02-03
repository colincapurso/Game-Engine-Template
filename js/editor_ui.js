// Currently called in function Grid()
function drawUI(){
  var p = { x: player.x, y: player.y };
  var mouse = {
    x: Math.floor(latestCoords[0].x + player.x),
    y: Math.floor(latestCoords[0].y + player.y),
    w: 0,
    h: 0
  };
  var save = { x: p.x+30, y: p.y+30, w: 100, h: 30, offset: 0 };
  var load = { x: p.x+30+110, y: p.y+30, w: 100, h: 30, offset: 1 };
  var help = { x: p.x+game.width-40-30, y: p.y+30, w: 40, h: 30, offset: 2 };
  var tile0 = { x: p.x + 32 + (96+10)*0, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile1 = { x: p.x + 32 + (96+10)*1, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile2 = { x: p.x + 32 + (96+10)*2, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile3 = { x: p.x + 32 + (96+10)*3, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile4 = { x: p.x + 32 + (96+10)*4, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile5 = { x: p.x + 32 + (96+10)*5, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile6 = { x: p.x + 32 + (96+10)*6, y: p.y + 512, w: 96, h: 96, offset: 0 };
  var tile7 = { x: p.x + 32 + (96+10)*7, y: p.y + 512, w: 96, h: 96, offset: 0 };
  drawButtons(mouse,save);
  drawButtons(mouse,load);
  drawButtons(mouse,help);
  drawTileSelectors(mouse,tile0);
  drawTileSelectors(mouse,tile1);
  drawTileSelectors(mouse,tile2);
  drawTileSelectors(mouse,tile3);
  drawTileSelectors(mouse,tile4);
  drawTileSelectors(mouse,tile5);
  drawTileSelectors(mouse,tile6);
  drawTileSelectors(mouse,tile7);
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