/**
  * Nom du fichier: View.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe View
  * Version: 1.0
 **/
class View {
  //Constructeur
  constructor(canvaId) {
    this.MyCanva = document.getElementById("connect4Canvas");
    this.context = this.MyCanva.getContext("2d");
    this.xToken = 0;
    this.yToken = 0;
    this.board = [
      [ [x=>25,y=>25], 
    ] 
    ];
    let self = this;
    this.jeton = {
      x: 40,
      y: 40,
      vx: 0,
      vy: 2,
      radius: 35,
      color: 'red',
      draw: function() {
        self.context.beginPath();
        self.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        self.context.closePath();
        self.context.fillStyle = this.color;
        self.context.fill();
      }
    };
    this.raf;
    this.minHeightPlate=100;
    this.maxHeightPlate=521;
    this.marge=0;
    this.Case=[];
    this.Range=[];
    for (var i = 0; i <= 6; i++) {
      this.Case[i]=[];
      for (var j = 0; j <= 5; j++) {
        this.Case[i][j] = [x=>145 + 85 * i,y=>95 + 85 * j];
      }
      this.Range[i] = 145 + 85 * i;
    }
    
  }

  //Fonction de rendu
  render(state) {
    //Rectangle
    this.context.save();
    this.drawPlate();
    let self=this;

    this.MyCanva.addEventListener("click", (e) => {
      this.animateFalling(self.getMousePos(e).x);
    });
  }

  //Fonction qui permet de dessiner un rectangle avec des coins arrondis
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

  //Fonction qui permet de récupérer la rangée de l'emplacement du clic
  getRangeByX(x) {
    let range=0;
    console.log(x);
    for (var i = 0; i <= this.Range.length; i++) {
      console.log(this.Range[i]);
      if (this.Range[i]>x+10) {
        range=this.Range[i];
        break;
      }
    }
    return range;
  }

  //Fonction qui permet de démarer l'animation du jeton
  animateFalling(posX) {
    this.marge=17;
    this.jeton.x=this.getRangeByX(posX);
    this.raf = window.requestAnimationFrame(() => this.drawBall(this));
  }

  //Fonction qui permet de récupérer la position du clic dans le canvas
  getMousePos(evt) {
    var rect = this.MyCanva.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  //Fonction qui permet de dessiner le jeton
  drawBall(self) {
    this.context.globalCompositeOperation = "destination-over";
    self.context.clearRect(0,0, self.MyCanva.width, self.MyCanva.height);
    self.drawPlate();
    this.context.globalCompositeOperation = "destination-over";
    self.jeton.draw();
    self.jeton.x += self.jeton.vx;
    self.jeton.y += self.jeton.vy;
    self.jeton.vy *= 1.01;
    self.jeton.vy += .4;
    if (self.jeton.y + self.jeton.vy > self.maxHeightPlate+self.marge) {
      self.marge *= .2;
      self.jeton.vy = -self.jeton.vy;
      self.jeton.vy *= .4;
    }
    if(self.jeton.vy < 0.05 && self.jeton.vy > -0.05){
      window.cancelAnimationFrame(self.raf);
      return;
    }
    self.raf = window.requestAnimationFrame(() => self.drawBall(this));
  }

  //Fonction qui permet de dessiner le plateau
  drawPlate() {
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
  }
}
