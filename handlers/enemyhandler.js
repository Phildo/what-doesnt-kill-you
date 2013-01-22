var EnemyHandler = function(scene)
{
  this.scene = scene;
  this.activeBaseEnemies = new RegistrationList("ACTIVE_BASE_ENEMIES");
  this.deadBaseEnemies = new RegistrationList("DEAD_BASE_ENEMIES");

  this.reset = function()
  {
    var e;
    while(e = this.activeBaseEnemies.firstMember()) this.retire(e);
  };

  this.getEnemy = function(type)
  {
    var p;
    switch(type)
    {
      case "BASE":
        if(p = this.deadBaseEnemies.firstMember())
          this.deadBaseEnemies.unregister(p);
        else
          p = new BaseEnemy(this);
        break;
    }
    p.randomizeStartPoint();
    return p;
  }

  this.addEnemy = function(p)
  {
    switch(p.type)
    {
      case "BASE":
        this.activeBaseEnemies.register(p);
        break;
    }
  };

  this.retire = function(p)
  {
    switch(p.type)
    {
      case "BASE":
        this.activeBaseEnemies.moveMemberToList(p, this.deadBaseEnemies);
        break;
    }
  }

  this.update = function(delta)
  {
    this.activeBaseEnemies.performOnMembers("update", delta);
  };
  this.draw = function(canv)
  {
    this.activeBaseEnemies.performOnMembers("draw", canv);
  };
};

var BaseEnemy = function(handler)
{
  this.handler = handler;
  this.type = "BASE";
  this.color = "#ff0000";;
  this.width = 12;
  this.speed = 1;
  this.damage = 3;
  this.maxHealth = 1;
  this.health = this.maxHealth;
  this.x = 0;
  this.y = 0;
};
BaseEnemy.prototype.randomizeStartPoint = function()
{
  var r = Math.floor(Math.random()*4); //Which side
  var r2 = Math.random(); //Where on side
  switch(r)
  {
    case 0://top
      this.y = 200;
      this.x = 200+(1000*r2);
      break;
    case 1://right
      this.y = 200+(1000*r2);
      this.x = 1200;
      break;
    case 2://bottom
      this.y = 1200;
      this.x = 200+(1000*r2);
      break;
    case 3://left
      this.y = 200+(1000*r2);
      this.x = 200;
      break;
  }
};
BaseEnemy.prototype.update = function(delta)
{
  var xdist = this.x - game.model.posx;
  var ydist = this.y - game.model.posy;
  var dist = Math.sqrt((xdist*xdist)+(ydist*ydist));
  var travel = (this.speed*delta)/dist;
  this.x -= travel*xdist;
  this.y -= travel*ydist;
  if(dist < this.speed+this.handler.scene.player.width)
    this.attack();
};
BaseEnemy.prototype.draw = function(canv)
{
  canv.context.fillStyle = this.color;
  canv.context.fillRect(this.x-(this.width/2),this.y-(this.width/2),this.width,this.width);
};
BaseEnemy.prototype.attack = function()
{
  this.handler.scene.player.hurt(this.damage);
  this.health -= game.model.attack;
  if(this.health <= 0)
  {
    this.health = this.maxHealth;
    this.handler.retire(this);
  }
};
