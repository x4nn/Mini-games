import * as Firebase from "../../firebase/firebase.js";
import { deleteFromStorage, loadFromStorage, saveToStorage, toggleHidden } from "../../util.js";


initMultiPlayer();

function initMultiPlayer() {
    bindEvents();
    setupTTT();
    console.log(getData());
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

        if (isReadyToHost()) {
            //todo waiting for players screentje mss
            const gameName = document.querySelector('#gamename').value;
            const name = document.querySelector('#username').value;

            Firebase.AddNewGame('tiktaktoe', gameName, name);

            const nextSection = e.target.dataset.next;

            navigateTo(e.target.parentElement.parentElement, nextSection);
        }

    });

    document.querySelector('.join').addEventListener('click', (e) => {
        e.preventDefault();

        if (isReadyToHost()) {
            //vind game en join oulleh
        }

    });
}

function isReadyToHost() {
    return document.querySelector('#username').value !== '' && document.querySelector('#gamename').value !== '';
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

