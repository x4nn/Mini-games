

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

function AddNewGame(game, gameName, initPlayer) {//works
    firebase.database().ref(`mini-games/data/${game}/${gameName}`).set({
        gameName: gameName,

        players: [
            {
                pname: initPlayer,
                status: 'waiting'
            }
        ],

        currentMovePlayer: initPlayer


    });
}

function deleteGame(game, gameName) { //works
    const gameRef = db.ref(`mini-games/data/${game}/${gameName}`); // Replace 'gameId' with the actual ID

    gameRef.remove()
        .then(() => {
            console.log("Game deleted successfully!");
        })
        .catch((error) => {
            console.error("Error deleting game:", error);
        });
}

export { getData, AddNewGame, deleteGame };
