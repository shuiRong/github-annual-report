import { days2Now, dealTime, is2019, get, set } from './util';
import {
    fetchRepos,
    fetchUser,
    fetchFollowing,
    fetchContributors,
    fetchIssues,
    fetchCommits,
} from './api';

export let repos = [];
export let orgs = [];
export let user = {};
export let first_following = '';
export let commitsAtNight = {
    total: 0, // total number of commits at night for all repos
    latestTime: 0, // the latest commit time.
};
export let mostCommits = {
    // most commits times in a day for year 2019
    total: 0,
    date: '', // date time for this day
    totalToTheRepo: 0, //
    theRepo: '', // the special reop's name
};
export const fifthData = {
    commits: 0,
    issues: 0,
    additions: 0,
    deletions: 0,
};

let dayCommitsDirectory = {}; // key: date ,value: commits info list

export const requestRepos = async username => {
    repos = await fetchRepos(username);
};

export const requestContributors = async username => {
    const contributorList = await Promise.all(
        repos.map(async repo => fetchContributors(username, repo.name))
    );

    contributorList.forEach(item => {
        item.forEach(({ total, weeks, author }) => {
            if (!author || author.login !== username) return;

            fifthData.commits += total;
            weeks.forEach(({ a, d }) => {
                fifthData.additions += a;
                fifthData.deletions += d;
            });
        });
    });
};

export const requestIssues = async username => {
    const issueList = await Promise.all(
        repos.map(async repo => fetchIssues(username, repo.name))
    );

    issueList.forEach(item => {
        item.forEach(({ user }) => {
            if (!user) return;
            if (user.login === username) {
                fifthData.issues++;
            }
        });
    });
};

export const requestUser = async username => {
    user = await fetchUser(username);
};

export const requestFollowing = async username => {
    let res = await get('first_following');
    if (res) {
        first_following = res;
        return;
    }

    res = await fetchFollowing(username);
    if (res.length) {
        first_following = res[0].login;
        set('first_following', first_following);
    }
};

export const requestCommits = async username => {
    dayCommitsDirectory = {};
    commitsAtNight = {
        total: 0,
        latestTime: 0,
    };

    await Promise.all(
        repos.map(async repo => {
            const commitsList = await fetchCommits(username, repo.name);
            // 计算晚上提交的commits数据
            commitsList.forEach(({ commit }) => {
                const { name, date } = commit.author;
                if (name === username && is2019(date)) {
                    const dateMonth = new Date(date).toLocaleDateString();
                    if (!dayCommitsDirectory[dateMonth]) {
                        dayCommitsDirectory[dateMonth] = [
                            {
                                ...commit,
                                repoName: repo.name,
                            },
                        ];
                    } else {
                        dayCommitsDirectory[dateMonth].push({
                            ...commit,
                            repoName: repo.name,
                        });
                    }

                    let time = new Date(date);
                    const hours = time.getHours();

                    if (hours < 21) {
                        return;
                    }
                    commitsAtNight.total++;

                    const minutes = time.getMinutes();
                    time = hours + minutes / 100;

                    if (time > commitsAtNight.latestTime) {
                        commitsAtNight.latestTime = time;
                    }
                }
            });
        })
    );

    console.log(commitsAtNight);
};

// 分析获得哪天的commits最多，并且计算出这天的commits最多的仓库/数量是多少
export const getMostCommitsInOneDay = () => {
    const tempMostCommits = {};
    let dateIndex;
    let total = 0;
    for (let date in dayCommitsDirectory) {
        if (!date) continue;
        if (dayCommitsDirectory[date].length >= total) {
            dateIndex = date;
            total = dayCommitsDirectory[date].length;
        }
    }

    tempMostCommits.total = total;
    tempMostCommits.date = dateIndex;

    const repoCommitsDirectory = {};
    // 判断这天哪个仓库commit最多
    dayCommitsDirectory[dateIndex].forEach(commit => {
        if (!repoCommitsDirectory[commit.repoName]) {
            repoCommitsDirectory[commit.repoName] = [commit];
        } else {
            repoCommitsDirectory[commit.repoName].push(commit);
        }
    });

    let repoName;
    let commitsForRepo = 0;
    for (let name in repoCommitsDirectory) {
        if (!name) continue;
        if (repoCommitsDirectory[name].length >= commitsForRepo) {
            repoName = name;
            commitsForRepo = repoCommitsDirectory[name].length;
        }
    }

    tempMostCommits.totalToTheRepo = commitsForRepo;
    tempMostCommits.theRepo = repoName;

    mostCommits = tempMostCommits;
};

export const fetchData = async username => {
    await Promise.all([requestRepos(username), requestUser(username)]);

    requestFollowing(username);
    return {
        created_at: dealTime(user.created_at),
        first_repo: repos[repos.length - 1].name,
        days: days2Now(user.created_at),
    };
};
