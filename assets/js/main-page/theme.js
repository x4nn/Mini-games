//bg = background
const themes = [
    {
        theme: 'default',
        bg: 'theme-dark-blue-bg',
        not_bg: 'theme-dark-blue-not-bg',
        icon: 'theme-dark-blue-game-icons',
        border: 'theme-dark-blue-border'
    },
    {
        theme: 'grey',
        bg: 'theme-grey-bg',
        not_bg: 'theme-grey-not-bg',
        icon: 'theme-grey-game-icons',
        border: 'theme-grey-border'
    },
    {
        theme: 'red',
        bg: 'theme-red-bg',
        not_bg: 'theme-red-not-bg',
        icon: 'theme-red-game-icons',
        border: 'theme-red-border'
    },
    {
        theme: 'black',
        bg: 'theme-black-bg',
        not_bg: 'theme-black-not-bg',
        icon: 'theme-black-game-icons',
        border: 'theme-black-border'
    },
    {
        theme: 'cyan',
        bg: 'theme-cyan-bg',
        not_bg: 'theme-cyan-not-bg',
        icon: 'theme-cyan-game-icons',
        border: 'theme-cyan-border'
    }
];

function nextThemeHome(e) {
    const current = e.target.dataset.theme;

    const idxCurTheme = getIdxCurTheme(current);
    const idxNextTheme = getIdxNextTheme(idxCurTheme);
    const theme = themes[idxNextTheme];

    toggleTheme(theme);

    document.querySelector('button').setAttribute('data-theme', theme.theme);
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
    clearOldTheme();

    toggleBG(theme.bg);
    toggleNBG(theme.not_bg);
    toggleICONS(theme.icon);
    toggleBORDERS(theme.border);
}

function clearOldTheme() {
    const $body = document.querySelector('body');
    const $input = document.querySelector('input');
    const $h1 = document.querySelector('h1');
    const $button = document.querySelector('button');
    const $allTitleP = document.querySelectorAll('.section-title');
    const $allDiv = document.querySelectorAll('section div div div');

    clearAll([$body, $input, $h1, $button, $allTitleP, $allDiv]);

}

function clearAll(all) {
    for (const e of all) {
        if (e.length === undefined) {
            clearSingle(e);
        } else {
            clearMore(e);
        }
    }
}

function clearSingle(e) {
    const classes = [];
    for (const tClass of e.classList) {
        if (tClass.includes('theme')) {
            classes.push(tClass);
        }
    }

    classes.forEach(tClass => e.classList.remove(tClass));
}

function clearMore(elems) {
    for (const el of elems) {
        clearSingle(el);
    }
}

function toggleBG(bg) {
    document.querySelector('body').classList.add(bg);
    document.querySelector('input').classList.add(bg);
}

function toggleNBG(not_bg) {
    document.querySelector('input').classList.add(not_bg);
    document.querySelector('h1').classList.add(not_bg);
    document.querySelectorAll('.section-title').forEach(p => {
        p.classList.add(not_bg);
    });
}

function toggleICONS(icon) {
    document.querySelectorAll('section div div div').forEach(div => {
        div.classList.add(icon);
    })
    document.querySelector('button').classList.add(icon);
}

function toggleBORDERS(border) {
    document.querySelector('input').classList.add(border);
    document.querySelectorAll('.section-title').forEach(p => {
        p.classList.add(border);
    });
}

export { nextThemeHome };