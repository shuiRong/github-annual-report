import React from 'react';
import './index.scss';

export default function Pyramid() {
    return (
        <div className="scene">
            <div className="scene__sun"></div>
            <div className="scene__moon"></div>
            <div className="scene__pyramide"></div>
            <div className="scene__ground"></div>
        </div>
    );
}
