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
    this.drawPlate(state);
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
    for (var i = 0; i <= this.Range.length; i++) {
      if (this.Range[i]>x+10) {
        range=this.Range[i];
        break;
      }
    }
    return range;
  }

  //Fonction qui permet de démarer l'animation du jeton
  animateFalling(posX, state , endFunction) {
    this.marge=17;
    this.jeton.x=this.getRangeByX(posX);
    this.raf = window.requestAnimationFrame((timestamp) => this.drawBall(this,state, endFunction,timestamp));
    return true;
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
  drawBall(self,state, endFunction,timestamp) {
    if (self.startTimer === undefined) {
      self.startTimer = timestamp;
    }
    this.context.globalCompositeOperation = "destination-over";
    self.context.clearRect(0,0, self.MyCanva.width, self.MyCanva.height);
    self.drawPlate(state);
    this.context.globalCompositeOperation = "destination-over";
    self.jeton.draw();
    let nbJetonOnLine = 0;
    for (var i = 0; i < 6; i++) {
      if (state[i][(self.jeton.x-145)/85] != 0) {
        nbJetonOnLine++;
      }
    }
    self.jeton.x += self.jeton.vx;
    self.jeton.y += self.jeton.vy;
    self.jeton.vy *= 1.01;
    self.jeton.vy += .4;
    let bottom = self.maxHeightPlate+self.marge-(85*nbJetonOnLine);
    if (self.jeton.y + self.jeton.vy > bottom) {
      self.marge *= .2;
      self.jeton.vy = -self.jeton.vy;
      self.jeton.vy *= .4;
    }
    if(timestamp-self.startTimer>=2200){
      window.cancelAnimationFrame(self.raf);
      endFunction();
      this.jeton.x = 40;
      this.jeton.y = 40;
      this.jeton.vx = 0;
      this.jeton.vy = 2;
      this.marge=17;
      this.jeton.color = this.jeton.color == 'red' ? 'yellow' : 'red';
      self.startTimer = undefined;
      return;
    }
    self.raf = window.requestAnimationFrame((timestamp) => self.drawBall(this, state, endFunction,timestamp));
  }

  //Fonction qui permet de dessiner le plateau
  drawPlate(state = null) {
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
        if(state!=null && state[i][j]==1){
          this.context.globalCompositeOperation = "source-over";
          this.context.fillStyle = "red";
        } else if (state!=null && state[i][j]==2) {
          this.context.globalCompositeOperation = "source-over";
          this.context.fillStyle = "yellow";
        }
        this.context.arc(145 + 85 * j, 95 + 85 * i, 35, Math.PI * 2, false);
        this.context.fill();
        this.context.beginPath();
        this.context.globalCompositeOperation = "xor";
      }
    }
    this.context.restore();
  }
}
