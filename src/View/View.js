/**
 * Nom du fichier: View.js
 * Auteur: Eliot Masset
 * Dernière modification : 06/01/2021
 * Description: Ce fichier contient les fonctions de la classe View
 * Version: 1.0
 **/
import { Nav } from "./Nav.js";
import { ParamsGame } from "./ParamsGame.js";
import { Jeton } from "./Jeton.js";
import { Notif } from "./Notif.js";
import { Arrow } from "./Arrow.js";
class View {
  //Constructeur
  constructor(canvaId) {
    //Initialisation des variables du canvas
    this.MyCanva = document.getElementById("connect4Canvas");
    this.context = this.MyCanva.getContext("2d");
    this.xToken = 0;
    this.yToken = 0;
    this.canAnimate = true;
    this.stop = false;
    this.board = [[[(x) => 25, (y) => 25]]];
    this.jeton = new Jeton(this.context, "red");
    this.raf;
    this.arrow = new Arrow(document.getElementById("coin"), this.MyCanva);

    this.modal = document.getElementById("modal");
    this.trigger = document.querySelector(".trigger");
    this.closeButton = document.getElementById("buttonClose");
    this.gifWin = document.getElementById("gifWin");
    this.myEvent = new CustomEvent("win", {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: false,
    });

    let self = this;
    document.getElementById("modal").addEventListener(
      "win",
      function (e) {
        self.toggleModal(e.detail.tokens,e.detail.winner);
      },
      false
    );

    document.getElementById("modal").addEventListener(
      "msg",
      function (e) {
        self.updateMessage(e.detail.message);
      },
      false
    );

    //Initialisation des variables de la classe
    this.minHeightPlate = 150;
    this.maxHeightPlate = 571;
    this.marge = 0;

    this.Case = []; //Tableau qui contient les coordonnées des cases
    this.Range = []; //Tableau qui contient les coordonnées des colonnes
    for (var i = 0; i <= 6; i++) {
      this.Case[i] = [];
      for (var j = 0; j <= 5; j++) {
        this.Case[i][j] = [(x) => 145 + 85 * i, (y) => 95 + 85 * j];
      }
      this.Range[i] = 145 + 85 * i;
    }

    var gif = document.querySelector("img.gif");
    this.generateBackgroundEvents(gif);

    document.querySelector("audio").addEventListener("canplay", () => {
      document.querySelector("audio").play();
    });
    document.addEventListener("click", () => {
      document.querySelector("audio").play();
    });
    document.body.style.cursor =
      "url(http://www.rw-designer.com/cursor-extern.php?id=1634), auto";
  }

  toggleModal(tokens,winner) {
    var status = this.modal.classList.toggle("show-modal");
    status ? this.updateWinMessage(winner) : false;
    if(winner==2 || winner==1){
      this.brightWinners(tokens);
    }
  }

  brightWinners(tokens) {
    this.saveTokens = tokens;
    for(var i=0;i<tokens.length;i++){
      this.context.globalCompositeOperation = "source-over";
      this.context.beginPath();
      this.context.strokeStyle = "white";
      this.context.arc(tokens[i][1]*85+145,tokens[i][0]*85+145,30.5,0,2*Math.PI);
      this.context.closePath();
      this.context.fillStyle = this.color;
      this.context.stroke();
    }
  }

  updateMessage(message) {
    var status = this.modal.classList.toggle("show-modal");
    document.getElementById("winMessage").innerHTML = message;
    this.gifWin.src =
      "https://media.giphy.com/media/7UtAZDSUjyo6nJ56qy/giphy.gif";
  }

  updateWinMessage(winner) {
    // Si le gagnant est le joueur 1
    if (winner === 1) {
      this.gifWin.src =
        "https://media.giphy.com/media/AFuvqdSLGoaJGTE7Iy/giphy.gif"; // On change le gif

      document.getElementById("winMessage").innerHTML =
        "Le joueur " + winner + " a gagné."; // On modifie le message de fin
    } // Si le gagnant est le joueur 2
    else if (winner === 2) {
      this.gifWin.src =
        "https://media.giphy.com/media/dWlClFAqCjyM6Xu2Lt/giphy.gif";

      document.getElementById("winMessage").innerHTML =
        "Le joueur " + winner + " a gagné.";
    } // Si c'est égalité (match nul)
    else {
      this.gifWin.src =
        "https://media.giphy.com/media/10HTAgEA1o5A9a/giphy.gif";

      document.getElementById("winMessage").innerHTML = "Le match est nul.";
    }
  }
  //Fonction qui permet de dessiner les gifs de fond
  generateBackgroundEvents(gif) {
    let gifRand = Math.floor(Math.random() * 7); //On choisit un gif au hasard
    switch (gifRand) {
      case 0:
        gif.src =
          "https://64.media.tumblr.com/b7e03e58cfeb86aeb04974b2678f4c18/tumblr_mr1u7mCQIS1qkyy30o1_500.gifv";
        break;
      case 1:
        gif.src = "https://media.giphy.com/media/dWlClFAqCjyM6Xu2Lt/giphy.gif";
        break;
      case 2:
        gif.src = "https://media.giphy.com/media/AFuvqdSLGoaJGTE7Iy/giphy.gif";
        break;
      case 3:
        gif.src = "https://media.giphy.com/media/26DNgQlEN6FmKiiNa/giphy.gif";
        break;
      case 4:
        gif.src = "https://media.giphy.com/media/6GFsg3WbdP9BIOXWBw/giphy.gif";
        break;
      case 5:
        gif.src = "https://media.giphy.com/media/7UtAZDSUjyo6nJ56qy/giphy.gif";
        break;
      case 6:
        gif.src = "https://media.giphy.com/media/10HTAgEA1o5A9a/giphy.gif";
        break;
    }
    gif.style.position = "absolute"; //On positionne le gif en absolute

    let directionRand = Math.floor(Math.random() * 4); //On choisit une direction au hasard
    switch (directionRand) {
      case 0:
        gif.style.width = "200px";
        gif.className = "gif gif1";
        break;
      case 1:
        gif.style.width = "200px";
        gif.className = "gif gif2";
        break;
      case 2:
        gif.style.width = "200px";
        gif.className = "gif gif3";
        break;
      case 3:
        gif.style.width = "200px";
        gif.className = "gif gif4";
        break;
    }
    // Reload animation
    var newone = gif.cloneNode(true); //On clone le gif
    gif.parentNode.replaceChild(newone, gif); //On remplace le gif par le clone pour relancer l'animation css

    var time = Math.random() * (20000 - 6000) + 7000; //On choisit un temps au hasard entre 7 secondes et 20 secondes

    setTimeout(() => this.generateBackgroundEvents(newone), time); //On relance l'animation dans le temps choisi
    return true; //On renvoie true
  }

  //Fonction de rendu
  render(
    state,
    setFirstColor,
    setSecondColor,
    getFirstColor,
    getSecondColor,
    clickOnCanva
  ) {
    // Get and set the color and clickOncanva function for the first time
    if (
      setFirstColor != undefined &&
      setSecondColor != undefined &&
      getFirstColor != undefined &&
      getSecondColor != undefined &&
      clickOnCanva != undefined
    ) {
      this.setFirstColor = setFirstColor;
      this.setSecondColor = setSecondColor;
      this.getFirstColor = getFirstColor;
      this.getSecondColor = getSecondColor;
      this.clickOnCanva = clickOnCanva;
      let self = this;
      this.MyCanva.addEventListener(
        "click",
        (
          e //On ajoute un écouteur d'événement de clic sur le canvas
        ) => self.clickOnCanva(e) //On appelle la fonction clickOnCanva
      );
      this.paramsGame = new ParamsGame(
        (firstColor) => this.setFirstColor(firstColor),
        (secondColor) => this.setSecondColor(secondColor)
      );
      this.paramsGame.drawSwitchAnimateSpeed();
    }
    //Rectangle
    this.context.save();
    this.drawPlate(state); //On dessine le plateau

    let self = this;
    document.addEventListener("mousemove", (evt) => {
      //On ajoute un écouteur d'événement de déplacement de la souris
      var mousePos = self.getRangeByX(self.getMousePos(evt).x); //On récupère la colonne de la souris
      self.arrow.draw(mousePos, evt); //On dessine le jeton au dessus du plateau
    });

    //this.trigger.addEventListener("click", (e) => this.toggleModal());
    // this.closeButton.addEventListener("click", this.toggleModal());
    // this.window.addEventListener("click", this.windowOnClick(event));
  }

  //Fonction qui renvoie si oui ou non une animation est possible
  getCanAnimate() {
    return this.canAnimate;
  }

  //Fonction qui permet de dessiner un rectangle avec des coins arrondis
  roundRect(x, y, w, h, radius) {
    this.context.strokeStyle = "rgba(0, 191, 255, 1)";
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
    let range = 0;
    for (var i = 0; i <= this.Range.length; i++) {
      if (this.Range[i] > x - 35 && x > 95) {
        range = this.Range[i];
        break;
      }
    } // Pour chaque rangée, on regarde si le clic est dans la rangée
    return range; //On renvoie la rangée
  }

  //Fonction qui récupère la position X en fonction d'une colonne
  getXbyRange(range) {
    return this.Range[range];
  }

  //Fonction qui permet de récupérer la rangée en fonction de la position X
  getRangeIdByX(x) {
    return (x - 145) / 85;
  }

  //Fonction qui permet de démarer l'animation du jeton
  animateFalling(posX, state, endFunction, getStateByMove) {
    //Initialise avant l'animation :
    this.canAnimate = false;
    this.marge = 17;
    this.jeton.x = this.getRangeByX(posX); //On récupère la colonne du clic
    this.jeton.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--jeton");

    //Lance l'animation :
    this.raf = window.requestAnimationFrame((timestamp) =>
      this.drawBall(this, state, endFunction, timestamp, getStateByMove)
    );

    return true;
  }

  //Fonction qui permet de récupérer la position du clic dans le canvas
  getMousePos(evt) {
    var rect = this.MyCanva.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  //Fonction qui permet de dessiner le jeton
  drawBall(self, state, endFunction, timestamp, getStateByMove) {
    if (this.stop) {
      window.cancelAnimationFrame(self.raf);

      //On inverse les couleurs :
      if (
        getComputedStyle(document.documentElement).getPropertyValue(
          "--jeton"
        ) == this.getFirstColor()
      ) {
        document.documentElement.style.setProperty(
          "--jeton",
          this.getSecondColor()
        );
      } else {
        document.documentElement.style.setProperty(
          "--jeton",
          this.getFirstColor()
        );
      }

      endFunction();
      this.stop = false;
      return;
    }

    // Calcul le nombre de jetons sur la colonne :
    let nbJetonOnLine = 0;
    for (var i = 0; i < 6; i++) {
      if (state[i][(self.jeton.x - 145) / 85] != 0) {
        nbJetonOnLine++;
      }
    }

    if (self.startTimer === undefined) {
      if (this.paramsGame.speed != 0) {
        self.jeton.vy = 6;
        self.marge = 15;
      }
      self.startTimer = timestamp;
    } //Récupère le temps de départ de l'animation

    this.context.globalCompositeOperation = "destination-over";
    self.context.clearRect(0, 0, self.MyCanva.width, self.MyCanva.height); //Table rase du canvas
    self.drawPlate(state); //Dessine le plateau
    this.context.globalCompositeOperation = "destination-over";
    self.jeton.draw(); //Dessine le jeton

    //Change les vaiables du jeton :
    self.jeton.x += self.jeton.vx;
    self.jeton.y += self.jeton.vy;
    if (this.paramsGame.speed == 0) {
      self.jeton.vy *= 1.01;
      self.jeton.vy += 0.4;
    } else {
      self.jeton.vy *= 1.01;
      self.jeton.vy += 0.4;
    }
    let bottom = 0;
    if (this.paramsGame.speed == 0) {
      bottom = self.maxHeightPlate + self.marge - 85 * nbJetonOnLine; //Calcul la position du bas de la colonne
    } else {
      bottom = self.maxHeightPlate - 5 + self.marge - 85 * nbJetonOnLine; //Calcul la position du bas de la colonne
      if (nbJetonOnLine <= 2) {
        bottom = self.maxHeightPlate - 4 + self.marge - 85 * nbJetonOnLine; //Calcul la position du bas de la colonne
      } else if (nbJetonOnLine == 3) {
        bottom = self.maxHeightPlate - 7 + self.marge - 85 * nbJetonOnLine; //Calcul la position du bas de la colonne
      }
    }

    //Si le jeton touche le bas de la colonne :
    if (self.jeton.y + self.jeton.vy > bottom) {
      if (this.paramsGame.speed == 0) {
        self.marge *= 0.2;
        self.jeton.vy = -self.jeton.vy; //Inverse la vitesse du jeton
        self.jeton.vy *= 0.4;
      } else {
        self.jeton.vy = -self.jeton.vy; //Inverse la vitesse du jeton
        self.jeton.vy *= 0.15;
      }
    }

    //Si l'animation est terminée :
    let maxTime = this.paramsGame.speed == 0 ? 2500 : 800;
    let downTime = this.paramsGame.speed == 0 ? 300 : 120;
    if (timestamp - self.startTimer >= maxTime - downTime * nbJetonOnLine) {
      self.jeton.y = 145 + 85 * nbJetonOnLine;
      this.context.globalCompositeOperation = "destination-over";
      self.context.clearRect(0, 0, self.MyCanva.width, self.MyCanva.height); //Table rase du canvas
      self.drawPlate(
        getStateByMove(
          state,
          (self.jeton.x - 145) / 85,
          this.jeton.color == this.getFirstColor() ? 1 : 2
        )
      ); //Dessine le plateau
      this.context.globalCompositeOperation = "destination-over";
      this.jeton.x = 40;
      this.jeton.y = 50;
      this.jeton.vx = 0;
      this.jeton.vy = 2;
      this.marge = 17;
      this.jeton.color =
        this.jeton.color == this.getColorByPlayer(this.startPlayer)
          ? this.getColorByPlayer(this.startPlayer == 1 ? 2 : 1)
          : this.getColorByPlayer(this.startPlayer);
      self.startTimer = undefined;
      this.canAnimate = true;
      this.stop = true;
    }

    //Continue l'animation :
    self.raf = window.requestAnimationFrame((timestamp) =>
      self.drawBall(this, state, endFunction, timestamp, getStateByMove)
    );
  }

  // Fonction setter sur le startPlayer
  setStartPlayer(startPlayer) {
    this.startPlayer = startPlayer;
  }

  // Fonction qui retourne la couleur du joueur donné
  getColorByPlayer(player) {
    if (player == 1) {
      return this.getFirstColor();
    } else {
      return this.getSecondColor();
    }
  }

  //Fonction qui permet de dessiner le plateau
  drawPlate(state = null) {
    this.context.beginPath();
    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = "rgba(0, 191, 255, 1)";
    this.context.lineWidth = "10";
    this.roundRect(100, 100, 600, 515, 20);
    this.context.fill();
    this.context.closePath();

    //Cercle
    this.context.beginPath();

    for (var i = 0; i <= 5; i++) {
      for (var j = 0; j <= 6; j++) {
        this.context.globalCompositeOperation = "destination-out";
        if (state != null && state[i][j] == 1) {
          this.context.globalCompositeOperation = "source-over";
          this.context.fillStyle = this.getFirstColor();
        } else if (state != null && state[i][j] == 2) {
          this.context.globalCompositeOperation = "source-over";
          this.context.fillStyle = this.getSecondColor();
        }
        this.context.arc(145 + 85 * j, 145 + 85 * i, 35, Math.PI * 2, false);
        this.context.fill();
        this.context.beginPath();
      }
    }
    if(this.saveTokens !== undefined)this.brightWinners(this.saveTokens);
    this.context.restore();
  }

  //Fonction qui permet d'animer l'ouverture du plateau
  openPlate(endFunction, state) {
    this.saveTokens=undefined;
    this.canAnimate = false;

    // On récupère les jetons présents sur le plateau
    var jetons = [];
    for (var i = 0; i <= 5; i++) {
      jetons[i] = [];
      for (var j = 0; j <= 6; j++) {
        if (state != null && state[i][j] == 1) {
          jetons[i][j] = new Jeton(this.context);
          jetons[i][j].color = this.getFirstColor();
          jetons[i][j].x = 145 + 85 * j;
          jetons[i][j].y = 145 + 85 * i;
        } else if (state != null && state[i][j] == 2) {
          jetons[i][j] = new Jeton(this.context);
          jetons[i][j].color = this.getSecondColor();
          jetons[i][j].x = 145 + 85 * j;
          jetons[i][j].y = 145 + 85 * i;
        }
      }
    }

    //Lance l'animation :
    let self = this;
    var raf = window.requestAnimationFrame((timestamp) =>
      self.fallBall(raf, jetons, state, timestamp, endFunction)
    );
  }

  //Fonction qui permet d'animer la tombée d'un jeton
  fallBall(raf, jetons, state, timestamp, endFunction) {
    if (this.startTimer === undefined) {
      this.startTimer = timestamp;
    } //Récupère le temps de départ de l'animation

    this.context.globalCompositeOperation = "destination-over";
    this.context.clearRect(0, 0, this.MyCanva.width, this.MyCanva.height); //Table rase du canvas
    this.drawPlate([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]); //Dessine le plateau
    this.context.globalCompositeOperation = "destination-over";

    //Animation  de chaque jeton :
    for (var i = 0; i < jetons.length; i++) {
      for (var j = 0; j < jetons[i].length; j++) {
        if (jetons[i][j] != undefined) {
          jetons[i][j].draw();
          jetons[i][j].x += jetons[i][j].vx;
          jetons[i][j].y += jetons[i][j].vy;
          jetons[i][j].vy *= 1.01;
          jetons[i][j].vy += 0.4;
        }
      }
    }

    //Si l'animation est terminée :
    if (timestamp - this.startTimer >= 1000) {
      window.cancelAnimationFrame(raf);
      this.canAnimate = true;
      this.startTimer = undefined;
      endFunction();
      return;
    }

    //Continue l'animation :
    let self = this;
    raf = window.requestAnimationFrame((timestamp) =>
      self.fallBall(raf, jetons, state, timestamp, endFunction)
    );
  }
}

export { View };
