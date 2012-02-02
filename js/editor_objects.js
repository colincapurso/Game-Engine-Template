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
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.w, this.h);
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

function Platform(x,y, chunk, blockSize, mapWidth){
	this.x = x;
	this.y = y;
	this.w = 0;
	this.h = 0;
	this.removeFromWorld = false;
	this.draw = function(ctx){
		ctx.fillStyle = "pink";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
  this.baseX = x;
  this.baseY = y;
  this.chunk = chunk;
  this.mapWidth = mapWidth;
  
  this.init = function(){
    this.x = (this.baseX * game.tileSize) + (this.chunk * this.mapWidth * game.tileSize);
    this.y = this.baseY * game.tileSize;
    this.w = game.tileSize - 2;
    this.h = game.tileSize - 2;
    console.log('init');
  }
  
  this.init();
}