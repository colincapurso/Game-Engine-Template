// GLOBAL FUNCTIONS
function isCollide(a,b){
  if (a.x <= (b.x + b.w) 
    && b.x <= (a.x + a.w) 
    && a.y <= (b.y + b.h) 
    && b.y <= (a.y + a.h)){
    return true;
  }
}

// localStorage doesn't support objects or arrays, so use this for local storage
function Storage(){
  this.set = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  };
  this.get = function(key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
  };
}
var storage = new Storage();

function ObjActive(x,y,w,h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.removeFromWorld = false;
  this.last = { x: null, y: null };
  this.color = 'red';
  this.update = function(){
    // Updates here
  };
  this.draw = function(){
    // Draws here
  };
  this.clear = function(){
    // Clears here
  };
}

/*
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
// var x = (0.5 + this.x) | 0; // Bitwise rounding hack
// var y = (0.5 + this.y) | 0; // Bitwise rounding hack
}
*/