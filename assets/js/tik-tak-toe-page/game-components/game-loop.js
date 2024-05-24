import { getLetterClass, getMovingPlayer, switchMovingPlayer } from "./config.js";

let WINNER = null;
const BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function move(e) {
    const movingPlayer = getMovingPlayer();

    if (clickedOnEmptySquare(e.target)) {
        console.log(movingPlayer);
        renderLetter(e.target, getLetterClass(movingPlayer));
        updateBoard(e.target.dataset.idx);
        updateWinner();

        switchMovingPlayer(false);
        renderCurrentPlayer();
    }

    if (WINNER !== null) {
        document.querySelectorAll('div').forEach($div => {
            $div.removeEventListener('click', move);
        });
        switchMovingPlayer();
        setTimeout(gameOver, 500);
    } else if (boardIsFull()) {
        switchMovingPlayer(true);
        gameOver();
    }

}

function renderCurrentPlayer() {
    const player = getMovingPlayer();
    const $span = document.querySelector('#curPlayer span');

    $span.innerHTML = player;
}

function clickedOnEmptySquare(square) {
    return square.classList.contains('cell') && !square.classList.contains('X') && !square.classList.contains('O');
}

function renderLetter(location, letter) {
    location.classList.add(letter);
}

function updateBoard(idx) {
    for (let i = 0; i < BOARD.length; i++) {
        for (let j = 0; j < BOARD[i].length; j++) {
            if (i * BOARD.length + j === parseInt(idx)) {
                addToBoard(i, j);
            }
        }
    }
}

function addToBoard(i, j) {
    const movingPlayer = getMovingPlayer();

    if (movingPlayer === 'p1') {
        BOARD[i][j] = 'X';
    } else {
        BOARD[i][j] = 'O';
    }
}

function updateWinner() {
    checkHorizontal();
    checkVertical();
    checkDiagonal();
}

function checkHorizontal() {
    for (let i = 0; i < BOARD.length; i++) {
        let xCounter = 0;
        let oCounter = 0;

        for (let j = 0; j < BOARD[i].length; j++) {
            if (BOARD[i][j] === 'X') {
                xCounter++;
            } else if (BOARD[i][j] === 'O') {
                oCounter++;
            }

            if (xWonHorizontal(xCounter)) {
                markHorizontalWin(i);
                WINNER = 'p1';/*getMovingPlayer()?? */
            } else if (oWonHorizontal(oCounter)) {
                markHorizontalWin(i);
                WINNER = 'p2';/*getMovingPlayer()?? */
            }
        }
    }
}

function xWonHorizontal(count) {
    return count === 3;
}

function oWonHorizontal(count) {
    return count === 3;
}

function checkVertical() {
    for (let i = 0; i < BOARD.length; i++) {
        if (checkColumns(i)) {
            WINNER = getMovingPlayer();
            markVerticalWinningSquares(i);
        }
    }
}

function checkColumns(i) {
    return BOARD[0][i] === BOARD[1][i] && BOARD[1][i] === BOARD[2][i] && BOARD[0][i] !== null;
}

function checkDiagonal() {
    if (checkDiagonals() === "leftup" || checkDiagonals() === "rightup") {
        WINNER = getMovingPlayer();
    }
}

function checkDiagonals() {
    if (BOARD[0][0] === BOARD[1][1] && BOARD[1][1] === BOARD[2][2] && BOARD[1][1] !== null){
        markDiagonalWin(0, 4, 8);
        return "leftup";
    }
    if (BOARD[0][2] === BOARD[1][1] && BOARD[1][1] === BOARD[2][0] && BOARD[1][1] !== null) {
        markDiagonalWin(2, 4, 6);
        return "rightup";
    }
}

function markVerticalWinningSquares(i) {
    const $allSquares = document.querySelectorAll('div');

    $allSquares[i].classList.add('win');
    $allSquares[i + 3].classList.add('win');
    $allSquares[i + 6].classList.add('win');
}

function markHorizontalWin(i) {
    const $allSquares = document.querySelectorAll('.cell');

    $allSquares[i * 3].classList.add('win');
    $allSquares[i * 3 + 1].classList.add('win');
    $allSquares[i * 3 + 2].classList.add('win');
}

function markDiagonalWin(i1, i2, i3) {
    const $allSquares = document.querySelectorAll('div');

    $allSquares[i1].classList.add('win');
    $allSquares[i2].classList.add('win');
    $allSquares[i3].classList.add('win');
}

function boardIsFull() {
    let filledSquares = 0;

    for (const row of BOARD) {
        for (const col of row) {
            if (col) {
                filledSquares++;
            }
        }
    }

    return filledSquares === 9;
}

function gameOver() {
    document.querySelector('.playing-game').classList.add('hidden');
    document.querySelector('footer').classList.remove('hidden');

    document.querySelector('header').style.filter = 'blur(3px)';
    document.querySelector('.board').style.filter = 'blur(2px)';

    const board = document.querySelector('section');
    board.classList.add('gameover');
    document.querySelector('footer').insertAdjacentHTML("afterbegin", board.outerHTML);
    fillWinSquares();
}

function fillWinSquares(){
    const $allSquares = document.querySelectorAll('div');

    for (const square of $allSquares) {
        if (square.classList.contains('win')) {
            square.classList.add('win-gameover');
        } else {
            square.style.border = "0";
        }
    }
}

export { move };