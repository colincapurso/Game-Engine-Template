/*
*	This adds an additional entity to the game
* which creates an extra loop for platforms
*	It keep track of platforms in an array 
*	called game.platforms
*
*	To use, add this to your init()
*	game.addEntity( new PlatformAddon() );
*	game.platforms = [];
*/
function Platform(x,y,w,h, solid){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.solid = solid;
	this.removeFromWorld = false;
	this.draw = function(ctx){
		ctx.fillStyle = "pink";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}
function PlatformAddon(){
	this.last = { x:false, y:false };
	this.removeFromWorld = false;
	this.update = function(){
		for (var i=0; i<game.platforms.length; i++){
			// Remove from world
			if (game.platforms[i].removeFromWorld){
				game.platforms.splice(i, 1);
			}
		}
	};

	this.draw = function(){
		// Draw
		for (var i=0; i<game.platforms.length; i++){
			game.platforms[i].draw(game.context);
		}
	};

	this.add = function(entity){
		// Add to array
		game.platforms.push(entity);
	};
}
function Spring(x,y,w,h,type){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.type = type;
	this.removeFromWorld = false;
	this.draw = function(ctx){
		this.hitCheck();
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
	this.hitCheck = function(){
		var playerobj = {
			x: player.x,
			y: player.y + player.velocity.y,
			w: player.w,
			h: player.h
		};
		if ( isCollide(this, playerobj) ){
			player.spring = 0;
		}
	}
}