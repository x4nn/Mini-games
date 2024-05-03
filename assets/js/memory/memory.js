import { fillRandom, coverCards } from "./board-filler/filler.js";
import { turnHandler } from "./game-loop/play.js";

const TILE_AMT = 16;

init();

function init(){
    addSquares();
    refreshBoard();
    bindEvents();
}

function refreshBoard(){
    fillRandom();
    coverCards();
}

function addSquares(){
    const board = document.querySelector('#board');
    
    for (let i = 0; i < TILE_AMT; i++) {
        const tile = `<div class="card" data-idx="${i}"></div>`;
        board.insertAdjacentHTML('beforeend', tile);
    }
}

function bindEvents(){
    document.querySelectorAll('img[alt="cover"]').forEach(img => {
        img.addEventListener('click', turnHandler);
    });
}

export { refreshBoard, TILE_AMT };