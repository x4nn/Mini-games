import { getLetterClass, getMovingPlayer, switchMovingPlayer } from "./config.js";

let WINNER = null;
const BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function move(e){
    const movingPlayer = getMovingPlayer();

    if (clickedOnEmptySquare(e.target)){
        renderLetter(e.target, getLetterClass(movingPlayer));
        updateBoard(e.target.dataset.idx);
        updateWinner();

        switchMovingPlayer(false);
        renderCurrentPlayer();
    }

    if (WINNER !== null){
        document.querySelectorAll('div').forEach($div => {
            $div.removeEventListener('click', move);
        });
        switchMovingPlayer();
        showWinnigLine();
        setTimeout(gameOver, 500);
    }

    if (boardIsFull()){
        switchMovingPlayer(true);
        gameOver();
    }
    
}//todo fix bug wanneer de laatste zet de winnende zet is

function renderCurrentPlayer(){
    const player = getMovingPlayer();
    const $span = document.querySelector('#curPlayer span');

    $span.innerHTML = player;
}

function clickedOnEmptySquare(square){
    return square.classList.value === '';
}

function renderLetter(location, letter){
    location.classList.add(letter);
}

function updateBoard(idx){
    for (let i = 0; i < BOARD.length; i++) {
        for (let j = 0; j < BOARD[i].length; j++) {
            if (i * BOARD.length + j === parseInt(idx)){
                addToBoard(i, j);
            }
        }
    }
}

function addToBoard(i, j){
    const movingPlayer = getMovingPlayer();
    
    if (movingPlayer === 'p1'){
        BOARD[i][j] = 'X';
    } else {
        BOARD[i][j] = 'O';
    }
}

function updateWinner(){
    checkHorizontal();
    checkVertical();
    checkDiagonal();
}

function checkHorizontal(){
    for (let i = 0; i < BOARD.length; i++) {
        let xCounter = 0;
        let oCounter = 0;

        for (let j = 0; j < BOARD[i].length; j++) {
            if (BOARD[i][j] === 'X'){
                xCounter++;
            } else if (BOARD[i][j] === 'O') {
                oCounter++;
            }

            if (xWonHorizontal(xCounter)) {
                WINNER = 'p1';
            } else if (oWonHorizontal(oCounter)) {
                WINNER = 'p2';
            }
        }
    }
}

function xWonHorizontal(count){
    return count === 3;
}

function oWonHorizontal(count){
    return count === 3;
}

function checkVertical(){
    for (let i = 0; i < BOARD.length; i++) {
        if (checkColumns(i)) {
            WINNER = getMovingPlayer();
            markVerticalWinningSquares(i);
        }
    }
}

function checkColumns(i){
    return BOARD[0][i] === BOARD[1][i] && BOARD[1][i] === BOARD[2][i] && BOARD[0][i] !== null;
}

function checkDiagonal(){
    for (let i = 0; i < BOARD.length; i++) {
        if (checkDiagonals()) {
            WINNER = getMovingPlayer();
        }
    }
}

function checkDiagonals(){
    return ((BOARD[0][0] === BOARD[1][1] && BOARD[1][1] === BOARD[2][2]) ||(BOARD[0][2] === BOARD[1][1] && BOARD[1][1] === BOARD[2][0])) && BOARD[1][1] !== null;
}

function markVerticalWinningSquares(i){
    const $allSquares = document.querySelectorAll('div');
    
    $allSquares[i].classList.add('win');
    $allSquares[i+3].classList.add('win');
    $allSquares[i+6].classList.add('win');
}

function boardIsFull(){
    let filledSquares = 0;

    for (const row of BOARD) {
        for (const col of row) {
            if (col){
                filledSquares++;
            }
        }
    }

    return filledSquares === 9;
}

function showWinnigLine(){
    const winningDivs = getWinnigDivs();
}

function getWinnigDivs(){

}

function gameOver(){
    document.querySelector('#winner').innerHTML = getMovingPlayer();

    document.querySelector('main').classList.add('hidden');
    document.querySelector('footer').classList.remove('hidden');
}

export {move};