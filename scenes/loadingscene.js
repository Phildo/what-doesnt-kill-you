var LoadingScene = function(stage)
{
  var self = this;
  self.progress = 0.0;

  self.stuffLoaded = 0;
  self.stuffToLoad = 4;

  self.thingWasLoaded = function()
  {
    self.stuffLoaded++;
  };

  self.willEnter = function()
  {
    self.progress = 0.0;
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
    stage.context.fillRect(20,100,stage.canvas.width-40,stage.canvas.height-200);
    stage.context.clearRect(30,110,stage.canvas.width-60,stage.canvas.height-220);

    game.model.bombImg.onload = self.thingWasLoaded;
    game.model.healthrateImg.onload = self.thingWasLoaded;
    game.model.defenseImg.onload = self.thingWasLoaded;
    game.model.attackImg.onload = self.thingWasLoaded;
    
    game.model.bombImg.src = "assets/images/bomb.png";
    game.model.healthrateImg.src = "assets/images/healthrate.png";
    game.model.defenseImg.src = "assets/images/defense.png";
    game.model.attackImg.src = "assets/images/attack.png";
  };
  self.willExit = function()
  {
    stage.context.clearRect(0,0,stage.canvas.width,stage.canvas.height);
  };
  self.update = function(delta)
  {
    if((self.progress / 100) < (self.stuffLoaded / self.stuffToLoad))
      self.progress+=2;
    if(self.progress > 100) self.progress = 100;

    stage.context.fillRect(30,110,(self.progress/100)*(stage.canvas.width-60),stage.canvas.height-220);

    if(self.progress >= 100) 
      game.sceneHandler.showScene(game.sceneHandler.introScene);
  };
}
LoadingScene.prototype = Scene.prototype;
