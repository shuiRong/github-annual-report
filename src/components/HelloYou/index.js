import React from 'react';
import { getUsername } from '../../util';

import './index.scss';

export default function HelloYou() {
    return (
        <div className="ambiva-header">
            <h1>
                Hello, <br />
                {getUsername()}
            </h1>
        </div>
    );
}
