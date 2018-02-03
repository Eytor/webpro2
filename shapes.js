function Shape(position, size, color) {
  this.position = position;
  this.size = parseInt(size);
  this.color = color;
};

Shape.prototype.render = function () {

};

Shape.prototype.move = function (position) {
  this.position = position;
};

Shape.prototype.resize = function () {

};

function Rectangle(position, width, height, size, color) {
  Shape.call(this, position, size, color);
  this.width = width;
  this.height = height;
};

function Line(position, width, height, size, color) {
  Shape.call(this, position, size, color);
  this.width = width;
  this.height = height;
};

function Pen(position, width, height, size, color) {
  Shape.call(this, position, size, color);
  this.width = width;
  this.height = height;
  this.pos = [];
};

function Text(position, width, height, content, font, size, color) {
  Shape.call(this, position, size, color);
  this.width = width;
  this.height = height;
  this.content = content;
  this.font = font;
};

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
  drawio.ctx.beginPath();
  drawio.ctx.strokeStyle = this.color;
  drawio.ctx.lineWidth = this.size;
  drawio.ctx.moveTo(this.position.x, this.position.y);
  for (var i = 0; i < this.pos.length; i++) {
      drawio.ctx.lineTo(this.pos[i].x, this.pos[i].y);
  }
  drawio.ctx.stroke();
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

Text.prototype.render = function () {
  drawio.ctx.fillStyle = this.color;
  drawio.ctx.font = this.size + "px " + this.font;
  drawio.ctx.fillText(this.content, this.position.x, this.position.y);
};

Rectangle.prototype.resize = function (x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
};

Line.prototype.resize = function (x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
};

Pen.prototype.resize = function (x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
  this.pos.push({x: x, y: y});
};

Text.prototype.resize = function (x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
};

Circle.prototype.resize = function (x,y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
};
