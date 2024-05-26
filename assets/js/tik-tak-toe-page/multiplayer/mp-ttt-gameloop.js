import * as Firebase from "../../firebase/firebase.js";

const GAME = 'tiktaktoe';
const USERNAME = JSON.parse(sessionStorage.getItem('username'));
let WINNER = null;

function startGame() {
    console.log('started');
    gameloop();
}

function enableMove() {
    document.querySelectorAll('.cell').forEach($div => {
        $div.addEventListener('click', move);
    });
}

function disableMove() {
    document.querySelectorAll('.cell').forEach($div => {
        $div.removeEventListener('click', move);
    });
}

///data.data.tiktaktoe[code]: da is de game info
function gameloop() {
    Firebase.getData().then(data => {
        sessionStorage.setItem('data', JSON.stringify(data));

        const gameInfo = data.data.tiktaktoe[sessionStorage.getItem('code')];
        const board = gameInfo.board;

        console.log(gameInfo);

        const activePlayer = gameInfo.currentMovePlayer;

        renderCurrentPlayer(activePlayer);

        if (USERNAME === activePlayer) {
            refreshBoard(board);
            enableMove();
        } else {
            setTimeout(gameloop, 2000);
        }
    });
}

function move(e) {
    console.log('moved');

    disableMove();
    const game = JSON.parse(sessionStorage.getItem('data')).data[GAME][sessionStorage.getItem('code')];
    let board = game.board;

    if (clickedOnEmptySquare(e.target)) {
        ///------------------------------
        renderLetter(e.target, getLetter());
        ///------------------------------
        const idx = e.target.dataset.idx;
        board = updatedBoard(board, getLetter(), idx);
        game.board = board;
        ///------------------------------
        checkForWinner(board);

        ///------------------------------
        const players = game.players;
        const nextPlayer = getNextPlayer(players);
        game.currentMovePlayer = nextPlayer;
        ///------------------------------
    }

    //TODO verander in backend dat de game gewonnen is, wanneer gameloop
    //TODO opnieuw gespeeld wordt, check je wie laatste zet heeft gedaan en die is winner

    Firebase.updateGame(GAME, sessionStorage.getItem('code'), game);
    console.log('winner:', WINNER);
    gameloop();
}

function renderCurrentPlayer(player) {
    const $span = document.querySelector('#curPlayer span');

    $span.innerHTML = player;
}

function checkForWinner(board) {
    checkHorizontal(board);
    checkVertical(board);
    checkDiagonal(board);
}

function checkDiagonal(board) {
    if (checkDiagonals(board) === "leftup" || checkDiagonals(board) === "rightup") {
        WINNER = USERNAME;
        console.log('winner');
    }
}

function checkDiagonals(board) {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== 'null'){
        markDiagonalWin(0, 4, 8);
        return "leftup";
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== 'null') {
        markDiagonalWin(2, 4, 6);
        return "rightup";
    }
}

function checkVertical(board) {
    for (let i = 0; i < board.length; i++) {
        if (checkColumns(board, i)) {
            console.log('winner');
            WINNER = USERNAME;
            markVerticalWinningSquares(i);
        }
    }
}

function checkColumns(board, i) {
    return board[0][i] !== 'null' && board[0][i] === board[1][i] && board[1][i] === board[2][i];
}

function checkHorizontal(board) {
    for (let i = 0; i < board.length; i++) {
        let xCounter = 0;
        let oCounter = 0;

        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 'X' ) {
                xCounter++;
            } else if (board[i][j] === 'O') {
                oCounter++;
            }

            // if (xWonHorizontal(xCounter) || oWonHorizontal(oCounter)) {
            //     markHorizontalWin(i);
            //     WINNER = USERNAME;
            //     console.log('winner');
            // }

            if (xWonHorizontal(xCounter)) {
                markHorizontalWin(i);
                WINNER = USERNAME;
                console.log('winner');
            } else if (oWonHorizontal(oCounter)) {
                markHorizontalWin(i);
                WINNER = USERNAME;
                console.log('winner');
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

function markVerticalWinningSquares(i) {
    const $allSquares = document.querySelectorAll('.cell');

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
    const $allSquares = document.querySelectorAll('.cell');

    $allSquares[i1].classList.add('win');
    $allSquares[i2].classList.add('win');
    $allSquares[i3].classList.add('win');
}

function refreshBoard(board){
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 'X') {
                cells[i * board.length + j].classList.add('X');
            }
            if (board[i][j] === 'O') {
                cells[i * board.length + j].classList.add('O');
            }
        }
    }
}

function updatedBoard(board, letter, idx) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (i * board.length + j === parseInt(idx)) {
                board[i][j] = letter;
            }
        }
    }
    return board;
}

function getLetter() {
    const players = JSON.parse(sessionStorage.getItem('data')).data[GAME][sessionStorage.getItem('code')].players;

    for (const player of players) {
        if (player.pname === USERNAME) {
            return player.pion;
        }
    }
    return null;
}

function renderLetter(location, letter) {
    location.classList.add(letter);
}

function clickedOnEmptySquare(square) {
    return square.classList.contains('cell') && !square.classList.contains('X') && !square.classList.contains('O');
}

function getNextPlayer(players) {
    for (const player of players) {
        if (player.pname !== USERNAME) {
            return player.pname;
        }
    }
    return 'null';
}

export { startGame };