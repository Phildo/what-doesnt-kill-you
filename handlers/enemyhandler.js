var EnemyHandler = function(scene)
{
  this.scene = scene;
  this.activeBaseEnemies = new RegistrationList("ACTIVE_BASE_ENEMIES");
  this.deadBaseEnemies = new RegistrationList("DEAD_BASE_ENEMIES");

  this.activeBase2Enemies = new RegistrationList("ACTIVE_BASE_2_ENEMIES");
  this.deadBase2Enemies = new RegistrationList("DEAD_BASE_2_ENEMIES");

  this.activeSpeederEnemies = new RegistrationList("ACTIVE_SPEEDER_ENEMIES");
  this.deadSpeederEnemies = new RegistrationList("DEAD_SPEEDER_ENEMIES");

  this.activeSpeeder2Enemies = new RegistrationList("ACTIVE_SPEEDER_2_ENEMIES");
  this.deadSpeeder2Enemies = new RegistrationList("DEAD_SPEEDER_2_ENEMIES");

  this.activeBulletEnemies = new RegistrationList("ACTIVE_BULLET_ENEMIES");
  this.deadBulletEnemies = new RegistrationList("DEAD_BULLET_ENEMIES");

  this.activeShooterEnemies = new RegistrationList("ACTIVE_SHOOTER_ENEMIES");
  this.deadShooterEnemies = new RegistrationList("DEAD_SHOOTER_ENEMIES");

  this.activeShooter2Enemies = new RegistrationList("ACTIVE_SHOOTER_2_ENEMIES");
  this.deadShooter2Enemies = new RegistrationList("DEAD_SHOOTER_2_ENEMIES");

  this.activeTankEnemies = new RegistrationList("ACTIVE_TANK_ENEMIES");
  this.deadTankEnemies = new RegistrationList("DEAD_TANK_ENEMIES");

  this.activeTank2Enemies = new RegistrationList("ACTIVE_TANK_2_ENEMIES");
  this.deadTank2Enemies = new RegistrationList("DEAD_TANK_2_ENEMIES");

  this.reset = function()
  {
    var e;
    while(e = this.activeBaseEnemies.firstMember()) this.retire(e);
    while(e = this.activeBase2Enemies.firstMember()) this.retire(e);
    while(e = this.activeSpeederEnemies.firstMember()) this.retire(e);
    while(e = this.activeSpeeder2Enemies.firstMember()) this.retire(e);
    while(e = this.activeBulletEnemies.firstMember()) this.retire(e);
    while(e = this.activeShooterEnemies.firstMember()) this.retire(e);
    while(e = this.activeShooter2Enemies.firstMember()) this.retire(e);
    while(e = this.activeTankEnemies.firstMember()) this.retire(e);
    while(e = this.activeTank2Enemies.firstMember()) this.retire(e);
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
      case "BASE_2":
        if(p = this.deadBase2Enemies.firstMember())
          this.deadBase2Enemies.unregister(p);
        else
          p = new Base2Enemy(this);
        break;
      case "SPEEDER":
        if(p = this.deadSpeederEnemies.firstMember())
          this.deadSpeederEnemies.unregister(p);
        else
          p = new SpeederEnemy(this);
        break;
      case "SPEEDER_2":
        if(p = this.deadSpeeder2Enemies.firstMember())
          this.deadSpeeder2Enemies.unregister(p);
        else
          p = new Speeder2Enemy(this);
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
      case "SHOOTER_2":
        if(p = this.deadShooter2Enemies.firstMember())
          this.deadShooter2Enemies.unregister(p);
        else
          p = new Shooter2Enemy(this);
        break;
      case "TANK":
        if(p = this.deadTankEnemies.firstMember())
          this.deadTankEnemies.unregister(p);
        else
          p = new TankEnemy(this);
        break;
      case "TANK_2":
        if(p = this.deadTank2Enemies.firstMember())
          this.deadTank2Enemies.unregister(p);
        else
          p = new Tank2Enemy(this);
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
      case "BASE_2":
        this.activeBase2Enemies.register(p);
        break;
      case "SPEEDER":
        this.activeSpeederEnemies.register(p);
        break;
      case "SPEEDER_2":
        this.activeSpeeder2Enemies.register(p);
        break;
      case "BULLET":
        this.activeBulletEnemies.register(p);
        break;
      case "SHOOTER":
        this.activeShooterEnemies.register(p);
        break;
      case "SHOOTER_2":
        this.activeShooter2Enemies.register(p);
        break;
      case "TANK":
        this.activeTankEnemies.register(p);
        break;
      case "TANK_2":
        this.activeTank2Enemies.register(p);
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
      case "BASE_2":
        this.activeBase2Enemies.moveMemberToList(p, this.deadBase2Enemies);
        break;
      case "SPEEDER":
        this.activeSpeederEnemies.moveMemberToList(p, this.deadSpeederEnemies);
        break;
      case "SPEEDER_2":
        this.activeSpeeder2Enemies.moveMemberToList(p, this.deadSpeeder2Enemies);
        break;
      case "BULLET":
        this.activeBulletEnemies.moveMemberToList(p, this.deadBulletEnemies);
        break;
      case "SHOOTER":
        this.activeShooterEnemies.moveMemberToList(p, this.deadShooterEnemies);
        break;
      case "SHOOTER_2":
        this.activeShooter2Enemies.moveMemberToList(p, this.deadShooter2Enemies);
        break;
      case "TANK":
        this.activeTankEnemies.moveMemberToList(p, this.deadTankEnemies);
        break;
      case "TANK_2":
        this.activeTank2Enemies.moveMemberToList(p, this.deadTank2Enemies);
        break;
    }
  };

  this.update = function(delta)
  {
    this.activeBaseEnemies.performMemberFunction("update", delta);
    this.activeBase2Enemies.performMemberFunction("update", delta);
    this.activeSpeederEnemies.performMemberFunction("update", delta);
    this.activeSpeeder2Enemies.performMemberFunction("update", delta);
    this.activeBulletEnemies.performMemberFunction("update", delta);
    this.activeShooterEnemies.performMemberFunction("update", delta);
    this.activeShooter2Enemies.performMemberFunction("update", delta);
    this.activeTankEnemies.performMemberFunction("update", delta);
    this.activeTank2Enemies.performMemberFunction("update", delta);
  };
  this.draw = function(canv)
  {
    this.activeBaseEnemies.performMemberFunction("draw", canv);
    this.activeBase2Enemies.performMemberFunction("draw", canv);
    this.activeSpeederEnemies.performMemberFunction("draw", canv);
    this.activeSpeeder2Enemies.performMemberFunction("draw", canv);
    this.activeBulletEnemies.performMemberFunction("draw", canv);
    this.activeShooterEnemies.performMemberFunction("draw", canv);
    this.activeShooter2Enemies.performMemberFunction("draw", canv);
    this.activeTankEnemies.performMemberFunction("draw", canv);
    this.activeTank2Enemies.performMemberFunction("draw", canv);
  };

  this.performOnAllEnemies = function(func, arg)
  {
    this.activeBaseEnemies.performOnMembers(func, arg);
    this.activeBase2Enemies.performOnMembers(func, arg);
    this.activeSpeederEnemies.performOnMembers(func, arg);
    this.activeSpeeder2Enemies.performOnMembers(func, arg);
    this.activeBulletEnemies.performOnMembers(func, arg);
    this.activeShooterEnemies.performOnMembers(func, arg);
    this.activeShooter2Enemies.performOnMembers(func, arg);
    this.activeTankEnemies.performOnMembers(func, arg);
    this.activeTank2Enemies.performOnMembers(func, arg);
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

var Base2Enemy = function(handler)
{
  this.handler = handler;
  this.type = "BASE_2";
  this.color = "#AA0000";;
  this.width = 16;
  this.speed = 1.5;
  this.damage = 5;
  this.maxHealth = 3;
  this.health = this.maxHealth;
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
  this.x = 0;
  this.y = 0;
};
Base2Enemy.prototype.randomizeStartPoint = BaseEnemy.prototype.randomizeStartPoint;
Base2Enemy.prototype.update = BaseEnemy.prototype.update;
Base2Enemy.prototype.draw = BaseEnemy.prototype.draw;
Base2Enemy.prototype.attack = BaseEnemy.prototype.attack;
Base2Enemy.prototype.hurt = function(amt)
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
      this.handler.scene.arena.particleHandler.splatterBlood(this.x, this.y, this.width, this.width*5,  4, 30);
    }
  }
};

var SpeederEnemy = function(handler)
{
  this.handler = handler;
  this.type = "SPEEDER";
  this.color = "#88AA00";;
  this.width = 8;
  this.speed = 4;
  this.damage = 2;
  this.maxHealth = 1;
  this.health = this.maxHealth;
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
  this.x = 0;
  this.y = 0;
};
SpeederEnemy.prototype.randomizeStartPoint = BaseEnemy.prototype.randomizeStartPoint;
SpeederEnemy.prototype.update = BaseEnemy.prototype.update;
SpeederEnemy.prototype.draw = BaseEnemy.prototype.draw;
SpeederEnemy.prototype.attack = BaseEnemy.prototype.attack;
SpeederEnemy.prototype.hurt = function(amt)
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
      this.handler.scene.arena.particleHandler.splatterBlood(this.x, this.y, this.width, this.width*5,  2, 40);
    }
  }
};

var Speeder2Enemy = function(handler)
{
  this.handler = handler;
  this.type = "SPEEDER_2";
  this.color = "#669900";;
  this.width = 10;
  this.speed = 5;
  this.damage = 3;
  this.maxHealth = 1;
  this.health = this.maxHealth;
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
  this.x = 0;
  this.y = 0;
};
Speeder2Enemy.prototype.randomizeStartPoint = SpeederEnemy.prototype.randomizeStartPoint;
Speeder2Enemy.prototype.update = SpeederEnemy.prototype.update;
Speeder2Enemy.prototype.draw = SpeederEnemy.prototype.draw;
Speeder2Enemy.prototype.attack = SpeederEnemy.prototype.attack;
Speeder2Enemy.prototype.hurt = SpeederEnemy.prototype.hurt;

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

var Shooter2Enemy = function(handler)
{
  this.handler = handler;
  this.type = "SHOOTER_2";
  this.color = "#999900";;
  this.width = 18;
  this.speed = 2;
  this.damage = 2;
  this.maxHealth = 3;
  this.health = this.maxHealth;
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
  this.shootCoolDown = 0;
  this.x = 0;
  this.y = 0;
};
Shooter2Enemy.prototype.randomizeStartPoint = BaseEnemy.prototype.randomizeStartPoint;
Shooter2Enemy.prototype.update = function(delta)
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
    this.shootCoolDown = 5;
  }
  else if(dist < 50)
  {
    this.x += travel*xdist;
    this.y += travel*ydist;
  }
  if(dist < this.speed+this.handler.scene.player.width)
    this.attack();
};
Shooter2Enemy.prototype.draw = BaseEnemy.prototype.draw;
Shooter2Enemy.prototype.attack = BaseEnemy.prototype.attack;
Shooter2Enemy.prototype.hurt = BaseEnemy.prototype.hurt;

var TankEnemy = function(handler)
{
  this.handler = handler;
  this.type = "TANK";
  this.color = "#880000";;
  this.width = 40;
  this.speed = 0.5;
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

var Tank2Enemy = function(handler)
{
  this.handler = handler;
  this.type = "TANK_2";
  this.color = "#880000";;
  this.width = 80;
  this.speed = 0.5;
  this.damage = 20;
  this.maxHealth = 30;
  this.health = this.maxHealth;
  this.hurtCoolDown = 0;
  this.attackCoolDown = 0;
  this.x = 0;
  this.y = 0;
};
Tank2Enemy.prototype.randomizeStartPoint = BaseEnemy.prototype.randomizeStartPoint;
Tank2Enemy.prototype.update = BaseEnemy.prototype.update;
Tank2Enemy.prototype.draw = BaseEnemy.prototype.draw;
Tank2Enemy.prototype.attack = BaseEnemy.prototype.attack;
Tank2Enemy.prototype.hurt = function(amt)
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
      this.handler.scene.arena.particleHandler.splatterBlood(this.x, this.y, this.width, this.width*5,  10, 200);
    }
  }
};
