// GLOBAL FUNCTIONS
function isCollideTODELETE(a,b){
  if (a.x <= (b.x + b.w) 
    && b.x <= (a.x + a.w) 
    && a.y <= (b.y + b.h) 
    && b.y <= (a.y + a.h)){
    return true;
  }
}