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
            [2, 2, 2, 2, 1, 2, 2]
        ];
        this.gameState = 0;
        this.computerPlayer = null;
    }


    // Fonction qui permet de savoir si une colonne est valide
    isValidMove(board, column) {
        if ((column >= 0 && column <= 6) && board[0][column] !== 0) {
            return 0;
        } else if (column < 0 || column > 6) {
            return 2;
        }
        return 1;
    }

    // Fonction qui initialise le jeu
    startGame(out) {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        this.computerPlayer = null;
        out = JSON.parse(out);
        if(out.ai == "on"){
            this.firstPlayer = new Player(out.player == 1 ? 1 : 2, false);
            this.secondPlayer = new Player(out.player == 1 ? 2 : 1, true);
            this.computerPlayer = this.secondPlayer;
            this.secondPlayer.difficulty = out.difficulty;
        } else {
            this.firstPlayer = new Player(out.player == 1 ? 1 : 2, false);
            this.secondPlayer = new Player(out.player == 1 ? 2 : 1, false);
        }
        this.currentPlayer = out.player == 1 ? this.firstPlayer : this.secondPlayer;
        this.gameState = 1;
    }

    // Fonction qui effectue le coup
    makeMove(board, column, player) {
        var nextBoard = board.slice(); // copie du plateau
        for (var i = 0; i < 6; i++) {
            if (nextBoard[i][column] !== 0 && nextBoard[i - 1] !== undefined ) {
                nextBoard[i - 1][column] = player.getColor();
                break;
            }
            if(i === 5) {
                nextBoard[i][column] = player.getColor();
            }
        } // Pour chaque ligne du tableau on regarde si le coup est possible
        this.board = nextBoard; // On met à jour le plateau
        this.currentPlayer = player.getColor()===this.firstPlayer.getColor()?this.secondPlayer:this.firstPlayer; // On change de joueur
        return nextBoard; // On retourne le plateau
    }

    getStateByMove(board2, column, player) {
        let nextBoard = JSON.parse(JSON.stringify(board2)); // copie du plateau
        for (var i = 0; i < 6; i++) {
            if (nextBoard[i][column] !== 0 && nextBoard[i - 1] !== undefined ) {
                nextBoard[i - 1][column] = player;
                break;
            }
            if(i === 5) {
                nextBoard[i][column] = player;
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
        for (var i = 0; i < 6; i++) { // row
            for (var j = 0; j < 4; j++) { // column
                if (board[i][j] !== 0 && board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2] && board[i][j] === board[i][j + 3]) {
                    winner = board[i][j];
                }
            }
        }
        // check vertical
        for (var i = 0; i < 3; i++) { // row
            for (var j = 0; j < 7; j++) { // column
                if (board[i][j] !== 0 && board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j] && board[i][j] === board[i + 3][j]) {
                    winner = board[i][j];
                }
            }
        }
        // check diagonal
        for (var i = 0; i < 3; i++) { // row
            for (var j = 0; j < 4; j++) { // column
                if (board[i][j] !== 0 && board[i][j] === board[i + 1][j + 1] && board[i][j] === board[i + 2][j + 2] && board[i][j] === board[i + 3][j + 3]) {
                    winner = board[i][j];
                }
            }
        }
        // check anti-diagonal
        for (var i = 3; i < 6; i++) { // row
            for (var j = 0; j < 4; j++) { // column
                if (board[i][j] !== 0 && board[i][j] === board[i - 1][j + 1] && board[i][j] === board[i - 2][j + 2] && board[i][j] === board[i - 3][j + 3]) {
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

export {Model};
