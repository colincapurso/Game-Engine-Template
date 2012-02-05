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