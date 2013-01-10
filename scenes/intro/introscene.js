var IntroScene = function(stage)
{
  var self = this;
  var dirty = true;

  var startButton = new Button();
  startButton.clickBox.stageX = 20;
  startButton.x = 20;
  startButton.clickBox.width = stage.canvas.width-40;
  startButton.width = stage.canvas.width-40;
  startButton.clickBox.stageY = 100;
  startButton.y = 100;
  startButton.clickBox.height = 50;
  startButton.height = 50;
  startButton.clickBox.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.playScene);
  }
  startButton.render.render = function()
  {
    stage.context.fillRect(this.parent.x,this.parent.y,this.parent.width,this.parent.height);
    stage.context.clearRect(this.parent.x+10,this.parent.y+10,this.parent.width-20,this.parent.height-20);
  }

  self.willEnter = function()
  {
    game.clickboxHandler.addClickBox(startButton.clickBox);
    game.renderHandler.addRender(startButton.render);
  }
  self.willExit = function()
  {
    game.clickboxHandler.removeClickBox(startButton.clickBox);
    game.renderHandler.removeRender(startButton.render);
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
  }
  self.update = function(delta)
  {
    if(dirty)
    {
      stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
      game.renderHandler.renderRenders();
    }
    dirty = false;
    return;
  }
}
IntroScene.prototype = Scene.prototype;
