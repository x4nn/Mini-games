import { loadFromStorage, saveToStorage, toggleHidden } from "../util.js";

function gameHandler(e) {
    e.preventDefault();

    if (isReadyToPlay()) {
        const game = e.target.id;
        const username = document.querySelector('#username').value;
        saveToStorage('username', username);

        if (game === 'tik-tak-toe') {
            window.location.href = 'tik-tak-toe';
        } else if (game === 'memory') {
            window.location.href = 'memory';
        }

    } else {
        renderNoUserNameError();
    }


    //add de rest wanneer de vorige klaar is i guess
}

function renderNoUserNameError(){
    toggleHidden(document.querySelector('label'));
}

function isReadyToPlay() {
    return document.querySelector('#username').value !== '';
}

export { gameHandler };