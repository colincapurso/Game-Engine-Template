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
		var entitiesCount = this.entities.length;
		for (var i=0; i<entitiesCount; i++){ if (!this.entities[i].removeFromWorld) this.entities[i].update(); }
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
		cameraStart();
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
