import { gameHandler} from "./utils/handler.js";

init();

function init(){
    bindEvents();
}

function bindEvents(){
    document.querySelectorAll('a').forEach($article => {
        $article.addEventListener('click', gameHandler);
    });

    document.querySelector('#rainbow').addEventListener('click', (e) => e.preventDefault() );
}

