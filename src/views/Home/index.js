import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MilkButton from '../../components/MilkButton';
import './index.scss';
import { getToken, set, setStatusBarStyle } from '../../util';

const client_id = '38f3a48dab9243a31252';
if (process.env.NODE_ENV !== 'production') {
    client_id = 'cf8ebcd166bd24e0e15f'; // test id
}
const authorize_uri = 'https://github.com/login/oauth/authorize';
const redirect_uri = 'https://github2019.herokuapp.com/oauth/redirect';

function Home() {
    const history = useHistory();
    setStatusBarStyle('--home-color');

    useEffect(() => {
        async function func() {
            let token = await getToken();
            if (token) {
                set('token', token);
                history.push(`/github/first`);
                return;
            }
        }
        func();
    }, [history]);

    return (
        <div className="home">
            <img src={require('../../assets/GitHub.png')} alt="github" />
            <h1>
                2019
                <br />
                Github年度报告
            </h1>
            <div
                onClick={() => {
                    window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
                }}
            >
                <MilkButton />
            </div>
        </div>
    );
}

export default Home;
