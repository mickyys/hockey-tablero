import React, { useState, useEffect, useRef } from 'react';

const Display = ({ config, onSettingsClick }) => {
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [homeFouls, setHomeFouls] = useState(0);
    const [awayFouls, setAwayFouls] = useState(0);
    const [period, setPeriod] = useState(1);
    const [time, setTime] = useState(config.periodDuration * 60);
    const [isRunning, setIsRunning] = useState(false);

    const buzzerRef = useRef(null);

    useEffect(() => {
        if (buzzerRef.current === null) {
            buzzerRef.current = new Audio('sounds/mixkit-bell-ring-buzzer-2962.wav');
        }
    }, []);

    useEffect(() => {
        let interval = null;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (!isRunning || time === 0) {
            clearInterval(interval);
            if (time === 0) {
                playBuzzer();
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    const formatTime = (seconds) => {
        if (config.timeFormat === 'seconds') {
            return seconds;
        }
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(config.periodDuration * 60);
    };

    const playBuzzer = () => {
        buzzerRef.current.play();
    };

    const handleNextPeriod = () => {
        if (period < config.totalPeriods) {
            setPeriod(period + 1);
            handleReset();
        }
    };

    const homeLogoURL = config.homeLogo ? URL.createObjectURL(config.homeLogo) : null;
    const awayLogoURL = config.awayLogo ? URL.createObjectURL(config.awayLogo) : null;

    return (
        <div>
            <div className="scoreboard">
                <div className="team team-home" id="home-team-display" style={{ backgroundColor: config.homeColor }}>
                    {homeLogoURL && <img src={homeLogoURL} alt="Home Logo" className="team-logo" />}
                    <div className="team-name" id="home-name">{config.homeTeam}</div>
                    <div className="team-score" id="home-score">{homeScore}</div>
                    <div className="team-controls">
                        <button className="btn-score" onClick={() => setHomeScore(s => s + 1)}>+</button>
                        <button className="btn-score" onClick={() => setHomeScore(s => Math.max(0, s - 1))}>-</button>
                    </div>
                    <div className="team-fouls">
                        <span>Faltas</span>
                        <div className="fouls-display">
                            <button className="btn-foul" onClick={() => setHomeFouls(f => Math.max(0, f - 1))}>-</button>
                            <span id="home-fouls">{homeFouls}</span>
                            <button className="btn-foul" onClick={() => setHomeFouls(f => f + 1)}>+</button>
                        </div>
                    </div>
                </div>

                <div className="timer-container" id="timer-container">
                    {config.showTimer && <div className="timer" id="timer">{formatTime(time)}</div>}
                    <div className="timer-controls">
                        <button className="btn-timer" id="start-pause" onClick={handleStartPause}>{isRunning ? 'PAUSA' : 'INICIAR'}</button>
                        <button className="btn-timer" id="reset" onClick={handleReset}>REINICIAR</button>
                        <button className="btn-timer" id="buzzer" onClick={playBuzzer}>CHICHARRA</button>
                    </div>
                    {config.showPeriod && (
                        <div className="period" id="period-display">
                            <span id="period">{period}</span>
                        </div>
                    )}
                    <button className="btn-period" id="next-period" onClick={handleNextPeriod}>SIGUIENTE</button>
                </div>

                <div className="team team-away" id="away-team-display" style={{ backgroundColor: config.awayColor }}>
                    {awayLogoURL && <img src={awayLogoURL} alt="Away Logo" className="team-logo" />}
                    <div className="team-name" id="away-name">{config.awayTeam}</div>
                    <div className="team-score" id="away-score">{awayScore}</div>
                    <div className="team-controls">
                        <button className="btn-score" onClick={() => setAwayScore(s => s + 1)}>+</button>
                        <button className="btn-score" onClick={() => setAwayScore(s => Math.max(0, s - 1))}>-</button>
                    </div>
                    <div className="team-fouls">
                        <span>Faltas</span>
                        <div className="fouls-display">
                            <button className="btn-foul" onClick={() => setAwayFouls(f => Math.max(0, f - 1))}>-</button>
                            <span id="away-fouls">{awayFouls}</span>
                            <button className="btn-foul" onClick={() => setAwayFouls(f => f + 1)}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="controls-container" className="controls-container">
                <button id="settings-button" className="btn-settings" onClick={onSettingsClick}>Configuración</button>
            </div>
        </div>
    );
};

export default Display;
