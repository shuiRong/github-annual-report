import React from 'react';
import { user } from '../../service';

import './index.scss';

export default function HelloYou() {
    return (
        <div className="ambiva-header">
            <h1>
                Hello, <br />
                {user.login}
            </h1>
        </div>
    );
}
