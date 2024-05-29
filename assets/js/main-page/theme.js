//bg = background
const themes = [
    {
        theme: 'default',
        bg: 'theme-dark-blue-bg',
        not_bg: 'theme-dark-blue-not-bg'
    },
    {
        theme: 'grey',
        bg: 'theme-grey-bg',
        not_bg: 'theme-grey-not-bg',
        icon: 'theme-grey-game-icons',
        border: 'theme-grey-border'
    }
];

function nextTheme(e) {
    const current = e.target.dataset.theme;

    const idxCurTheme = getIdxCurTheme(current);
    const idxNextTheme = getIdxNextTheme(idxCurTheme);

    toggleTheme(themes[idxNextTheme]);
}

function getIdxCurTheme(current) {
    for (let i = 0; i < themes.length; i++) {
        if (themes[i].theme === current) {
            return i;
        }
    }
    return -1;
}

function getIdxNextTheme(idxCurTheme) {
    if (idxCurTheme === themes.length - 1) {
        return 0;
    }

    return idxCurTheme + 1;
}

function toggleTheme(theme) {
    //delete eerst de andere theme door in de classlist te kijken of er een theme class in zit in die te verwijderen
    toggleBG(theme.bg);
    toggleNBG(theme.not_bg);
    toggleICONS(theme.icon);
    toggleBORDERS(theme.border);
}

function toggleBG(bg){
    document.querySelector('body').classList.add(bg);
    document.querySelector('input').classList.add(bg);
}

function toggleNBG(not_bg) {
    document.querySelector('h1').classList.add(not_bg);
    document.querySelectorAll('p').forEach(p => {
        p.classList.add(not_bg);
    });
}

function toggleICONS(icon) {
    document.querySelectorAll('section div div').forEach(div => {
        div.classList.add(icon);
    })
    document.querySelector('button').classList.add(icon);
}

function toggleBORDERS(border){
    document.querySelector('input').classList.add(border);
    document.querySelectorAll('div p').forEach(p => {
        p.classList.add(border);
    });
}

export { nextTheme };