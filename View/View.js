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

    //Initialisation des variables du canvas
    this.MyCanva = document.getElementById("connect4Canvas");
    this.context = this.MyCanva.getContext("2d");
    this.xToken = 0;
    this.yToken = 0;
    this.canAnimate = true;
    this.board = [
      [ [x=>25,y=>25], 
    ] 
    ];
    this.jeton = new Jeton(this.context);
    this.raf;
    this.arrow = new Arrow(document.getElementById('arrow-down'),this.MyCanva);


    //Initialisation des variables de la classe
    this.minHeightPlate=150;
    this.maxHeightPlate=571;
    this.marge=0;

    this.Case=[]; //Tableau qui contient les coordonnées des cases
    this.Range=[]; //Tableau qui contient les coordonnées des colonnes
    for (var i = 0; i <= 6; i++) {
      this.Case[i]=[];
      for (var j = 0; j <= 5; j++) {
        this.Case[i][j] = [x=>145 + 85 * i,y=>95 + 85 * j];
      }
      this.Range[i] = 145 + 85 * i;
    }
    console.log(this.Range);
    
  }

  //Fonction de rendu
  render(state) {
    //Rectangle
    this.context.save();
    this.drawPlate(state);
    let self = this;
    document.addEventListener("mousemove", (evt) => {
      var mousePos = self.getRangeByX(self.getMousePos(evt).x);
      self.arrow.draw(mousePos, evt);
    });
  }

  //Fonction qui renvoie si oui ou non une animation est possible
  getCanAnimate() {
      return this.canAnimate;
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
      if (this.Range[i]>x-35 && x>95) {
        range=this.Range[i];
        break;
      }
    } // Pour chaque rangée, on regarde si le clic est dans la rangée
    return range; //On renvoie la rangée
  }

  //Fonction qui permet de démarer l'animation du jeton
  animateFalling(posX, state , endFunction) {
    //Initialise avant l'animation :
    this.canAnimate = false;
    this.marge=17;
    this.jeton.x=this.getRangeByX(posX);

    //Lance l'animation :
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
    } //Récupère le temps de départ de l'animation


    this.context.globalCompositeOperation = "destination-over";
    self.context.clearRect(0,0, self.MyCanva.width, self.MyCanva.height); //Table rase du canvas
    self.drawPlate(state); //Dessine le plateau
    this.context.globalCompositeOperation = "destination-over";
    self.jeton.draw(); //Dessine le jeton

    // Calcul le nombre de jetons sur la colonne :
    let nbJetonOnLine = 0;
    for (var i = 0; i < 6; i++) {
      if (state[i][(self.jeton.x-145)/85] != 0) {
        nbJetonOnLine++;
      }
    } 

    //Change les vaiables du jeton :
    self.jeton.x += self.jeton.vx;
    self.jeton.y += self.jeton.vy;
    self.jeton.vy *= 1.01;
    self.jeton.vy += .4;
    let bottom = self.maxHeightPlate+self.marge-(85*nbJetonOnLine); //Calcul la position du bas de la colonne

    //Si le jeton touche le bas de la colonne :
    if (self.jeton.y + self.jeton.vy > bottom) { 
      self.marge *= .2;
      self.jeton.vy = -self.jeton.vy; //Inverse la vitesse du jeton
      self.jeton.vy *= .4;
    }

    //Si l'animation est terminée :
    if(timestamp-self.startTimer>=(2500-300*nbJetonOnLine)){
      window.cancelAnimationFrame(self.raf);
      endFunction();
      this.jeton.x = 40;
      this.jeton.y = 50;
      this.jeton.vx = 0;
      this.jeton.vy = 2;
      this.marge=17;
      this.jeton.color = this.jeton.color == 'red' ? '#ffdd00' : 'red';
      self.startTimer = undefined;
      this.canAnimate = true;
      return;
    }

    //Continue l'animation :
    self.raf = window.requestAnimationFrame((timestamp) => self.drawBall(this, state, endFunction,timestamp));
  }

  //Fonction qui permet de dessiner le plateau
  drawPlate(state = null) {
    this.context.beginPath();
    this.context.fillStyle = "blue";
    this.context.lineWidth = "10";
    this.roundRect(100, 100, 600, 515, 20);
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
          this.context.fillStyle = "#ffdd00";
        }
        this.context.arc(145 + 85 * j, 145 + 85 * i, 35, Math.PI * 2, false);
        this.context.fill();
        this.context.beginPath();
        this.context.globalCompositeOperation = "xor";
      }
    }
    this.context.restore();
  }

  //Fonction qui permet d'animer l'ouverture du plateau
  openPlate(endFunction, state) {
    this.canAnimate = false;

    // On récupère les jetons présents sur le plateau
    var jetons = [];
    for (var i = 0; i <= 5; i++) {
      jetons[i] = [];
      for (var j = 0; j <= 6; j++) {
        if(state!=null && state[i][j]==1){
          jetons[i][j] = new Jeton(this.context);
          jetons[i][j].color = "red";
          jetons[i][j].x = 145 + 85 * j;
          jetons[i][j].y = 145 + 85 * i;
        } else if (state!=null && state[i][j]==2) {
          jetons[i][j] = new Jeton(this.context);
          jetons[i][j].color = "#ffdd00";
          jetons[i][j].x = 145 + 85 * j;
          jetons[i][j].y = 145 + 85 * i;
        }
      }
    }

    //Lance l'animation :
    let self = this;
    var raf = window.requestAnimationFrame((timestamp) => self.fallBall(raf, jetons, state, timestamp,endFunction));
  }

  //Fonction qui permet d'animer la tombée d'un jeton
  fallBall(raf, jetons, state,timestamp, endFunction) { 
    if (this.startTimer === undefined) {
      this.startTimer = timestamp;
    } //Récupère le temps de départ de l'animation

    this.context.globalCompositeOperation = "destination-over"; 
    this.context.clearRect(0,0, this.MyCanva.width, this.MyCanva.height); //Table rase du canvas
    this.drawPlate([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]); //Dessine le plateau
    this.context.globalCompositeOperation = "destination-over";

    //Animation  de chaque jeton :
    for( var i = 0; i < jetons.length; i++) {
      for( var j = 0; j < jetons[i].length; j++) {
        if(jetons[i][j]!=undefined){
          jetons[i][j].draw();
          jetons[i][j].x += jetons[i][j].vx;
          jetons[i][j].y += jetons[i][j].vy;
          jetons[i][j].vy *= 1.01;
          jetons[i][j].vy += .4;
        }
      }
    }

    //Si l'animation est terminée :
    if(timestamp-this.startTimer>=(1000)){
      window.cancelAnimationFrame(raf);
      this.canAnimate = true;
      this.startTimer = undefined;
      endFunction();
      return;
    }

    //Continue l'animation :
    let self = this;
    raf = window.requestAnimationFrame((timestamp) => self.fallBall(raf, jetons, state,timestamp, endFunction));
  }

}
