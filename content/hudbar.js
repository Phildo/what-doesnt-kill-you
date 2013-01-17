var HudBar = function(){};
HudBar.prototype.draw = function(canvas, context)
{
  //Images
  context.drawImage(game.model.attackImg, 10, 10);
  context.drawImage(game.model.defenseImg, 10, 40);
  context.drawImage(game.model.speedImg, 10, 70);
  context.drawImage(game.model.healthrateImg, 10, 100);
  context.drawImage(game.model.bombImg, 10, 130);

  //Stats
  context.fillStyle = "#000000";
  context.textAlign = 'left';
  context.font = "20px vg_font";
  context.fillText(game.model.player.attack, 30, 30);
  context.fillText(game.model.player.defense, 30, 60);
  context.fillText(game.model.player.speed, 30, 90);
  context.fillText(game.model.player.healthrate, 30, 120);
  context.fillText(game.model.player.bombs, 30, 150);

  //Lvl text
  context.font = "12px vg_font";
  context.fillText("lvl."+game.model.player.level,10,canvas.height-65);

  //Round text
  context.textAlign = "center";
  context.fillText("Round "+game.model.currentRound, canvas.width/2, 20);

  //Health Bar border
  context.fillRect(10,              canvas.height-40, canvas.width-20, 10);
  context.fillRect(10,              canvas.height-20, canvas.width-20, 10);
  context.fillRect(10,              canvas.height-40, 10,              30);
  context.fillRect(canvas.width-20, canvas.height-40, 10,              30);

  //Exp Bar Border
  context.fillRect(10,              canvas.height-60, canvas.width-20, 5);
  context.fillRect(10,              canvas.height-50, canvas.width-20, 5);
  context.fillRect(10,              canvas.height-60, 10,              15);
  context.fillRect(canvas.width-20, canvas.height-60, 10,              15);

  //Health bar fill
  context.fillStyle = "#00FF00";
  context.fillRect(20, canvas.height-30, (game.model.player.health/game.model.player.maxHealth)*(canvas.width-40), 10)

  //Multiplier text
  context.fillStyle = "#3377FF";
  context.textAlign = 'right';
  context.font = (12+game.model.player.expmultiplier)+"px vg_font";
  context.fillText("x"+game.model.player.expmultiplier,canvas.width-10,canvas.height-65);

  //Exp bar fill
  context.fillRect(20, canvas.height-55, (game.model.player.exp/game.model.player.expToNextLevel)*(canvas.width-40), 5)
};
