import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MilkButton from '../../components/MilkButton';
import './index.scss';
import { getUsername } from '../../util';

function Home() {
    const history = useHistory();
    const [username, setUsername] = useState(getUsername());

    return (
        <div className="home">
            <img src={require('../../assets/GitHub.png')} alt="github" />
            <h1>Github年度报告</h1>
            <input
                placeholder="用户名 ..."
                value={username}
                onChange={({ target }) => {
                    setUsername(target.value);
                }}
            />
            <div
                onClick={() => {
                    if (!username.trim()) {
                        alert('请输入用户名');
                        return;
                    }
                    history.push(`/first?user=${username}`);
                }}
            >
                <MilkButton />
            </div>
        </div>
    );
}

export default Home;
