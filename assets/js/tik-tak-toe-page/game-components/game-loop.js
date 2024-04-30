import { getLetterClass, getMovingPlayer, switchMovingPlayer } from "./config.js";

let WINNER = null;
const winningLine = `<img src="assets/media/tik-tak-toe/winnin-line.png" alt="winning-line" class="">`;
const BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function move(e) {
    const movingPlayer = getMovingPlayer();

    if (clickedOnEmptySquare(e.target)) {
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
        setTimeout(gameOver, 1750);
    } else if (boardIsFull()) {
        switchMovingPlayer(true);
        gameOver();
    }

}//todo fix bug wanneer de laatste zet de winnende zet is

function renderCurrentPlayer() {
    const player = getMovingPlayer();
    const $span = document.querySelector('#curPlayer span');

    $span.innerHTML = player;
}

function clickedOnEmptySquare(square) {
    return square.classList.value === '';
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
    if (checkDiagonals() === "leftup") {
        markDiagonalWin(0);
        WINNER = getMovingPlayer();
    } else if (checkDiagonals() === "rightup"){
        markDiagonalWin(1);
        WINNER = getMovingPlayer();
    }
}

function checkDiagonals() {
    if (BOARD[0][0] === BOARD[1][1] && BOARD[1][1] === BOARD[2][2] && BOARD[1][1] !== null){
        return "leftup";
    }
    if (BOARD[0][2] === BOARD[1][1] && BOARD[1][1] === BOARD[2][0] && BOARD[1][1] !== null) {
        return "rightup";
    }
}

function markVerticalWinningSquares(i) {
    const $line = document.querySelector('img.hidden');

    $line.classList.remove('hidden');
    $line.classList.add(`winVer${i}`);
}

function markHorizontalWin(i) {
    const $line = document.querySelector('img.hidden');

    $line.classList.remove('hidden');
    $line.classList.add(`winHor${i}`);
}

function markDiagonalWin(i) {
    const $line = document.querySelector('img');

    $line.classList.remove('hidden');

    if (i === 0) {
        $line.classList.add('winDiaLeft');        
    } else {
    
        $line.classList.add('winDiaRight');
    }
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
    document.querySelector('main').classList.add('hidden');
    document.querySelector('footer').classList.remove('hidden');

    document.querySelector('header').style.filter = 'blur(3px)';
    document.querySelector('.board').style.filter = 'blur(2px)';

    const board = document.querySelector('section');
    board.classList.add('gameover');
    document.querySelector('footer').insertAdjacentHTML("afterbegin", board.outerHTML)
}

export { move };