import { state } from '../state.js';

const timerEndSound = new Audio('sounds/mixkit-bell-ring-buzzer-2962.wav');
let timerInterval;

function updateTimerDisplay(timerEl) {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function startTimer(timerEl, startPauseBtn) {
    if (!state.isRunning && !state.isTimeUp) {
        state.isRunning = true;
        startPauseBtn.textContent = 'PAUSA';
        timerInterval = setInterval(() => {
            if (state.timeLeft > 0) {
                state.timeLeft--;
                updateTimerDisplay(timerEl);
            } else {
                state.isTimeUp = true;
                pauseTimer(startPauseBtn);
                timerEndSound.play();
                setTimeout(() => {
                    state.isTimeUp = false;
                    startTimer(timerEl, startPauseBtn);
                }, state.timeoutDuration * 1000);
            }
        }, 1000);
    }
}

export function pauseTimer(startPauseBtn) {
    if (state.isRunning) {
        state.isRunning = false;
        startPauseBtn.textContent = 'INICIAR';
        clearInterval(timerInterval);
    }
}

export function resetTimer(timerEl, startPauseBtn) {
    pauseTimer(startPauseBtn);
    state.timeLeft = state.config.periodDuration * 60;
    updateTimerDisplay(timerEl);
}

export function initTimer(timerEl, startPauseBtn, resetBtn) {
    timerEndSound.load();
    state.timeLeft = state.config.periodDuration * 60;
    updateTimerDisplay(timerEl);

    startPauseBtn.addEventListener('click', () => {
        if (state.isRunning) {
            pauseTimer(startPauseBtn);
        } else {
            startTimer(timerEl, startPauseBtn);
        }
    });

    resetBtn.addEventListener('click', () => resetTimer(timerEl, startPauseBtn));
}
