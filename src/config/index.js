document.addEventListener('DOMContentLoaded', function () {
    const saveBtn = document.getElementById('save-config');

    saveBtn.addEventListener('click', function () {
        const homeLogoInput = document.getElementById('home-logo');
        const awayLogoInput = document.getElementById('away-logo');
    
        const readLogo = (input) => {
            return new Promise((resolve) => {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(input.files[0]);
                } else {
                    resolve(null);
                }
            });
        };
    
        Promise.all([readLogo(homeLogoInput), readLogo(awayLogoInput)]).then(([homeLogo, awayLogo]) => {
            const config = {
                homeTeam: document.getElementById('home-team').value,
                homeColor: document.getElementById('home-color').value,
                awayTeam: document.getElementById('away-team').value,
                awayColor: document.getElementById('away-color').value,
                periodDuration: parseInt(document.getElementById('period-duration').value),
                totalPeriods: parseInt(document.getElementById('total-periods').value),
                showPeriod: document.getElementById('show-period').checked,
                showTimer: document.getElementById('show-timer').checked,
                homeLogo: homeLogo,
                awayLogo: awayLogo
            };
    
            localStorage.setItem('hockeyScoreboardConfig', JSON.stringify(config));
            window.location.href = 'display.html';
        });
    });

    // Cargar configuración previa si existe
    const savedConfig = localStorage.getItem('hockeyScoreboardConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        document.getElementById('home-team').value = config.homeTeam;
        document.getElementById('home-color').value = config.homeColor;
        document.getElementById('away-team').value = config.awayTeam;
        document.getElementById('away-color').value = config.awayColor;
        document.getElementById('period-duration').value = config.periodDuration;
        document.getElementById('total-periods').value = config.totalPeriods;
        document.getElementById('show-period').checked = config.showPeriod;
        document.getElementById('show-timer').checked = config.showTimer;
    }
});






