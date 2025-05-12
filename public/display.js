document.addEventListener('DOMContentLoaded', function () {

    const timerEndSound = new Audio('sounds/mixkit-bell-ring-buzzer-2962.wav');

    // Cargar configuración
    const savedConfig = localStorage.getItem('hockeyScoreboardConfig');
    if (!savedConfig) {
        window.location.href = 'index.html';
        return;
    }

    const config = JSON.parse(savedConfig);

    // Aplicar configuración
    document.getElementById('home-name').textContent = config.homeTeam;
    document.getElementById('away-name').textContent = config.awayTeam;
    document.documentElement.style.setProperty('--home-color', config.homeColor);
    document.documentElement.style.setProperty('--away-color', config.awayColor);

    if (!config.showPeriod) {
        document.getElementById('period-display').classList.add('hidden');
    }

    if (!config.showTimer) {
        document.getElementById('timer-container').classList.add('hidden');
    }

    const homeHeader = document.getElementById('home-header');
    const awayHeader = document.getElementById('away-header');

    if (config.homeLogo) {
        homeHeader.innerHTML = `<img src="${config.homeLogo}" alt="Logo Local" class="team-logo">`;
    } else {
        homeHeader.innerHTML = ``;
    }

    if (config.awayLogo) {
        awayHeader.innerHTML = `<img src="${config.awayLogo}" alt="Logo Visitante" class="team-logo">`;
    } else {
        awayHeader.innerHTML = ``;
    }

    // Variables de estado
    let homeScore = 0;
    let awayScore = 0;
    let period = 1;
    let isRunning = false;
    let timerInterval;
    let timeLeft = config.periodDuration * 60;

    // Elementos del DOM
    const homeScoreEl = document.getElementById('home-score');
    const awayScoreEl = document.getElementById('away-score');
    const timerEl = document.getElementById('timer');
    const periodEl = document.getElementById('period');

    // Botones
    const homePlusBtn = document.getElementById('home-plus');
    const homeMinusBtn = document.getElementById('home-minus');
    const awayPlusBtn = document.getElementById('away-plus');
    const awayMinusBtn = document.getElementById('away-minus');
    const startPauseBtn = document.getElementById('start-pause');
    const resetBtn = document.getElementById('reset');
    const nextPeriodBtn = document.getElementById('next-period');

    // Funciones de actualización
    function updateScores() {
        homeScoreEl.textContent = homeScore;
        awayScoreEl.textContent = awayScore;
    }

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function updatePeriod() {
        periodEl.textContent = period;
    }

    // Funciones del temporizador
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startPauseBtn.textContent = 'PAUSA';
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimer();
                } else {
                    pauseTimer();
                    timerEndSound.play()
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            isRunning = false;
            startPauseBtn.textContent = 'INICIAR';
            clearInterval(timerInterval);
        }
    }

    function resetTimer() {
        pauseTimer();
        timeLeft = config.periodDuration * 60;
        updateTimer();
    }

    // Event listeners
    homePlusBtn.addEventListener('click', () => {
        homeScore++;
        updateScores();
    });

    homeMinusBtn.addEventListener('click', () => {
        if (homeScore > 0) homeScore--;
        updateScores();
    });

    awayPlusBtn.addEventListener('click', () => {
        awayScore++;
        updateScores();
    });

    awayMinusBtn.addEventListener('click', () => {
        if (awayScore > 0) awayScore--;
        updateScores();
    });

    startPauseBtn.addEventListener('click', () => {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    resetBtn.addEventListener('click', resetTimer);

    nextPeriodBtn.addEventListener('click', () => {
        if (period < config.totalPeriods) {
            period++;
            updatePeriod();
            resetTimer();
        } else {
            // Opcional: reiniciar a periodo 1 o mostrar mensaje de fin de partido
            period = 1;
            updatePeriod();
            resetTimer();
        }
    });

    // Inicialización
    updateScores();
    updateTimer();
    updatePeriod();
});

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

document.addEventListener('keydown', (event) => {
    // Evita que se active si estás escribiendo en un input o textarea
    const tag = document.activeElement.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    if (event.code === 'Space') {
        event.preventDefault(); // previene scroll hacia abajo
        document.getElementById('start-pause')?.click();
    }
});


let homeFouls = 0;
let awayFouls = 0;

const homeFoulsEl = document.getElementById('home-fouls');
const awayFoulsEl = document.getElementById('away-fouls');

document.getElementById('home-foul-plus').addEventListener('click', () => {
    homeFouls++;
    homeFoulsEl.textContent = homeFouls;
});

document.getElementById('home-foul-minus').addEventListener('click', () => {
    if (homeFouls > 0) homeFouls--;
    homeFoulsEl.textContent = homeFouls;
});

document.getElementById('away-foul-plus').addEventListener('click', () => {
    awayFouls++;
    awayFoulsEl.textContent = awayFouls;
});

document.getElementById('away-foul-minus').addEventListener('click', () => {
    if (awayFouls > 0) awayFouls--;
    awayFoulsEl.textContent = awayFouls;
});


