var LoadingScene = function(stage)
{
  this.progress = 0.0;

  this.stuffLoaded = 0;
  this.stuffToLoad = 5;

  var self = this;
  this.thingWasLoaded = function()
  {
    self.stuffLoaded++;
  };

  this.willEnter = function()
  {
    stage.blits.register(this, 0);

    this.progress = 0.0;

    game.model.bombImg.onload = this.thingWasLoaded;
    game.model.healthrateImg.onload = this.thingWasLoaded;
    game.model.defenseImg.onload = this.thingWasLoaded;
    game.model.attackImg.onload = this.thingWasLoaded;
    game.model.speedImg.onload = this.thingWasLoaded;
    
    game.model.bombImg.src = "assets/images/bomb.png";
    game.model.healthrateImg.src = "assets/images/healthrate.png";
    game.model.defenseImg.src = "assets/images/defense.png";
    game.model.attackImg.src = "assets/images/attack.png";
    game.model.speedImg.src = "assets/images/speed.png";
  };
  this.willExit = function()
  {
    stage.blits.unregister(this, 0);
  };
  this.update = function(delta)
  {
    //Simulates smooth loading, even though it happens in chunks.
    if((this.progress / 100) < (this.stuffLoaded / this.stuffToLoad))
      this.progress+=2;
    if(this.progress > 100) this.progress = 100;

    if(this.progress >= 100) 
      game.sceneHandler.showScene(game.sceneHandler.introScene);
  };

  this.draw = function()
  {
    //no need to do any preparatory drawing- just a rectangle.
  };
  this.blitTo = function(canv)
  {
    //Fake blit. Just draws directly to it.
    canv.context.clearRect(0,0,canv.canvas.width,canv.canvas.height);
    canv.context.fillRect(20,100,canv.canvas.width-40,canv.canvas.height-200);
    canv.context.clearRect(30,110,canv.canvas.width-60,canv.canvas.height-220);
    canv.context.fillRect(30,110,(this.progress/100)*(canv.canvas.width-60),canv.canvas.height-220);
  };
}
LoadingScene.prototype = Scene.prototype;
