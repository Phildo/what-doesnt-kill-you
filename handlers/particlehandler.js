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

  //Level Up
  this.activeHealthLoseParticles = new RegistrationList("ACTIVE_LEVEL_UP_PARTICLES");
  this.deadLevelUpParticles = new RegistrationList("DEAD_LEVEL_UP_PARTICLES");

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
        this.activeHealthGainParticles.moveMemberToList(p, this.deadHealthLoseParticles);
        break;
      case "HEALTH_LOSE":
        this.activeHealthLoseParticles.moveMemberToList(p, this.deadHealthLoseParticles);
        break;
    }
  }

  this.update = function(delta)
  {
    this.activeTextParticles.performOnMembers("update", delta);
    this.activeHealthGainParticles.performOnMembers("update", delta);
    this.activeHealthLoseParticles.performOnMembers("update", delta);
  };
  this.draw = function()
  {
    this.activeTextParticles.performOnMembers("draw", this.c);
    this.activeHealthGainParticles.performOnMembers("draw", this.c);
    this.activeHealthLoseParticles.performOnMembers("draw", this.c);
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
  canv.context.textAlign = "center";
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
ExpGainParticle.prototype.update = TextParticle.prototype.update;
ExpGainParticle.prototype.draw = TextParticle.prototype.draw;
