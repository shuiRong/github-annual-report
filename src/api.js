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
    const res = await fetch(`/users/${username}/repos?sort=created`);
    return await res.json();
};

export const fetchContributors = async (username, repoName) => {
    const res = await fetch(
        `/repos/${username}/${repoName}/stats/contributors`
    );
    return await res.json();
};

export const fetchIssues = async (username, repoName) => {
    const res = await fetch(`/repos/${username}/${repoName}/issues?state=all`);
    return await res.json();
};

export const fetchUser = async username => {
    const res = await fetch(`/users/${username}`);
    return await res.json();
};

export const fetchFollowing = async username => {
    const res = await fetch(`/users/${username}/following`);
    return await res.json();
};

export const fetchCommits = async (username, repoName) => {
    const res = await fetch(`/repos/${username}/${repoName}/commits`);
    return await res.json();
};
