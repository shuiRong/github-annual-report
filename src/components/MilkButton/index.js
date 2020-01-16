import React from 'react';
import './index.scss';

export default function MilkButton() {
    return (
        <div>
            <div class="container">
                <button class="btn play-pause">
                    <div class="icon-container">
                        <svg
                            t="1579183548434"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="5776"
                            href="http://www.w3.org/1999/xlink"
                            width="32"
                            height="32"
                        >
                            <defs>
                                <style type="text/css"></style>
                            </defs>
                            <path
                                d="M999.722667 449.024C886.912 324.864 699.733333 193.621333 512 196.266667 324.266667 193.578667 137.088 324.906667 24.234667 449.024a94.336 94.336 0 0 0 0 125.781333C135.722667 697.642667 320.298667 827.733333 505.130667 827.733333h13.141333c185.472 0 369.962667-130.090667 481.578667-252.970666a94.293333 94.293333 0 0 0-0.128-125.738667zM315.733333 512a196.266667 196.266667 0 1 1 196.266667 196.266667A196.266667 196.266667 0 0 1 315.733333 512z"
                                p-id="5777"
                                fill="#00adb5"
                            ></path>
                            <path
                                d="M512 512m-85.333333 0a85.333333 85.333333 0 1 0 170.666666 0 85.333333 85.333333 0 1 0-170.666666 0Z"
                                p-id="5778"
                                fill="#00adb5"
                            ></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}
