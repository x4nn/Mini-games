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
    if (twoCardsFlipped()) {
        console.log('2');
    } else {
        turnCard(e.target);
    }
}

function twoCardsFlipped(){
    const allLocs = document.querySelectorAll('.card');
    let flipped = 0;

    allLocs.forEach(div => {
        if (isFlipped(div.firstChild)) {
            console.log('flipped', div);
            flipped++;
        }
    });

    return flipped === 2;
}

function isFlipped(img){
    return !img.classList.contains('hidden');
}

function turnCard(target){
    const cards = target.parentElement.children;
    
    for (const img of cards) {
        img.classList.toggle('hidden');
    }
}

export { turnHandler };