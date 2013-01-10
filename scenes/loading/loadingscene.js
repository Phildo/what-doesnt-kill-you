var LoadingScene = function(stage)
{
  var self = this;
  self.progress = 0.0;

  self.willEnter = function()
  {
    self.progress = 0.0;
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
    stage.context.fillRect(20,100,stage.canvas.width-40,stage.canvas.height-200);
    stage.context.clearRect(30,110,stage.canvas.width-60,stage.canvas.height-220);
  }
  self.willExit = function()
  {
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
  }
  self.update = function(delta)
  {
    self.progress+=delta/100;
    if(self.progress > 100) self.progress = 100;

    stage.context.fillRect(30,110,(self.progress/100)*(stage.canvas.width-60),stage.canvas.height-220);

    if(self.progress >= 100) 
      game.sceneHandler.showScene(game.sceneHandler.introScene);
  }
}
LoadingScene.prototype = Scene.prototype;