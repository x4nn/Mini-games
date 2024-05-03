import { fillRandom } from "./board-filler/filler.js";

const TILE_AMT = 16;

init();

function init(){
    addSquares();
    fillRandom();
}

function addSquares(){
    const board = document.querySelector('#board');
    
    for (let i = 0; i < TILE_AMT; i++) {
        const tile = `<div class="card" data-idx="${i}"></div>`;
        board.insertAdjacentHTML('beforeend', tile);
    }
}

export { TILE_AMT };