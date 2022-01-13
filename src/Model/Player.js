/**
  * Nom du fichier: Player.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Player
  * Version: 1.0
 **/

 class Player {
    constructor(color, isComputer) {
      this.color = color;
      this.isComputer = false;
    }

    // Get the color
    getColor() {
        return this.color;
    }

    // Set the color
    setColor(color) {
        this.color = color;
    }

    // Get the isComputer
    getIsComputer() {
        return this.isComputer;
    }

    // Set the isComputer
    setIsComputer(isComputer) {
        this.isComputer = isComputer;
    }
    
    // Fonction MINAMAX
    minimax(board, depth, isMaximizing) {
        var bestScore = isMaximizing ? -Infinity : Infinity;
        var bestMove = null;
        for (let i = 0; i < 7; i++) {
            if (this.isValidMove(board, i)) {
                var nextBoard = this.makeMove(board, i, isMaximizing ? 1 : 2); //Can't work !!!
                var score = this.minimax(nextBoard, depth + 1, !isMaximizing);
                if (isMaximizing && score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                } else if (!isMaximizing && score < bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        if (depth === 0) {
            return bestMove;
        } else {
            return bestScore;
        }
    }
  }
  
  
  export {Player};
  