import { set, get } from './util';

const baseURL = 'https://api.github.com';
const fetch = (url, token) => {
    console.log(url);
    return window.fetch(`${baseURL}${url}`, {
        headers: {
            Authorization: `token ${token}`,
        },
    });
};

export const fetchRepos = async token => {
    let res = await get('repos');
    if (res) {
        return res;
    }

    res = await fetch(`/user/repos?sort=created`, token);
    const repos = await res.json();
    set('repos', repos);
    return repos;
};

export const fetchContributors = async (repoName, token) => {
    const key = `contributors-${repoName}`;
    let res = await get(key);
    if (res) {
        return res;
    }
    res = await fetch(`/repos/${repoName}/stats/contributors`, token);
    const contributors = await res.json();
    set(key, contributors);
    return contributors;
};

export const fetchIssues = async (repoName, token) => {
    const key = `issues-${repoName}`;
    let res = await get(key);
    if (res) {
        return res;
    }

    res = await fetch(`/repos/${repoName}/issues?state=all`, token);
    const issues = await res.json();
    set(key, issues);
    return issues;
};

export const fetchUser = async token => {
    let res = await get('user');
    if (res) {
        return res;
    }

    res = await fetch(`/user`, token);
    const user = await res.json();
    set('user', user);
    return user;
};

export const fetchFollowing = async (username, token) => {
    const res = await fetch(`/users/${username}/following`, token);
    return await res.json();
};

export const fetchCommits = async (repoName, token) => {
    const key = `commits-${repoName}`;
    let res = await get(key);
    if (res) {
        return res;
    }

    res = await fetch(`/repos/${repoName}/commits`, token);
    const commits = await res.json();
    set(key, commits);
    return commits;
};
