import * as Firebase from "../../firebase/firebase.js";
import { deleteFromStorage, generateRandomCode, loadFromStorage, saveToStorage, toggleHidden } from "../../util.js";

const GAME = 'tiktaktoe';
const USERNAME = JSON.parse(sessionStorage.getItem('username'));

initMultiPlayer();

function initMultiPlayer() {
    saveToStorage('state', 'NP');
    bindEvents();
    setupTTT();
    updateData();
    console.log(getData());
}

function updateData(){
    getData();
    if (loadFromStorage('state') === 'NP') {
        setTimeout(updateData, 3000);
    }
}

function setupTTT(){
    document.querySelector('#lobby').classList.remove('hidden');
    document.querySelector('#wfp').classList.add('hidden');
    document.querySelector('#playing-game').classList.add('hidden');
    document.querySelector('footer').classList.add('hidden');
}

function bindEvents() {
    document.querySelector('.host').addEventListener('click', (e) => {
        e.preventDefault();

        deleteFromStorage('state');

        if (isReadyToPlay()) {
            const gameName = document.querySelector('#gamename').value;
            const name = USERNAME;
            const code = generateRandomCode(name, gameName).toLowerCase();

            Firebase.AddNewGame(GAME, gameName, name, code);

            const nextSection = e.target.dataset.next;

            renderCode(code);

            const currentPage = e.target.parentElement.parentElement;

            navigateTo(currentPage, nextSection);

            waitForStart(code, currentPage);
        }

    });

    document.querySelector('.join').addEventListener('click', (e) => {
        e.preventDefault();

        deleteFromStorage('state');

        const data = getData();
        const code = document.querySelector('#gamename').value;

        if (gameExists(data, code)) {
            joinGame(code);
        } else {
            renderNonExistingGameError();
        }

    });
}

function startGame(){
    console.log('started');
}

function waitForStart(code, currentPage){
    Firebase.getData().then(data => {
        const gameInfo = data.data[GAME][code];

        if (gameInfo.gameStatus === 'started') {
            navigateTo(currentPage, 'playing-game');
            startGame();
        } else {
            setTimeout(waitForStart, 1000);
        }

    });

    
}

function joinGame(code){

    const game = loadFromStorage('data').data[GAME][code];

    const thisUser = {
        pname: USERNAME,
        status: 'playing'
    };

    game.gameStatus = 'started';

    game.players[0].status = 'playing';
    game.players.push(thisUser);


    Firebase.updateGame(GAME, code, game);

    navigateTo(document.querySelector('#lobby'), 'playing-game');
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

function renderCode(code){
    const $span = document.querySelector('#code');
    $span.innerHTML = code;
}

function isReadyToPlay() {
    return document.querySelector('#gamename').value !== '';
}

function getData(){
    putDataInStorage();
    return loadFromStorage('data');
}

function putDataInStorage(){
    Firebase.getData().then(data => {
        deleteFromStorage('data');
        saveToStorage('data', data);
    });
}

function navigateTo(current, next){
    toggleHidden(current);

    const nextElem = document.querySelector(`#${next}`);

    toggleHidden(nextElem);
}

