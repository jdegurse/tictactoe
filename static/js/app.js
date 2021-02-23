//////// DOM ELEMENTS MODULE ////////
const DOMElements = (function () {
    return {
        playerX: document.getElementById('playerX'),
        playerO: document.getElementById('playerO'),
        s00: document.getElementById('s00'),
        s01: document.getElementById('s01'),
        s02: document.getElementById('s02'),
        s10: document.getElementById('s10'),
        s11: document.getElementById('s11'),
        s12: document.getElementById('s12'),
        s20: document.getElementById('s20'),
        s21: document.getElementById('s21'),
        s22: document.getElementById('s22'),
        new_game: document.getElementById('new-game')
    }
})();

//////// PLAYER MODULE ////////
const players = (function () {
    // Event Listeners
    DOMElements.playerX.addEventListener('keyup', _blurOnEnter);
    DOMElements.playerO.addEventListener('keyup', _blurOnEnter);
    DOMElements.playerX.addEventListener('blur', function () {
        _changeName(X, this);
    });
    DOMElements.playerO.addEventListener('blur', function () {
        _changeName(O, this);
    });

    // Creates a player
    function playerFactory(symbol, name, classList) {
        return {
            symbol,
            name,
            classList
        }
    }

    // Blur the player name input box when enter is pressed
    function _blurOnEnter(e) {
        if (e.which === 13 || e.keyCode === 13) {
            this.blur()
        }
    }

    // Change the name of a player
    function _changeName(player, element) {
        player.name = element.value;
    }

    // Create player X and player O
    const X = playerFactory(
        'x',
        DOMElements.playerX.value,
        DOMElements.playerX.classList
    );
    const O = playerFactory(
        'o',
        DOMElements.playerO.value,
        DOMElements.playerO.classList
    );

    return {
        X,
        O
    }
})();

//////// GAME BOARD MODULE ////////
const gameBoard = (function () {
    // Game board as an object
    let array = {
        s00: '', s01: '', s02: '',
        s10: '', s11: '', s12: '',
        s20: '', s21: '', s22: '',
    };

    // Game board keys as an array
    const keys = Object.keys(array);

    // Reset gameBoard array values to empty strings, then run _renderBoard to
    // clear the textContent of the board
    function newBoard() {
        for (const key of keys) {
            array[key] = '';
        }
        _renderBoard();
    }

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
    }

    // Called by an event listener, inputs the passed symbol into the passed
    // array key, and calls _renderBoard() to show the change
    function markSquare(key, symbol) {
        array[key] = `${symbol}`;
        _renderBoard();
    }

    // Check if the selected square is empty
    function checkSquareEmpty(key) {
        return array[key] === '';
    }

    // Check if there is a winner, returns boolean
    function checkWin(symbol) {
        if (
            // All win conditions
            // top horizontal
            (array.s00 === array.s01 && array.s00 === array.s02
                && array.s00 === symbol) ||
            // middle horizontal
            (array.s10 === array.s11 && array.s10 === array.s12
                && array.s10 === symbol) ||
            // bottom horizontal
            (array.s20 === array.s21 && array.s20 === array.s22
                && array.s20 === symbol) ||
            // left vertical
            (array.s00 === array.s10 && array.s00 === array.s20
                && array.s00 === symbol) ||
            // middle vertical
            (array.s01 === array.s11 && array.s01 === array.s21
                && array.s01 === symbol) ||
            // right vertical
            (array.s02 === array.s12 && array.s02 === array.s22
                && array.s02 === symbol) ||
            // top left to bottom right
            (array.s00 === array.s11 && array.s00 === array.s22
                && array.s00 === symbol) ||
            // bottom left to top right
            (array.s20 === array.s11 && array.s20 === array.s02
                && array.s20 === symbol)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    // Determine if there is a tie by checking whether array includes an empty
    // square
    function checkTie() {
        return !Object.values(array).includes('')
    }

    return {
        newBoard,
        markSquare,
        checkSquareEmpty,
        checkWin,
        checkTie
    }
})();

//////// GAME CONTROLLER MODULE ////////
const gameController = (function () {
    // Game status
    let game_over = false;

    // Current player
    let current_player = players.X;

    // Event Listeners
    DOMElements.s00.addEventListener('click', function () {
        _playRound('s00', current_player);
    });
    DOMElements.s01.addEventListener('click', function () {
        _playRound('s01', current_player);
    });
    DOMElements.s02.addEventListener('click', function () {
        _playRound('s02', current_player);
    });
    DOMElements.s10.addEventListener('click', function () {
        _playRound('s10', current_player);
    });
    DOMElements.s11.addEventListener('click', function () {
        _playRound('s11', current_player);
    });
    DOMElements.s12.addEventListener('click', function () {
        _playRound('s12', current_player);
    });
    DOMElements.s20.addEventListener('click', function () {
        _playRound('s20', current_player);
    });
    DOMElements.s21.addEventListener('click', function () {
        _playRound('s21', current_player);
    });
    DOMElements.s22.addEventListener('click', function () {
        _playRound('s22', current_player);
    });
    DOMElements.new_game.addEventListener('click', _newGame)

    // Resets the game status and clears the board
    function _newGame() {
        game_over = false;
        current_player = players.X;
        DOMElements.playerX.classList.add('is-turn');
        DOMElements.playerO.classList.remove('is-turn');
        DOMElements.playerX.classList.remove('is-winner');
        DOMElements.playerO.classList.remove('is-winner');
        gameBoard.newBoard();
    }

    // Play round loop
    function _playRound(square, player) {
        // Only continue playing the round if game_over is false
        if (!game_over) {
            // Check that the square is empty before marking it
            if (gameBoard.checkSquareEmpty(square)) {
                // Mark the selected square with the player's symbol
                gameBoard.markSquare(square, player.symbol);
                // Check for a win
                if (gameBoard.checkWin(player.symbol)) {
                    console.log(`${player.name} wins!`);
                    player.classList.add('is-winner')
                    game_over = true;
                    return;
                }
                // Check for a tie
                if (gameBoard.checkTie()) {
                    console.log('Tie!');
                    game_over = true;
                    return;
                }
                // Flip current player to other player
                _flipPlayer();
            }
        }
    }

    // Flip the current_player
    function _flipPlayer() {
        if (current_player === players.X) {
            current_player = players.O;
        }
        else {
            current_player = players.X;
        }
        DOMElements.playerX.classList.toggle('is-turn');
        DOMElements.playerO.classList.toggle('is-turn');
    }

    return {
        // No public functions
    };
})();



//////// ON LOAD ////////
