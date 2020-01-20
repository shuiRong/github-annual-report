import React from 'react';
import './index.scss';
import NewYear from '../../components/NewYear';

export default function Sixth() {
    return (
        <div className="sixth">
            <section>
                <p>2019年过去了，我很怀念它</p>
                <br />
                <p>生活得继续</p>
                <p>代码也还得写</p>
                <p></p>
            </section>
            <NewYear />
            <a
                href="https://github.com/shuiRong/github-annual-report"
                target="_blanket"
                className="button"
            >
                <img src={require('../../assets/star.png')} alt="star"></img>
                Github
            </a>
        </div>
    );
}
