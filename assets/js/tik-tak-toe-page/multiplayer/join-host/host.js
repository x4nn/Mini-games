import * as Utils from "../../../util.js";
import * as Firebase from "../../../firebase/firebase.js";
import * as Gameloop from "../mp-ttt-gameloop.js";
import * as TTT from "../mp-ttt.js";

let GAME_CODE = null;
const USERNAME = JSON.parse(sessionStorage.getItem('username'));
const waitinPage = document.querySelector('#wfp');

function host(e) {
    e.preventDefault();
    Utils.deleteFromStorage('state');

    if (isReadyToPlay()) {
        const gameName = document.querySelector('#gamename').value;
        const code = Utils.generateRandomCode(USERNAME, gameName).toLowerCase();

        Firebase.AddNewGame(TTT.GAME, gameName, USERNAME, code);
        renderCode(code);
        navigate(e);
        GAME_CODE = code;
        waitForStart();
    }
}

function navigate(e) {
    const nextSection = e.target.dataset.next;
    const currentPage = e.target.parentElement.parentElement;

    Utils.navigateTo(currentPage, nextSection);
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
        const gameInfo = data.data[TTT.GAME][GAME_CODE];

        if (gameInfo.gameStatus === 'started') {
            setupForStart();
            Gameloop.startGame();
        } else {
            setTimeout(waitForStart, 1000);
        }

    });
}

function setupForStart() {
    Utils.navigateTo(waitinPage, 'playing-game');
    sessionStorage.setItem('code', GAME_CODE);
    TTT.updateData();
}

export {host};