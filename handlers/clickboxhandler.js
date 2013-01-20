var ClickBoxHandler = function(canv)
{
  var self = this;

  this.clickboxes = new RegistrationList("CLICKBOX");

  this.addClickBox = function(clickbox)
  {
    self.clickboxes.register(clickbox);
  }

  this.removeClickBox = function(clickbox)
  {
    self.clickboxes.unregister(clickbox);
  }

  this.checkAllHoverCollisions = function(e)
  {
    var point = {"x":e.x-canv.canvas.offsetLeft,"y":e.y-canv.canvas.offsetTop};
    self.clickboxes.performOnMembers("checkHover", point);
  }

  this.checkAllPressCollisions = function(e)
  {
    var point = {"x":e.x-canv.canvas.offsetLeft,"y":e.y-canv.canvas.offsetTop};
    self.clickboxes.performOnMembers("checkPress", point);
  }

  this.checkAllReleaseCollisions = function(e)
  {
    var point = {"x":e.x-canv.canvas.offsetLeft,"y":e.y-canv.canvas.offsetTop};
    self.clickboxes.performOnMembers("checkRelease", point);
  }

  //canv.canvas.addEventListener('mousemove', this.checkAllHoverCollisions, false); //too expensive... not worth it
  canv.canvas.addEventListener('mousedown', this.checkAllPressCollisions, false);
  canv.canvas.addEventListener('mouseup', this.checkAllReleaseCollisions, false);
};

var ClickBox = function(parent) 
{ 
  this.parent = parent; 

  this.stageX = 0;
  this.stageY = 0;
  this.width = 0;
  this.height = 0;
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
