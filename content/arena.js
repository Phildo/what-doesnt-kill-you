var Arena = function()
{
  this.c = new Canv(1000,1000);

  this.renderList = new PrioritizedRegistrationList("ARENA", 4);

  this.floor = new ArenaFloor();
  this.renderList.register(this.floor, 0);

  this.particleHandler = new ParticleHandler(this.c);
  this.renderList.register(this.particleHandler, 3);

  this.update = function(delta)
  {
    this.particleHandler.update(delta);
  };

  this.draw = function()
  {
    this.c.context.clearRect(0,0,this.c.canvas.width,this.c.canvas.height);
    this.renderList.performOnMembers("draw", this.c);
  };

  this.blitTo = function(canv)
  {
    //drawImage(source, sourcex, sourcey, sourcew, sourceh, destx, desty, destw, desth);
    //A window into the source canvas the size of the destination canvas centered around player
    canv.context.drawImage(this.c.canvas, 
      (game.model.posx/this.c.canvas.width)*(this.c.canvas.width-canv.canvas.width), 
      (game.model.posy/this.c.canvas.height)*(this.c.canvas.height-canv.canvas.height), 
      canv.canvas.width, 
      canv.canvas.height, 
      0, 
      0, 
      canv.canvas.width, 
      canv.canvas.height);
  };
}

var ArenaFloor = function()
{
  this.c = new Canv(1000,1000);

  //Draw initial bg on canvas (NOTE- THIS CANVAS SHOUlD NEVER GET CLEARED!(/CLEANED))
  this.c.context.fillStyle = "#FFFFFF";
  this.c.context.fillRect(0,0,1000,1000);
  this.c.context.lineWidth = 4;
  this.c.context.strokeStyle = "#BBBBBB";
  this.c.context.beginPath();
  for(var i = 0; i < 10; i++)
  {
    this.c.context.moveTo(0, i*100);
    this.c.context.lineTo(1000, i*100);
  }
  for(var i = 0; i < 10; i++)
  {
    this.c.context.moveTo(i*100, 0);
    this.c.context.lineTo(i*100, 1000);
  }
  this.c.context.closePath();
  this.c.context.stroke();

  this.draw = function(canv)
  {
    this.c.blitTo(canv);//full 1-1 blit
  };
};
