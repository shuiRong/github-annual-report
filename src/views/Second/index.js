import React, { useEffect, useState } from 'react';
import './index.scss';
import Fire from '../../components/Fire';
import Loader from '../../components/Loader';
import { getUsername } from '../../util';
import { useHistory } from 'react-router-dom';
import {
    user,
    requestFollowing,
    first_following,
    requestUser,
} from '../../service';

export default function Second() {
    const username = getUsername();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        async function get() {
            await requestFollowing(username);
            await requestUser(username);

            if (/second/.test(window.location.href)) {
                setLoading(false);
                setData({
                    following: user.following,
                    followers: user.followers,
                    first_following,
                });
            }
        }

        if (!user.name) {
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
    }, [username]);

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
                    history.push(`/third?user=${username}`);
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
                        是你第一个关注的人，你还记得TA吗？
                    </p>
                </div>
                <p>可别忘了Github是个交友网站哦～</p>
            </section>
        </div>
    );
}
