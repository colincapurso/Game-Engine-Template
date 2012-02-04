// localStorage doesn't support objects or arrays, so use this for local storage
function Storage(){
  this.set = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log('Map Saved to localStorage')
  };
  this.get = function(key) {
    var value = localStorage.getItem(key);
    console.log('Map Loaded from localStorage')
    return value && JSON.parse(value);
  };
}
var storage = new Storage();