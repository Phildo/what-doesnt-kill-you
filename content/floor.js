var ArenaFloor = function(){};
ArenaFloor.prototype.draw = function(canvas, context)
{
  context.lineWidth = 4;
  context.strokeStyle = "#BBBBBB";
  context.beginPath();
  for(var i = 0; i < 10; i++)
  {
    context.moveTo(0, i*100);
    context.lineTo(1000, i*100);
  }
  for(var i = 0; i < 10; i++)
  {
    context.moveTo(i*100, 0);
    context.lineTo(i*100, 1000);
  }
  context.closePath();
  context.stroke();
};
