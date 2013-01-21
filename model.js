var Model = function()
{
  this.healthChangeListeners = new RegistrationList("HEALTH_CHANGE");
  this.expChangeListeners = new RegistrationList("EXP_CHANGE");
  this.levelChangeListeners = new RegistrationList("LEVEL_CHANGE");
  this.statChangeListeners = new RegistrationList("STAT_CHANGE");
  this.roundChangeListeners = new RegistrationList("ROUND_CHANGE");

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

  this.open = false;

  this.attack = 1;
  this.defense = 1;
  this.speed = 1;
  this.healthRate = 1;
  this.bombs = 1;

  this.calculateExpMultiplier = function()
  {
    this.expMultiplier = 1;
    if(this.health <= this.maxHealth/2) this.expMultiplier++;
    if(this.health <= this.maxHealth/4) this.expMultiplier++;
    if(this.health <= this.maxHealth/8) this.expMultiplier++;
    if(this.health <= this.maxHealth/16) this.expMultiplier++;
    if(this.health <= this.maxHealth/32) this.expMultiplier++;

    if(this.open) this.expMultiplier*=2;
  };

  var oldHealth; //Helper var for this function
  this.changeHealth = function(amount)
  {
      if(this.health+amount < 0)
        amount = this.health*-1;
      else if (this.health+amount > this.maxHealth)
        amount = this.maxHealth - this.health;

      oldHealth = this.health;
      this.health += amount;
      if(Math.floor(this.health) - Math.floor(oldHealth) != 0)
        this.healthChangeListeners.performOnMembers("healthChanged", Math.ceil(amount));

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
      this.levelChangeListeners.performOnMembers("levelChanged", amount);
      amount--;
    }
  };

  this.changeStat = function(stat, amount)
  {
    switch(stat)
    {
      case 0:
        this.attack++;
        break;
      case 1:
        this.defense++;
        this.maxHealth = 100+(this.defense*20);
        break;
      case 2:
        this.speed++;
        break;
      case 3:
        this.healthRate++;
        break;
      case 4:
        this.bombs++;
        break;
    }
    var stObj = {"stat":stat, "amount":amount};
    this.statChangeListeners.performOnMembers("statChanged", stObj);
  };

  this.changeRound = function(amount)
  {
    this.currentRound += amount;
    this.roundChangeListeners.performOnMembers("roundChanged",amount);
  };

  //Probably should be an 'assethandler' class, 
  //but there are only like 3 images... so...
  this.bombImg = new Image();
  this.healthrateImg = new Image();
  this.defenseImg = new Image();
  this.attackImg = new Image();
  this.speedImg = new Image();
};
