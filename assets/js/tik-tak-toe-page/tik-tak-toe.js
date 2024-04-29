import { move } from "./game-components/game-loop.js";

initTikTakToe();

function initTikTakToe(){
    console.log('tiktak go!');
    setupNewGame();
    bindEevents();
}

function setupNewGame(){
    document.querySelector('main').classList.remove('hidden');
    document.querySelector('footer').classList.add('hidden');
}

function bindEevents() {
    document.querySelector('img[alt="back"]').addEventListener('click', e => {
        window.location.href = 'index.html';
    })

    document.querySelectorAll('div').forEach($div => {
        $div.addEventListener('click', move);
    });
}