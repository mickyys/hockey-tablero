import { state } from '../state.js';

function updateFouls(homeFoulsEl, awayFoulsEl) {
    homeFoulsEl.textContent = state.homeFouls;
    awayFoulsEl.textContent = state.awayFouls;
}

export function initFouls(homeFoulsEl, awayFoulsEl, homeFoulPlusBtn, homeFoulMinusBtn, awayFoulPlusBtn, awayFoulMinusBtn) {
    updateFouls(homeFoulsEl, awayFoulsEl);

    homeFoulPlusBtn.addEventListener('click', () => {
        state.homeFouls++;
        updateFouls(homeFoulsEl, awayFoulsEl);
    });

    homeFoulMinusBtn.addEventListener('click', () => {
        if (state.homeFouls > 0) state.homeFouls--;
        updateFouls(homeFoulsEl, awayFoulsEl);
    });

    awayFoulPlusBtn.addEventListener('click', () => {
        state.awayFouls++;
        updateFouls(homeFoulsEl, awayFoulsEl);
    });

    awayFoulMinusBtn.addEventListener('click', () => {
        if (state.awayFouls > 0) state.awayFouls--;
        updateFouls(homeFoulsEl, awayFoulsEl);
    });
}
