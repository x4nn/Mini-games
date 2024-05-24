import { move } from "./game-components/game-loop.js";

initTikTakToe();

function initTikTakToe(){
    console.log('tiktak go!');
    setupNewGame();
    bindEevents();
}

function setupNewGame(){
    document.querySelector('.playing-game').classList.remove('hidden');
    document.querySelector('footer').classList.add('hidden');
}

function bindEevents() {
    document.querySelectorAll('div').forEach($div => {
        $div.addEventListener('click', move);
    });
}