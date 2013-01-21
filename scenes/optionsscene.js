var OptionsScene = function(stage)
{
  var dirty = true;

  var testAButton = new ClickBox(this, 20, 100, stage.c.canvas.width-40, 50);
  testAButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.introScene);
  };

  var testBButton = new ClickBox(this, 20, stage.c.canvas.height-150, stage.c.canvas.width-40, 50);
  testBButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.introScene);
  };

  this.willEnter = function()
  {
    dirty = true;
    game.clickboxHandler.clickBoxes.register(testAButton);
    game.clickboxHandler.clickBoxes.register(testBButton);
    stage.blits.register(this, 0);
  }
  this.willExit = function()
  {
    game.clickboxHandler.clickBoxes.unregister(testAButton);
    game.clickboxHandler.clickBoxes.unregister(testBButton);
    stage.blits.unregister(this, 0);
  }
  this.update = function(delta)
  {
    //No motion dawg
  };

  this.draw = function()
  {
    //no need to do any preparatory drawing- just a rectangle
  };
  this.blitTo = function(canv)
  {
    if(dirty)
    {
      canv.context.clearRect(0,0,canv.canvas.width,canv.canvas.height);

      canv.context.textAlign = 'center';
      canv.context.fillStyle = "#000000";
      canv.context.font = '24px vg_font';

      canv.context.fillRect(testAButton.stageX,testAButton.stageY,testAButton.width,testAButton.height);
      canv.context.clearRect(testAButton.stageX+10,testAButton.stageY+10,testAButton.width-20,testAButton.height-20);
      canv.context.fillText("testA",testAButton.stageX+(testAButton.width/2),testAButton.stageY+(testAButton.height/2)+10);

      canv.context.fillRect(testBButton.stageX,testBButton.stageY,testBButton.width,testBButton.height);
      canv.context.clearRect(testBButton.stageX+10,testBButton.stageY+10,testBButton.width-20,testBButton.height-20);
      canv.context.fillText("testB",testBButton.stageX+(testBButton.width/2),testBButton.stageY+(testBButton.height/2)+10);
    }
    dirty = false;
  };
}
OptionsScene.prototype = Scene.prototype;
