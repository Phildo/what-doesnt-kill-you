var Hud = function()
{
  this.c = new Canv(640,320); //<- the resulting canvas to blit to the main screen
  var c = new Canv(640,320); //<- unchanging template for the HUD (outlines of bars, etc...)

  //Draw icons
  c.context.drawImage(game.model.attackImg, 10, 10);
  c.context.drawImage(game.model.defenseImg, 10, 40);
  c.context.drawImage(game.model.speedImg, 10, 70);
  c.context.drawImage(game.model.healthrateImg, 10, 100);
  c.context.drawImage(game.model.bombImg, 10, 130);
  
  c.context.fillStyle = "#000000";

  //Draw Healthbar outline
  c.context.fillRect(10,              canvas.height-40, canvas.width-20, 10);
  c.context.fillRect(10,              canvas.height-20, canvas.width-20, 10);
  c.context.fillRect(10,              canvas.height-40, 10,              30);
  c.context.fillRect(canvas.width-20, canvas.height-40, 10,              30);

  //Draw Expbar outline
  c.context.fillRect(10,              canvas.height-60, canvas.width-20, 5);
  c.context.fillRect(10,              canvas.height-50, canvas.width-20, 5);
  c.context.fillRect(10,              canvas.height-60, 10,              15);
  c.context.fillRect(canvas.width-20, canvas.height-60, 10,              15);

  this.blitTo = this.c.prototype.blitTo; //1 to 1 blit

  this.draw = function()
  {
    c.blitTo(this.c); //Start by redrawing template

    //Stat Numbers
    this.c.context.fillStyle = "#000000";
    this.c.context.textAlign = 'left';
    this.c.context.font = "20px vg_font";
    this.c.context.fillText(game.model.attack, 30, 30);
    this.c.context.fillText(game.model.defense, 30, 60);
    this.c.context.fillText(game.model.speed, 30, 90);
    this.c.context.fillText(game.model.healthrate, 30, 120);
    this.c.context.fillText(game.model.bombs, 30, 150);
  
    //Lvl text
    this.c.context.font = "12px vg_font";
    this.c.context.fillText("lvl."+game.model.level,10,this.c.canvas.height-65);
  
    //Round text
    this.c.context.textAlign = "center";
    this.c.context.fillText("Round "+game.model.currentRound, this.c.canvas.width/2, 20);
  
    //Health bar fill
    this.c.context.fillStyle = "#00FF00";
    this.c.context.fillRect(20, this.c.canvas.height-30, (game.model.health/game.model.maxHealth)*(this.c.canvas.width-40), 10)
  
    //Exp bar fill
    this.c.context.fillStyle = "#3377FF";
    this.c.context.fillRect(20, this.c.canvas.height-55, (game.model.exp/game.model.expToNextLevel)*(this.c.canvas.width-40), 5)

    //Multiplier text
    this.c.context.textAlign = 'right';
    this.c.context.font = (12+game.model.expmultiplier)+"px vg_font";
    this.c.context.fillText("x"+game.model.expmultiplier,this.c.canvas.width-10,this.c.canvas.height-65);
  };
};
