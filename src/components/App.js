import React, { useState } from 'react';
import Config from './Config';
import Display from './Display';

const App = () => {
    const [config, setConfig] = useState(null);

    const handleConfigSave = (newConfig) => {
        setConfig(newConfig);
    };

    const handleSettingsClick = () => {
        setConfig(null);
    };

    return (
        <div>
            {config ? (
                <Display config={config} onSettingsClick={handleSettingsClick} />
            ) : (
                <Config onSave={handleConfigSave} />
            )}
        </div>
    );
};

export default App;
