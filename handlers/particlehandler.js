var ParticleHandler = function(canv)
{
  this.c = canv;

  //Generic text- highly customizable (volatile- don't enforce properties at own risk)
  this.activeTextParticles = new RegistrationList("ACTIVE_TEXT_PARTICLES");
  this.deadTextParticles = new RegistrationList("DEAD_TEXT_PARTICLES");

  //Health Gain
  this.activeHealthGainParticles = new RegistrationList("ACTIVE_HEALTH_GAIN_PARTICLES");
  this.deadHealthGainParticles = new RegistrationList("DEAD_HEALTH_GAIN_PARTICLES");

  //Health Lose
  this.activeHealthLoseParticles = new RegistrationList("ACTIVE_HEALTH_LOSE_PARTICLES");
  this.deadHealthLoseParticles = new RegistrationList("DEAD_HEALTH_LOSE_PARTICLES");

  //Exp Gain
  this.activeExpGainParticles = new RegistrationList("ACTIVE_EXP_GAIN_PARTICLES");
  this.deadExpGainParticles = new RegistrationList("DEAD_EXP_GAIN_PARTICLES");

  //Level Up
  this.activeLevelUpParticles = new RegistrationList("ACTIVE_LEVEL_UP_PARTICLES");
  this.deadLevelUpParticles = new RegistrationList("DEAD_LEVEL_UP_PARTICLES");

  //Stat Up
  this.activeStatUpParticles = new RegistrationList("ACTIVE_STAT_UP_PARTICLES");
  this.deadStatUpParticles = new RegistrationList("DEAD_STAT_UP_PARTICLES");

  //Warning
  this.activeWarningParticles = new RegistrationList("ACTIVE_WARNING_PARTICLES");
  this.deadWarningParticles = new RegistrationList("DEAD_WARNING_PARTICLES");

  this.reset = function()
  {
    var p;
    while(p = this.activeHealthGainParticles.firstMember()) this.retire(p);
    while(p = this.activeHealthLoseParticles.firstMember()) this.retire(p);
    while(p = this.activeExpGainParticles.firstMember()) this.retire(p);
    while(p = this.activeLevelUpParticles.firstMember()) this.retire(p);
    while(p = this.activeStatUpParticles.firstMember()) this.retire(p);
    while(p = this.activeWarningParticles.firstMember()) this.retire(p);
  };

  this.getParticle = function(type, startX, startY)
  {
    var p;
    switch(type)
    {
      case "TEXT":
        if(p = this.deadTextParticles.firstMember())
          this.deadTextParticles.unregister(p);
        else
          p = new TextParticle(this);
        break;
      case "HEALTH_GAIN":
        if(p = this.deadHealthGainParticles.firstMember())
          this.deadHealthGainParticles.unregister(p);
        else
          p = new HealthGainParticle(this);
        break;
      case "HEALTH_LOSE":
        if(p = this.deadHealthLoseParticles.firstMember())
          this.deadHealthLoseParticles.unregister(p);
        else
          p = new HealthLoseParticle(this);
        break;
      case "EXP_GAIN":
        if(p = this.deadExpGainParticles.firstMember())
          this.deadExpGainParticles.unregister(p);
        else
          p = new ExpGainParticle(this);
        break;
      case "LEVEL_UP":
        if(p = this.deadLevelUpParticles.firstMember())
          this.deadLevelUpParticles.unregister(p);
        else
          p = new LevelUpParticle(this);
        break;
      case "STAT_UP":
        if(p = this.deadStatUpParticles.firstMember())
          this.deadStatUpParticles.unregister(p);
        else
          p = new StatUpParticle(this);
        break;
      case "WARNING":
        if(p = this.deadWarningParticles.firstMember())
          this.deadWarningParticles.unregister(p);
        else
          p = new WarningParticle(this);
        break;
    }
    p.startX = startX;
    p.startY = startY;
    return p;
  }

  this.addParticle = function(p)
  {
    switch(p.type)
    {
      case "TEXT":
        this.activeTextParticles.register(p);
        break;
      case "HEALTH_GAIN":
        this.activeHealthGainParticles.register(p);
        break;
      case "HEALTH_LOSE":
        this.activeHealthLoseParticles.register(p);
        break;
      case "EXP_GAIN":
        this.activeExpGainParticles.register(p);
        break;
      case "LEVEL_UP":
        this.activeLevelUpParticles.register(p);
        break;
      case "STAT_UP":
        this.activeStatUpParticles.register(p);
        break;
      case "WARNING":
        this.activeWarningParticles.register(p);
        break;
    }
  };

  this.retire = function(p)
  {
    switch(p.type)
    {
      case "TEXT":
        this.activeTextParticles.moveMemberToList(p, this.deadTextParticles);
        break;
      case "HEALTH_GAIN":
        this.activeHealthGainParticles.moveMemberToList(p, this.deadHealthGainParticles);
        break;
      case "HEALTH_LOSE":
        this.activeHealthLoseParticles.moveMemberToList(p, this.deadHealthLoseParticles);
        break;
      case "EXP_GAIN":
        this.activeExpGainParticles.moveMemberToList(p, this.deadExpGainParticles);
        break;
      case "LEVEL_UP":
        this.activeLevelUpParticles.moveMemberToList(p, this.deadLevelUpParticles);
        break;
      case "STAT_UP":
        this.activeStatUpParticles.moveMemberToList(p, this.deadStatUpParticles);
        break;
      case "WARNING":
        this.activeWarningParticles.moveMemberToList(p, this.deadWarningParticles);
        break;
    }
  }

  this.update = function(delta)
  {
    this.activeTextParticles.performMemberFunction("update", delta);
    this.activeHealthGainParticles.performMemberFunction("update", delta);
    this.activeHealthLoseParticles.performMemberFunction("update", delta);
    this.activeExpGainParticles.performMemberFunction("update", delta);
    this.activeLevelUpParticles.performMemberFunction("update", delta);
    this.activeStatUpParticles.performMemberFunction("update", delta);
    this.activeWarningParticles.performMemberFunction("update", delta);
  };
  this.draw = function()
  {
    this.activeTextParticles.performMemberFunction("draw", this.c);
    this.activeHealthGainParticles.performMemberFunction("draw", this.c);
    this.activeHealthLoseParticles.performMemberFunction("draw", this.c);
    this.activeExpGainParticles.performMemberFunction("draw", this.c);
    this.activeLevelUpParticles.performMemberFunction("draw", this.c);
    this.activeStatUpParticles.performMemberFunction("draw", this.c);
    this.activeWarningParticles.performMemberFunction("draw", this.c);
  };
};

/*
 * PARTICLE TYPES
 */

var TextParticle = function(handler)
{
  this.type = "TEXT";
  this.handler = handler;

  this.startX = 0; 
  this.startY = 0;
  this.text = "";
  this.rgb = "0,0,0";
  this.size = 12;
  this.deltaX = 0;
  this.deltaY = -20;
  this.duration = 50;
  this.deltapassed = 0;
  this.x = 0;
  this.y = 0;
  this.alpha;
}
TextParticle.prototype.update = function(delta)
{
  this.deltapassed += delta;
  if(this.deltapassed > this.duration) { this.deltapassed = 0; this.handler.retire(this); return; }
  this.x = this.startX + (this.deltapassed/this.duration)*this.deltaX;
  this.y = this.startY + (this.deltapassed/this.duration)*this.deltaY;
  this.alpha = (this.duration-this.deltapassed)/this.duration;
}
TextParticle.prototype.draw = function(canv)
{
  if(this.alpha < 0) this.alpha = 0;
  canv.context.fillStyle = "rgba("+this.rgb+","+this.alpha+")";
  canv.context.textAlign = this.textAlign;
  canv.context.font = this.size+"px vg_font";
  canv.context.fillText(this.text, this.x, this.y);
}

var HealthGainParticle = function(handler)
{
  this.type = "HEALTH_GAIN";
  this.handler = handler;

  this.startX = 0; 
  this.startY = 0;

  //ought not be customized
  this.text = "+1";
  this.textAlign = "center";
  this.rgb = "0,255,0";
  this.size = 12;
  this.deltaX = 0;
  this.deltaY = -20;
  this.duration = 50;
  this.deltapassed = 0;
  this.x = 0;
  this.y = 0;
  this.alpha;
}
HealthGainParticle.prototype.update = TextParticle.prototype.update;
HealthGainParticle.prototype.draw = TextParticle.prototype.draw;

var HealthLoseParticle = function(handler)
{
  this.type = "HEALTH_LOSE";
  this.handler = handler;

  this.startX = 0; 
  this.startY = 0;
  this.text = "-1";

  //ought not be customized
  this.textAlign = "center";
  this.rgb = "255,0,0";
  this.size = 12;
  this.deltaX = 0;
  this.deltaY = -20;
  this.duration = 50;
  this.deltapassed = 0;
  this.x = 0;
  this.y = 0;
  this.alpha;
}
HealthLoseParticle.prototype.update = TextParticle.prototype.update;
HealthLoseParticle.prototype.draw = TextParticle.prototype.draw;

var ExpGainParticle = function(handler)
{
  this.type = "EXP_GAIN";
  this.handler = handler;

  this.startX = 0; 
  this.startY = 0;
  this.text = "+1";

  //ought not be customized
  this.textAlign = "center";
  this.rgb = "25,50,255";
  this.size = 12;
  this.deltaX = 0;
  this.deltaY = -20;
  this.duration = 50;
  this.deltapassed = 0;
  this.x = 0;
  this.y = 0;
  this.alpha;
}
ExpGainParticle.prototype.update = TextParticle.prototype.update;
ExpGainParticle.prototype.draw = TextParticle.prototype.draw;

var LevelUpParticle = function(handler)
{
  this.type = "LEVEL_UP";
  this.handler = handler;

  this.startX = 0; 
  this.startY = 0;
  this.text = "+1";

  //ought not be customized
  this.textAlign = "center";
  this.rgb = "0,0,0";
  this.size = 12;
  this.deltaX = 0;
  this.deltaY = -20;
  this.duration = 50;
  this.deltapassed = 0;
  this.x = 0;
  this.y = 0;
  this.alpha;
}
LevelUpParticle.prototype.update = TextParticle.prototype.update;
LevelUpParticle.prototype.draw = TextParticle.prototype.draw;

var StatUpParticle = function(handler)
{
  this.type = "STAT_UP";
  this.handler = handler;

  this.startX = 0; 
  this.startY = 0;
  this.text = "+1";

  //ought not be customized
  this.textAlign = "left";
  this.rgb = "0,0,0";
  this.size = 12;
  this.deltaX = 0;
  this.deltaY = -20;
  this.duration = 50;
  this.deltapassed = 0;
  this.x = 0;
  this.y = 0;
  this.alpha;
}
StatUpParticle.prototype.update = TextParticle.prototype.update;
StatUpParticle.prototype.draw = TextParticle.prototype.draw;

var WarningParticle = function(handler)
{
  this.type = "WARNING";
  this.handler = handler;

  this.startX = 320; 
  this.startY = 155;
  this.text = "WARNING";

  //ought not be customized
  this.textAlign = "center";
  this.rgb = "255,0,0";
  this.size = 20;
  this.deltaX = 0;
  this.deltaY = 0;
  this.duration = 50;
  this.deltapassed = 0;
  this.x = 0;
  this.y = 0;
  this.alpha;
}
WarningParticle.prototype.update = TextParticle.prototype.update;
WarningParticle.prototype.draw = TextParticle.prototype.draw;
