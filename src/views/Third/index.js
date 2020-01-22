import './index.scss';
import NightMoon from '../../components/NightMoon';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { getToken, setStatusBarStyle } from '../../util';
import { useHistory } from 'react-router-dom';
import {
    user,
    requestUser,
    requestRepos,
    requestCommits,
    commitsAtNight,
} from '../../service';
import Sign from '../Sign';

const getTime = time => {
    const temp = String(time).split('.');
    return (temp[0] || 0) + '点' + (temp[1] || 0) + '分';
};

export default function Third() {
    setStatusBarStyle('--third-color');
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

            if (/third/.test(window.location.href)) {
                setLoading(false);
                setData(commitsAtNight);
            }
        }
        if (!commitsAtNight.total) {
            get();
        } else {
            setLoading(false);
            setData(commitsAtNight);
        }
    }, []);

    if (loading) {
        return (
            <div className="third">
                <Loader />
            </div>
        );
    }

    return (
        <div
            className="third"
            onClick={() => {
                history.push(`/github/fourth`);
            }}
        >
            <div className="picture">
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
                        有<strong>{data.total}</strong>次commit发生在
                        <strong>21</strong>
                        点后
                    </p>
                    <p>
                        最晚的那次居然是
                        <strong>{getTime(data.latestTime)}</strong>
                        ！！！
                    </p>
                </div>
            </section>
            <footer>
                <p>不要熬夜，朋友，身体健康挺重要的</p>
                <Sign></Sign>
            </footer>
        </div>
    );
}
