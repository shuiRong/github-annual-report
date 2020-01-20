import { set, get } from './util';

const token = 'token 10a0a3708f6900e6a05dcf489022b44f95c37d1d';

const baseURL = 'https://api.github.com';
const fetch = url => {
    console.log(url);
    return window.fetch(`${baseURL}${url}`, {
        headers: {
            Authorization: token,
        },
    });
};

export const fetchRepos = async username => {
    let res = await get('repos');
    if (res) {
        return res;
    }

    res = await fetch(`/users/${username}/repos?sort=created`);
    const repos = await res.json();
    set('repos', repos);
    return repos;
};

export const fetchContributors = async (username, repoName) => {
    const key = `contributors-${username}-${repoName}`;
    let res = await get(key);
    if (res) {
        return res;
    }
    res = await fetch(`/repos/${username}/${repoName}/stats/contributors`);
    const contributors = await res.json();
    set(key, contributors);
    return contributors;
};

export const fetchIssues = async (username, repoName) => {
    const key = `issues-${username}-${repoName}`;
    let res = await get(key);
    if (res) {
        return res;
    }

    res = await fetch(`/repos/${username}/${repoName}/issues?state=all`);
    const issues = await res.json();
    set(key, issues);
    return issues;
};

export const fetchUser = async username => {
    let res = await get('user');
    if (res && username === res.login) {
        return res;
    }

    res = await fetch(`/users/${username}`);
    const user = await res.json();
    set('user', user);
    return user;
};

export const fetchFollowing = async username => {
    const res = await fetch(`/users/${username}/following`);
    return await res.json();
};

export const fetchCommits = async (username, repoName) => {
    const key = `commits-${username}-${repoName}`;
    let res = await get(key);
    if (res) {
        return res;
    }

    res = await fetch(`/repos/${username}/${repoName}/commits`);
    const commits = await res.json();
    set(key, commits);
    return commits;
};
