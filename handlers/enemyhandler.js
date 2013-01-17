var EnemyHandler = function()
{
  var self = this;

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
  this.x = 200;
  this.y = 200;

  this.update = function(delta)
  {
    if(this.x > game.model.player.x) this.x--;
    if(this.y > game.model.player.y) this.y--;
    if(this.x < game.model.player.x) this.x++;
    if(this.y < game.model.player.y) this.y++;
  }
  this.draw = function(stage)
  {
    stage.context.fillStyle = this.color;
    stage.context.fillRect(this.x-(this.width/2),this.y-(this.width/2),this.width,this.width);
  }
}
