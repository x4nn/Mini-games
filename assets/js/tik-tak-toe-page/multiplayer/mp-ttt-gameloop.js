import * as Firebase from "../../firebase/firebase.js";

const GAME_CODE = sessionStorage.getItem('code');
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
        const gameInfo = data.data.tiktaktoe[GAME_CODE];

        console.log(gameInfo);
        
        const activePlayer = gameInfo.currentMovePlayer;

        console.log(USERNAME, activePlayer);

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
    // gameloop();
}

export {startGame};