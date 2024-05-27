import * as Firebase from "../../firebase/firebase.js";
import * as Utils from "../../util.js";
import * as Host from "./join-host/host.js";
import * as Join from "./join-host/join.js";

const GAME = 'tiktaktoe';

initMultiPlayer();

function initMultiPlayer() {
    Utils.saveToStorage('state', 'NP');
    bindEvents();
    setupTTT();
    updateData();
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
    document.querySelector('.host').addEventListener('click', Host.host);

    document.querySelector('.join').addEventListener('click', Join.join);
}

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

export {updateData, GAME};