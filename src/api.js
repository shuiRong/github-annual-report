const baseURL = 'https://api.github.com';
export let repos = [];
export let orgs = [];
export let user = {};
export let following = {};

const fetch = url => {
    return window.fetch(`${baseURL}${url}`);
};

const listRepos = async username => {
    const res = await fetch(`/users/${username}/repos?sort=created`);
    const list = await res.json();
    repos = list;

    list.forEach(item=>{
         listContributors(username,item)
    })
};

const listContributors = async (username, repo) => {
    const res = await fetch(`/repos/${username}/${repo}/stats/contributors`);
    const list = await res.json();
    repos = list;
};

const listOrgs = async username => {
    const res = await fetch(`/users/${username}/orgs`);
    const list = await res.json();
    orgs = list;
};

const getFollowing = async username => {
    const res = await fetch(`/users/${username}/following`);
    const data = await res.json();
    following = data;
};

export const fetchData = username => {
    listRepos(username);
    // userInfo(username);
    listOrgs(username);
    getFollowing(username);
};
