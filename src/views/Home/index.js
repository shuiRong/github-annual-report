import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MilkButton from '../../components/MilkButton';
import './index.scss';
import { getToken, set } from '../../util';

const client_id = '38f3a48dab9243a31252';
const authorize_uri = 'https://github.com/login/oauth/authorize';
const redirect_uri = 'http://localhost:8080/oauth/redirect';

function Home() {
    const history = useHistory();

    useEffect(() => {
        async function func() {
            let token = await getToken();
            if (token) {
                set('token', token);
                history.push(`/first`);
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
