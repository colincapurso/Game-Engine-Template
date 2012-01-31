function cameraStart(){
		// Camera: Save and Translate
		if (game.camera){
			// Full screen clear
			game.context.clearRect(0,0,game.width,game.height);
			var c = {
				x: -game.camera.obj.x + game.camera.x - game.camera.obj.w,
				y: -game.camera.obj.y + game.camera.y
			};
			game.context.save();
			game.context.translate( c.x, c.y );
		}
}

function cameraRestore(){
	if (game.camera){ game.context.restore(); }
}