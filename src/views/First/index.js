import React from 'react';
import './index.scss';
import HelloYou from '../../components/HelloYou';

export default function First() {
    return (
        <div className="first">
            <div className="hi">
                <HelloYou />
            </div>
            <section>
                <div className="met">
                    <p className="bold">2015.12.22</p>
                    <p>我们第一次相遇</p>
                </div>
                <p className="content">
                    <strong>VueDragTree</strong>
                    是你在这儿创建的第一个仓库
                </p>
                <p className="past">
                    一转眼都<strong>1222</strong>
                    天过去了...
                </p>
            </section>
        </div>
    );
}
