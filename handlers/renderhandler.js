var RenderHandler = function(stage)
{
  var self = this;

  self.renders = new RegistrationList("RENDER");

  self.addRender = function(render)
  {
    self.renders.register(render);
  }

  self.removeRender = function(render)
  {
    self.renders.unregister(render);
  }

  self.renderRenders = function()
  {
    self.renders.performOnMembers(self.renderRender);
  }
  self.renderRender = function(render, arg)
  {
    render.render();
  }
};

var Render = function(parent) { this.parent = parent; };
Render.prototype.render = function() {};
