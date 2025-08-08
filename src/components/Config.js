import React, { useState } from 'react';

const Config = ({ onSave }) => {
    const [homeTeam, setHomeTeam] = useState('LOCAL');
    const [homeColor, setHomeColor] = useState('#1a3a8f');
    const [homeLogo, setHomeLogo] = useState(null);
    const [awayTeam, setAwayTeam] = useState('VISITANTE');
    const [awayColor, setAwayColor] = useState('#8f1a1a');
    const [awayLogo, setAwayLogo] = useState(null);
    const [periodDuration, setPeriodDuration] = useState(20);
    const [totalPeriods, setTotalPeriods] = useState(2);
    const [showPeriod, setShowPeriod] = useState(true);
    const [showTimer, setShowTimer] = useState(true);
    const [timeFormat, setTimeFormat] = useState('minutes');

    const handleSave = () => {
        onSave({
            homeTeam,
            homeColor,
            homeLogo,
            awayTeam,
            awayColor,
            awayLogo,
            periodDuration,
            totalPeriods,
            showPeriod,
            showTimer,
            timeFormat,
        });
    };

    return (
        <div className="config-container">
            <h1>Configuración del Tablero</h1>

            <div className="config-section">
                <h2>Equipos</h2>
                <div className="input-group">
                    <label htmlFor="home-team">Equipo Local:</label>
                    <input type="text" id="home-team" value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="home-color">Color Local:</label>
                    <input type="color" id="home-color" value={homeColor} onChange={(e) => setHomeColor(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="home-logo">Logo Local (opcional):</label>
                    <input type="file" id="home-logo" accept="image/*" onChange={(e) => setHomeLogo(e.target.files[0])} />
                </div>
                <div className="input-group">
                    <label htmlFor="away-team">Equipo Visitante:</label>
                    <input type="text" id="away-team" value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="away-color">Color Visitante:</label>
                    <input type="color" id="away-color" value={awayColor} onChange={(e) => setAwayColor(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="away-logo">Logo Visitante (opcional):</label>
                    <input type="file" id="away-logo" accept="image/*" onChange={(e) => setAwayLogo(e.target.files[0])} />
                </div>
            </div>

            <div className="config-section">
                <h2>Temporizador</h2>
                <div className="input-group">
                    <label htmlFor="period-duration">Duración del Periodo (min):</label>
                    <input type="number" id="period-duration" min="1" max="99" value={periodDuration} onChange={(e) => setPeriodDuration(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="total-periods">Número de Periodos:</label>
                    <select id="total-periods" value={totalPeriods} onChange={(e) => setTotalPeriods(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="time-format">Formato del Tiempo:</label>
                    <select id="time-format" value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)}>
                        <option value="minutes">Minutos y Segundos</option>
                        <option value="seconds">Solo Segundos</option>
                    </select>
                </div>
            </div>

            <div className="config-section">
                <h2>Opciones de Visualización</h2>
                <div className="input-group">
                    <label htmlFor="show-period">Mostrar Periodo:</label>
                    <input type="checkbox" id="show-period" checked={showPeriod} onChange={(e) => setShowPeriod(e.target.checked)} />
                </div>
                <div className="input-group">
                    <label htmlFor="show-timer">Mostrar Temporizador:</label>
                    <input type="checkbox" id="show-timer" checked={showTimer} onChange={(e) => setShowTimer(e.target.checked)} />
                </div>
            </div>

            <div className="config-section">
                <h2>Logos Disponibles</h2>
                <div className="logo-gallery">
                    <img src="logo/camuvi.png" alt="Camuvi" width="50" />
                    <img src="logo/huachipato.png" alt="Huachipato" width="50" />
                    <img src="logo/nuevo-pacifico.png" alt="Nuevo Pacifico" width="50" />
                </div>
            </div>

            <button onClick={handleSave} className="btn-save">Guardar y Ver Tablero</button>
        </div>
    );
};

export default Config;
