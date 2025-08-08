import React, { useState } from 'react';
import Config from './Config';
import Display from './Display';

const App = () => {
    const [config, setConfig] = useState(null);

    const handleConfigSave = (newConfig) => {
        setConfig(newConfig);
    };

    return (
        <div>
            {config ? (
                <Display config={config} />
            ) : (
                <Config onSave={handleConfigSave} />
            )}
        </div>
    );
};

export default App;
