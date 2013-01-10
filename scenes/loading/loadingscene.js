var LoadingScene = function()
{
  var self = this;
  this.progress = 0.0;

  this.willAppear = function()
  {
    this.progress = 0.0;
    game.stage.context.clearRect(0,0,game.stage.canvas.width,game.stage.canvas.height);
    game.stage.context.fillRect(20,100,game.stage.canvas.width-40,game.stage.canvas.height-200);
    game.stage.context.clearRect(30,110,game.stage.canvas.width-60,game.stage.canvas.height-220);
  }
  this.willDisappear = function()
  {

  }
  this.update = function(delta)
  {
    if(self.progress >= 100) return;
    self.progress+=delta/100;
    game.stage.context.fillRect(30,110,(self.progress/100)*(game.stage.canvas.width-60),game.stage.canvas.height-220);
  }
}
LoadingScene.prototype = Scene.prototype;
