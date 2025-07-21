export const state = {
    homeScore: 0,
    awayScore: 0,
    homeFouls: 0,
    awayFouls: 0,
    period: 1,
    isRunning: false,
    timeLeft: 0,
    isTimeUp: false,
    isFullScreen: false,
    timeoutDuration: 5,
    config: {
        periodDuration: 20,
        totalPeriods: 2,
    },
};

export function loadConfig() {
    const savedConfig = localStorage.getItem('hockeyScoreboardConfig');
    if (savedConfig) {
        state.config = JSON.parse(savedConfig);
    }
}
