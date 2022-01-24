/**
 * Nom du fichier: Model.js
 * Auteur: Eliot Masset
 * Dernière modification : 06/01/2021
 * Description: Ce fichier contient les fonctions de la classe Model
 * Version: 1.0
 **/
import { Player } from "./Player.js";

class Model {
  // Constructeur
  constructor() {
    this.board = [
      [2, 2, 2, 2, 1, 2, 2],
      [2, 2, 2, 1, 1, 2, 2],
      [2, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 2, 1, 2, 2],
      [1, 1, 1, 1, 1, 1, 2],
      [2, 2, 2, 2, 1, 2, 2],
    ]; //Initialisation du plateau de jeu
    this.gameState = 0; //Initialisation du statut du jeu
    this.computerPlayer = null; //Initialisation du joueur ordinateur
    this.firstPlayer = new Player(1, "red", false); //Initialisation du joueur 1
    this.secondPlayer = new Player(2, "#ffdd00", false); //Initialisation du joueur 2
  }

  // Fonction qui met à jour la couleur du joueur 1
  setFirstColor(firstColor, drawPlate) {
    this.firstPlayer.setColor(firstColor); // On met à jour la couleur du joueur 1
    if (this.currentPlayer == undefined) {
      // Si le joueur courant n'est pas défini
      document.documentElement.style.setProperty("--jeton", firstColor); // On met à jour la couleur du joueur 1 dans le css
      drawPlate(this.getState()); // On dessine le plateau
      return; // On quitte la fonction
    }
    if (this.currentPlayer.getNumber() == 1) {
      // Si le joueur courant est le joueur 1
      document.documentElement.style.setProperty("--jeton", firstColor); // On met à jour la couleur du joueur 1 dans le css
    }
    drawPlate(this.getState()); // On dessine le plateau
  }

  // Fonction qui met à jour la couleur du joueur 2
  setSecondColor(secondColor, drawPlate) {
    this.secondPlayer.setColor(secondColor); // On met à jour la couleur du joueur 2
    if (this.currentPlayer == undefined) {
      // Si le joueur courant n'est pas défini
      document.documentElement.style.setProperty("--jeton", secondColor); // On met à jour la couleur du joueur 2 dans le css
      drawPlate(this.getState()); // On dessine le plateau
      return; // On quitte la fonction
    }
    if (this.currentPlayer.getNumber() == 2) {
      // Si le joueur courant est le joueur 2
      document.documentElement.style.setProperty("--jeton", secondColor); // On met à jour la couleur du joueur 2 dans le css
    }
    drawPlate(this.getState()); // On dessine le plateau
  }

  // Fonction qui retourne la couleur du joueur 1
  getFirstColor() {
    return this.firstPlayer.getColor();
  }

  // Fonction qui retourne la couleur du joueur 2
  getSecondColor() {
    return this.secondPlayer.getColor();
  }

  // Fonction qui permet de savoir si une colonne est valide
  isValidMove(board, column) {
    if (column >= 0 && column <= 6 && board[0][column] !== 0) {
      // Si la colonne est valide et qu'elle n'est pas vide
      return 0; // On retourne 0
    } else if (column < 0 || column > 6) {
      // Si la colonne n'est pas valide
      return 2; // On retourne 2
    }
    return 1; // Sinon on retourne 1
  }

  // Fonction qui initialise le jeu
  startGame(out) {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]; //Initialise le plateau
    this.computerPlayer = null; //Initialise le joueur ordinateur
    out = JSON.parse(out); //On parse le JSON des paramètres du formulaire
    let firstColor = this.firstPlayer.getColor(); //On récupère la couleur du joueur 1
    let secondColor = this.secondPlayer.getColor(); //On récupère la couleur du joueur 2
    if (out.ai == "on") {
      // Si le joueur ordinateur est activé
      this.firstPlayer = new Player(1, firstColor, false); // On initialise le joueur 1
      this.secondPlayer = new Player(2, secondColor, true); // On initialise le joueur 2
      this.computerPlayer = this.secondPlayer; // On initialise le joueur ordinateur
      this.secondPlayer.difficulty = out.difficulty; // On initialise la difficulté du joueur ordinateur
    } else {
      this.firstPlayer = new Player(1, firstColor, false); // On initialise le joueur 1
      this.secondPlayer = new Player(2, secondColor, false); // On initialise le joueur 2
    }
    this.currentPlayer = out.player == 1 ? this.firstPlayer : this.secondPlayer; // On définit le joueur courant
    this.gameState = 1; // On définit le statut du jeu à 1
  }

  //Fonction qui vérifie si le jeu est terminé
  isEndGame(state, canva, setGameState, clickOnCanva) {
    let winner = this.getWinner(this.board);
    if (winner) {
      //Si le jeu est terminé
      setGameState(0);
      if (winner === 3) {
        //Si il y a match nul
        canva.removeEventListener("click", clickOnCanva); //On supprime l'écouteur d'événement de clic)
        alert("La partie se termine sur un match nul"); //On affiche un message de fin de partie
        const myEvent = new CustomEvent("win", {
          detail: { winner: 3 },
          bubbles: true,
          cancelable: true,
          composed: false,
        });
        const event = new Event("win");
        document.getElementById("modal").dispatchEvent(myEvent);
      } else {
        canva.removeEventListener("click", clickOnCanva); //On supprime l'écouteur d'événement de clic)
        const myEvent = new CustomEvent("win", {
          detail: { winner },
          bubbles: true,
          cancelable: true,
          composed: false,
        });
        const event = new Event("win");
        document.getElementById("modal").dispatchEvent(myEvent);

        // alert("Le joueur " + winner + " a gagné"); //On affiche un message de fin de partie
      }
    }
  }

  // Fonction qui effectue le coup
  makeMove(board, column, player) {
    var nextBoard = board.slice(); // copie du plateau
    for (var i = 0; i < 6; i++) {
      if (nextBoard[i][column] !== 0 && nextBoard[i - 1] !== undefined) {
        nextBoard[i - 1][column] = player.getNumber();
        break;
      }
      if (i === 5) {
        nextBoard[i][column] = player.getNumber();
      }
    } // Pour chaque ligne du tableau on regarde si le coup est possible
    this.board = nextBoard; // On met à jour le plateau
    this.currentPlayer =
      player.getNumber() === this.firstPlayer.getNumber()
        ? this.secondPlayer
        : this.firstPlayer; // On change de joueur
    return nextBoard; // On retourne le plateau
  }

  //Retourne l'état du jeu après un coup
  getStateByMove(board2, column, player) {
    let nextBoard = JSON.parse(JSON.stringify(board2)); // copie du plateau
    for (var i = 0; i < 6; i++) {
      // Pour chaque ligne du tableau on regarde si le coup est possible
      if (nextBoard[i][column] !== 0 && nextBoard[i - 1] !== undefined) {
        nextBoard[i - 1][column] = player; // On met à jour le plateau
        break;
      }
      if (i === 5) {
        nextBoard[i][column] = player; // On met à jour le plateau
      }
    } // Pour chaque ligne du tableau on regarde si le coup est possible
    return nextBoard; // On retourne le plateau
  }

  // Fonction qui permet de savoir si le jeu est fini et qui retourne le gagnant
  getWinner(board) {
    var winner = 0;
    //Check if plateau is full
    var isFull = true;
    for (var i = 0; i < 7; i++) {
      if (board[0][i] === 0) {
        isFull = false;
      }
    }
    if (isFull) {
      winner = 3;
    }
    // check horizontal
    for (var i = 0; i < 6; i++) {
      // row
      for (var j = 0; j < 4; j++) {
        // column
        if (
          board[i][j] !== 0 &&
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i][j + 2] &&
          board[i][j] === board[i][j + 3]
        ) {
          winner = board[i][j];
        }
      }
    }
    // check vertical
    for (var i = 0; i < 3; i++) {
      // row
      for (var j = 0; j < 7; j++) {
        // column
        if (
          board[i][j] !== 0 &&
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i + 2][j] &&
          board[i][j] === board[i + 3][j]
        ) {
          winner = board[i][j];
        }
      }
    }
    // check diagonal
    for (var i = 0; i < 3; i++) {
      // row
      for (var j = 0; j < 4; j++) {
        // column
        if (
          board[i][j] !== 0 &&
          board[i][j] === board[i + 1][j + 1] &&
          board[i][j] === board[i + 2][j + 2] &&
          board[i][j] === board[i + 3][j + 3]
        ) {
          winner = board[i][j];
        }
      }
    }
    // check anti-diagonal
    for (var i = 3; i < 6; i++) {
      // row
      for (var j = 0; j < 4; j++) {
        // column
        if (
          board[i][j] !== 0 &&
          board[i][j] === board[i - 1][j + 1] &&
          board[i][j] === board[i - 2][j + 2] &&
          board[i][j] === board[i - 3][j + 3]
        ) {
          winner = board[i][j];
        }
      }
    }

    // return winner
    return winner;
  }

  // Fonction qui permet de connaitre les coups possibles
  getPossibleMoves(board) {
    var moves = [];
    for (let i = 0; i < 7; i++) {
      if (this.isValidMove(board, i)) {
        moves.push(i);
      }
    } // Pour chaque colonne on regarde si le coup est possible
    return moves;
  }

  // Fonction qui renvoie l'état du plateau de jeu
  getState() {
    return this.board;
  }
}

export { Model };
