import React from 'react';
import './index.scss';
import Fire from '../../components/Fire';

export default function Second() {
    return (
        <div className="second">
            <Fire />
            <section className="content">
                <h1>
                    <strong>312</strong>位大佬
                </h1>
                <h3>
                    <strong>53</strong>位粉丝
                </h3>
                <div>
                    <p>今年你关注了312位大佬</p>
                    <p>同时你也收获了23位粉丝</p>
                    <p>林水溶是你第一个关注的人，你还记得TA吗？</p>
                </div>
                <p>可别忘了Github是个交友网站哦～</p>
            </section>
        </div>
    );
}
