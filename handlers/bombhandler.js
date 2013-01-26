var BombHandler = function(scene)
{
  this.scene = scene;
  this.activeBombs = new RegistrationList("ACTIVE_BOMBS");
  this.deadBombs = new RegistrationList("DEAD_BOMBS");

  this.reset = function()
  {
    var e;
    while(e = this.activeBombs.firstMember()) this.retire(e);
  };

  this.getBomb = function()
  {
    var p;
    if(p = this.deadBombs.firstMember()) this.deadBombs.unregister(p);
    else p = new Bomb(this);
    p.x = game.model.posx;
    p.y = game.model.posy;
    p.progress = 0;
    return p;
  }

  this.addBomb = function(p)
  {
    this.activeBombs.register(p);
  };

  this.retire = function(p)
  {
    this.activeBombs.moveMemberToList(p, this.deadBombs);
  }

  this.update = function(delta)
  {
    this.activeBombs.performOnMembers("update", delta);
  };
  this.draw = function(canv)
  {
    this.activeBombs.performOnMembers("draw", canv);
  };
};

var Bomb = function(handler)
{
  this.handler = handler;
  this.x = 0;
  this.y = 0;
  this.progress = 0;
};
Bomb.prototype.update = function(delta)
{
  this.progress += delta/100;
  if(this.progress > 1) this.handler.retire(this);
};
Bomb.prototype.draw = function(canv)
{
  canv.context.strokeStyle = '#FF9900';
  canv.context.lineWidth = 3;
  canv.context.beginPath();
  canv.context.arc(this.x, this.y, this.progress*100, 0, 2 * Math.PI, false);
  canv.context.stroke();
};
