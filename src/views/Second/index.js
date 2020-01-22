import React, { useEffect, useState } from 'react';
import './index.scss';
import Fire from '../../components/Fire';
import Loader from '../../components/Loader';
import { getToken, setStatusBarStyle } from '../../util';
import { useHistory } from 'react-router-dom';
import {
    user,
    requestFollowing,
    first_following,
    requestUser,
} from '../../service';
import Sign from '../Sign';

export default function Second() {
    setStatusBarStyle('--second-color');
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        async function get() {
            const token = await getToken();
            await requestUser(token);
            await requestFollowing(token);

            if (/second/.test(window.location.href)) {
                setLoading(false);
                setData({
                    following: user.following,
                    followers: user.followers,
                    first_following,
                });
            }
        }

        if (!user.login || !first_following) {
            get();
            return;
        }
        if (/second/.test(window.location.href)) {
            setLoading(false);
            setData({
                following: user.following,
                followers: user.followers,
                first_following,
            });
        }
    }, []);

    if (loading) {
        return (
            <div className="second">
                <Loader />
            </div>
        );
    }

    return (
        <div className="second">
            <Fire />
            <section
                className="content"
                onClick={() => {
                    history.push(`/third`);
                }}
            >
                <h1>
                    <strong>{data.following}</strong>位大佬
                </h1>
                <h3>
                    <strong>{data.followers}</strong>位粉丝
                </h3>
                <div>
                    <p>你关注了{data.following}位大佬</p>
                    <p>同时你也收获了{data.followers}位粉丝</p>
                    <p>
                        <strong>{data.first_following}</strong>
                    </p>
                    <p>是你第一个关注的人，你还记得TA吗？</p>
                </div>
            </section>
            <footer>
                <p>可别忘了Github是个交友网站哦～</p>
                <Sign></Sign>
            </footer>
        </div>
    );
}
