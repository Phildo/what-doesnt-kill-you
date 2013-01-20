var DataHandler = function()
{
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
  }

  //Probably should be an 'assethandler' class, 
  //but there are only like 3 images... so...
  this.bombImg = new Image();
  this.healthrateImg = new Image();
  this.defenseImg = new Image();
  this.attackImg = new Image();
  this.speedImg = new Image();
};
