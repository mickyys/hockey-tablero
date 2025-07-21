import { initTimer, resetTimer } from './timer.js';
import { initScore } from './score.js';
import { initFouls } from './fouls.js';
import { applyConfig, initFullscreen, initKeyboardListeners, initPeriod } from './ui.js';
import { loadConfig, state } from '../state.js';

document.addEventListener('DOMContentLoaded', function () {
    loadConfig();

    if (!state.config) {
        window.location.href = 'index.html';
        return;
    }

    applyConfig();

    const homeScoreEl = document.getElementById('home-score');
    const awayScoreEl = document.getElementById('away-score');
    const timerEl = document.getElementById('timer');
    const periodEl = document.getElementById('period');
    const homePlusBtn = document.getElementById('home-plus');
    const homeMinusBtn = document.getElementById('home-minus');
    const awayPlusBtn = document.getElementById('away-plus');
    const awayMinusBtn = document.getElementById('away-minus');
    const startPauseBtn = document.getElementById('start-pause');
    const resetBtn = document.getElementById('reset');
    const nextPeriodBtn = document.getElementById('next-period');
    const homeFoulsEl = document.getElementById('home-fouls');
    const awayFoulsEl = document.getElementById('away-fouls');
    const homeFoulPlusBtn = document.getElementById('home-foul-plus');
    const homeFoulMinusBtn = document.getElementById('home-foul-minus');
    const awayFoulPlusBtn = document.getElementById('away-foul-plus');
    const awayFoulMinusBtn = document.getElementById('away-foul-minus');

    initTimer(timerEl, startPauseBtn, resetBtn);
    initScore(homeScoreEl, awayScoreEl, homePlusBtn, homeMinusBtn, awayPlusBtn, awayMinusBtn);
    initFouls(homeFoulsEl, awayFoulsEl, homeFoulPlusBtn, homeFoulMinusBtn, awayFoulPlusBtn, awayFoulMinusBtn);
    initPeriod(periodEl, nextPeriodBtn, () => {
        resetTimer(timerEl, startPauseBtn);
    });

    initFullscreen();
    initKeyboardListeners();

    const buzzerBtn = document.getElementById('buzzer');
    const timerEndSound = new Audio('sounds/mixkit-bell-ring-buzzer-2962.wav');
    buzzerBtn.addEventListener('click', () => {
        timerEndSound.play();
    });
});
