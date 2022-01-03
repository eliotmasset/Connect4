class View {
  constructor(canvaId) {
    this.canvaId = canvaId;
  }

  render(state) {
    var canvas = document.getElementById(this.canvaId);
    var ctx = canvas.getContext("2d");

    var img1 = new Image();

    //drawing of the test image - img1
    img1.onload = function () {
      //draw background image
      ctx.drawImage(img1, 0, 0);
      //draw a box over the top
      ctx.fillStyle = "rgba(200, 0, 0, 0)";
      ctx.fillRect(0, 0, 400, 400);
    };

    img1.src = "../Assets/image/FIAL_Board.png";
  }
}
