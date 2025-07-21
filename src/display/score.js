import { state } from '../state.js';

function updateScores(homeScoreEl, awayScoreEl) {
    homeScoreEl.textContent = state.homeScore;
    awayScoreEl.textContent = state.awayScore;
}

export function initScore(homeScoreEl, awayScoreEl, homePlusBtn, homeMinusBtn, awayPlusBtn, awayMinusBtn) {
    updateScores(homeScoreEl, awayScoreEl);

    homePlusBtn.addEventListener('click', () => {
        state.homeScore++;
        updateScores(homeScoreEl, awayScoreEl);
    });

    homeMinusBtn.addEventListener('click', () => {
        if (state.homeScore > 0) state.homeScore--;
        updateScores(homeScoreEl, awayScoreEl);
    });

    awayPlusBtn.addEventListener('click', () => {
        state.awayScore++;
        updateScores(homeScoreEl, awayScoreEl);
    });

    awayMinusBtn.addEventListener('click', () => {
        if (state.awayScore > 0) state.awayScore--;
        updateScores(homeScoreEl, awayScoreEl);
    });
}
