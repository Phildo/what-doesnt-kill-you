var PlayScene = function(stage)
{
  var self = this;

  self.willEnter = function()
  {
    console.log('will enter play');
  }
  self.willExit = function()
  {
  }
  self.update = function(delta)
  {
  }
}
PlayScene.prototype = Scene.prototype;
