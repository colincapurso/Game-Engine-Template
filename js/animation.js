function AnimationEngine(image, frameWidth, frameHeight, frameDuration, loop){
  this.image = image;
  this.w = frameWidth;
  this.h = frameHeight;
  this.offset;
  this.frameDuration = frameDuration;
  this.ticker = 0;
  this.loop = loop;
  this.timeTotal = (image.width / frameWidth) * frameDuration;
  
  this.draw = function(ctx, x, y, w, h){
    var isDone = this.ticker >= this.timeTotal;
    this.ticker++;
    
    if (this.loop){
      if ( isDone ){ this.ticker = 0; }
    } else if ( isDone ){
      return false;
    }
    
    var frame = Math.floor( this.timeElapsed / this.timePerFrame );
    var sx = this.w * frame;
    var sy = this.h * this.offset;
    ctx.drawImage(this.img, sx, sy, this.w, this.h, x, y, w, h);
  };
}

function Animation(img, fw, fh, offset, timePerFrame, loop) {
  this.img = img;
  this.fw = fw; // Frame Width
  this.fh = fh; // Frame Height
  this.offset = offset;
  this.h = this.img.height;
  this.timePerFrame = timePerFrame;
  this.totalTime = (this.img.width / this.fw) * this.timePerFrame;
  this.timeElapsed = 0;
  this.loop = loop;

  this.draw = function(ctx, x, y) {
    this.timeElapsed++;
    if (this.loop) {
      if ( this.isDone() ) { this.timeElapsed = 0; }
    } else if ( this.isDone() ) {
      return;
    }
    var index = Math.floor( this.timeElapsed / this.timePerFrame );

    var sx = this.fw * index;
    var sy = this.fh * this.offset;
    var sw = this.fw;
    var sh = this.h;

    ctx.drawImage(this.img, sx, sy, sw, sh, x, y, sw, sh);
  };

  this.isDone = function() {
    return (this.timeElapsed >= this.totalTime);
  };
}