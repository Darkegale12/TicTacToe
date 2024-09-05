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

startButton.addEventListener('click', startGame);

function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    board.classList.remove('hidden'); // Show the board
    winningMessageTextElement.textContent = '';
    startButton.style.display = 'none';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
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
        board.classList.add('circle');
    } else {
        board.classList.add('x');
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
            startButton.style.display = 'block';
        }
    }, 500);
}

