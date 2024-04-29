function gameHandler(e){
    const game = e.target.id;
    
    if (game === 'tik-tak-toe') {
        window.location.href = 'tik-tak-toe.html'
    }
    //add de rest wanneer de vorige klaar is i guess
}

export {gameHandler};