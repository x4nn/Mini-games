function gameHandler(e){
    const game = e.target.id;
    
    if (game === 'tik-tak-toe') {
        window.location.href = 'tik-tak-toe';
    } else if (game === 'memory') {
        window.location.href = 'memory';
    }
    //add de rest wanneer de vorige klaar is i guess
}

export {gameHandler};