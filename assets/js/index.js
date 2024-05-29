import * as GameHandler from "./main-page/handler.js";


init();

function init(){
    bindEvents();
}

function bindEvents(){
    document.querySelectorAll('a').forEach($article => {
        $article.addEventListener('click', GameHandler.gameHandler);
    });

    document.querySelector('#rainbow').addEventListener('click', (e) => e.preventDefault() );
}

