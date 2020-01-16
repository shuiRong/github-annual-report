import React from 'react';
import './index.scss';
import Pyramid from '../../components/Pyramid';

export default function Fourth() {
    // setTimeout(() => {
    // document.querySelector('.scene').classList.add('start');
    // }, 1000);

    return (
        <div className="fourth">
            <Pyramid />
            <section>
                <h1>25次commit</h1>
                <div className="left">
                    <p>11月22日</p>
                    <p>这天你的战斗力简直爆表</p>
                </div>
                <div className="right">
                    <p>
                        这天你一共推送了<strong>25</strong>次commit
                    </p>
                    <p>
                        其中有<strong>25</strong>次commit是给了「Gakki」
                    </p>
                    <p>相比这个仓库对你来说一定很有价值吧</p>
                </div>
                <p className="center">元气满满的一天呢～</p>
            </section>
        </div>
    );
}
