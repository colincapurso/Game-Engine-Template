// GLOBAL FUNCTIONS
function isCollide(a,b){
	if (a.x <= (b.x + b.w) 
		&& b.x <= (a.x + a.w) 
		&& a.y <= (b.y + b.h) 
		&& b.y <= (a.y + a.h)){
		return true
	} else {
		return false;
	}
}

// localStorage doesn't support objects or arrays, so use this for local storage
function Storage(){
  this.set = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  this.get = function(key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }
}
var storage = new Storage();