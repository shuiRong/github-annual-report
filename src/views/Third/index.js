import React from 'react';
import './index.scss';
import NightMoon from '../../components/NightMoon';

export default function Third() {
    return (
        <div className="third">
            <div>
                <h1>熬夜小能手</h1>
                <NightMoon />
            </div>
            <section>
                <div className="left">
                    <p>这一年里</p>
                    <p>你常在晚上写代码</p>
                </div>
                <div className="right">
                    <p>
                        有<strong>222</strong>次commit发生在<strong>21</strong>
                        点后
                    </p>
                    <p>
                        最晚的那次居然是<strong>3</strong>点！！！
                    </p>
                </div>
                <p>不要熬夜，朋友，身体健康挺重要的</p>
            </section>
        </div>
    );
}
