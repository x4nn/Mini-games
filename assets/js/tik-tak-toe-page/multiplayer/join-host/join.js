import * as Utils from "../../../util.js";
import * as Firebase from "../../../firebase/firebase.js";
import * as Gameloop from "../mp-ttt-gameloop.js";
import * as TTT from "../mp-ttt.js";

const USERNAME = JSON.parse(sessionStorage.getItem('username'));

function join(e) {
    e.preventDefault();
    Utils.deleteFromStorage('state');

    const code = document.querySelector('#gamename').value;

    checkRealGame(code);
}

function checkRealGame(code) {
    Firebase.getData().then(data => {
        if (gameExists(data, code)) {
            sessionStorage.setItem('code', code);
            joinGame(code);
        } else {
            renderNonExistingGameError();
        }
    });
}

function joinGame(code){
    const game = Utils.loadFromStorage('data').data[TTT.GAME][code];
    const thisUser = {
        pname: USERNAME,
        pion: 'O',
        status: 'playing'
    };

    game.gameStatus = 'started';

    game.players[0].status = 'playing';
    game.players.push(thisUser);


    Firebase.updateGame(TTT.GAME, code, game);

    Utils.navigateTo(document.querySelector('#lobby'), 'playing-game');

    TTT.updateData();
    setTimeout(Gameloop.startGame, 3000);
}

function renderNonExistingGameError(){
    const $label = document.querySelector('#lobby label');
    $label.classList.remove('hidden');
}

function gameExists(data, code) {
    const games = data.data[TTT.GAME];

    for (const name in games) {
        if (name === code) {
            return true;
        }
    }

    return false;
}

export {join};