
class Model {
    constructor() {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
    }

    isValidMove(board, column) {
        if (column < 0 || column > 6 || board[0][column] !== 0) {
            return false;
        }
        return true;
    }

    minimax(board, depth, isMaximizing) {
        var bestScore = isMaximizing ? -Infinity : Infinity;
        var bestMove = null;
        for (var i = 0; i < 7; i++) {
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

    startGame() {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
    }

    makeMove(board, column, player) {
        var nextBoard = Array.clone(board);
        for (var i = 0; i < 6; i++) {
            if (nextBoard[i][column] !== 0) {
                nextBoard[i - 1][column] = player;
                break;
            }
        }
        return nextBoard;
    }

    getWinner(board) {
        var winner = 0;
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

    getPossibleMoves(board) {
        var moves = [];
        for (var i = 0; i < 7; i++) {
            if (this.isValidMove(board, i)) {
                moves.push(i);
            }
        }
        return moves;
    }
    
    getState() {
        return this.board;
    }
}