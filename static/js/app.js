//////// DOM ELEMENTS MODULE ////////
const DOMElements = (function () {
    return {
        s00: document.getElementById('s00'),
        s01: document.getElementById('s01'),
        s02: document.getElementById('s02'),
        s10: document.getElementById('s10'),
        s11: document.getElementById('s11'),
        s12: document.getElementById('s12'),
        s20: document.getElementById('s20'),
        s21: document.getElementById('s21'),
        s22: document.getElementById('s22')
    }
})();

//////// GAME BOARD MODULE ////////
const gameBoard = (function () {

    // Game board as an object
    let array = {
        s00: 'x', s01: '', s02: '',
        s10: '', s11: '', s12: '',
        s20: '', s21: '', s22: '',
    }

    // Game board keys as an array
    const keys = Object.keys(array);

    // Reset gameBoard array values to empty strings, then run _renderBoard to
    // clear the textContent of the board
    function newBoard() {
        for (const key of keys) {
            array[key] = '';
        }
        _renderBoard();
    };

    // Run through each key in the array and change the corresponding DOM
    // element to match it
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

    // Called by an event listener, inputs the passed symbol into the passed
    // array key, and calls _renderBoard() to show the change
    function markSquare(key, symbol) {
        array[key] = `${symbol}`;
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

    // Current player
    let current_player = 'x'

    // Initialize game board
    function initializeGame() {
        _createEventListeners()
    }

    // Start the main game loop
    function startGame() {
        let game_over = false;
        // Main game loop
        while (!game_over) {
            // check for a win
            // check for a tie
            // allow next player to play a move
        }
    };

    // Create event listeners for each square to register clicks based on
    // current player
    function _createEventListeners() {
        DOMElements.s00.addEventListener('click', function () {
            gameBoard.markSquare('s00', current_player)
        });
        DOMElements.s01.addEventListener('click', function () {
            gameBoard.markSquare('s01', current_player)
        });
        DOMElements.s02.addEventListener('click', function () {
            gameBoard.markSquare('s02', current_player)
        });
        DOMElements.s10.addEventListener('click', function () {
            gameBoard.markSquare('s10', current_player)
        });
        DOMElements.s11.addEventListener('click', function () {
            gameBoard.markSquare('s11', current_player)
        });
        DOMElements.s12.addEventListener('click', function () {
            gameBoard.markSquare('s12', current_player)
        });
        DOMElements.s20.addEventListener('click', function () {
            gameBoard.markSquare('s20', current_player)
        });
        DOMElements.s21.addEventListener('click', function () {
            gameBoard.markSquare('s21', current_player)
        });
        DOMElements.s22.addEventListener('click', function () {
            gameBoard.markSquare('s22', current_player)
        });
    };

    return {
        initializeGame,
        startGame
    };
})();

//////// PLAYER FACTORY ////////
function playerFactory(symbol, name) {
    return {
        symbol,
        name
    }
};

//////// ON LOAD ////////
playerX = playerFactory('x', 'Player 1');
playerO = playerFactory('o', 'Player 2');

// Initialize the game to create event listeners
gameController.initializeGame();