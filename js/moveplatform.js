function MovePlatform(){
	this.velocity = { x: 0, y: 0 };
	this.maxVelocity = { x: 20, y: 30 }; // this.maxVelocity.y == jump power
	this.acceleration = { x: 0.5 };
	this.decceleration = { x: 0.5 };
	this.friction = { x: 0.5, y: 0 };
	this.gravity = 2;

	this.state = 'isFalling';

	this.setDirection = function(){
		if ( this.velocity.x < 0 ) {
			this.dir = -1;
		} else if ( this.velocity.x > 0 ){
			this.dir = 1;
		} else {
			this.dir = 0;
		}
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
		}

		this.velocity.x = v * dir;
	};
	
	this.jump = function(){
		// Pressing Jump
		if ( this.state == 'isLanded' || this.state == 'isMoving' ){
			this.velocity.y = -this.maxVelocity.y;
			this.state = 'isJumping';
		}
	};
	
	this.applyGroundFriction = function(){
		this.velocity.x -= this.friction.x * this.dir;
	};
	
	this.applyGravity = function(){
		if (this.state == 'isFalling' || this.state == 'isJumping'){
			this.velocity.y += this.gravity;
		}
	};
	
	this.screenEdgeCheck = function(){
		if ( this.x < 0 ){
			this.velocity.x = 0;
			this.x = 0;
		} else if ( this.x > game.width - this.w + 1000 ){
			this.velocity.x = 0;
			this.x = game.width - this.w + 1000;
		}
		if ( this.y > game.height - this.h ){
			this.velocity.y = 0;
			this.y = game.height - this.h;
			this.state = 'isLanded';
		}
	};
	
	this.updateState = function(){
		// NOT USED YET
		if ( this.velocity.y < 0 ){ this.state = 'isFalling'; }
			else if ( this.velocity.y > 0 ){ this.state = 'isJumping'; }
				else if ( this.velocity.y == 0 ){ this.state = 'isLanded'; }

		if ( this.velocity.x != 0 ){ this.state = 'isMoving'; }
	};
	
	this.inputCheck = function(){
		// Left / Right
		if ( isKeyDown('right') ){
			this.move(1);
		} else if ( isKeyDown('left') ){
			this.move(-1);
		} else {
			this.applyGroundFriction();
		}
		
		// Jump
		if ( isKeyDown('space') ){
			this.jump();
		}
	};
	
	this.update = function(){
		setLastPosition(this);
		// These functions are in physicsPlatformer.js
		this.setDirection();
		this.screenEdgeCheck();
		this.applyGravity();
		this.inputCheck();
		
		// Move
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		document.getElementById('output').innerHTML = 'x: ' + this.x + '<br/>y: ' + this.y;
	};
	
	this.draw = function(){
		for (var i=-50; i < 500; i++){
			// Background 
			game.context.fillStyle = 'green';
			game.context.fillRect(i*50, 0, 5, 480);
		}
		// Ground
		game.context.fillStyle = 'green';
		game.context.fillRect(-2500, 480, 25000, 80);
		// Wall
		game.context.fillStyle = 'green';
		game.context.fillRect(-100, 0, 100, 480);
		game.context.fillRect(game.width + 1000, 0, 100, 480);
		
		game.context.fillStyle = 'red';
		game.context.fillRect(this.x, this.y, this.w, this.h);
	};
	
}

// Platform Options
// this.type: solid | platform


// Scrolling Borders
/*
320x224
-= Horizontal =-
Left: 144 | 45%
Right: 160 | 50%

-= Vertical =-
if Y != 96 | 43%, camera moves up 6 | 16 depending on speed
*/