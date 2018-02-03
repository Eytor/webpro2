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
  selectedItem: null,
  img: new Image,
  availableShapes: {
    RECTANGLE: 'rectangle',
    LINE: 'line',
    PEN: 'pen',
    TEXT: 'text',
    CIRCLE: 'circle',
    SELECT: 'select'
  }
}
myStorage = window.localStorage;

$(function () {
  function drawCanvas() {
    clearCanvas();
    drawio.ctx.drawImage(drawio.img, 0, 0);
    for (var i = 0; i < drawio.shapes.length; i++) {
      drawio.shapes[i].render();
    }
    if (drawio.selectedElement) {
      drawio.selectedElement.render();
    }
  };

  function clearCanvas() {
    drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
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
    else if ($(this).data('shape') == 'download') {
      myStorage.setItem('canvas', drawio.canvas.toDataURL());
      drawio.shapes = [];
      drawio.clipboard = [];
      clearCanvas();
      drawio.img.src = drawio.canvas.toDataURL();
    }
    else if ($(this).data('shape') == 'upload') {
      drawio.shapes = [];
      drawio.clipboard = [];
      var dataURL = myStorage.getItem('canvas');
      drawio.img = new Image;
      drawio.img.src = dataURL;
      drawio.img.onload = function () {
        drawio.ctx.drawImage(drawio.img, 0, 0);
      };
    }
    else {
      $('.icon').removeClass('selected');
      $(this).addClass('selected');
      drawio.selectedShape = $(this).data('shape');
      if (drawio.selectedShape == "text") {
        $('#input').removeClass('hide');
        $('#font').removeClass('hide');
      }
      else {
        $('#input').addClass('hide');
        $('#font').addClass('hide');
      }
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
          var text = $('#input').val();
          drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, drawio.ctx.measureText(text), drawio.size, text, drawio.font, drawio.size, drawio.color);
          break;
        case drawio.availableShapes.CIRCLE:
          drawio.selectedElement = new Circle({x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.size, drawio.color);
          break;
        case drawio.availableShapes.SELECT:
          if (drawio.shapes.length > 0) {
            for (var i = drawio.shapes.length-1; i >= 0 ; i--) {
              if (drawio.shapes[i].contains(mouseEvent.offsetX, mouseEvent.offsetY)) {
                drawio.selectedItem = drawio.shapes[i];
                return;
              }
            }
          }
          break;
    }
  });

  $('#my-canvas').on('mousemove', function (mouseEvent) {
    if (drawio.selectedItem) {
      drawio.selectedItem.move({x: mouseEvent.offsetX, y: mouseEvent.offsetY});
      drawCanvas();
    }
    else if (drawio.selectedElement) {
        drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
        drawCanvas();
    };
  });

  $('#my-canvas').on('mouseup', function () {
    if (drawio.selectedItem) {
      drawio.selectedItem = null;
    }
    else if (drawio.selectedElement) {
      drawio.shapes.push(drawio.selectedElement);
      drawio.selectedElement = null;
    }
  });
});
