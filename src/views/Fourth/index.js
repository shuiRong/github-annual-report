import Pyramid from '../../components/Pyramid';
import './index.scss';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { getToken, setStatusBarStyle } from '../../util';
import { useHistory } from 'react-router-dom';
import {
    user,
    requestRepos,
    mostCommits,
    requestCommits,
    getMostCommitsInOneDay,
    requestUser,
} from '../../service';
import Sign from '../Sign';

export default function Fourth() {
    setStatusBarStyle('--fourth-color');
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        async function get() {
            const token = await getToken();
            if (!user.login) {
                await requestUser(token);
            }
            await requestRepos(token);
            await requestCommits(token);
            await getMostCommitsInOneDay(token);

            if (/fourth/.test(window.location.href)) {
                setLoading(false);
                setData(mostCommits);
            }
        }
        if (!mostCommits.total) {
            get();
        } else {
            setLoading(false);
            setData(mostCommits);
        }
    }, []);

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
                history.push(`/fifth`);
            }}
        >
            {/* <Pyramid></Pyramid> */}
            <img src={require('../../assets/Sun.png')} alt="sun" />
            <section>
                <div className="left">
                    <p>
                        <strong>
                            {data.date && data.date.replace(/\//g, '-')}
                        </strong>
                    </p>
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
            </section>
            <footer>
                <p className="center">元气满满的一天呢～</p>
                <Sign></Sign>
            </footer>
        </div>
    );
}
