var SceneHandler = function()
{
  var self = this;

  this.nullScene = new Scene();
  this.loadingScene = new LoadingScene();
  this.introScene = new IntroScene();
  this.scenes = [this.nullScene];
  this.currentScene = this.nullScene;

  self.showScene = function(scene)
  {
    this.currentScene.willDisappear();
    scene.willAppear();
    this.currentScene = scene;
  };
};

var Scene = function() {};
Scene.prototype.willAppear = function() {};
Scene.prototype.willDisappear = function() {};
Scene.prototype.update = function(delta) {};
