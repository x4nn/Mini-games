function getRandomNumber(max, min = 0){
    return Math.floor((Math.random() * max) + min);
}

function getRandomListItem(list){
     return list[getRandomNumber(list.length)];
}

export {getRandomNumber, getRandomListItem};