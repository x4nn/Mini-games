<<<<<<< HEAD
import { gameHandler} from "./utils/handler.js";

init();

function init(){
    bindEvents();
}

function bindEvents(){
    document.querySelectorAll('article').forEach($article => {
        $article.addEventListener('click', gameHandler);
    });
=======
import { gameHandler} from "./utils/handler.js";

init();

function init(){
    bindEvents();
}

function bindEvents(){
    document.querySelectorAll('article').forEach($article => {
        $article.addEventListener('click', gameHandler);
    });
>>>>>>> 7b6d874 (made tiktaktoe responsiver for phone)
}