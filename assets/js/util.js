function getRandomNumber(max, min = 0) {
    return Math.floor((Math.random() * max) + min);
}

function getRandomListItem(list) {
    return list[getRandomNumber(list.length)];
}

function generateRandomCode(name, gameName){
    return name[0] + gameName[0] + name[name.length-1] + gameName[gameName.length-1];
}

function saveToStorage(key, value) {
    if (sessionStorage) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  function loadFromStorage(key) {
    const item = sessionStorage.getItem(key);

    if (key === 'username') {
        return item;
    }

    return JSON.parse(item);
  }

  function deleteFromStorage(key) {
    if (sessionStorage) {
        sessionStorage.removeItem(key);
    }
  }

function toggleHidden(element){
    element.classList.toggle('hidden');
}

export { getRandomNumber, getRandomListItem, saveToStorage, loadFromStorage,  deleteFromStorage, toggleHidden, generateRandomCode };