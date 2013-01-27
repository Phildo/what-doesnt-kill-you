var IntroScene = function(stage)
{
  var dirty = true;

  var startButton = new ClickBox(this, 20, 100, stage.c.canvas.width-40, 50);
  startButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.playScene);
  };

  var optionsButton = new ClickBox(this, 20, stage.c.canvas.height-150, stage.c.canvas.width-40, 50);
  optionsButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.optionsScene);
  };

  this.willEnter = function()
  {
    dirty = true;
    game.clickBoxHandler.clickBoxes.register(startButton);
    game.clickBoxHandler.clickBoxes.register(optionsButton);
    stage.blits.register(this, 0);
  };
  this.willExit = function()
  {
    game.clickBoxHandler.clickBoxes.unregister(startButton);
    game.clickBoxHandler.clickBoxes.unregister(optionsButton);
    stage.blits.unregister(this, 0);
  };
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
    //Fake blit. Just draws.
    if(dirty)
    {
      canv.context.clearRect(0,0,canv.canvas.width,canv.canvas.height);

      canv.context.textAlign = 'center';
      canv.context.fillStyle = "#000000";
      canv.context.font = '24px vg_font';
      canv.context.fillText("what doesn't kill you...",320,80);

      canv.context.fillRect(startButton.stageX,startButton.stageY,startButton.width,startButton.height);
      canv.context.clearRect(startButton.stageX+10,startButton.stageY+10,startButton.width-20,startButton.height-20);
      canv.context.fillText("start",startButton.stageX+(startButton.width/2),startButton.stageY+(startButton.height/2)+10);

      canv.context.fillRect(optionsButton.stageX,optionsButton.stageY,optionsButton.width,optionsButton.height);
      canv.context.clearRect(optionsButton.stageX+10,optionsButton.stageY+10,optionsButton.width-20,optionsButton.height-20);
      canv.context.fillText("options",optionsButton.stageX+(optionsButton.width/2),optionsButton.stageY+(optionsButton.height/2)+10);

      canv.context.fillStyle = "#FAFAFA";
      canv.context.fillText("makes you stronger",320,264);
    }
    dirty = false;
  };
}
IntroScene.prototype = Scene.prototype;
