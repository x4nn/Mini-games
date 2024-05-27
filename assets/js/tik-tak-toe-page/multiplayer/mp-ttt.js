import * as Firebase from "../../firebase/firebase.js";
import * as Utils from "../../util.js";
import * as Gameloop from "./mp-ttt-gameloop.js";
import {host} from "./host/host.js";

const GAME = 'tiktaktoe';
// let GAME_CODE = null;
const USERNAME = JSON.parse(sessionStorage.getItem('username'));
// const waitinPage = document.querySelector('#wfp');

initMultiPlayer();

function initMultiPlayer() {
    Utils.saveToStorage('state', 'NP');
    bindEvents();
    setupTTT();
    updateData();
    console.log(getData());
}

function updateData(){
    getData();
    if (Utils.loadFromStorage('state') === 'NP') {
        setTimeout(updateData, 2000);
    }
}

function setupTTT(){
    document.querySelector('#lobby').classList.remove('hidden');
    document.querySelector('#wfp').classList.add('hidden');
    document.querySelector('#playing-game').classList.add('hidden');
    document.querySelector('footer').classList.add('hidden');
}

function bindEvents() {
    document.querySelector('.host').addEventListener('click', host);

    document.querySelector('.join').addEventListener('click', (e) => {
        e.preventDefault();

        Utils.deleteFromStorage('state');

        const data = getData();
        const code = document.querySelector('#gamename').value;

        if (gameExists(data, code)) {
            sessionStorage.setItem('code', code);
            joinGame(code);
        } else {
            renderNonExistingGameError();
        }

    });
}

// function waitForStart() {
//     Firebase.getData().then(data => {
//         // console.log('current page:', currentPage);
//
//         const gameInfo = data.data[GAME][GAME_CODE];
//
//         if (gameInfo.gameStatus === 'started') {
//             navigateTo(waitinPage, 'playing-game');
//             sessionStorage.setItem('code', GAME_CODE);
//             updateData();
//             Gameloop.startGame();
//         } else {
//             setTimeout(waitForStart, 1000);
//         }
//
//     });
// }

function joinGame(code){

    const game = Utils.loadFromStorage('data').data[GAME][code];

    const thisUser = {
        pname: USERNAME,
        pion: 'O',
        status: 'playing'
    };

    game.gameStatus = 'started';

    game.players[0].status = 'playing';
    game.players.push(thisUser);


    Firebase.updateGame(GAME, code, game);

    Utils.navigateTo(document.querySelector('#lobby'), 'playing-game');

    updateData();
    setTimeout(Gameloop.startGame, 3000);
}

function renderNonExistingGameError(){
    const $label = document.querySelector('#lobby label');
    $label.classList.remove('hidden');
}

function gameExists(data, code) {
    const games = data.data[GAME];

    for (const name in games) {
        if (name === code) {
            return true;
        }
    }

    return false;
}

// function renderCode(code){
//     const $span = document.querySelector('#code');
//     $span.innerHTML = code;
// }

// function isReadyToPlay() {
//     return document.querySelector('#gamename').value !== '';
// }

function getData(){
    putDataInStorage();
    return Utils.loadFromStorage('data');
}

function putDataInStorage(){
    Firebase.getData().then(data => {
        Utils.deleteFromStorage('data');
        Utils.saveToStorage('data', data);
    });
}

// function navigateTo(current, next){
//     Utils.toggleHidden(current);
//
//     const nextElem = document.querySelector(`#${next}`);
//
//     Utils.toggleHidden(nextElem);
// }
export {updateData};