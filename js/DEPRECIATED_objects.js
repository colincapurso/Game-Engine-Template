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
  };
}

function updatePlatformMovement(){
  this.velocity = { x: 0, y: 0 };
  this.maxVelocity = { x: 20, y: 30 }; // this.maxVelocity.y == jump power
  this.acceleration = { x: 0.5 };
  this.decceleration = { x: 0.5 };
  this.friction = { x: 0.5, y: 0 };
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
    
    document.getElementById('output').innerHTML =
      'this.onGround ' + this.onGround + '<br/>' +
      'this.canJump ' + this.canJump + '<br/>' +
      'this.canMove ' + this.canMove + '<br/>' +
      'this.isSpring ' + this.isSpring + '<br/>' +
      'x ' + this.x;

    // On Ground Check
    if ( this.hitPlatform(this, 0, this.velocity.y + this.gravity) ){
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
      if ( this.hitPlatform(this, 0, this.velocity.y) ){ this.velocity.y = 0; }
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
    
    if (this.spring === 0){
      this.velocity.y = -this.maxVelocity.y * 1.5;
      this.onGround = false;
      this.spring = false;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };
  
  this.inputLeftRight = function(){
    if ( keysDown['left'] || keysDown['a'] ){ if ( !this.hitPlatform(this, this.velocity.x, this.velocity.y - 1) ){ this.move(-1); } }
      else if ( keysDown['right'] || keysDown['d']){ if ( !this.hitPlatform(this, this.velocity.x, this.velocity.y - 1) ){ this.move(1); } }
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
    game.context.fillStyle = 'red';
    game.context.fillRect(this.x, this.y, this.w, this.h);
  };
  
}