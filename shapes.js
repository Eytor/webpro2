function Shape(position) {
  this.position = position;
};

Shape.prototype.render = function () {

};

Shape.prototype.move = function (position) {
  this.position = position;
};

Shape.prototype.resize = function () {

};

function Rectangle(position, width, height) {
  Shape.call(this, position);
  this.width = width;
  this.height = height;
};

function Line(position, width, height) {
  Shape.call(this, position);
  this.width = width;
  this.height = height;
};

function Pen(position, width, height) {
  Shape.call(this, position);
  this.width = width;
  this.height = height;
  this.pos = [];
};

function Text(position, width, height, content) {
  Shape.call(this, position);
  this.width = width;
  this.height = height;
  this.content = content;
}

// assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;
Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Rectangle.prototype.render = function () {
  // Render a Rectangle
  drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Line.prototype.render = function () {
  // Render a Line
  drawio.ctx.beginPath();
  drawio.ctx.strokeStyle = "black";
  drawio.ctx.moveTo(this.position.x, this.position.y);
  drawio.ctx.lineTo(this.width + this.position.x, this.height + this.position.y);
  drawio.ctx.stroke();
};

Pen.prototype.render = function () {
  drawio.ctx.beginPath();
  drawio.ctx.strokeStyle = "black";
  drawio.ctx.moveTo(this.position.x, this.position.y);
  for (var i = 0; i < this.pos.length; i++) {
      drawio.ctx.lineTo(this.pos[i].x, this.pos[i].y);
  }
  drawio.ctx.stroke();
};

Text.prototype.render = function () {
  drawio.ctx.font="20px Georgia";
  drawio.ctx.fillText(this.content,this.position.x,this.position.y);
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
Text.prototype.resize = function(x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
}
