var Game = function()
{
  var self = this;

  self.debug = document.getElementById('debug');

  self.stage = new Stage(320,640,document.getElementById('stage_container'));
  self.clickboxHandler = new ClickBoxHandler(self.stage);
  self.sceneHandler = new SceneHandler(self.stage);
  self.model = new DataHandler(self.stage);
  self.particleHandler = new ParticleHandler();
  self.enemyHandler = new EnemyHandler();

  var timestamps = {};
  timestamps[true] = Date.now();
  timestamps[false] = Date.now();
  var tick_tock = true;
  var ticks = 0;
  var delta = 0;
  var fps = 0;
  var fsps = 0;

  self.update = function()
  {
    timestamps[tick_tock] = Date.now();
    delta = timestamps[tick_tock] - timestamps[!tick_tock];
    tick_tock = !tick_tock;

/*
    if(tick_tock)
    {
      fps = Math.round((1000/(timestamps[false] - timestamps[true])));
      fsps += fps;
      ticks++;
    }

    if(ticks == 10)
    {
      debug.innerHTML = (fsps/10);
      ticks = 0;
      fsps = 0;
    }
*/


    self.sceneHandler.currentScene.update(delta/20);
    requestAnimFrame(self.update,self.stage.canvas);
  };

  self.begin = function()
  {
    self.sceneHandler.begin();
    self.update();
  };
};
