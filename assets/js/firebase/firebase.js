const firebaseConfig = {
    apiKey: "AIzaSyDFMRm76FrNOQ78pMB-rMcTDmWygs4wNDA",
    databaseURL: "https://mini-games-dbmn-default-rtdb.europe-west1.firebasedatabase.app/",
    authDomain: "mini-games-dbmn.firebaseapp.com",
    projectId: "mini-games-dbmn",
    storageBucket: "mini-games-dbmn.appspot.com",
    messagingSenderId: "622358331347",
    appId: "1:622358331347:web:2313abef35326ecced7926",
    measurementId: "G-WL5D0E751M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const pathData = db.ref('mini-games');

async function getData() {
    try {
        const snapshot = await pathData.once('value');
        const data = snapshot.val();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function AddNewGame(game, gameName, initPlayer, code) {//works
    firebase.database().ref(`mini-games/data/${game}/${code}`).set({
        gameName: gameName,

        board: createBoard(),

        players: [
            {
                pname: initPlayer,
                pion: 'X',
                status: 'waiting'
            }
        ],

        status: 'waiting',

        currentMovePlayer: initPlayer
    });
}

function createBoard() {
    const res = new Array(3);

    for (let i = 0; i < res.length; i++) {
        res[i] = new Array(3).fill('null');
    }

    return res;

}

function updateGame(game, code, gameData) {//for now just TTT implementation
    firebase.database().ref(`mini-games/data/${game}/${code}`).set(gameData);
}

function deleteGame(game, code) {
    const gameRef = db.ref(`mini-games/data/${game}/${code}`);

    gameRef.remove()
        .then(() => {
            console.log("Game deleted successfully!");
        })
        .catch((error) => {
            console.error("Error deleting game:", error);
        });
}

export { getData, AddNewGame, deleteGame, updateGame };
