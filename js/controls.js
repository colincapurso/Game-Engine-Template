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
	
	// TESTING PURPOSES ONLY
	testKeypress(e);
}
function keyReleased(e){
	var k = KEYMAP.checkKeys(e.keyCode);
	if (k){ delete keysDown[k]; }
}

function isKeyDown(k){
	return keysDown[k];
}

function testKeypress(e){
	switch(e.keyCode){
		case KEYMAP.num1: console.log('Keypress: 1'); break;
		case KEYMAP.num2: console.log('Keypress: 2'); break;
		case KEYMAP.num3: console.log('Keypress: 3'); break;
		case KEYMAP.num4: console.log('Keypress: 4'); break;
		case KEYMAP.num5: console.log('Keypress: 5'); break;
		case KEYMAP.num6: console.log('Keypress: 6'); break;
		case KEYMAP.num7: console.log('Keypress: 7'); break;
		case KEYMAP.num8: console.log('Keypress: 8'); break;
		case KEYMAP.num9: console.log('Keypress: 9'); break;
		case KEYMAP.num0: console.log('Keypress: 0'); break;
		case KEYMAP.plus: console.log('Keypress: +'); break;
		case KEYMAP.minus: console.log('Keypress: -'); break;
		case KEYMAP.up: console.log('Keypress: up'); break;
		case KEYMAP.down: console.log('Keypress: down'); break;
		case KEYMAP.left: console.log('Keypress: left'); break;
		case KEYMAP.right: console.log('Keypress: right'); break;
		case KEYMAP.w: console.log('Keypress: w'); break;
		case KEYMAP.a: console.log('Keypress: a'); break;
		case KEYMAP.s: console.log('Keypress: s'); break;
		case KEYMAP.d: console.log('Keypress: d'); break;
		case KEYMAP.space: console.log('Keypress: space'); break;
	}
}