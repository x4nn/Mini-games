const tiktakConfig = {
    playersClass: {
        p1: "X",
        p2: "O"
    },
    playerMoving: "p1"
};

function getLetterClass(player){
    for (const p in tiktakConfig.playersClass) {
        if (p === player){
            return tiktakConfig.playersClass[p];
        }
    }
}

function getMovingPlayer(){
    return tiktakConfig.playerMoving;
}

function switchMovingPlayer(){
    if (tiktakConfig.playerMoving === "p1") {
        tiktakConfig.playerMoving = "p2";
    } else {
        tiktakConfig.playerMoving = "p1";
    }
}

export {getMovingPlayer, getLetterClass, switchMovingPlayer};