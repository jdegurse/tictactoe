const DOMElements = (function () {
    return {
        s00: document.getElementById('s00'),
        s01: document.getElementById('s00'),
        s02: document.getElementById('s00'),
        s10: document.getElementById('s00'),
        s11: document.getElementById('s00'),
        s12: document.getElementById('s00'),
        s20: document.getElementById('s00'),
        s21: document.getElementById('s00'),
        s22: document.getElementById('s00')
    }
})();

//////// GAME BOARD MODULE ////////
const gameBoard = (function () {
    let array = {
        s00: '', s01: '', s02: '',
        s10: '', s11: '', s12: '',
        s20: '', s21: '', s22: '',
    }
    const keys = Object.keys(array);

    function newBoard() {
        for (const key of keys) {
            array[key] = '';
        }
    };

    function _renderBoard() {
        for (const key of keys) {
            if (array[key] === 'x') {
                DOMElements[key].textContent = 'X';
            }
            else if (array[key] === 'o') {
                DOMElements[key].textContent = 'O';
            }
            else {
                DOMElements[key].textContent = '';
            }
        }
    };

    function markSquare() {
        alert('helloooooooo');
        _renderBoard()
    };

    return {
        array,
        newBoard,
        markSquare
    };
})();

//////// GAME CONTROLLER MODULE ////////
const gameController = (function () {
    function startGame() {
        let game_over = false;
        // Main game loop
        while (!game_over) {
            // check for a win
            // check for a tie
            // allow next player to play a move
        }
    };

    function createEventListeners() {
        DOMElements.s00.addEventListener('click', gameBoard.markSquare);
    };

    return {
        startGame,
        createEventListeners
    };
})();

//////// PLAYER FACTORY ////////
function playerFactory(symbol, name) {
    return {
        symbol,
        name
    }
};

playerX = playerFactory('x', 'Player 1');
playerO = playerFactory('o', 'Player 2');