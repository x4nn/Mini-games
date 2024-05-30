import { loadFromStorage, saveToStorage, toggleHidden } from "../util.js";

function handleHover(e) {
    if (e.type === 'mouseenter') {
        e.target.querySelector('p').classList.toggle('hidden');
    } else {
        e.target.querySelector('p').classList.toggle('hidden');
    }
}

function gameHandler(e) {
    e.preventDefault();

    const game = e.target.id;
    if (e.target.parentElement.parentElement.parentElement.id === 'online') {
        if (isReadyToPlay()) {
            const username = document.querySelector('#username').value;
            saveToStorage('username', username);

            if (game === 'tik-tak-toe') {
                window.location.href = 'tik-tak-toe';
            }

        } else {
            renderNoUserNameError();
        }
    }

    if (game === 'memory') {
        window.location.href = 'memory';
    }


    //add de rest wanneer de vorige klaar is i guess
}

function renderNoUserNameError() {
    document.querySelector('label').classList.remove('hidden');
}

function isReadyToPlay() {
    return document.querySelector('#username').value !== '';
}

export { gameHandler, handleHover };