/**
 * Nom du fichier: GameController.js
 * Auteur: Eliot Masset
 * Dernière modification : 06/01/2021
 * Description: Ce fichier contient les fonctions de la classe GameController
 * Version: 1.0
 **/
import { Nav } from "../View/Nav.js";
class GameController {
  // Constructeur
  constructor(model, view) {
    this.model = model; //Référence sur le modèle
    this.view = view; //Référence sur la vue
    this.view.render(
      [
        [2, 2, 2, 2, 1, 2, 2],
        [2, 2, 2, 1, 1, 2, 2],
        [2, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 2, 1, 2, 2],
        [1, 1, 1, 1, 1, 1, 2],
        [2, 2, 2, 2, 1, 2, 2],
      ],
      (color) =>
        this.model.setFirstColor(color, (plate) => this.view.drawPlate(plate)),
      (color) =>
        this.model.setSecondColor(color, (plate) => this.view.drawPlate(plate)),
      () => this.model.getFirstColor(),
      () => this.model.getSecondColor(),
      (e) => this.clickOnCanva(e)
    ); // <- On affiche le plateau en 4
    this.navView = new Nav(document.querySelector("nav"), (out) =>
      this.startGame(out)
    ); //On crée un nouveau Nav
    this.navView.draw(); // On dessine la vue
  }

  // Fonction de début de partie
  startGame(out) {
    if (!this.view.getCanAnimate()) return 0; //Si le jeton est en train de tomber, on ne fait rien
    let state = this.model.getState(); //On récupère le plateau
    this.model.startGame(out); //On lance le jeu
    this.view.setStartPlayer(JSON.parse(out).player); //On définit le joueur qui commence

    let self = this;
    this.view.openPlate(() => {
      //fonction de fin d'animation
      if (JSON.parse(out).player == 2 && JSON.parse(out).ai == "on") {
        //Si c'est à l'ordinateur de jouer
        this.view.jeton.color = this.model.getSecondColor(); //On définit la couleur du jeton
        document.documentElement.style.setProperty(
          "--jeton",
          this.model.getSecondColor()
        );
        var bestMove = 3; //On définit la colonne de départ
        self.view.animateFalling(
          self.view.getXbyRange(bestMove),
          self.model.getState(),
          () => {
            self.view.render(
              self.model.makeMove(
                self.model.getState(),
                bestMove,
                self.model.currentPlayer
              )
            );
          },
          () => self.model.getStateByMove(self.model.getState(), 3, 2)
        ); // <- On anime le jeton
      }
    }, state); //On affiche le plateau

    document.documentElement.style.setProperty(
      "--jeton",
      JSON.parse(out).player == 1
        ? this.model.getFirstColor()
        : this.model.getSecondColor()
    );

    this.view.jeton.color =
      JSON.parse(out).player == 1
        ? this.model.getFirstColor()
        : this.model.getSecondColor(); //On définit la première couleur du jeton

    document.documentElement.style.setProperty(
      "--jeton",
      JSON.parse(out).player == 1
        ? this.model.getFirstColor()
        : this.model.getSecondColor()
    );
  }

  setGameState(state) {
    this.model.gameState = state;
  }

  //Fonction au clic sur le canvas
  clickOnCanva(e) {
    e.preventDefault();
    if (!this.view.getCanAnimate() || this.model.gameState === 0) return 0; //Si le jeton est en train de tomber, on ne fait rien
    let pos = this.view.getMousePos(e); //On récupère la position du clic
    let range = this.view.getRangeByX(pos.x); //On récupère la rangée de l'emplacement du clic
    let col = this.view.getRangeIdByX(range); //On récupère la colonne de l'emplacement du clic
    let move = this.model.isValidMove(this.model.board, col); //On vérifie si le coup est valide
    if (move === 0) {
      //On vérifie si le coup est valide
      //  alert("Cette colonne est pleine"); //Si non, on affiche un message d'erreur
      this.view.closed = false;
      const myEvent = new CustomEvent("msg", {
        detail: { message: "Cette colonne est pleine." },
        bubbles: true,
        cancelable: true,
        composed: false,
      });
      document.getElementById("modal").dispatchEvent(myEvent);
    } else if (move !== 2) {
      //Sinon, on joue le coup
      this.view.animateFalling(
        pos.x,
        this.model.getState(),
        () => {
          this.view.render(
            this.model.makeMove(this.model.board, col, this.model.currentPlayer)
          );
          this.model.isEndGame(
            this.model.getState(),
            this.view.MyCanva,
            (state) => this.setGameState(state),
            this.clickOnCanva
          );
          if (
            this.model.computerPlayer !== null &&
            this.model.currentPlayer.getNumber() ===
              this.model.computerPlayer.getNumber() &&
            this.model.gameState !== 0
          ) {
            //Si c'est à l'ordinateur de jouer :
            var bestMove = this.model.secondPlayer.getBestMove(
              this.model.getState(),
              this.model.secondPlayer.difficulty,
              this.model
            ); //On récupère la meilleure colonne
            this.view.animateFalling(
              this.view.getXbyRange(bestMove),
              this.model.getState(),
              () => {
                //On anime le jeton de l'ordinateur
                this.view.render(
                  this.model.makeMove(
                    this.model.getState(),
                    bestMove,
                    this.model.currentPlayer
                  )
                ); //On joue le coup de l'ordinateur à la fin de l'animation
                this.model.isEndGame(
                  this.model.getState(),
                  this.view.MyCanva,
                  (state) => this.setGameState(state),
                  this.clickOnCanva
                ); //On vérifie si le jeu est fini à la fin de l'animation
              },
              (board, column, player) =>
                this.model.getStateByMove(board, column, player)
            );
          }
        },
        (board, column, player) =>
          this.model.getStateByMove(board, column, player)
      ); //On anime le jeton
    }
  }
}

export { GameController };
