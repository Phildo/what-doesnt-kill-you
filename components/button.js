var Button = function()
{
  var self = this;
  self.clickBox = new ClickBox(self);
  self.render = new Render(self);
}
