const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.getElementById('winningMessage');
const startButton = document.getElementById('startButton');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let isCircleTurn = true; // O starts the game

// Start the game when the button is clicked
startButton.addEventListener('click', startGame);

function startGame() {
    isCircleTurn = true; // O always starts
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    board.classList.remove('hidden'); // Show the board
    winningMessageTextElement.textContent = ''; // Clear the win message
    startButton.style.display = 'none'; // Hide the start button
}

// Handle a click event on a cell
function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x'; // Start with 'O' (circle)
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

// Place an 'X' or 'O' in the clicked cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// Swap turns between O and X
function swapTurns() {
    isCircleTurn = !isCircleTurn; // Alternate turns
}

// Set hover effect to show whose turn it is (O or X)
function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('circle');
    if (isCircleTurn) {
        board.classList.add('circle'); // O's turn
    } else {
        board.classList.add('x'); // X's turn
    }
}

// Check for a win
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Check for a draw (if all cells are filled)
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

// End the game (either win or draw)
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = "It's a Draw! Restarting...";
        setTimeout(startGame, 2000); // Automatically restart after 2 seconds
    } else {
        winningMessageTextElement.textContent = `${isCircleTurn ? "O's" : "X's"} Win!`;
        askForPlayAgain();
    }
}

// Ask if the player wants to play again after a win
function askForPlayAgain() {
    setTimeout(() => {
        if (confirm("Do you want to play again?")) {
            startGame();
        } else {
            winningMessageTextElement.textContent = "Game Over!";
            startButton.style.display = 'block'; // Show start button again
        }
    }, 500);
}
