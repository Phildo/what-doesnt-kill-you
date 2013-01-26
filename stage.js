var Stage = function(width, height, container)
{
  //Construct the canvas
  this.c = new Canv(width, height);
  this.c.canvas.style.border = '1px solid black';
  this.c.canvas.innerHTML = 'Your browser can\'t handle stuff this cool...';

  //Set up some default stuff
  this.c.context.font = '24px vg_font';
  this.c.context.textAlign = 'center';
  this.c.context.imageSmoothingEnabled = false;
  this.c.context.webkitImageSmoothingEnabled = false;

  //Add to page
  container.appendChild(this.c.canvas);
  var shadow = new Image();
  shadow.src = 'assets/images/shadow.png';
  container.appendChild(shadow);

  this.blits = new PrioritizedRegistrationList("BLITS", 5);

  this.draw = function()
  {
    this.blits.performMemberFunction("draw", null); //Commands them to draw themselves on own canvas
    this.blits.performMemberFunction("blitTo",this.c); //Then merge it onto the on-screen canvas.
  };
}
