/**
  * Nom du fichier: Player.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Player
  * Version: 1.0
 **/

 class Player {
    constructor(number, color, isComputer) {
      this.number = number; // 1 or 2
      this.color = color; // red or yellow
      this.isComputer = false; // true or false
      this.difficulty = 0; // 2, 4 or 6
    }

    // Get the number
    getNumber() {
        return this.number;
    }

    // Set the number
    setNumber(number) {
        this.number = number;
    }

    //get the color
    getColor() {
        return this.color;
    }

    //set the color
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

    // Get the best move
    getBestMove(board, depth, model) {
        let position = JSON.parse(JSON.stringify(board)); // Copy the board
        var maxEval = -Infinity; // The best evalution
        var bestMove = 0; // The best move
        for(let i=0; i<7; i++) { // For each possible move
            var evalScore = this.minimax(model.getStateByMove(position, i, this.number), depth, false, -Infinity, +Infinity, model); // Evaluate the move
            if(evalScore > maxEval && model.isValidMove(position, i)) { // If the move is better than the best one
                maxEval = evalScore;
                bestMove = i;
            }
        }
        return bestMove; // Return the best move
    }
    
    // Fonction MINAMAX
    minimax(board, depth, isMaximizing, alpha, beta, model) {
        let position = JSON.parse(JSON.stringify(board));
        if(depth <= 0 || model.getWinner(position) != 0) {
            return this.evalution(position, this.number);
        }
        var evalScore = 0;
        if(isMaximizing) {
            var maxEval = -Infinity;
            for(let i=0; i<7; i++) { // The best move we can do
                if(model.isValidMove(position, i)) {
                    evalScore = this.minimax(model.getStateByMove(position, i, this.number), depth-1, false, alpha, beta, model);
                    maxEval = Math.max(maxEval, evalScore);
                    alpha = Math.max(alpha, evalScore);
                    if(beta <= alpha) {
                        break;
                    }
                }
            }
            return maxEval;
        } else {
            var minEval = Infinity;
            for(let i=0; i<7; i++) { // The worst move the opponent can do
                if(model.isValidMove(position, i)) {
                    evalScore = this.minimax(model.getStateByMove(position, i, this.number==1?2:1), depth-1, true, alpha, beta, model);
                    minEval = Math.min(minEval, evalScore);
                    beta = Math.min(beta, evalScore);
                    if(beta <= alpha) {
                        break;
                    }
                }
            }
            return minEval;
        }
    }

    evalution(board, player) {
        var score = 0;
        // Range of 2 :
        for (var i = 0; i < 6; i++) { // row
            for (var j = 0; j < 6; j++) { // column
                if(board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                    score = board[i][j] === player ? score + 3 : score - 3;
                }
            }
        }
        for (var i = 0; i < 5; i++) { // row
            for (var j = 0; j < 7; j++) { // column
                if(board[i][j] !== 0 && board[i][j] === board[i + 1][j]) {
                    score = board[i][j] === player ? score + 3 : score - 3;
                }
            }
        }
        for (var i = 0; i < 5; i++) { // row
            for (var j = 0; j < 6; j++) { // column
                if(board[i][j] !== 0 && board[i][j] === board[i + 1][j + 1]) {
                    score = board[i][j] === player ? score + 3 : score - 3;
                }
            }
        }

        for (var i = 1; i < 6; i++) { // row
            for (var j = 0; j < 6; j++) { // column
                if(board[i][j] !== 0 && board[i][j] === board[i - 1][j + 1]) {
                    score = board[i][j] === player ? score + 3 : score - 3;
                }
            }
        }

        // Range of 3 :
        for (var i = 0; i < 6; i++) { // row
            for (var j = 0; j < 5; j++) { // column
                if(board[i][j] !== 0 && board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2]) {
                    score = board[i][j] === player ? score + 10 : score - 10;
                }
            }
        }
        for (var i = 0; i < 4; i++) { // row
            for (var j = 0; j < 7; j++) { // column
                if(board[i][j] !== 0 && board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j]) {
                    score = board[i][j] === player ? score + 10 : score - 10;
                }
            }
        }
        for (var i = 0; i < 4; i++) { // row
            for (var j = 0; j < 5; j++) { // column
                if(board[i][j] !== 0 && board[i][j] === board[i + 1][j + 1] && board[i][j] === board[i + 2][j + 2]) {
                    score = board[i][j] === player ? score + 10 : score - 10;
                }
            }
        }
        for (var i = 2; i < 6; i++) { // row
            for (var j = 0; j < 5; j++) { // column
                if(board[i][j] !== 0 && board[i][j] === board[i - 1][j + 1] && board[i][j] === board[i - 2][j + 2]) {
                    score = board[i][j] === player ? score + 10 : score - 10;
                }
            }
        }

        // Range of 4 :
        for (var i = 0; i < 6; i++) { // row
            for (var j = 0; j < 4; j++) { // column
                if (board[i][j] !== 0 && board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2] && board[i][j] === board[i][j + 3]) {
                    score = board[i][j] === player ? score + 50 : score - 150;
                }
            }
        }
        for (var i = 0; i < 3; i++) { // row
            for (var j = 0; j < 7; j++) { // column
                if (board[i][j] !== 0 && board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j] && board[i][j] === board[i + 3][j]) {
                    score = board[i][j] === player ? score + 50 : score - 150;
                }
            }
        }
        for (var i = 0; i < 3; i++) { // row
            for (var j = 0; j < 4; j++) { // column
                if (board[i][j] !== 0 && board[i][j] === board[i + 1][j + 1] && board[i][j] === board[i + 2][j + 2] && board[i][j] === board[i + 3][j + 3]) {
                    score = board[i][j] === player ? score + 50 : score - 150;
                }
            }
        }
        for (var i = 3; i < 6; i++) { // row
            for (var j = 0; j < 4; j++) { // column
                if (board[i][j] !== 0 && board[i][j] === board[i - 1][j + 1] && board[i][j] === board[i - 2][j + 2] && board[i][j] === board[i - 3][j + 3]) {
                    score = board[i][j] === player ? score + 50 : score - 150;
                }
            }
        }
        return score;
    }
}
  
  
  export {Player};
  