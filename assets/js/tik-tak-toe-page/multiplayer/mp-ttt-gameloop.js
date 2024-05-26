import * as Firebase from "../../firebase/firebase.js";

const GAME = 'tiktaktoe';
const USERNAME = JSON.parse(sessionStorage.getItem('username'));

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
        // updateWinner();

        // switchMovingPlayer(false);
        // renderCurrentPlayer();

    }


    const players = game.players;
    const nextPlayer = getNextPlayer(players);

    game.currentMovePlayer = nextPlayer;

    Firebase.updateGame(GAME, sessionStorage.getItem('code'), game);
    gameloop();
}

function refreshBoard(board){
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 'X') {
                //geef die indx op screen bord x class
                cells[i * board.length + j].classList.add('X');
            }
            if (board[i][j] === 'O') {
                //geef die indx op screen bord o class
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