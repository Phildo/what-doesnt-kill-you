var ClickBoxHandler = function(canv)
{
  var self = this;

  this.clickBoxes = new RegistrationList("CLICKBOX");

  this.checkAllHoverCollisions = function(e)
  {
    var point = {"x":e.x-canv.canvas.offsetLeft,"y":e.y-canv.canvas.offsetTop};
    self.clickBoxes.performMemberFunction("checkHover", point);
  }

  this.checkAllPressCollisions = function(e)
  {
    var point = {"x":e.clientX-canv.canvas.offsetLeft,"y":e.clientY-canv.canvas.offsetTop};
    self.clickBoxes.performMemberFunction("checkPress", point);
  }

  this.checkAllReleaseCollisions = function(e)
  {
    var point = {"x":e.clientX-canv.canvas.offsetLeft,"y":e.clientY-canv.canvas.offsetTop};
    self.clickBoxes.performMemberFunction("checkRelease", point);
  }

  //canv.canvas.addEventListener('mousemove', this.checkAllHoverCollisions, false); //too expensive... not worth it //let users of clickboxhandler set it
  canv.canvas.addEventListener('mousedown', this.checkAllPressCollisions, false);
  canv.canvas.addEventListener('mouseup', this.checkAllReleaseCollisions, false);
};

var ClickBox = function(parent, stageX, stageY, width, height) 
{ 
  this.parent = parent; 

  this.stageX = stageX;
  this.stageY = stageY;
  this.width = width;
  this.height = height;
};
ClickBox.prototype.hover = function() {};
ClickBox.prototype.checkHover = function(point) { if(this.isPointInBounds(point)) this.hover(); };
ClickBox.prototype.press = function() {};
ClickBox.prototype.checkPress = function(point) { if(this.isPointInBounds(point)) this.press(); }
ClickBox.prototype.release = function() {};
ClickBox.prototype.checkRelease = function(point) { if(this.isPointInBounds(point)) this.release(); }
ClickBox.prototype.isPointInBounds = function(point) 
{
  if(point.x > this.stageX && point.x < this.stageX+this.width
  && point.y > this.stageY && point.y < this.stageY+this.height)
    return true;
  return false;
}
