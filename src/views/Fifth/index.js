import React from 'react';
import './index.scss';

export default function Fifth() {
    return (
        <div className="fifth">
            <div>
                <h1>2019：充实的一年</h1>
                <img src={require('../../assets/snow.png')} alt="snow" />
            </div>
            <section>
                <div className="left">
                    <p>
                        新增<strong>423351</strong>行代码
                    </p>
                    <p>
                        删除<strong>123351</strong>行代码
                    </p>
                    <p>
                        <strong>288</strong>次commit
                    </p>
                </div>
                <div className="right">
                    <p>
                        另外，有<strong>188</strong>
                        个issue的讨论
                    </p>
                    <p>你有参与其中</p>
                    {/* <p>
                        你也加入了<strong>188</strong>
                        个组织
                    </p> */}
                </div>
                <p className="center">开源世界感谢你的贡献～</p>
            </section>
        </div>
    );
}
