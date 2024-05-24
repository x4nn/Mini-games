import { fillRandom, coverCards } from "./board-filler/filler.js";
import { renderCurPlayer, turnHandler } from "./game-loop/play.js";

const TILE_AMT = 16;

init();

function init(){
    addSquares();
    refreshBoard();
    renderCurPlayer();
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
    document.querySelector('.again').addEventListener('click', () => window.location.reload());
    document.querySelector('.home').addEventListener('click', () => window.location.href = 'index');
}

export { refreshBoard, TILE_AMT };