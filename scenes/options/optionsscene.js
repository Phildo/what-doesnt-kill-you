var OptionsScene = function(stage)
{
  var self = this;
  var dirty = true;

  var testAButton = new ClickBox();
  testAButton.stageX = 20;
  testAButton.width = stage.canvas.width-40;
  testAButton.stageY = 100;
  testAButton.height = 50;
  testAButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.introScene);
  }

  var testBButton = new ClickBox();
  testBButton.stageX = 20;
  testBButton.width = stage.canvas.width-40;
  testBButton.stageY = stage.canvas.height-150;
  testBButton.height = 50;
  testBButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.introScene);
  }

  self.willEnter = function()
  {
    dirty = true;
    game.clickboxHandler.addClickBox(testAButton);
    game.clickboxHandler.addClickBox(testBButton);
  }
  self.willExit = function()
  {
    game.clickboxHandler.removeClickBox(testAButton);
    game.clickboxHandler.removeClickBox(testBButton);
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
  }
  self.update = function(delta)
  {
    if(dirty)
    {
      stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
      stage.context.fillRect(testAButton.stageX,testAButton.stageY,testAButton.width,testAButton.height);
      stage.context.clearRect(testAButton.stageX+10,testAButton.stageY+10,testAButton.width-20,testAButton.height-20);
      stage.context.fillText("testA",testAButton.stageX+(testAButton.width/2),testAButton.stageY+(testAButton.height/2)+10);

      stage.context.fillRect(testBButton.stageX,testBButton.stageY,testBButton.width,testBButton.height);
      stage.context.clearRect(testBButton.stageX+10,testBButton.stageY+10,testBButton.width-20,testBButton.height-20);
      stage.context.fillText("testB",testBButton.stageX+(testBButton.width/2),testBButton.stageY+(testBButton.height/2)+10);
    }
    dirty = false;
    return;
  }
}
OptionsScene.prototype = Scene.prototype;
