import './index.scss';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { getUsername } from '../../util';
import { useHistory } from 'react-router-dom';
import {
    requestRepos,
    requestContributors,
    fifthData,
    requestIssues,
} from '../../service';

export default function Fifth() {
    const username = getUsername();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        async function get() {
            await requestRepos(username);
            await Promise.all([
                requestContributors(username),
                requestIssues(username),
            ]);

            if (/fifth/.test(window.location.href)) {
                setLoading(false);
                setData(fifthData);
            }
        }

        get();
    }, [username]);

    if (loading) {
        return (
            <div className="fifth">
                <Loader />
            </div>
        );
    }

    return (
        <div
            className="fifth"
            onClick={() => {
                history.push(`/sixth?user=${username}`);
            }}
        >
            <div>
                <h1>2019：充实的一年</h1>
                <img src={require('../../assets/snow.png')} alt="snow" />
            </div>
            <section>
                <div className="left">
                    <p>这一年里，你</p>
                    <p>
                        新增了<strong>{data.additions}</strong>行代码
                    </p>
                    <p>
                        删除了<strong>{data.deletions}</strong>行代码
                    </p>
                    <p>
                        产生了<strong>{data.commits}</strong>次commit
                    </p>
                </div>
                <div className="right">
                    <p>
                        另外，至少<strong>{data.issues}</strong>
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
