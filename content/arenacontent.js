var ArenaContent = function()
{
  this.c = new Canv(1000,1000);

  this.renderList = new RegistrationList("ARENA");

  this.draw = function()
  {
    this.c.context.clearRect(0,0,this.c.canvas.width,this.c.canvas.height);
    this.renderList.performOnMembers("draw", this.c);
  };

  this.blitTo = function(canv)
  {
    //drawImage(source, sourcex, sourcey, sourcew, sourceh, destx, desty, destw, desth);
    canv.context.drawImage(this.c.canvas, (game.model.posx/1000)*360, (game.model.posy/1000)*680, canv.width, canv.height, 0, 0, canv.width, canv.height);
  };
}
