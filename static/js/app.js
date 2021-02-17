const gameBoard = (function () {
    let array = {
        s00: '', s01: '', s02: '',
        s10: '', s11: '', s12: '',
        s20: '', s21: '', s22: '',
    }
    function newBoard() {
        for (const i in array) {
            array[i] = ''
        }
    };
    function markSquare(player) {
        return;
    };
    return {
        array,
        newBoard,
        markSquare
    };
})();

const gameController = (function () {
    const startGame = function () {
        let game_over = false;
        // Main game loop
        while (!game_over) {
            // check for a win
            // check for a tie
            // allow next player to play a move
        }
    };
    return {
        startGame
    }
})();

function playerFactory(symbol, name) {
    return {
        symbol,
        name
    }
};

playerX = playerFactory('x', 'Player 1');
playerO = playerFactory('o', 'Player 2');