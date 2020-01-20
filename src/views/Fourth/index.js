import Pyramid from '../../components/Pyramid';
import './index.scss';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { getUsername } from '../../util';
import { useHistory } from 'react-router-dom';
import {
    requestRepos,
    mostCommits,
    requestCommits,
    getMostCommitsInOneDay,
} from '../../service';

export default function Fourth() {
    const username = getUsername();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        async function get() {
            await requestRepos(username);
            await requestCommits(username);
            await getMostCommitsInOneDay(username);

            if (/fourth/.test(window.location.href)) {
                setLoading(false);
                setData(mostCommits);
            }
        }

        get();
    }, [username]);

    if (loading) {
        return (
            <div className="fourth">
                <Loader />
            </div>
        );
    }

    return (
        <div
            className="fourth"
            onClick={() => {
                history.push(`/fifth?user=${username}`);
            }}
        >
            <Pyramid />
            <section>
                <p>
                    <strong>{data.total}次commit</strong>
                </p>
                <div className="left">
                    <p>{data.date && data.date.replace(/\//g, '-')}</p>
                    <p>这天你的战斗力简直爆表</p>
                </div>
                <div className="right">
                    <p>
                        这天你一共推送了
                        <strong>{data.total}</strong>次commit。
                    </p>
                    <p>
                        其中有
                        <strong>{data.totalToTheRepo}</strong>
                        次commit是给了
                    </p>
                    <p>
                        <strong>{data.theRepo}</strong>
                        想必这个仓库对你来说一定很有价值吧
                    </p>
                </div>
                <p className="center">元气满满的一天呢～</p>
            </section>
        </div>
    );
}
