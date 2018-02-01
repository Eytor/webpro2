window.drawio = {
  shapes: [],
  clipboard: [],
  selectedShape: 'pen',
  font: 'Georgia',
  size: '10px',
  color: 'black',
  canvas: document.getElementById('my-canvas'),
  ctx: document.getElementById('my-canvas').getContext('2d'),
  selectedElement: null,
  availableShapes: {
    RECTANGLE: 'rectangle',
    LINE: 'line',
    PEN: 'pen',
    TEXT: 'text',
    CIRCLE: 'circle'
  }
}

$(function () {
  function drawCanvas() {
    drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
    for (var i = 0; i < drawio.shapes.length; i++) {
      drawio.shapes[i].render();
    }
    if (drawio.selectedElement) {
      drawio.selectedElement.render();
    }
  };

  $('.icon').on('click', function () {
    if ($(this).data('shape') == 'undo' || $(this).data('shape') == 'redo') {
      if ($(this).data('shape') == 'undo') {
        if (drawio.shapes.length > 0) {
          drawio.clipboard.push(drawio.shapes.pop());
        }
      }
      else {
        if (drawio.clipboard.length > 0) {
          drawio.shapes.push(drawio.clipboard.pop());
        }
      }
      drawCanvas();
    }
    else {
      $('.icon').removeClass('selected');
      $(this).addClass('selected');
      drawio.selectedShape = $(this).data('shape');
    }
  });

  $('#font').on('change', function () {
    drawio.font = $(this).val();
  });

  $('#size').on('change', function () {
    drawio.size = $(this).val();
  });

  $('#color').on('change', function () {
    drawio.color = $(this).val();
  });

  $('#my-canvas').on('mousedown', function (mouseEvent) {
    switch (drawio.selectedShape) {
      case drawio.availableShapes.RECTANGLE:
        drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0, drawio.size, drawio.color);
        break;
        case drawio.availableShapes.LINE:
          drawio.selectedElement = new Line({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.size, drawio.color);
          break;
        case drawio.availableShapes.PEN:
          drawio.selectedElement = new Pen({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.size, drawio.color);
          break;
        case drawio.availableShapes.TEXT:
          drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, $('#input').val(), drawio.font, drawio.size, drawio.color);
          break;
        case drawio.availableShapes.CIRCLE:
          drawio.selectedElement = new Circle({x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.size, drawio.color);
          break;
    }
  });

  $('#my-canvas').on('mousemove', function (mouseEvent) {
    if (drawio.selectedElement) {
        drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
        drawCanvas();
    };
  });

  $('#my-canvas').on('mouseup', function () {
    console.log(drawio.shapes);
    drawio.shapes.push(drawio.selectedElement);
    drawio.selectedElement = null;
  });
});
