/*
elke speler kan 2 kaarten omdraaien per beurt

click 1: kaart wordt omgedraaid
click 2: kaart wordt omgedraaid
            er wordt gechecked of het 2 dezelfde kaarten zijn
                JA: mag nog eens
                NEE: volgende aan de beurt

Mss while game is not won: check wie er aan de beurt is en laat hem zijn 2 zetten doen
*/

const playersData = {
    players: {

        p1: {
            foundCards: [],
            state: 'PLAYING'
        },

        p2: {
            foundCards: [],
            state: 'PLAYING'
        }
    },

    currentMovingPlayer: "p1"
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
            markAsFound(); //TODO fix wanneer 2 kaarten zijn omgedraaid, dat we niet meer terug omdraaien maar de rest wel
        } else {

            setTimeout(coverAllCards, 1500);
        }
        
    } else {
        
    }
}

function isPair(){
    const flippedCards = document.querySelectorAll('.up');

    return flippedCards[0].dataset.name === flippedCards[1].dataset.name;
}

function markAsFound(){
    const flippedCards = document.querySelectorAll('.up');

    flippedCards[0].dataset.state = 'found';
    flippedCards[0].classList.remove('up');

    flippedCards[1].dataset.state = 'found';
    flippedCards[1].classList.remove('up');
}

function twoCardsFlipped(){
    const allLocs = document.querySelectorAll('.card');
    let flipped = 0;

    allLocs.forEach(div => {
        if (isFlipped(div.firstChild)) {
            flipped++;
        }
    });

    console.log(flipped);

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
}

export { turnHandler };