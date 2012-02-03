function ObjActive(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.removeFromWorld = false;
	this.last = { x: null, y: null };
  this.setLastPosition = function(){
    this.last.y = this.y;
    this.last.x = this.x;
  }
	this.color = 'red';
	this.update;
	this.draw;
	this.clear;
}

function ObjClear(){
	if (this.last.x && this.last.y){
		var x = (0.5 + this.last.x) | 0; // Bitwise rounding hack
		var y = (0.5 + this.last.y) | 0; // Bitwise rounding hack
		var padding = 20;
		game.context.clearRect(
									x - padding,
									y - padding,
									this.w + padding + padding,
									this.h + padding + padding
									);
	}
}

function ObjDraw(){
	var x = (0.5 + this.x) | 0; // Bitwise rounding hack
	var y = (0.5 + this.y) | 0; // Bitwise rounding hack
}

function ObjUpdatePlayer(){
	this.setLastPosition();
}

function Player(x,y){
	ObjActive.call( this, x,y,1,1 );
	this.update = ObjUpdatePlayer;
	this.draw = ObjDraw;
	this.clear = ObjClear;
	this.name = 'player';
	
	playerMovementUpdateDraw.call(this); // Scrolling Platformer
}

function Spring(x,y, chunk, blockSize, mapWidth){
	this.x = x;
	this.y = y;
	this.w = 0;
	this.h = 0;
	this.removeFromWorld = false;
	this.draw = function(ctx){
		draw(this, ctx, 2);
	};
  this.baseX = x;
  this.baseY = y;
  this.chunk = chunk;
  this.mapWidth = mapWidth;
  
  this.init = function(){
    this.x = (this.baseX * game.tileSize) + (this.chunk * this.mapWidth * game.tileSize);
    this.y = this.baseY * game.tileSize;
    this.w = game.tileSize - 2;
    this.h = game.tileSize - 2;
  }
  
  this.init();
}

function Tiles(x,y, chunk, blockSize, mapWidth){
	this.x = x;
	this.y = y;
	this.w = 0;
	this.h = 0;
	this.removeFromWorld = false;
	this.draw = function(ctx){
		draw(this, ctx, 1);
	}
  this.baseX = x;
  this.baseY = y;
  this.chunk = chunk;
  this.mapWidth = mapWidth;
  
  this.init = function(){
    this.x = (this.baseX * game.tileSize) + (this.chunk * this.mapWidth * game.tileSize);
    this.y = this.baseY * game.tileSize;
    this.w = game.tileSize - 1;
    this.h = game.tileSize - 1;
  }
  
  this.init();
}

function Cursor(x,y,w,h){
	this.x = x;
	this.y = y;
	this.mx = 0;
	this.my = 0;
  this.chunk = 0;
	this.w = w;
	this.h = h;
	this.removeFromWorld = false;
	this.last = { x: null, y: null };
	this.update = function(){
    if (game.map.length){
      this.mx = Math.floor((latestCoords[0].x + player.x)/game.tileSize)*game.tileSize;
      this.my = Math.floor((latestCoords[0].y + player.y)/game.tileSize)*game.tileSize;
      this.chunk = Math.floor(this.mx/game.tileSize/game.map[0][0].length);
      this.x = Math.floor( this.mx/game.tileSize );
      this.y = Math.floor( this.my/game.tileSize );
    }
  };
	this.draw = function(ctx){};
}

// Object Global Functions
function draw(obj, ctx, type, where){
  if ( where == 'UI' ){
    obj = {
      x: player.x + 20,
      y: player.y + 20,
      w: 128,
      h: 128 };
      ctx.fillStyle = "#222";
      ctx.fillRect(obj.x-8, obj.y-8, obj.w+16, obj.h+16);
      ctx.clearRect(obj.x, obj.y, obj.w, obj.h);
  } else if ( where == 'cursor' ){
    ctx.fillStyle = "yellow";
    ctx.fillRect(obj.mx-2, obj.my-2, game.tileSize+4, game.tileSize+4);
    switch(type){
      case 1: ctx.fillStyle = "brown"; break;
      case 2: ctx.fillStyle = "green"; break;
    }
    ctx.fillRect(obj.mx, obj.my, game.tileSize, game.tileSize);
  }
  switch(type){
    case 1:
      ctx.fillStyle = "brown";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      break;
    case 2:
      ctx.fillStyle = "green";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      break;
  }
}

function playerMovementUpdateDraw(){
	this.velocity = { x: 0, y: 0 };
	this.maxVelocity = { x: 20, y: 30 }; // this.maxVelocity.y == jump power
	this.acceleration = { x: 0.5, y: 0.5 };
	this.decceleration = { x: 0.5, y: 0.5 };
	this.friction = { x: 0.5, y: 0.5 };
	this.gravity = 2;
	
	this.canJump = true;
	this.onGround = true;
	this.canMove = true;
	this.spring = false;

	this.state = 'isLanded';

	this.move = function(dir){
		var v = this.velocity.x * dir;
		var a = this.acceleration.x;
		var d = this.decceleration.x;
		var maxv = this.maxVelocity.x;
		
		if (dir != 0){
			if ( v < 0 ){
				v += d;
			} else if ( v < maxv ){
				v += a;
				if ( v > maxv ){
					v = maxv;
				}
			}
			this.velocity.x = v * dir;
		} else {
			this.applyGroundFriction(1,0);
		}
	};
	
	this.moveY = function(dir){
		var v = this.velocity.y * dir;
		var a = this.acceleration.y;
		var d = this.decceleration.y;
		var maxv = this.maxVelocity.y;
		
		if (dir != 0){
			if ( v < 0 ){
				v += d;
			} else if ( v < maxv ){
				v += a;
				if ( v > maxv ){
					v = maxv;
				}
			}
			this.velocity.y = v * dir;
		} else {
			this.applyGroundFriction(0,1);
		}
	};
	
	this.applyGroundFriction = function(x,y){
    if (x){
      var dir;
      var velx = this.velocity.x;
      
      if ( velx > 0 ){
        dir = 1;
      } else if ( velx < 0 ){
        dir = -1;
      } else {
        dir = 0;
      }
      this.velocity.x -= this.friction.x * dir;
    } else if (y){
      var dir;
      var vely = this.velocity.y;
      
      if ( vely > 0 ){
        dir = 1;
      } else if ( vely < 0 ){
        dir = -1;
      } else {
        dir = 0;
      }
      this.velocity.y -= this.friction.y * dir;
    }
	};
	
	this.update = function(){
		this.setLastPosition();
		this.inputLeftRight();
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};
	
	this.inputLeftRight = function(){
		if ( keysDown['right'] || keysDown['d'] ){ this.move(1); }
			else if ( keysDown['left'] || keysDown['a'] ){ this.move(-1); }
      else { this.move(0); }
    if ( keysDown['up'] || keysDown['w'] ){ this.moveY(-1); }
      else if ( keysDown['down'] || keysDown['s'] ){ this.moveY(1); }
      else { this.moveY(0); }
	};
	
	this.draw = function(){};
	
}