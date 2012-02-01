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

function isCollideX(a,b){
	if (a.x <= (b.x + b.w) 
		&& b.x <= (a.x + a.w) 
	){
		return true
	} else {
		return false;
	}
}

function isCollideY(a,b){
	if (a.y <= (b.y + b.h) 
		&& b.y <= (a.y + a.h)){
		return true
	} else {
		return false;
	}
}