import * as Firebase from "../../firebase/firebase.js";

const GAME = 'tiktaktoe';
const USERNAME = JSON.parse(sessionStorage.getItem('username'));

function startGame(){
    console.log('started');
    gameloop();
}

function enableMove() {
    document.querySelectorAll('.cell').forEach($div => {
        $div.addEventListener('click', move);
    });
}

function unableMove() {
    document.querySelectorAll('.cell').forEach($div => {
        $div.removeEventListener('click', move);
    });
}

///data.data.tiktaktoe[code]: da is de game info
function gameloop(){
    Firebase.getData().then(data => {
        const gameInfo = data.data.tiktaktoe[sessionStorage.getItem('code')];

        console.log(gameInfo);
        
        const activePlayer = gameInfo.currentMovePlayer;

        if (USERNAME === activePlayer) {
            enableMove();
        } else {
            unableMove();
            setTimeout(gameloop, 2000);
        }
    });
}

function move(e) {
    e.preventDefault();
    console.log('moved');

    if (clickedOnEmptySquare(e.target)) {
        console.log('empty');
        // renderLetter(e.target, getLetterClass(movingPlayer));
        // updateBoard(e.target.dataset.idx);
        // updateWinner();

        // switchMovingPlayer(false);
        // renderCurrentPlayer();
    }

    const game =  JSON.parse(sessionStorage.getItem('data')).data[GAME][sessionStorage.getItem('code')];
    const players = JSON.parse(sessionStorage.getItem('data')).data[GAME][sessionStorage.getItem('code')].players;
    const nextPlayer = getNextPlayer(players);

    game.currentMovePlayer = nextPlayer;

    Firebase.updateGame(GAME, sessionStorage.getItem('code'), game);
    // gameloop();
}

function clickedOnEmptySquare(square) {
    return square.classList.contains('cell') && !square.classList.contains('X') && !square.classList.contains('O');
}

function getNextPlayer(players){
    for (const player of players) {
        if (player.pname !== USERNAME) {
            return player.pname;
        }
    }
    return 'null';
}

export {startGame};