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
    zoom();
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
	
	this.draw = function(){
    ///////////////////////
    // Shouldn't be here //
    ///////////////////////
    var mx = Math.floor((latestCoords[0].x + player.x)/game.tileSize)*game.tileSize;
    var my = Math.floor((latestCoords[0].y + player.y)/game.tileSize)*game.tileSize;
    document.getElementById('output').innerHTML = 
      'Coords relative to game <br/>' + 
      'mx: ' + mx + '<br/>' +
      'my: ' + my;
    game.context.fillStyle = "yellow";
    game.context.fillRect(mx, my, game.tileSize, game.tileSize);
    game.context.clearRect(mx+2, my+2, game.tileSize-4, game.tileSize-4);
  };
	
}