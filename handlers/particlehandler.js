var ParticleHandler = function()
{
  var self = this;

  this.activeTextParticles = new RegistrationList("ACTIVE_TEXT_PARTICLES");
  var update = function(member, delta)
  {
    member.update(delta);
  }
  var draw = function(member, args)
  {
    member.draw();
  }
  this.deadTextParticles = new RegistrationList("DEAD_TEXT_PARTICLES");

  this.getParticle = function(type)
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
    }
    return p;
  }

  this.addParticle = function(p)
  {
    switch(p.type)
    {
      case "TEXT":
        this.activeTextParticles.register(p);
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
    }
  }

  this.update = function(delta)
  {
    this.activeTextParticles.performOnMembers(update, delta);
  };
  this.draw = function()
  {
    this.activeTextParticles.performOnMembers(draw, null);
  };
};

var TextParticle = function(handler)
{
  this.handler = handler;
  this.type = "TEXT";
  this.stage = null;
  this.text = "";
  this.rgb = "0,0,0";
  this.size = 12;
  this.x = 0;
  this.y = 0;
  this.startX = 0; 
  this.startY = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  this.duration = 0;
  this.progress = 0;

  this.update = function(delta)
  {
    this.progress += delta/10;
    if(this.progress > this.duration) { this.handler.retire(this); return; }
    this.x = this.startX + (this.progress/this.duration)*this.deltaX;
    this.y = this.startY + (this.progress/this.duration)*this.deltaY;
  }
  this.draw = function()
  {
    this.stage.context.fillStyle = "rgba("+this.rgb+","+((this.duration-this.progress)/this.duration)+")";
    this.stage.context.textAlign = "center";
    this.stage.context.font = this.size+"px vg_font";
    this.stage.context.fillText(this.text, this.x, this.y);
  }

}
TextParticle.prototype.toString = function()
{
    return this.text+" "+
          this.x+" "+
          this.y+" "+
          this.startX+" "+
          this.progress+" "+
          this.duration;
}
