var ClickBoxHandler = function(stage)
{
  var self = this;

  self.clickboxes = new RegistrationList("CLICKBOX");

  self.addClickBox = function(clickbox)
  {
    self.clickboxes.register(clickbox);
  }

  self.removeClickBox = function(clickbox)
  {
    self.clickboxes.unregister(clickbox);
  }

  self.checkAllHoverCollisions = function(e)
  {
    var point = {"x":e.x-stage.canvas.offsetLeft,"y":e.y-stage.canvas.offsetTop};
    self.clickboxes.performOnMembers(self.checkHoverCollision, point);
  }
  self.checkHoverCollision = function(clickbox, point)
  {
    if(clickbox.isPointInBounds(point)) clickbox.hover();
  }

  self.checkAllPressCollisions = function(e)
  {
    var point = {"x":e.x-stage.canvas.offsetLeft,"y":e.y-stage.canvas.offsetTop};
    self.clickboxes.performOnMembers(self.checkPressCollision, point);
  }
  self.checkPressCollision = function(clickbox, point)
  {
    if(clickbox.isPointInBounds(point)) clickbox.press();
  }

  self.checkAllReleaseCollisions = function(e)
  {
    var point = {"x":e.x-stage.canvas.offsetLeft,"y":e.y-stage.canvas.offsetTop};
    self.clickboxes.performOnMembers(self.checkReleaseCollision, point);
  }
  self.checkReleaseCollision = function(clickbox, point)
  {
    if(clickbox.isPointInBounds(point)) clickbox.release();
  }

  //stage.canvas.addEventListener('mousemove', self.checkAllHoverCollisions, false); //too expensive... not worth it
  stage.canvas.addEventListener('mousedown', self.checkAllPressCollisions, false);
  stage.canvas.addEventListener('mouseup', self.checkAllReleaseCollisions, false);
};

var ClickBox = function(parent) { this.parent = parent; };
ClickBox.prototype.hover = function() {};
ClickBox.prototype.press = function() {};
ClickBox.prototype.release = function() {};
ClickBox.prototype.isPointInBounds = function(point) 
{
  if(point.x > this.stageX && point.x < this.stageX+this.width
  && point.y > this.stageY && point.y < this.stageY+this.height)
    return true;
  return false;
}
ClickBox.stageX = 0;
ClickBox.stageY = 0;
ClickBox.width = 0;
ClickBox.height = 0;
