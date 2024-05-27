import * as Utils from "../../../util.js";
import * as Firebase from "../../../firebase/firebase.js";
import * as Gameloop from "../mp-ttt-gameloop.js";
import * as TTT from "../mp-ttt.js";

const GAME = 'tiktaktoe';
let GAME_CODE = null;
const USERNAME = JSON.parse(sessionStorage.getItem('username'));
const waitinPage = document.querySelector('#wfp');

function host(e) {
    e.preventDefault();

    Utils.deleteFromStorage('state');

    if (isReadyToPlay()) {
        const gameName = document.querySelector('#gamename').value;
        const name = USERNAME;
        const code = Utils.generateRandomCode(name, gameName).toLowerCase();

        Firebase.AddNewGame(GAME, gameName, name, code);

        const nextSection = e.target.dataset.next;

        renderCode(code);

        const currentPage = e.target.parentElement.parentElement;

        Utils.navigateTo(currentPage, nextSection);

        GAME_CODE = code;
        waitForStart();
    }
}

function isReadyToPlay() {
    return document.querySelector('#gamename').value !== '';
}

function renderCode(code){
    const $span = document.querySelector('#code');
    $span.innerHTML = code;
}

function waitForStart() {
    Firebase.getData().then(data => {
        // console.log('current page:', currentPage);

        const gameInfo = data.data[GAME][GAME_CODE];

        if (gameInfo.gameStatus === 'started') {
            Utils.navigateTo(waitinPage, 'playing-game');
            sessionStorage.setItem('code', GAME_CODE);
            TTT.updateData();
            Gameloop.startGame();
        } else {
            setTimeout(waitForStart, 1000);
        }

    });
}

export {host};