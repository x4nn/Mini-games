function getRandomNumber(max, min = 0) {
    return Math.floor((Math.random() * max) + min);
}

function getRandomListItem(list) {
    return list[getRandomNumber(list.length)];
}

function saveToStorage(key, value) {
    if (typeof value !== "string") {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}

function loadFromStorage(key) {
    const item = localStorage.getItem(key);

    if (typeof item === "string") {
        return JSON.parse(item);
    }
    return item;
}

function deleteFromStorage(key) {
    localStorage.removeItem(key);
}

function toggleHidden(element){
    element.classList.toggle('hidden');
}

export { getRandomNumber, getRandomListItem, saveToStorage, loadFromStorage,  deleteFromStorage, toggleHidden };