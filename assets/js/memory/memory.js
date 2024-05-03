import { fillRandom, coverCards } from "./board-filler/filler.js";
import { turnHandler } from "./game-loop/play.js";

const TILE_AMT = 16;

init();

function init(){
    addSquares();
    fillRandom();
    coverCards();

    bindEvents();
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

export { TILE_AMT };