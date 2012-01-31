function Move8Dir(){
	this.velocity = { x: 0, y: 0 };
	this.maxVelocity = { x: 20, y: 20 };
	this.acceleration = { x: 0.5, y: 0.5 };
	this.decceleration = { x: 0.5, y: 0.5 };
	this.friction = { x: 0.7, y: 0.7 };
	this.dir = { x:0, y:0 };
	
	this.setDirection = function(){
		if ( this.velocity.x < 0 ) {
			this.dir.x = -1;
		} else if ( this.velocity.x > 0 ){
			this.dir.x = 1;
		} else {
			this.dir.x = 0;
		}
		if ( this.velocity.y < 0 ) {
			this.dir.y = -1;
		} else if ( this.velocity.y > 0 ){
			this.dir.y = 1;
		} else {
			this.dir.y = 0;
		}
	};

	this.moveX = function(dir){
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
		}

		this.velocity.x = v * dir;
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
		}

		this.velocity.y = v * dir;
	};
	
	this.applyGroundFriction = function(x,y){
		this.velocity.x -= (this.friction.x * this.dir.x) * x;
		this.velocity.y -= (this.friction.y * this.dir.y) * y;
		
		// Bug fix, stop sliding because of number rounding
		var t = 0.5; // tolerance
		if ( this.velocity.x != 0 && this.velocity.x > -t && this.velocity.x < t ){ this.velocity.x = 0; }
		if ( this.velocity.y != 0 && this.velocity.y > -t && this.velocity.y < t ){ this.velocity.y = 0; }
	};

	this.inputCheck = function(){
		if ( isKeyDown('right') ){
			this.moveX(1);
		} else if ( isKeyDown('left') ){
			this.moveX(-1);
		} else {
			this.applyGroundFriction(1,0);
		}
		if ( isKeyDown('down') ){
			this.moveY(1);
		} else if ( isKeyDown('up') ){
			this.moveY(-1);
		} else {
			this.applyGroundFriction(0,1);
		}
	};
	
	this.update = function(){
		setLastPosition(this);
		this.setDirection();
		this.inputCheck();
		
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};
	
	this.draw = function(){
		for (var i=-50; i < 500; i++){
			// Background 
			game.context.fillStyle = 'green';
			game.context.fillRect(i*50, 0, 5, 1000);
			game.context.fillRect(0, i*50, 1000, 5);
		}
		game.context.fillStyle = 'red';
		game.context.fillRect(this.x, this.y, this.w, this.h);
	};
}