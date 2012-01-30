function PhysicsPlatform(){
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

	this.moveRight = function(){
		// Pressing Right
		if ( this.velocity.x < 0 ){
			this.velocity.x += this.decceleration.x;
		} else if ( this.velocity.x < this.maxVelocity.x ){
			this.velocity.x += this.acceleration.x;
			if ( this.velocity.x > this.maxVelocity.x ){
				this.velocity.x = this.maxVelocity.x;
			}
		}
	};
	
	this.moveLeft = function(){
		// Pressing Left
		if ( this.velocity.x > 0 ){
			this.velocity.x -= this.decceleration.x;
		}	else if ( this.velocity.x > -this.maxVelocity.x ) {
			this.velocity.x -= this.acceleration.x;
			if ( this.velocity.x  < -this.maxVelocity.x ){
				this.velocity.x = -this.maxVelocity.x;
			}
		}
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
		} else if ( this.x > game.width - this.w ){
			this.velocity.x = 0;
			this.x = game.width - this.w;
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
			this.moveRight();
		} else if ( isKeyDown('left') ){
			this.moveLeft();
		} else {
			this.applyGroundFriction();
		}
		
		// Jump
		if ( isKeyDown('space') ){
			this.jump();
		}
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