/**
  * Nom du fichier: Computer.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Computer
  * Version: 1.0
 **/

class Computer {
  constructor(context, color) {
    this.context = context;
    this.color = color;
  }
  
    // Fonction MINAMAX
    minimax(board, depth, isMaximizing) {
        var bestScore = isMaximizing ? -Infinity : Infinity;
        var bestMove = null;
        for (let i = 0; i < 7; i++) {
            if (this.isValidMove(board, i)) {
                var nextBoard = this.makeMove(board, i, isMaximizing ? 1 : 2);
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


export {Computer};
