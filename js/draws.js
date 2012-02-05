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

function drawPlatform(ctx, obj){
  // Extra Features such as Spring Block
  switch(obj.type){
    case 2:
      // Spring Block, set player state to spring if falling on block
      var p = { x: player.x, y: player.y + player.velocity.y, w: player.w, h: player.h };
      if ( isCollide(obj, p) ){ player.spring = 0; }
      break;
  }
  // Block Colour
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

function drawMapTile(ctx, obj){
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
}