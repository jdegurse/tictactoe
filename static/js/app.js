//////// DOM ELEMENTS MODULE ////////
const DOMElements = (function () {
    return {
        playerX: document.getElementById('playerX'),
        playerO: document.getElementById('playerO'),
        warn_win: document.getElementById('warn-win'),
        warn_tie: document.getElementById('warn-tie'),
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

//////// WARNING BOX MODULE ////////
const warningBox = (function () {
    // Hide all warnings
    function hideWarns() {
        DOMElements.warn_win.classList.add('invisible');
        DOMElements.warn_tie.classList.add('invisible');
    }

    // Display win warning box
    function displayWin(winner) {
        // winner is the player's name
        DOMElements.warn_win.textContent = `${winner} wins!`
        DOMElements.warn_win.classList.remove('invisible');
    }

    // Display tie warning box
    function displayTie() {
        DOMElements.warn_tie.classList.remove('invisible');
    }
    return {
        hideWarns,
        displayWin,
        displayTie
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

    // Event Listeners
    DOMElements.s00.addEventListener('mouseover', function () {
        _mouseoverSymbol('s00', gameController.getCurrentPlayer());
    })
    DOMElements.s00.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s00');
    })
    DOMElements.s01.addEventListener('mouseover', function () {
        _mouseoverSymbol('s01', gameController.getCurrentPlayer());
    })
    DOMElements.s01.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s01');
    })
    DOMElements.s02.addEventListener('mouseover', function () {
        _mouseoverSymbol('s02', gameController.getCurrentPlayer());
    })
    DOMElements.s02.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s02');
    })
    DOMElements.s10.addEventListener('mouseover', function () {
        _mouseoverSymbol('s10', gameController.getCurrentPlayer());
    })
    DOMElements.s10.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s10');
    })
    DOMElements.s11.addEventListener('mouseover', function () {
        _mouseoverSymbol('s11', gameController.getCurrentPlayer());
    })
    DOMElements.s11.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s11');
    })
    DOMElements.s12.addEventListener('mouseover', function () {
        _mouseoverSymbol('s12', gameController.getCurrentPlayer());
    })
    DOMElements.s12.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s12');
    })
    DOMElements.s20.addEventListener('mouseover', function () {
        _mouseoverSymbol('s20', gameController.getCurrentPlayer());
    })
    DOMElements.s20.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s20');
    })
    DOMElements.s21.addEventListener('mouseover', function () {
        _mouseoverSymbol('s21', gameController.getCurrentPlayer());
    })
    DOMElements.s21.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s21');
    })
    DOMElements.s22.addEventListener('mouseover', function () {
        _mouseoverSymbol('s22', gameController.getCurrentPlayer());
    })
    DOMElements.s22.addEventListener('mouseleave', function () {
        _mouseoutSymbol('s22');
    })

    // Reset gameBoard array values to empty strings, then run _renderBoard to
    // clear the textContent of the board
    function newBoard() {
        for (const key of keys) {
            array[key] = '';
            DOMElements[key].classList.remove('win-line');
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
        DOMElements[key].style.color = 'black';
        _renderBoard();
    }

    // Check if the selected square is empty
    function checkSquareEmpty(key) {
        return array[key] === '';
    }

    // Check if there is a winner, returns boolean and highlights the win line
    function checkWin(symbol) {
        // top horizontal
        if (array.s00 === array.s01 && array.s00 === array.s02
            && array.s00 === symbol) {
            DOMElements.s00.classList.add('win-line');
            DOMElements.s01.classList.add('win-line');
            DOMElements.s02.classList.add('win-line');
            return true;
        }
        // middle horizontal
        else if (array.s10 === array.s11 && array.s10 === array.s12
            && array.s10 === symbol) {
            DOMElements.s10.classList.add('win-line');
            DOMElements.s11.classList.add('win-line');
            DOMElements.s12.classList.add('win-line');
            return true;
        }
        // bottom horizontal
        else if (array.s20 === array.s21 && array.s20 === array.s22
            && array.s20 === symbol) {
            DOMElements.s20.classList.add('win-line');
            DOMElements.s21.classList.add('win-line');
            DOMElements.s22.classList.add('win-line');
            return true;
        }
        // left vertical
        else if (array.s00 === array.s10 && array.s00 === array.s20
            && array.s00 === symbol) {
            DOMElements.s00.classList.add('win-line');
            DOMElements.s10.classList.add('win-line');
            DOMElements.s20.classList.add('win-line');
            return true;
        }
        // middle vertical
        else if (array.s01 === array.s11 && array.s01 === array.s21
            && array.s01 === symbol) {
            DOMElements.s01.classList.add('win-line');
            DOMElements.s11.classList.add('win-line');
            DOMElements.s21.classList.add('win-line');
            return true;
        }
        // right vertical
        else if (array.s02 === array.s12 && array.s02 === array.s22
            && array.s02 === symbol) {
            DOMElements.s02.classList.add('win-line');
            DOMElements.s12.classList.add('win-line');
            DOMElements.s22.classList.add('win-line');
            return true;
        }
        // top left to bottom right
        else if (array.s00 === array.s11 && array.s00 === array.s22
            && array.s00 === symbol) {
            DOMElements.s00.classList.add('win-line');
            DOMElements.s11.classList.add('win-line');
            DOMElements.s22.classList.add('win-line');
            return true;
        }
        // bottom left to top right
        else if (array.s20 === array.s11 && array.s20 === array.s02
            && array.s20 === symbol) {
            DOMElements.s20.classList.add('win-line');
            DOMElements.s11.classList.add('win-line');
            DOMElements.s02.classList.add('win-line');
            return true;
        }
        // no win
        else {
            return false;
        }
    }

    // Determine if there is a tie by checking whether array includes an empty
    // square
    function checkTie() {
        return !Object.values(array).includes('')
    }

    function _mouseoverSymbol(square, current_player) {
        if (array[square] === '' && !gameController.getGameOver()) {
            DOMElements[square].textContent =
                current_player.symbol.toUpperCase();
            DOMElements[square].style.color = 'rgba(0, 0, 0, 0.5)';
        }
    }

    function _mouseoutSymbol(square) {
        if (array[square] === '') {
            DOMElements[square].textContent = '';
            DOMElements[square].style.color = 'black';
        }
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
        warningBox.hideWarns();
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
                    warningBox.displayWin(player.name);
                    player.classList.add('is-winner');
                    game_over = true;
                    return;
                }
                // Check for a tie
                if (gameBoard.checkTie()) {
                    console.log('Tie!');
                    warningBox.displayTie();
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

    function getCurrentPlayer() {
        return current_player;
    }

    function getGameOver() {
        return game_over;
    }

    return {
        getCurrentPlayer,
        getGameOver
    };
})();
