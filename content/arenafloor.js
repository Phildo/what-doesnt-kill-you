var ArenaFloor = function()
{
  this.c = new Canv(1000,1000);

  //Draw initial bg on canvas (NOTE- THIS CANVAS SHOUlD NEVER GET CLEARED!(/CLEANED))
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

  this.blitTo = function(canv)
  {
    //drawImage(source, sourcex, sourcey, sourcew, sourceh, destx, desty, destw, desth);
    canv.context.drawImage(this.c.canvas, (game.model.posx/1000)*360, (game.model.posy/1000)*680, canv.width, canv.height, 0, 0, canv.width, canv.height);
  };
};
