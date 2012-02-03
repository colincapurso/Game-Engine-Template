////////////////////////////////////////////////////////////////
/////////////////////// Keyboard Input /////////////////////////
////////////////////////////////////////////////////////////////
var KEYMAP = {
	// Arrow Keys
	up: 38,	down: 40,	left: 37,	right: 39,
	// WASD
	w: 87, a: 65, s: 83, d: 68,
	// SPACE
	space: 32,
	// Number Keys
	num1: 49,
	num2: 50,
	num3: 51,
	num4: 52,
	num5: 53,
	num6: 54,
	num7: 55,
	num8: 56,
	num9: 57,
	num0: 48,
	minus: 189,
	plus: 187,
	minus1: 109,
	plus1: 107,
	checkKeys: function(keyCode){
		var k;
		switch(keyCode){
			case KEYMAP.up: k = 'up'; break;
			case KEYMAP.down: k = 'down'; break;
			case KEYMAP.left: k = 'left'; break;
			case KEYMAP.right: k = 'right'; break;
			case KEYMAP.space: k = 'space'; break;
			case KEYMAP.w: k = 'w'; break;
			case KEYMAP.a: k = 'a'; break;
			case KEYMAP.s: k = 's'; break;
			case KEYMAP.d: k = 'd'; break;
			case KEYMAP.plus: k = 'plus'; break;
			case KEYMAP.minus: k = 'minus'; break;
			case KEYMAP.plus1: k = 'plus1'; break;
			case KEYMAP.minus1: k = 'minus1'; break;
		}
		return k;
	}
};

function keyListener(){
	window.onkeydown = keyPressed;
	window.onkeyup = keyReleased;
}

var keysDown = []; // Tracks keys

function keyPressed(e){
	// e.preventDefault(); // This disables key default behaviour, like scrolling
	var k = KEYMAP.checkKeys(e.keyCode); // This event is for keys held down
	if (k){ keysDown[k] = true; }
}
function keyReleased(e){
	var k = KEYMAP.checkKeys(e.keyCode);
	if (k){ delete keysDown[k]; }
}

function isKeyDown(k){
	return keysDown[k];
}

///////////////////////////////////////////////////////
////////////// MOUSE AND TOUCH EVENTS /////////////////
///////////////////////////////////////////////////////
var latestCoords = [{x: 0, y: 0}];
var isMouseDown = false;
function mouseTouchListener(){
	window.onkeydown = keyPressed;
	window.onkeyup = keyReleased;

	canvas.ontouchmove = mouseMove;
	canvas.ontouchstart = mouseDown;
	canvas.ontouchend = mouseUp;

	canvas.onmousemove = mouseMove;
	canvas.onmousedown = mouseDown;
	canvas.onmouseup = mouseUp;
  // canvas.onmouseclick = // Click Event
  
  window.addEventListener('DOMMouseScroll', scroll, false);
  window.onmousewheel = document.onmousewheel = scroll;
}

function mouseMove(e){
	if (e.touches) {
		// Touch Events
		for ( i=1; i <= e.touches.length; i++ ){
			latestCoords[i] = getCoords(e.touches[i - 1]);
		}
	} else {
		// Mouse Events
		latestCoords[0] = getCoords(e);
	}
}

function mouseDown(e){ // AKA Input Start
	var p = getCoords(e);
  isMouseDown = true;
}
function mouseUp(e){ // AKA Input End
	var p = getCoords(e);
  isMouseDown = false;
}

function getCoords(e) {
	if (e.offsetX)
		return { x: e.offsetX, y: e.offsetY };
	else if (e.layerX)
		return { x: e.layerX, y: e.layerY };
	else
		return { x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop };
}

function scroll(e){
  e.preventDefault();
  var direction;
  if ( e.wheelDelta > 0 || e.wheelDeltaY > 0 || e.detail < 0){
    direction = 'zoom in';
    if ('plus'){ keysDown['plus'] = true; }
  } else if ( e.wheelDelta < 0 || e.wheelDeltaY < 0 || e.detail > 0){
    direction = 'zoom out';
    if ('minus'){ keysDown['minus'] = true; }
  }
}