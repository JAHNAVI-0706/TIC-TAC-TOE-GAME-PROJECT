const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const gameBoard = document.getElementById('gameboard');

let oTurn;

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusText.innerText = `X's turn`;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        statusText.innerText = `${oTurn ? "O's" : "X's"} turn`;
    }
}

function endGame(draw) {
    if (draw) {
        statusText.innerText = 'Draw!';
    } else {
        statusText.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(O_CLASS);
    if (oTurn) {
        gameBoard.classList.add(O_CLASS);
    } else {
        gameBoard.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
} 