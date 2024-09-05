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

let isCircleTurn;
let gameActive = false; // To ensure the game starts only when clicked

startButton.addEventListener('click', startGame);

function startGame() {
    isCircleTurn = false; // X starts the game
    gameActive = true; // Enable the game
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    board.classList.remove('hidden'); // Show the board
    board.style.display = 'grid'; // Ensure board is visible
    winningMessageTextElement.textContent = ''; // Clear previous game message
    startButton.style.display = 'none'; // Hide the start button during the game
}

function handleClick(e) {
    if (!gameActive) return; // Ensure clicks only work when the game is active
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x'; // X or O turn
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

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('circle');
    if (isCircleTurn) {
        board.classList.add('circle'); // Set O's hover effect
    } else {
        board.classList.add('x'); // Set X's hover effect
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function endGame(draw) {
    gameActive = false; // Stop game from continuing
    if (draw) {
        winningMessageTextElement.textContent = "It's a Draw! Restarting...";
        setTimeout(startGame, 2000); // Automatically restart after 2 seconds
    } else {
        winningMessageTextElement.textContent = `${isCircleTurn ? "O's" : "X's"} Win!`;
        askForPlayAgain();
    }
}

function askForPlayAgain() {
    setTimeout(() => {
        if (confirm("Do you want to play again?")) {
            startGame();
        } else {
            winningMessageTextElement.textContent = "Game Over!";
            startButton.style.display = 'block'; // Show start button again if game ends
        }
    }, 500);
}
