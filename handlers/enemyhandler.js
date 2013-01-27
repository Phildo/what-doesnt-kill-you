var EnemyHandler = function(scene)
{
  this.scene = scene;
  this.activeBaseEnemies = new RegistrationList("ACTIVE_BASE_ENEMIES");
  this.deadBaseEnemies = new RegistrationList("DEAD_BASE_ENEMIES");

  this.activeBulletEnemies = new RegistrationList("ACTIVE_BULLET_ENEMIES");
  this.deadBulletEnemies = new RegistrationList("DEAD_BULLET_ENEMIES");

  this.activeShooterEnemies = new RegistrationList("ACTIVE_SHOOTER_ENEMIES");
  this.deadShooterEnemies = new RegistrationList("DEAD_SHOOTER_ENEMIES");

  this.activeTankEnemies = new RegistrationList("ACTIVE_TANK_ENEMIES");
  this.deadTankEnemies = new RegistrationList("DEAD_TANK_ENEMIES");

  this.reset = function()
  {
    var e;
    while(e = this.activeBaseEnemies.firstMember()) this.retire(e);
    while(e = this.activeBulletEnemies.firstMember()) this.retire(e);
    while(e = this.activeShooterEnemies.firstMember()) this.retire(e);
    while(e = this.activeTankEnemies.firstMember()) this.retire(e);
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
      case "BULLET":
        if(p = this.deadBulletEnemies.firstMember())
          this.deadBulletEnemies.unregister(p);
        else
          p = new BulletEnemy(this);
        break;
      case "SHOOTER":
        if(p = this.deadShooterEnemies.firstMember())
          this.deadShooterEnemies.unregister(p);
        else
          p = new ShooterEnemy(this);
        break;
      case "TANK":
        if(p = this.deadTankEnemies.firstMember())
          this.deadTankEnemies.unregister(p);
        else
          p = new TankEnemy(this);
        break;
    }
    return p;
  }

  this.addEnemy = function(p)
  {
    switch(p.type)
    {
      case "BASE":
        this.activeBaseEnemies.register(p);
        break;
      case "BULLET":
        this.activeBulletEnemies.register(p);
        break;
      case "SHOOTER":
        this.activeShooterEnemies.register(p);
        break;
      case "TANK":
        this.activeTankEnemies.register(p);
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
      case "BULLET":
        this.activeBulletEnemies.moveMemberToList(p, this.deadBulletEnemies);
        break;
      case "SHOOTER":
        this.activeShooterEnemies.moveMemberToList(p, this.deadShooterEnemies);
        break;
      case "TANK":
        this.activeTankEnemies.moveMemberToList(p, this.deadTankEnemies);
        break;
    }
  }

  this.update = function(delta)
  {
    this.activeBaseEnemies.performMemberFunction("update", delta);
    this.activeBulletEnemies.performMemberFunction("update", delta);
    this.activeShooterEnemies.performMemberFunction("update", delta);
    this.activeTankEnemies.performMemberFunction("update", delta);
  };
  this.draw = function(canv)
  {
    this.activeBaseEnemies.performMemberFunction("draw", canv);
    this.activeBulletEnemies.performMemberFunction("draw", canv);
    this.activeShooterEnemies.performMemberFunction("draw", canv);
    this.activeTankEnemies.performMemberFunction("draw", canv);
  };

  this.performOnAllEnemies = function(func, arg)
  {
    this.activeBaseEnemies.performOnMembers(func, arg);
    this.activeBulletEnemies.performOnMembers(func, arg);
    this.activeShooterEnemies.performOnMembers(func, arg);
    this.activeTankEnemies.performOnMembers(func, arg);
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
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
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
  this.hurtCoolDown -= delta;
  this.attackCoolDown -= delta;
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
  if(this.attackCoolDown <= 0)
  {
    this.attackCoolDown = 10;
    this.handler.scene.player.hurt(this.damage);
    this.hurt(game.model.attack);
  }
};
BaseEnemy.prototype.hurt = function(amt)
{
  if(this.hurtCoolDown <= 0)
  {
    this.health -= amt;
    this.hurtCoolDown = 10;
    if(this.health <= 0)
    {
      this.health = this.maxHealth;
      this.hurtCoolDown = 0;
      this.attackCoolDown = 0;
      this.handler.retire(this);
      this.handler.scene.arena.particleHandler.splatterBlood(this.x, this.y, this.width, this.width*5,  3, 20);
    }
  }
};

var BulletEnemy = function(handler)
{
  this.handler = handler;
  this.type = "BULLET";
  this.color = "#ff0000";;
  this.width = 4;
  this.speed = 2;
  this.damage = 2;
  this.maxHealth = 1;
  this.health = this.maxHealth;
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
  this.x = 0;
  this.y = 0;
  this.xvel = 0;
  this.yvel = 0;
};
BulletEnemy.prototype.randomizeStartPoint = BaseEnemy.prototype.randomizeStartPoint;
BulletEnemy.prototype.setTrajectory = function()
{
  var xdist = this.x - game.model.posx;
  var ydist = this.y - game.model.posy;
  this.xvel = -1*(xdist/(Math.abs(xdist)+Math.abs(ydist)))*this.speed;
  this.yvel = -1*(ydist/(Math.abs(xdist)+Math.abs(ydist)))*this.speed;
};
BulletEnemy.prototype.update = function(delta)
{
  var xdist = this.x - game.model.posx;
  var ydist = this.y - game.model.posy;
  var dist = Math.sqrt((xdist*xdist)+(ydist*ydist));

  this.x += this.xvel*delta;
  this.y += this.yvel*delta;
  this.hurtCoolDown -= delta;
  this.attackCoolDown -= delta;

  if(dist < this.speed+this.handler.scene.player.width)
    this.attack();
  if(this.x > 1200 || this.x < 200 || this.y > 1200 || this.y < 200)
    this.handler.retire(this);
};
BulletEnemy.prototype.draw = BaseEnemy.prototype.draw;
BulletEnemy.prototype.attack = BaseEnemy.prototype.attack;
BulletEnemy.prototype.hurt = function(amt)
{
  if(this.hurtCoolDown <= 0)
  {
    this.health -= amt;
    this.hurtCoolDown = 10;
    if(this.health <= 0)
    {
      this.health = this.maxHealth;
      this.hurtCoolDown = 0;
      this.attackCoolDown = 0;
      this.handler.retire(this);
    }
  }
};

var ShooterEnemy = function(handler)
{
  this.handler = handler;
  this.type = "SHOOTER";
  this.color = "#CCCC00";;
  this.width = 15;
  this.speed = 1;
  this.damage = 2;
  this.maxHealth = 2;
  this.health = this.maxHealth;
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
  this.shootCoolDown = 0;
  this.x = 0;
  this.y = 0;
};
ShooterEnemy.prototype.randomizeStartPoint = BaseEnemy.prototype.randomizeStartPoint;
ShooterEnemy.prototype.update = function(delta)
{
  var xdist = this.x - game.model.posx;
  var ydist = this.y - game.model.posy;
  var dist = Math.sqrt((xdist*xdist)+(ydist*ydist));
  var travel = (this.speed*delta)/dist;
  this.hurtCoolDown -= delta;
  this.attackCoolDown -= delta;
  this.shootCoolDown -= delta;
  if(dist > 100)
  {
    this.x -= travel*xdist;
    this.y -= travel*ydist;
  }
  else if(dist < 100 && dist > 50 && this.shootCoolDown <= 0)
  {
    var e = this.handler.getEnemy("BULLET");
    e.x = this.x;
    e.y = this.y;
    e.setTrajectory();
    this.handler.addEnemy(e);
    this.shootCoolDown = 10;
  }
  else if(dist < 50)
  {
    this.x += travel*xdist;
    this.y += travel*ydist;
  }
  if(dist < this.speed+this.handler.scene.player.width)
    this.attack();
};
ShooterEnemy.prototype.draw = BaseEnemy.prototype.draw;
ShooterEnemy.prototype.attack = BaseEnemy.prototype.attack;
ShooterEnemy.prototype.hurt = BaseEnemy.prototype.hurt;

var TankEnemy = function(handler)
{
  this.handler = handler;
  this.type = "TANK";
  this.color = "#AA0000";;
  this.width = 40;
  this.speed = 1;
  this.damage = 10;
  this.maxHealth = 10;
  this.health = this.maxHealth;
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
  this.x = 0;
  this.y = 0;
};
TankEnemy.prototype.randomizeStartPoint = BaseEnemy.prototype.randomizeStartPoint;
TankEnemy.prototype.update = BaseEnemy.prototype.update;
TankEnemy.prototype.draw = BaseEnemy.prototype.draw;
TankEnemy.prototype.attack = BaseEnemy.prototype.attack;
TankEnemy.prototype.hurt = function(amt)
{
  if(this.hurtCoolDown <= 0)
  {
    this.health -= amt;
    this.hurtCoolDown = 10;
    if(this.health <= 0)
    {
      this.health = this.maxHealth;
      this.hurtCoolDown = 0;
      this.attackCoolDown = 0;
      this.handler.retire(this);
      this.handler.scene.arena.particleHandler.splatterBlood(this.x, this.y, this.width, this.width*5,  5, 200);
    }
  }
};
