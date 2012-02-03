////////////////////////////////
//////// Gamepad Stuff /////////
////////////////////////////////
var gamepads = {};

function connectHandler(e) {
  var gamepad = e.gamepad;
  gamepads[e.gamepad.id] = gamepad;
  gamepadUpdate();
}

function disconnectHandler(e) {
  var d = document.getElementById(e.gamepad.id);
  document.body.removeChild(d);
  delete gamepads[e.gamepad.id];
}

function gamepadUpdate() {
  for (j in gamepads) {
    var gamepad = gamepads[j];
    if (gamepad.axes[1] < -0.5){
      //keysDown['up'] = true;
    }  else if (gamepad.axes[1] > 0.5){
      // keysDown['down'] = true;
    }  else {
      // delete keysDown['up'];
      // delete keysDown['down'];
    }
    if (gamepad.axes[0] < -0.5){
      keysDown['left'] = true;
    }  else if (gamepad.axes[0] > 0.5){
      keysDown['right'] = true;
    }  else {
      delete keysDown['left'];
      delete keysDown['right'];
    }
    if ( gamepad.buttons[0] == 1){
      keysDown['space'] = true;
    } else {
      delete keysDown['space'];
    }
    

    /* Controls
    gamepad.buttons[0]; // A
    gamepad.buttons[1]; // B
    gamepad.buttons[2]; // X
    gamepad.buttons[3]; // Y
    gamepad.axes[0]; // Left Right
    gamepad.axes[1]; // Up Down
    */
  }
}
/*
window.addEventListener("MozGamepadConnected", connectHandler);
window.addEventListener("MozGamepadDisconnected", disconnectHandler);
*/

// window.addEventListener('webkitgamepadconnected', connectHandler, false);
// window.addEventListener('webkitgamepaddisconnected', disconnectHandler, false);

window.addEventListener('MozGamepadDisconnected', disconnectHandler, false);
window.addEventListener('MozGamepadConnected', connectHandler, false);
