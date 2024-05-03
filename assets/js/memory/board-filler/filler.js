import { getRandomListItem, getRandomNumber } from "../../util.js";
import { TILE_AMT } from "../memory.js";
import { getCardConfig } from "./config.js";


function fillRandom() {
    const cards = getRandomOrder();

    for (let i = 0; i < TILE_AMT; i++) {
        const rdm = getRandomNumber(cards.length);
        renderCard(cards[rdm], i);
        cards.splice(rdm, 1);
    }
}

function coverCards(){
    const cover = `<img src="assets/media/memory/card-back.png" alt="cover">`;
    const allCardLocs = document.querySelectorAll('.card');

    allCardLocs.forEach(div => {
        div.insertAdjacentHTML('beforeend', cover);
    });
}

function getRandomOrder() {
    const duplicateAllCards = getArrayWithAllNames();
    const randomOrdered = [];

    while (duplicateAllCards.length > 0) {
        const rdm = getRandomNumber(duplicateAllCards.length);

        randomOrdered.push(duplicateAllCards[rdm]);
        duplicateAllCards.splice(rdm, 1);
    }

    return randomOrdered;
}

function getArrayWithAllNames() {
    const cards = getCardConfig();
    const all = [];

    for (const card of cards) {
        for (const name in card) {
            for (let i = 0; i < card[name]; i++) {
                all.push(name);
            }
        }
    }

    return all;
}

function renderCard(name, idx) {
    const loc = document.querySelector(`div[data-idx="${idx}"]`);
    const img = `<img src="assets/media/memory/${name}.png" alt="card" data-name="${name}" class="hidden">`

    loc.insertAdjacentHTML('beforeend', img);
}

export { fillRandom, coverCards };