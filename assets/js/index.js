import { logData } from "./firebase/firebase.js";
import { gameHandler} from "./utils/handler.js";

init();

function init(){
    bindEvents();
    logData();
}

function bindEvents(){
    // document.querySelectorAll('article').forEach($article => {
    //     $article.addEventListener('click', gameHandler);
    // });

    document.querySelector('#rainbow').addEventListener('click', (e) => e.preventDefault() );
}