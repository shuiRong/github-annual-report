import React, { useState } from 'react';
import { fetchData } from '../../api.js';
import MilkButton from '../../components/MilkButton';
import Loader from '../../components/Loader';
import './index.scss';

export default function Home() {
    const [username, setUsername] = useState('');

    const getData = () => {
        fetchData(username);
        
    };

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
            <MilkButton onClick={getData} />
        </div>
    );
}
