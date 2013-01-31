var SceneHandler = function(stage)
{
  this.nullScene = new Scene(stage);
  this.loadingScene = new LoadingScene(stage);
  this.introScene = new IntroScene(stage);
  this.howToScene = new HowToScene(stage);
  this.playScene = new PlayScene(stage);
  this.scenes = [this.nullScene, this.loadingScene, this.introScene, this.howToScene, this.playScene];
  this.currentScene = this.nullScene;

  this.showScene = function(scene)
  {
    this.currentScene.willExit();
    scene.willEnter();
    this.currentScene = scene;
  };

  this.begin = function()
  {
    this.showScene(this.loadingScene);
  };

  this.update = function(delta)
  {
    this.currentScene.update(delta);
  };
};

var Scene = function(stage) {};
Scene.prototype.willEnter = function() {};
Scene.prototype.willExit = function() {};
Scene.prototype.update = function(delta) {};
