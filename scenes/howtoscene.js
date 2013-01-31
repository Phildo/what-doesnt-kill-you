var HowToScene = function(stage)
{
  var dirty = true;

  var backHover = true;
  var attackHover = false;
  var defenseHover = false;
  var speedHover = false;
  var healthRateHover = false;
  var bombHover = false;
  var scoreHover = false;
  var roundHover = false;
  var expHover = false;
  var healthHover = false;
  var youHover = false;
  var youOpenHover = false;

  var backButton = new ClickBox(this, 160, stage.c.canvas.height-150, stage.c.canvas.width-320, 50);
  backButton.release = function()
  {
    game.sceneHandler.showScene(game.sceneHandler.introScene);
  };
  backButton.hover = function()
  {
    backHover = true;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var attackButton = new ClickBox(this, 10, 10, 60, 20);
  attackButton.hover = function()
  {
    backHover = false;
    attackHover = true;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var defenseButton = new ClickBox(this, 10, 40, 60, 20);
  defenseButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = true;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var speedButton = new ClickBox(this, 10, 70, 60, 20);
  speedButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = true;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var healthRateButton = new ClickBox(this, 10, 100, 60, 20);
  healthRateButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = true;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var bombButton = new ClickBox(this, 10, 130, 60, 20);
  bombButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = true;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var scoreButton = new ClickBox(this, (stage.c.canvas.width/2)-50, 0, 100, 20);
  scoreButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = true;
    roundHover = false;
    expHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var roundButton = new ClickBox(this, stage.c.canvas.width-50, 0, 50, stage.c.canvas.height-105);
  roundButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = true;
    expHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var expButton = new ClickBox(this, 10, stage.c.canvas.height-80, stage.c.canvas.width-20, 35);
  expButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = true;
    healthHover = false;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var healthButton = new ClickBox(this, 10, stage.c.canvas.height-40, stage.c.canvas.width-20, 30);
  healthButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    levelHover = false;
    healthHover = true;
    youHover = false;
    youOpenHover = false;

    dirty = true;
  };

  var youButton = new ClickBox(this, 80, stage.c.canvas.height/2, 30, 30);
  youButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    levelHover = false;
    healthHover = false;
    youHover = true;
    youOpenHover = false;

    dirty = true;
  };

  var youOpenButton = new ClickBox(this, stage.c.canvas.width-110, stage.c.canvas.height/2, 30, 30);
  youOpenButton.hover = function()
  {
    backHover = false;
    attackHover = false;
    defenseHover = false;
    speedHover = false;
    healthRateHover = false;
    bombHover = false;
    scoreHover = false;
    roundHover = false;
    expHover = false;
    levelHover = false;
    healthHover = false;
    youHover = false;
    youOpenHover = true;

    dirty = true;
  };


  this.willEnter = function()
  {
    dirty = true;
    game.clickBoxHandler.clickBoxes.register(backButton);
    stage.blits.register(this, 0);

    game.clickBoxHandler.clickBoxes.register(attackButton);
    game.clickBoxHandler.clickBoxes.register(defenseButton);
    game.clickBoxHandler.clickBoxes.register(speedButton);
    game.clickBoxHandler.clickBoxes.register(healthRateButton);
    game.clickBoxHandler.clickBoxes.register(bombButton);
    game.clickBoxHandler.clickBoxes.register(scoreButton);
    game.clickBoxHandler.clickBoxes.register(roundButton);
    game.clickBoxHandler.clickBoxes.register(expButton);
    game.clickBoxHandler.clickBoxes.register(healthButton);
    game.clickBoxHandler.clickBoxes.register(youButton);
    game.clickBoxHandler.clickBoxes.register(youOpenButton);

    stage.c.canvas.addEventListener('mousemove', game.clickBoxHandler.checkAllHoverCollisions, false); //too expensive... not worth it //let users of clickboxhandler set it
  }
  this.willExit = function()
  {
    game.clickBoxHandler.clickBoxes.unregister(backButton);
    stage.blits.unregister(this, 0);

    game.clickBoxHandler.clickBoxes.unregister(attackButton);
    game.clickBoxHandler.clickBoxes.unregister(defenseButton);
    game.clickBoxHandler.clickBoxes.unregister(speedButton);
    game.clickBoxHandler.clickBoxes.unregister(healthRateButton);
    game.clickBoxHandler.clickBoxes.unregister(bombButton);
    game.clickBoxHandler.clickBoxes.unregister(scoreButton);
    game.clickBoxHandler.clickBoxes.unregister(roundButton);
    game.clickBoxHandler.clickBoxes.unregister(expButton);
    game.clickBoxHandler.clickBoxes.unregister(healthButton);
    game.clickBoxHandler.clickBoxes.unregister(youButton);
    game.clickBoxHandler.clickBoxes.unregister(youOpenButton);

    stage.c.canvas.removeEventListener('mousemove', game.clickBoxHandler.checkAllHoverCollisions, false); //too expensive... not worth it //let users of clickboxhandler set it
  }
  this.update = function(delta)
  {
    //No motion dawg
  };

  this.draw = function()
  {
    //no need to do any preparatory drawing- just a rectangle
  };
  this.blitTo = function(canv)
  {
    if(dirty)
    {
      canv.context.clearRect(0,0,canv.canvas.width,canv.canvas.height);

      canv.context.textAlign = 'center';
      canv.context.fillStyle = "#000000";
      canv.context.font = '24px vg_font';

      canv.context.fillRect(backButton.stageX,backButton.stageY,backButton.width,backButton.height);
      canv.context.clearRect(backButton.stageX+10,backButton.stageY+10,backButton.width-20,backButton.height-20);
      canv.context.fillText("back",backButton.stageX+(backButton.width/2),backButton.stageY+(backButton.height/2)+10);

      //Construct the Template Canvas (unchanging)
      //Draw icons
      canv.context.drawImage(game.model.attackImg, 10, 10);
      canv.context.drawImage(game.model.defenseImg, 10, 40);
      canv.context.drawImage(game.model.speedImg, 10, 70);
      canv.context.drawImage(game.model.healthrateImg, 10, 100);
      canv.context.drawImage(game.model.bombImg, 10, 130);
  
      canv.context.fillStyle = "#000000";

      //Draw Healthbar outline
      canv.context.fillRect(10,              canv.canvas.height-40, canv.canvas.width-20, 10);
      canv.context.fillRect(10,              canv.canvas.height-20, canv.canvas.width-20, 10);
      canv.context.fillRect(10,              canv.canvas.height-40, 10,              30);
      canv.context.fillRect(canv.canvas.width-20, canv.canvas.height-40, 10,              30);
    
      //Draw Expbar outline
      canv.context.fillRect(10,              canv.canvas.height-60, canv.canvas.width-20, 5);
      canv.context.fillRect(10,              canv.canvas.height-50, canv.canvas.width-20, 5);
      canv.context.fillRect(10,              canv.canvas.height-60, 10,              15);
      canv.context.fillRect(canv.canvas.width-20, canv.canvas.height-60, 10,              15);
    
      //Draw Roundbar outline
      canv.context.fillRect(canv.canvas.width-30, 25, 5, canv.canvas.height-130);
      canv.context.fillRect(canv.canvas.width-15, 25, 5, canv.canvas.height-130);
      canv.context.fillRect(canv.canvas.width-30, 25, 20, 10);
      canv.context.fillRect(canv.canvas.width-30, canv.canvas.height-105, 20, 10);
    
      //Stat Numbers
      canv.context.fillStyle = "#000000";
      canv.context.textAlign = 'left';
      canv.context.font = "20px vg_font";
      canv.context.fillText(2, 30, 30);
      canv.context.fillText(1, 30, 60);
      canv.context.fillText(1, 30, 90);
      canv.context.fillText(3, 30, 120);
      canv.context.fillText(2, 30, 150);
  
      //Lvl text
      canv.context.font = "12px vg_font";
      canv.context.fillText("lvl.4",10,canv.canvas.height-65);
  
      //Round text
      canv.context.textAlign = "right";
      canv.context.fillText("Round 4", canv.canvas.width-15, 20);
    
      //Score text
      canv.context.textAlign = "center";
      canv.context.fillText("Score:643", canv.canvas.width/2, 20);
  
      //Health bar fill
      canv.context.fillStyle = "#00FF00";
      canv.context.fillRect(20, canv.canvas.height-30, 0.2*(canv.canvas.width-40), 10)
    
      //Round bar fill
      canv.context.fillStyle = "#FF0000";
      canv.context.fillRect(
        canv.canvas.width-25, 
        35+((0.25)*(canv.canvas.height-140)), 
        10, 
        (0.75*(canv.canvas.height-140))
      );
  
      //Exp bar fill
      canv.context.fillStyle = "#3377FF";
      canv.context.fillRect(20, canv.canvas.height-55, 0.75*(canv.canvas.width-40), 5)
  
      //Multiplier text
      canv.context.textAlign = 'right';
      canv.context.font = "18px vg_font";
      canv.context.fillText("x6",canv.canvas.width-10,canv.canvas.height-65);
  
      //Exp threshhold indicator text
      canv.context.textAlign = 'center';
      canv.context.font = "8px vg_font";
      canv.context.fillStyle = "#3377FF";
      canv.context.fillText("x2", 10+((canv.canvas.width-20)/2), canv.canvas.height-31);
      canv.context.fillText("x3", 10+((canv.canvas.width-20)/4), canv.canvas.height-31);
      canv.context.fillStyle = "#DDDDDD";
      canv.context.fillText("x4", 10+((canv.canvas.width-20)/8), canv.canvas.height-31);
      canv.context.fillText("x5", 10+((canv.canvas.width-20)/16), canv.canvas.height-31);
      canv.context.fillText("x6", 10+((canv.canvas.width-20)/32), canv.canvas.height-31);


      var posx = 100;
      var posy = stage.c.canvas.height/2+10;
      canv.context.fillStyle = '#000000';
      canv.context.fillRect(posx-10,posy-10,20,20);

      posx = stage.c.canvas.width-100;
      canv.context.fillStyle = '#AA0000';
      canv.context.beginPath();
      canv.context.arc(posx, posy, 10-4, 0, 2 * Math.PI, false);
      canv.context.fill();
      canv.context.lineWidth = 2;
      canv.context.strokeStyle = '#440000';
      canv.context.stroke();
      canv.context.fillStyle = '#000000';
      canv.context.fillRect(posx-10-2, posy-10-2, 10, 10);
      canv.context.fillRect(posx+2,                posy-10-2, 10, 10);
      canv.context.fillRect(posx-10-2, posy+2,                 10, 10);
      canv.context.fillRect(posx+2,                posy+2,                 10, 10);

      //Washout
      canv.context.fillStyle = "rgba(255,255,255,0.5)";
      canv.context.fillRect(0,0,canv.canvas.width,canv.canvas.height);


      canv.context.textAlign = 'center';
      canv.context.fillStyle = "#000000";
      canv.context.font = '24px vg_font';

      if(backHover)
      {
        canv.context.fillRect(backButton.stageX,backButton.stageY,backButton.width,backButton.height);
        canv.context.clearRect(backButton.stageX+10,backButton.stageY+10,backButton.width-20,backButton.height-20);
        canv.context.fillText("back",backButton.stageX+(backButton.width/2),backButton.stageY+(backButton.height/2)+10);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("hover over item", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.fillText("to inquire", canv.canvas.width/2, canv.canvas.height/2-50);
      }
      else if(attackHover)
      {
        canv.context.drawImage(game.model.attackImg, 10, 10);
        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'left';
        canv.context.font = "20px vg_font";
        canv.context.fillText(2, 30, 30);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("attack", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("the amount of damage done", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("to an enemy on contact", canv.canvas.width/2, canv.canvas.height/2-30);
      }
      else if(defenseHover)
      {
        canv.context.drawImage(game.model.defenseImg, 10, 40);
        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'left';
        canv.context.font = "20px vg_font";
        canv.context.fillText(1, 30, 60);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("defense", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("the density of your", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("healthbar", canv.canvas.width/2, canv.canvas.height/2-30);
      }
      else if(speedHover)
      {
        canv.context.drawImage(game.model.speedImg, 10, 70);
        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'left';
        canv.context.font = "20px vg_font";
        canv.context.fillText(1, 30, 90);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("speed", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("...", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("um...", canv.canvas.width/2, canv.canvas.height/2-30);
      }
      else if(healthRateHover)
      {
        canv.context.drawImage(game.model.healthrateImg, 10, 100);
        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'left';
        canv.context.font = "20px vg_font";
        canv.context.fillText(3, 30, 120);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("healthrate", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("the rate at which", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("you heal", canv.canvas.width/2, canv.canvas.height/2-30);
      }
      else if(bombHover)
      {
        canv.context.drawImage(game.model.bombImg, 10, 130);
        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'left';
        canv.context.font = "20px vg_font";
        canv.context.fillText(2, 30, 150);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("bomb", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("sends a wave damaging nearby enemies", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("*does not give you xp!*", canv.canvas.width/2, canv.canvas.height/2-30);
      }
      else if(healthHover)
      {
        canv.context.fillStyle = "#000000";
        canv.context.fillRect(10,              canv.canvas.height-40, canv.canvas.width-20, 10);
        canv.context.fillRect(10,              canv.canvas.height-20, canv.canvas.width-20, 10);
        canv.context.fillRect(10,              canv.canvas.height-40, 10,              30);
        canv.context.fillRect(canv.canvas.width-20, canv.canvas.height-40, 10,              30);
        canv.context.fillStyle = "#00FF00";
        canv.context.fillRect(20, canv.canvas.height-30, 0.2*(canv.canvas.width-40), 10)
        canv.context.textAlign = 'center';
        canv.context.font = "8px vg_font";
        canv.context.fillStyle = "#3377FF";
        canv.context.fillText("x2", 10+((canv.canvas.width-20)/2), canv.canvas.height-31);
        canv.context.fillText("x3", 10+((canv.canvas.width-20)/4), canv.canvas.height-31);
        canv.context.fillStyle = "#DDDDDD";
        canv.context.fillText("x4", 10+((canv.canvas.width-20)/8), canv.canvas.height-31);
        canv.context.fillText("x5", 10+((canv.canvas.width-20)/16), canv.canvas.height-31);
        canv.context.fillText("x6", 10+((canv.canvas.width-20)/32), canv.canvas.height-31);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("Your Health Bar", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("Indicates your remaining health. When this", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("reaches 0, you die. Maintain low health for", canv.canvas.width/2, canv.canvas.height/2-30);
        canv.context.fillText("huge experience boosts.", canv.canvas.width/2, canv.canvas.height/2-10);
      }
      else if(expHover)
      {
        canv.context.fillStyle = "#000000";
        canv.context.fillRect(10,              canv.canvas.height-60, canv.canvas.width-20, 5);
        canv.context.fillRect(10,              canv.canvas.height-50, canv.canvas.width-20, 5);
        canv.context.fillRect(10,              canv.canvas.height-60, 10,              15);
        canv.context.fillRect(canv.canvas.width-20, canv.canvas.height-60, 10,              15);
        canv.context.font = "12px vg_font";
        canv.context.textAlign = 'left';
        canv.context.fillText("lvl.4",10,canv.canvas.height-65);
        canv.context.fillStyle = "#3377FF";
        canv.context.fillRect(20, canv.canvas.height-55, 0.75*(canv.canvas.width-40), 5)
        canv.context.textAlign = 'right';
        canv.context.font = "18px vg_font";
        canv.context.fillText("x6",canv.canvas.width-10,canv.canvas.height-65);
  

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("Your XP Bar", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("Fill this to gain a level. Every Level", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("gives you one random attribute point.", canv.canvas.width/2, canv.canvas.height/2-30);
      }
      else if(roundHover)
      {
        canv.context.fillStyle = "#000000";
        canv.context.fillRect(canv.canvas.width-30, 25, 5, canv.canvas.height-130);
        canv.context.fillRect(canv.canvas.width-15, 25, 5, canv.canvas.height-130);
        canv.context.fillRect(canv.canvas.width-30, 25, 20, 10);
        canv.context.fillRect(canv.canvas.width-30, canv.canvas.height-105, 20, 10);
        canv.context.font = "12px vg_font";
        canv.context.textAlign = "right";
        canv.context.fillText("Round 4", canv.canvas.width-15, 20);
        canv.context.fillStyle = "#FF0000";
        canv.context.fillRect(
          canv.canvas.width-25, 
          35+((0.25)*(canv.canvas.height-140)), 
          10, 
          (0.75*(canv.canvas.height-140))
        );

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("Round Indicator", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("This bar shows how much time is left", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("in the current round.", canv.canvas.width/2, canv.canvas.height/2-30);
      }
      else if(scoreHover)
      {
        canv.context.font = "12px vg_font";
        canv.context.textAlign = "center";
        canv.context.fillText("Score:643", canv.canvas.width/2, 20);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("Score", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("If this increases,", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("you've done something right.", canv.canvas.width/2, canv.canvas.height/2-30);
      }
      else if(youHover)
      {
        var posx = 100;
        var posy = stage.c.canvas.height/2+10;
        canv.context.fillStyle = '#000000';
        canv.context.fillRect(posx-10,posy-10,20,20);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("You", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("Build up your stats to survive.", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("Ram into enemies to destroy them and gain XP,", canv.canvas.width/2, canv.canvas.height/2-30);
        canv.context.fillText("but try not to die in the process.", canv.canvas.width/2, canv.canvas.height/2-10);
      }
      else if(youOpenHover)
      {
        posx = stage.c.canvas.width-100;
        canv.context.fillStyle = '#AA0000';
        canv.context.beginPath();
        canv.context.arc(posx, posy, 10-4, 0, 2 * Math.PI, false);
        canv.context.fill();
        canv.context.lineWidth = 2;
        canv.context.strokeStyle = '#440000';
        canv.context.stroke();
        canv.context.fillStyle = '#000000';
        canv.context.fillRect(posx-10-2, posy-10-2, 10, 10);
        canv.context.fillRect(posx+2,                posy-10-2, 10, 10);
        canv.context.fillRect(posx-10-2, posy+2,                 10, 10);
        canv.context.fillRect(posx+2,                posy+2,                 10, 10);

        canv.context.fillStyle = "#000000";
        canv.context.textAlign = 'center';
        canv.context.font = "20px vg_font";
        canv.context.fillText("You (opened)", canv.canvas.width/2, canv.canvas.height/2-80);
        canv.context.font = "12px vg_font";
        canv.context.fillText("Open yourself up to take 2x damage,", canv.canvas.width/2, canv.canvas.height/2-50);
        canv.context.fillText("at the benefit of 2x XP.", canv.canvas.width/2, canv.canvas.height/2-30);
        canv.context.fillText("What doesn't kill you...", canv.canvas.width/2, canv.canvas.height/2-10);
      }
    }
    dirty = false;
  };
}
HowToScene.prototype = Scene.prototype;
