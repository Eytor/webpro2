function Shape(position, size, color) {
  this.position = position;
  this.size = parseInt(size);
  this.color = color;
};

Shape.prototype.move = function (position) {
  this.position = position;
};

Shape.prototype.resize = function (x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
};

// this is for when moving to find if the mouse is located in a shape
Shape.prototype.contains = function (x, y) {
  if(this.position.x < x && this.position.y < y) {
    if ((this.position.x + this.width) > x && (this.position.y + this.height) > y ) {
      return true;
    }
  }
  return false;
};

// this function is the property of the rectangle in the canvas
function Rectangle(position, width, height, size, color) {
  Shape.call(this, position, size, color);
  this.width = width;
  this.height = height;
};
// this function is the property og the straight line in the canvas
function Line(position, width, height, size, color) {
  Shape.call(this, position, size, color);
  this.width = width;
  this.height = height;
};
// this function is the property of the Pen in the canvas
function Pen(position, width, height, size, color) {
  Shape.call(this, position, size, color);
  this.width = width;
  this.height = height;
  this.pos = [];
};
// this function is the propertyof the Text in the canvas
function Text(position, width, height, content, font, size, color) {
  Shape.call(this, position, size, color);
  this.width = width.width;
  this.height = parseInt(height);
  this.content = content;
  this.font = font;
};
// this function is the property of the circle in the canvas
function Circle(position, width, height, size, color) {
  Shape.call(this, position, size, color);
  this.width = width;
  this.height = height;
};

// assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;
Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Rectangle.prototype.render = function () {
  // Render a Rectangle

  drawio.ctx.fillStyle = this.color;
  drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Line.prototype.render = function () {
  // Render a Line
  drawio.ctx.beginPath();
  drawio.ctx.strokeStyle = this.color;
  drawio.ctx.lineWidth = this.size;
  drawio.ctx.moveTo(this.position.x, this.position.y);
  drawio.ctx.lineTo(this.width + this.position.x, this.height + this.position.y);
  drawio.ctx.stroke();
};

Pen.prototype.render = function () {
  // Render the Pen
  drawio.ctx.beginPath();
  drawio.ctx.strokeStyle = this.color;
  drawio.ctx.lineWidth = this.size;
  drawio.ctx.moveTo(this.position.x, this.position.y);
  for (var i = 0; i < this.pos.length; i++) {
      drawio.ctx.lineTo(this.pos[i].x, this.pos[i].y);
  }
  drawio.ctx.stroke();
};

// this function is for moving the Pen
Pen.prototype.move = function (position) {
  var original = this.position;
  this.position = position;
  for (var i = 0; i < this.pos.length; i++) {
    var x = this.pos[i].x - original.x;
    var y = this.pos[i].y - original.y;
    this.pos[i].x = x+position.x;
    this.pos[i].y = y+position.y;
  }
};
Circle.prototype.render = function() {
  // Render a circle
  var radius = 0;
  drawio.ctx.beginPath();
  drawio.ctx.lineWidth = this.size;
  drawio.ctx.strokeStyle = this.color;
  if (this.width < this.height) {
    radius = this.width;
  }
  else {
    radius = this.height;
  }
  if (radius < 0) {
    radius = -radius;
  }
  drawio.ctx.arc(this.position.x+this.width/2, this.position.y+this.height/2, radius, 0, 2 * Math.PI);
  drawio.ctx.stroke();
};

// Render the Text
Text.prototype.render = function () {
  drawio.ctx.fillStyle = this.color;
  drawio.ctx.font = this.size + "px " + this.font;
  drawio.ctx.fillText(this.content, this.position.x, this.position.y);
};

Pen.prototype.resize = function (x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
  this.pos.push({x: x, y: y});
};

Text.prototype.resize = function (x, y) {
};
