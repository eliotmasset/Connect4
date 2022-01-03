class View {
  constructor(canvaId) {
    this.MyCanva = document.getElementById("connect4Canvas");
    this.context = this.MyCanva.getContext("2d");
    this.xToken = 0;
    this.yToken = 0;
    this.board = [
      [[25, 25], 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
  }

  render(state) {
    //Rectangle
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = "blue";
    this.context.lineWidth = "10";
    this.roundRect(100, 50, 600, 515, 20);
    this.context.fill();
    this.context.closePath();
    this.context.globalCompositeOperation = "xor";

    //Cercle
    this.context.beginPath();

    for (var i = 0; i <= 5; i++) {
      for (var j = 0; j <= 6; j++) {
        this.context.arc(145 + 85 * j, 95 + 85 * i, 35, Math.PI * 2, false);
        this.context.fill();
        this.context.beginPath();
      }
    }
    this.context.restore();

    this.MyCanva.addEventListener("click", (e) => {
      this.intervalId = window.setInterval(() => {
        this.animateFalling();
      }, 0);
    });
  }

  roundRect(x, y, w, h, radius) {
    this.context.strokeStyle = "blue";
    var r = x + w;
    var b = y + h;
    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.lineTo(r - radius, y);
    this.context.quadraticCurveTo(r, y, r, y + radius);
    this.context.lineTo(r, y + h - radius);
    this.context.quadraticCurveTo(r, b, r - radius, b);
    this.context.lineTo(x + radius, b);
    this.context.quadraticCurveTo(x, b, x, b - radius);
    this.context.lineTo(x, y + radius);
    this.context.quadraticCurveTo(x, y, x + radius, y);
    this.context.stroke();
  }

  animateFalling() {
    this.context.clearRect(0, 0, this.MyCanva.width, this.MyCanva.height);
    this.render();

    this.context.save();
    this.context.globalCompositeOperation = "destination-over";
    this.context.fillStyle = "red";
    this.context.beginPath();
    this.context.arc(145 + 85, this.yToken, 40, 0, 2 * Math.PI);
    this.context.fill();
    this.context.restore();
    this.yToken += 5;
    if (this.yToken >= 520) {
      this.context.clearRect(0, 0, this.MyCanva.width, this.MyCanva.height);
      this.render();

      this.context.save();
      this.context.globalCompositeOperation = "destination-over";
      this.context.fillStyle = "red";
      this.context.beginPath();
      this.context.arc(145 + 85, 520, 40, 0, 2 * Math.PI);
      this.context.fill();
      this.context.restore();
      clearInterval(this.intervalId);
    }
  }
}
