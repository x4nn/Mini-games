import { fillRandom, coverCards } from "./board-filler/filler.js";

const TILE_AMT = 16;

init();

function init(){
    addSquares();
    fillRandom();
    coverCards();

    // bindEvents();
}

function addSquares(){
    const board = document.querySelector('#board');
    
    for (let i = 0; i < TILE_AMT; i++) {
        const tile = `<div class="card" data-idx="${i}"></div>`;
        board.insertAdjacentHTML('beforeend', tile);
    }
}

export { TILE_AMT };