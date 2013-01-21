var EnemyHandler = function()
{
  this.activeNeutralEnemies = new RegistrationList("ACTIVE_NEUTRAL_ENEMIES");
  var update = function(member, delta)
  {
    member.update(delta);
  }
  var draw = function(member, args)
  {
    member.draw(args);
  }
  this.deadNeutralEnemies = new RegistrationList("DEAD_NEUTRAL_ENEMIES");

  this.getEnemy = function(type)
  {
    var p;
    switch(type)
    {
      case "NEUTRAL":
        if(p = this.deadNeutralEnemies.firstMember())
          this.deadNeutralEnemies.unregister(p);
        else
          p = new NeutralEnemy(this);
        break;
    }
    return p;
  }

  this.addEnemy = function(p)
  {
    switch(p.type)
    {
      case "NEUTRAL":
        this.activeNeutralEnemies.register(p);
        break;
    }
  };

  this.retire = function(p)
  {
    switch(p.type)
    {
      case "NEUTRAL":
        this.activeNeutralEnemies.moveMemberToList(p, this.deadNeutralEnemies);
        break;
    }
  }

  this.update = function(delta)
  {
    this.activeNeutralEnemies.performOnMembers(update, delta);
  };
  this.draw = function(canvas, context)
  {
    var stage = {"canvas":canvas,"context":context};
    this.activeNeutralEnemies.performOnMembers(draw, stage);
  };
};

var NeutralEnemy = function(handler)
{
  this.handler = handler;
  this.type = "NEUTRAL";
  this.color = "#ff0000";;
  this.width = 12;
  this.speed = 1;
  this.damage = 5;

  var r = Math.floor(Math.random()*4);
  var r2 = Math.random();
  switch(r)
  {
    case 0://top
      this.y = 0;
      this.x = 1000*r2;
      break;
    case 1://right
      this.y = 1000*r2;
      this.x = 1000;
      break;
    case 2://bottom
      this.y = 1000;
      this.x = 1000*r2;
      break;
    case 3://left
      this.y = 1000*r2;
      this.x = 0;
      break;
  }

  this.update = function(delta)
  {
    var xdist = this.x - game.model.player.x;
    var ydist = this.y - game.model.player.y;

    var dist = Math.sqrt((xdist*xdist)+(ydist*ydist));
    var travel = (this.speed*delta)/dist;
    this.x -= travel*xdist;
    this.y -= travel*ydist;
    if(dist < this.speed)
      this.die();
  }
  this.draw = function(stage)
  {
    stage.context.fillStyle = this.color;
    stage.context.fillRect(this.x-(this.width/2),this.y-(this.width/2),this.width,this.width);
  }
  this.die = function()
  {
    game.model.player.hurt(this.damage);
    this.handler.retire(this);
  }
}
