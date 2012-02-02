////////////////////////////////////////////////////////////////
///////////////////////// Game Engine //////////////////////////
////////////////////////////////////////////////////////////////
function GameEngine(){
	this.context = null;
	this.entities = [];
	this.elapsedTime = 0;
	this.stop = false;
	this.pause = false;
	this.width;
	this.height;
	
	// this.clockTick;
	//this.timer = new Timer();
	Timer.call( this );

	this.update = function(){
		if (!this.pause) this.elapsedTime++;
		for (var i=0; i<this.entities.length; i++){ if (!this.entities[i].removeFromWorld) this.entities[i].update(); }
		for (var i=this.entities.length-1; i>=0; --i){
			if (this.entities[i].removeFromWorld){
				if (this.entities[i].clear){ this.entities[i].clear(this.context); }
				// Remove from entities array //
				this.entities.splice(i, 1);
			}
		}
		if (this.background){ game.background(); } // Executes background animation code
	};
	
	this.clear = function(){
		for (var i=0; i<this.entities.length; i++){
			if (this.entities[i].last.x && this.entities[i].last.y && this.entities[i].clear){
				this.entities[i].clear(this.context); // Clear Object
			}
		}
	};
	
	this.draw = function(){
		cameraStart(); // Only works if the camera is added in init()
		for (var i=0; i<this.entities.length; i++){
			this.entities[i].draw(this.context);
		}
		cameraRestore();
	};
	
	this.addEntity = function(entity){
		this.entities.push(entity);
	};
	
	this.loop = function(){
		if (!this.stop){
			this.update();
			this.clear();
			this.draw();
		}
	};
	
	this.start = function(){
			var that = this;
			(function gameLoop() {
				that.loop();
				requestAnimFrame(gameLoop);
				// requestAnimationFrame(gameLoop);
			})();
	};
}

function Timer(){
	this.gameTime = 0;
	this.maxStep = 0.05;
	this.wallLastTimestamp = 0;
	
	this.tick = function(){
		var wallCurrent = Date.now();
		var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
		this.wallLastTimestamp = wallCurrent;
		
		var gameDelta = Math.min(wallDelta, this.maxStep);
		this.gameTime += gameDelta;
		return gameDelta;
	};
}

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
function PlatformsEngine(){
	this.last = { x:false, y:false };
	this.removeFromWorld = false;
	this.update = function(){
		for (var i=0; i<game.platforms.length; i++){
			if (game.platforms[i].removeFromWorld){
				game.platforms.splice(i, 1);
			}
		}
	};

	this.draw = function(){
		for (var i=0; i<game.platforms.length; i++){
			game.platforms[i].draw(game.context);
		}
	};

	this.add = function(entity){
		game.platforms.push(entity);
	};
}
