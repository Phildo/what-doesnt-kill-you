var Game = function()
{
  this.debug = document.getElementById('debug');

  this.stage = new Stage(640,320,document.getElementById('stage_container'));
  this.clickboxHandler = new ClickBoxHandler(this.stage.c);
  this.sceneHandler = new SceneHandler(this.stage);
  this.model = new Model();

  var timestamps = {};
  timestamps[true] = Date.now();
  timestamps[false] = Date.now();
  var tick_tock = true;
  var ticks = 0;
  var delta = 0;
  var fps = 0;
  var fsps = 0;

  this.update = function()
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

    this.sceneHandler.update(delta/20);
    this.stage.draw();
    requestAnimFrame(this.update,this.stage.c.canvas);
  };

  this.begin = function()
  {
    this.sceneHandler.begin();
    this.update();
  };
};
