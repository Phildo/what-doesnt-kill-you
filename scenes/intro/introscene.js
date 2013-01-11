var IntroScene = function(stage)
{
  var self = this;
  var dirty = true;

  var startButton = new ClickBox();
  startButton.stageX = 20;
  startButton.width = stage.canvas.width-40;
  startButton.stageY = 100;
  startButton.height = 50;
  startButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.playScene);
  }

  var optionsButton = new ClickBox();
  optionsButton.stageX = 20;
  optionsButton.width = stage.canvas.width-40;
  optionsButton.stageY = stage.canvas.height-150;
  optionsButton.height = 50;
  optionsButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.optionsScene);
  }

  self.willEnter = function()
  {
    dirty = true;
    game.clickboxHandler.addClickBox(startButton);
    game.clickboxHandler.addClickBox(optionsButton);
  }
  self.willExit = function()
  {
    game.clickboxHandler.removeClickBox(startButton);
    game.clickboxHandler.removeClickBox(optionsButton);
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
  }
  self.update = function(delta)
  {
    if(dirty)
    {
      stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
      stage.context.fillRect(startButton.stageX,startButton.stageY,startButton.width,startButton.height);
      stage.context.clearRect(startButton.stageX+10,startButton.stageY+10,startButton.width-20,startButton.height-20);
      stage.context.fillText("start",startButton.stageX+(startButton.width/2),startButton.stageY+(startButton.height/2)+10);

      stage.context.fillRect(optionsButton.stageX,optionsButton.stageY,optionsButton.width,optionsButton.height);
      stage.context.clearRect(optionsButton.stageX+10,optionsButton.stageY+10,optionsButton.width-20,optionsButton.height-20);
      stage.context.fillText("options",optionsButton.stageX+(optionsButton.width/2),optionsButton.stageY+(optionsButton.height/2)+10);
    }
    dirty = false;
    return;
  }
}
IntroScene.prototype = Scene.prototype;
