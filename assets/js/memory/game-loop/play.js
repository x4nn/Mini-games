/*
elke speler kan 2 kaarten omdraaien per beurt

click 1: kaart wordt omgedraaid
click 2: kaart wordt omgedraaid
            er wordt gechecked of het 2 dezelfde kaarten zijn
                JA: mag nog eens
                NEE: volgende aan de beurt

Mss while game is not won: check wie er aan de beurt is en laat hem zijn 2 zetten doen
*/

import { TILE_AMT } from "../memory.js";

const playersData = {
    players: {

        p1: {
            foundCards: 0,
            state: 'PLAYING'
        },

        p2: {
            foundCards: 0,
            state: 'PLAYING'
        }
    },

    currentMovingPlayer: "p1"
}

function switchMovingPlayer() {
    const curP = playersData.currentMovingPlayer;

    if (curP === 'p1') {
        playersData.currentMovingPlayer = 'p2';
    } else {
        playersData.currentMovingPlayer = 'p1';
    }

    renderCurPlayer();
}

function renderCurPlayer() {
    const $span = document.querySelector('.info-container span');

    $span.innerHTML = '';
    $span.innerHTML = playersData.currentMovingPlayer;
}

function turnHandler(e) {
    turnCard(e.target);
    if (twoCardsFlipped()) {


        //check of ze zelfde zijn
            //JA: voeg ze toe aan gevonden dingen en mag opnieuw beurt en kaarten niet omdraaien
            //NEE: beurt aan volgende


        if (isPair()) {


            //voeg ze toe aan gevonden dingen en mag opnieuw beurt en kaarten niet omdraaien
            //voeg ook toe aan data dattie found is


            console.log('pair');

            //TODO fix dat de count omhoog gaat na vinden van pair 

            updatePairsFoundPlayer();//todo
            markAsFound();
            checkForWin();
        } else {


            //FIXME da je ni kan klikken tot volgende beurt


            setTimeout(coverAllCards, 1500);
        }
        
    }
}

function updatePairsFoundPlayer(){
    const currentMovingPlayer = playersData.currentMovingPlayer;

    playersData.players[currentMovingPlayer].foundCards++;
}

function checkForWin(){
    const allSquares = document.querySelectorAll('[alt="card"]');
    let counter = 0;
    allSquares.forEach(img => {
        if (img.dataset.state === 'found') {
            counter++;
            if (counter === TILE_AMT) {
                console.log('game over');
                gameOver();
            }
        }
    });
}

function isPair(){
    const flippedCards = document.querySelectorAll('.up');

    return flippedCards[0].dataset.name === flippedCards[1].dataset.name;
}

function markAsFound(){
    const flippedCards = document.querySelectorAll('.up');

    flippedCards[0].dataset.state = 'found';
    flippedCards[0].classList.remove('up');
    flippedCards[0].classList.add(playersData.currentMovingPlayer);

    flippedCards[1].dataset.state = 'found';
    flippedCards[1].classList.remove('up');
    flippedCards[1].classList.add(playersData.currentMovingPlayer);
}

function twoCardsFlipped(){
    const allLocs = document.querySelectorAll('.card');
    let flipped = 0;

    allLocs.forEach(div => {
        if (isFlipped(div.firstChild)) {
            flipped++;
        }
    });

    return flipped === 2;
}

function isFlipped(img){

    return img.classList.contains('up') && img.dataset.state === 'not-found';
}

function turnCard(target){
    const cards = target.parentElement.children;
    
    for (const img of cards) {
        img.classList.toggle('hidden');
        if (img.alt === 'card') {
            img.classList.toggle('up');
        }
    }
}

function coverAllCards(){
    const allLocs = document.querySelectorAll('.card');

    allLocs.forEach(div => {

        if (div.firstChild.classList.contains('up') && div.firstChild.dataset.state === 'not-found') {
            div.firstChild.classList.toggle('hidden');
            div.firstChild.classList.toggle('up');

            div.lastChild.classList.toggle('hidden');
        }
    });
    switchMovingPlayer();
}

function gameOver(){
    const $board = document.querySelector('.playing-game');
    const $infoMovingPlayer = document.querySelector('.info-container')
    const $gameOver = document.querySelector('.game-over');

    renderFoundPairs();

    $board.classList.toggle('hidden');
    $infoMovingPlayer.classList.toggle('hidden')
    $gameOver.classList.toggle('hidden');

}

function renderFoundPairs(){
    const $p1Pairs = document.querySelector('#p1-pairs-found span');
    const $p2Pairs = document.querySelector('#p2-pairs-found span');

    $p1Pairs.insertAdjacentHTML('beforeend', playersData.players.p1.foundCards);
    $p2Pairs.insertAdjacentHTML('beforeend', playersData.players.p2.foundCards);
}

export { turnHandler, renderCurPlayer };