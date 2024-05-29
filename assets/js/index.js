import * as GameHandler from "./main-page/handler.js";
import * as Theme from "./main-page/theme.js";


init();

function init(){
    bindEvents();
}

function bindEvents(){
    document.querySelectorAll('a').forEach($article => {
        $article.addEventListener('click', GameHandler.gameHandler);
    });

    document.querySelector('#theme').addEventListener('click', Theme.nextThemeHome);
    // document.querySelector('#rainbow').addEventListener('click', (e) => e.preventDefault() );
}

