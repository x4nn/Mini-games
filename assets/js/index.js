import { gameHandler} from "./utils/handler.js";

init();

function init(){
    //bindEvents();
}

function bindEvents(){
    document.querySelectorAll('article').forEach($article => {
        $article.addEventListener('click', gameHandler);
    });
}