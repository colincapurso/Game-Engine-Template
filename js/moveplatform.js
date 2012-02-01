function MovePlatform(){
	this.velocity = { x: 0, y: 0 };
	this.maxVelocity = { x: 20, y: 30 }; // this.maxVelocity.y == jump power
	this.acceleration = { x: 0.5 };
	this.decceleration = { x: 0.5 };
	this.friction = { x: 0.5, y: 0 };
	this.gravity = 2;
	
	this.canJump = true;
	this.onGround = true;
	this.canMove = true;

	this.state = 'isLanded';

	this.updateState = function(obj){
	};
	
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
			this.applyGroundFriction();
		}
	};
	
	this.applyGroundFriction = function(){
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
	};
	
	this.update = function(){
		setLastPosition(this);
		//document.getElementById('output').innerHTML = 'x: ' + this.x + '<br/>y: ' + this.y + '<br/>velx: ' + this.velocity.x + '<br/>vely: ' + this.velocity.y + '<br/>state: ' + this.state;
		
		document.getElementById('output').innerHTML =
			'this.onGround ' + this.onGround + '<br/>' +
			'this.canJump ' + this.canJump + '<br/>' +
			'this.canMove ' + this.canMove;

		// On Ground Check
		if ( this.hitPlatform(this, this.velocity.x, this.velocity.y + this.gravity) ){
			this.onGround = true;
			this.canJump = true;
		} else {
			this.onGround = false;
			this.canJump = false;
		}
		
		// Hit Wall Check		
		if ( this.hitPlatform(this, this.velocity.x, 0) ){
			this.canMove = false;
		} else {
			this.canMove = true;
		}
		
		// Land
		if ( this.onGround ){
			this.velocity.y = 0;
		} else if ( !this.onGround ){
			// Fall
			this.velocity.y += this.gravity;
		}

		// Jump
		if (this.canJump && keysDown['space']){
			this.velocity.y = -this.maxVelocity.y;
			if ( this.hitPlatform(this, this.velocity.x, this.velocity.y) ){ this.velocity.y = 0; }
		}

		// Hit Wall
		if ( this.canMove ){
			this.inputLeftRight();
			if ( this.hitPlatform(this, this.velocity.x, this.velocity.y) ){
				this.velocity.x = 0;
			}
		} else {
			this.velocity.x = 0;
		}
		 
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};
	
	this.inputLeftRight = function(){
		if ( keysDown['right'] ){ if ( !this.hitPlatform(this, this.velocity.x, this.velocity.y - 1) ){ this.move(1); } }
			else if ( keysDown['left'] ){ if ( !this.hitPlatform(this, this.velocity.x, this.velocity.y - 1) ){ this.move(-1); } }
			else { this.move(0); }
	};
	
	this.hitPlatform = function(obj, modx, mody){
		var collide = false;
		for (var i=0; i<game.platforms.length; i++){
			var a = {
				x: obj.x + modx,
				y: obj.y + mody,
				w: obj.w,
				h: obj.h
			};
			var b = {
				x: game.platforms[i].x,
				y: game.platforms[i].y,
				w: game.platforms[i].w,
				h: game.platforms[i].h
			};
			if (a.x <= (b.x + b.w) 
					&& b.x <= (a.x + a.w) 
					&& a.y <= (b.y + b.h) 
					&& b.y <= (a.y + a.h)){
				collide = true;
			}
		}
		return collide;
	};

	this.draw = function(){
		/*
		for (var i=-50; i < 500; i++){
			// Background 
			game.context.fillStyle = '#020';
			game.context.fillRect(i*50, 0, 5, 480);
		}
		// Wall
		game.context.fillStyle = '#020';
		game.context.fillRect(-100, 0, 100, 480);
		game.context.fillRect(game.width + 1000, 0, 100, 480);
		*/
		game.context.fillStyle = 'red';
		game.context.fillRect(this.x, this.y, this.w, this.h);
	};
	
}

// Scrolling Borders
/*
Sega Dimensions
320x224
-= Horizontal =-
Left: 144 | 45%
Right: 160 | 50%

-= Vertical =-
if Y != 96 | 43%, camera moves up 6 | 16 depending on speed
*/
/*
Platform Logic
Action
	- Condition
		+ Result

Character Moves Right (Left = -xvelocity)
	- In air - isJumping / isFalling
		- Collision check xvelocity
			+ TRUE xvelocity = 0
			+ FALSE +xvelocity;

	- On ground - isLanded
		- Collision check with gravity
			+ TRUE yvelocity = 0
			+ FALSE state = falling
		- Collision check xvelocity
			+ TRUE xvelocity = 0
			+ FALSE +xvelocity;

Character Jumps
	- In air - isJumping / isFalling
			Not possible
	- On ground - isLanded
		- Collision check with gravity
			+ TRUE jump aka yvelocity = maxyvelocity
			+ FALSE yvelocity = 0
		- Collision check with -maxyvelocity (if there is something above)
			+ TRUE yvelocity = 0
			+ FALSE yvelocty = yvelocity
Character Stands
	- On ground
		- Collision check with gravity
			+ TRUE yvelocity = 0
			+ FALSE state = isFalling
*/