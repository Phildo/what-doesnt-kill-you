var Arena = function()
{
  var self = this;

  this.canvas = document.createElement('canvas');
  this.canvas.setAttribute('width',1000);
  this.canvas.setAttribute('height',1000);
  this.context = this.canvas.getContext('2d');
  this.context.font = '12px vg_font';
  this.context.textAlign = 'center';
  this.context.imageSmoothingEnabled = false;
  this.context.webkitImageSmoothingEnabled = false;

  this.renderList = new RegistrationList("ARENA");
  this.drawMember = function(member, stage)
  {
    member.draw(stage.canvas, stage.context);
  }
}
Arena.prototype.draw = function(canvas, context)
{
  this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  this.renderList.performOnMembers(this.drawMember, this);
  context.drawImage(this.canvas, (game.model.player.x/1000)*360, (game.model.player.y/1000)*680, game.stage.canvas.width, game.stage.canvas.height, 0, 0, game.stage.canvas.width, game.stage.canvas.height);
}
