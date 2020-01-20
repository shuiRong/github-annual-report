import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import HelloYou from '../../components/HelloYou';
import Loader from '../../components/Loader';
import { fetchData } from '../../service';
import { getUsername } from '../../util';

export default function First() {
    const username = getUsername();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        async function get() {
            const res = await fetchData(username);
            if (/first/.test(window.location.href)) {
                setLoading(false);
                setData(res);
            }
        }
        get();
    }, [username]);

    if (loading) {
        return (
            <div className="first">
                <Loader />
            </div>
        );
    }

    return (
        <div
            className="first"
            onClick={() => {
                history.push(`/second?user=${username}`);
            }}
        >
            <div className="hi">
                <HelloYou />
            </div>
            <section>
                <div className="met">
                    <p className="bold">{data.created_at}</p>
                    <p>我们第一次相遇</p>
                </div>
                <p className="content">
                    <strong>{data.first_repo}</strong>
                    是你在这儿创建的第一个仓库
                </p>
                <p className="past">
                    一转眼都<strong>{data.days}</strong>
                    天过去了...
                </p>
            </section>
        </div>
    );
}
