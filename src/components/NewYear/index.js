import React from 'react';
import './index.scss';

export default function NewYear() {
    return (
        <div className="digits">
            <svg
                className="digit"
                viewBox="-20 -20 140 240"
                width="100"
                height="200"
                strokeWidth="20"
                fill="none"
                style={{ '--color': '#5288E1', '--i': 1 }}
            >
                <circle r="50" cx="50" cy="50" pathLength="1" />

                <path
                    pathLength="1"
                    d="M0 50
         C 0 0, 50 0, 50 0
         C 100 0, 100 50, 100 50
         L 0 200
         L 100 200"
                />
            </svg>

            <svg
                className="digit"
                viewBox="-20 -20 140 240"
                width="100"
                height="200"
                strokeWidth="20"
                fill="none"
                style={{ '--color': '#3DA658', '--i': 2 }}
            >
                <circle r="50" cx="50" cy="150" stroke="#F00" pathLength="1" />

                <path
                    pathLength="1"
                    d="M 100 150
         C 100 200, 50 200, 50 200
         C 0 200, 0 150, 0 150
         L 0 50
         C 0 0, 50 0, 50 0
         C 100 0, 100 50, 100 50
         L 100 150"
                />
            </svg>

            <svg
                className="digit"
                viewBox="-20 -20 140 240"
                width="100"
                height="200"
                strokeWidth="20"
                fill="none"
                style={{ '--color': '#EFBE1B', '--i': 3 }}
            >
                <circle r="50" cx="50" cy="50" pathLength="1" />

                <path
                    pathLength="1"
                    d="M0 50
         C 0 0, 50 0, 50 0
         C 100 0, 100 50, 100 50
         L 0 200
         L 100 200"
                />
            </svg>

            <svg
                className="digit"
                viewBox="-20 -20 140 240"
                width="100"
                height="200"
                strokeWidth="20"
                fill="none"
                style={{ '--color': '#D7483D', '--i': 4 }}
            >
                <circle r="50" cx="50" cy="150" pathLength="1" />

                <path
                    pathLength="1"
                    d="M 100 150
         C 100 200, 50 200, 50 200
         C 0 200, 0 150, 0 150
         L 0 50
         C 0 0, 50 0, 50 0
         C 100 0, 100 50, 100 50
         L 100 150"
                />
            </svg>
        </div>
    );
}
