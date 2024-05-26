import { deleteGame, getData } from "../firebase/firebase.js";
import { loadFromStorage, saveToStorage } from "../util.js";

init();

function init(){
    getData().then(data => saveToStorage('data', data));
    document.querySelector('button').addEventListener('click', () => {
        const games = loadFromStorage('data').data.tiktaktoe;

        for (const code in games) {
            if (code !== 'xxxx') {
                deleteGame('tiktaktoe', code);
            }
        }
    });
}