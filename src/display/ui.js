import { state } from '../state.js';

export function applyConfig() {
    document.getElementById('home-name').textContent = state.config.homeTeam;
    document.getElementById('away-name').textContent = state.config.awayTeam;
    document.documentElement.style.setProperty('--home-color', state.config.homeColor);
    document.documentElement.style.setProperty('--away-color', state.config.awayColor);

    if (!state.config.showPeriod) {
        document.getElementById('period-display').classList.add('hidden');
    }

    if (!state.config.showTimer) {
        document.getElementById('timer-container').classList.add('hidden');
    }

    const homeHeader = document.getElementById('home-header');
    const awayHeader = document.getElementById('away-header');

    if (state.config.homeLogo) {
        homeHeader.innerHTML = `<img src="${state.config.homeLogo}" alt="Logo Local" class="team-logo">`;
    } else {
        homeHeader.innerHTML = ``;
    }

    if (state.config.awayLogo) {
        awayHeader.innerHTML = `<img src="${state.config.awayLogo}" alt="Logo Visitante" class="team-logo">`;
    } else {
        awayHeader.innerHTML = ``;
    }
}

export function initFullscreen() {
    const fullscreenBtn = document.getElementById('enter-fullscreen');
    const controlsContainer = document.getElementById('controls-container');

    fullscreenBtn.addEventListener('click', () => {
        const docEl = document.documentElement;

        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
        }
    });

    let cursorTimeout;

    function startCursorHideTimer() {
        clearTimeout(cursorTimeout);
        document.body.classList.remove('hide-cursor');

        cursorTimeout = setTimeout(() => {
            if (document.fullscreenElement) {
                document.body.classList.add('hide-cursor');
            }
        }, 5000);
    }

    document.addEventListener('mousemove', () => {
        if (document.fullscreenElement) {
            startCursorHideTimer();
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            controlsContainer.style.display = 'none';
            startCursorHideTimer(); // inicia al entrar a fullscreen
        } else {
            controlsContainer.style.display = 'flex';
            document.body.classList.remove('hide-cursor'); // muestra el cursor al salir
            clearTimeout(cursorTimeout);
        }
    });
}

export function initKeyboardListeners() {
    document.addEventListener('keydown', (event) => {
        // Evita que se active si estás escribiendo en un input o textarea
        const tag = document.activeElement.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;

        if (event.code === 'Space') {
            event.preventDefault(); // previene scroll hacia abajo
            document.getElementById('start-pause')?.click();
        }
    });
}

export function initPeriod(periodEl, nextPeriodBtn, onNextPeriod) {
    function updatePeriod() {
        periodEl.textContent = state.period;
    }

    nextPeriodBtn.addEventListener('click', () => {
        if (state.period < state.config.totalPeriods) {
            state.period++;
            updatePeriod();
            onNextPeriod();
        } else {
            state.period = 1;
            updatePeriod();
            onNextPeriod();
        }
    });

    updatePeriod();
}
