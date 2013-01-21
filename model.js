var Model = function()
{
  this.healthChangeListeners = new RegistrationList("HEALTH_CHANGE");
  this.expChangeListeners = new RegistrationList("EXP_CHANGE");
  this.levelChangeListeners = new RegistrationList("LEVEL_CHANGE");
  this.statChangeListeners = new RegistrationList("STAT_CHANGE");

  this.player = new Player();
  this.posx = 500;
  this.posy = 500;

  this.currentRound = 0;

  this.level = 0;

  this.maxHealth = 100;
  this.health = this.maxHealth;

  this.exp = 0;
  this.expToNextLevel = 100;
  this.expMultiplier = 1;

  this.attack = 1;
  this.defense = 1;
  this.speed = 1;
  this.healthRate = 1;
  this.bombs = 1;

  this.calculateExpMultiplier = function()
  {
    this.expmultiplier = 1;
    if(this.health <= this.maxHealth/2) this.expmultiplier++;
    if(this.health <= this.maxHealth/4) this.expmultiplier++;
    if(this.health <= this.maxHealth/8) this.expmultiplier++;
    if(this.health <= this.maxHealth/16) this.expmultiplier++;
    if(this.health <= this.maxHealth/32) this.expmultiplier++;

    if(this.open) this.expmultiplier*=2;
  };

  this.changeHealth = function(amount)
  {
      if(this.health+amount < 0)
        amount = this.health*-1;
      else if (this.health+amount > this.maxHealth)
        amount = this.maxHealth - this.health;

      this.health += amount;
      this.healthChangeListeners.performOnMembers("healthChanged", amount);

      this.calculateExpMultiplier();
  };

  this.changeExp = function(amount)
  {
    if(this.exp+amount > this.expToNextLevel)
    {
      var overflowAmount = amount-(this.expToNextLevel-this.exp);
      this.changeExp(this.expToNextLevel-this.exp);
      this.changeLevel(1);
      amount = overflowAmount;
    }

    this.exp += amount;
    this.expChangeListeners.performOnMembers("expChanged", amount);
  };

  this.changeLevel = function(amount)
  {
    while(amount > 0)
    {
      this.level++;
      this.exp = 0;
      this.expToNextLevel*=1.5;
      var c = Math.floor(Math.random()*5);
      this.changeStat(c, 1);
      amount--;
      this.levelChangeListeners.performOnMembers("levelChanged", amount);
    }
  };

  this.changeStat = function(stat, amount)
  {
    switch(c)
    {
      case 0:
        this.attack++;
        p.startY = 30;
        p.text += "attack";
        break;
      case 1:
        this.defense++;
        p.startY = 60;
        p.text += "defense";
        break;
      case 2:
        this.speed++;
        p.startY = 90;
        p.text += "speed";
        break;
      case 3:
        this.healthrate++;
        p.startY = 120;
        p.text += "health rate";
        break;
      case 3:
        this.bombs++;
        p.startY = 150;
        p.text += "bomb";
        break;
    }
    var stObj = {"stat":stat, "amount":amount};
    this.statChangeListeners.performOnMembers("statChanged", stObj);
  };

  //Probably should be an 'assethandler' class, 
  //but there are only like 3 images... so...
  this.bombImg = new Image();
  this.healthrateImg = new Image();
  this.defenseImg = new Image();
  this.attackImg = new Image();
  this.speedImg = new Image();
};
