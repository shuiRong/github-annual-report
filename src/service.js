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
export let fifthData = {
    commits: 0,
    issues: 0,
    additions: 0,
    deletions: 0,
};

let dayCommitsDirectory = {}; // key: date ,value: commits info list

export const requestRepos = async token => {
    repos = await fetchRepos(token);
};

export const requestContributors = async token => {
    const username = user.login;
    fifthData = {
        commits: 0,
        issues: 0,
        additions: 0,
        deletions: 0,
    };

    const contributorList = await Promise.all(
        repos.map(async repo => fetchContributors(repo.full_name, token))
    );

    contributorList.forEach(item => {
        if (!Array.isArray(item)) return;
        item.forEach(({ weeks, author }) => {
            if (!author || author.login !== username) return;

            if (!Array.isArray(weeks)) return;
            weeks.forEach(({ w, a, d, c }) => {
                // 判断是否是2019年产生的
                if (!is2019(w * 1000)) return;

                fifthData.commits += c;
                fifthData.additions += a;
                fifthData.deletions += d;
            });
        });
    });
};

export const requestIssues = async token => {
    const username = user.login;

    const issueList = await Promise.all(
        repos.map(async repo => fetchIssues(repo.full_name, token))
    );

    issueList.forEach(item => {
        if (!Array.isArray(item)) return;
        item.forEach(({ user }) => {
            if (!user) return;
            if (user.login === username) {
                fifthData.issues++;
            }
        });
    });
};

export const requestUser = async token => {
    user = await fetchUser(token);
};

export const requestFollowing = async token => {
    const username = user.login;

    let res = await get('first_following');
    if (res) {
        first_following = res;
        return;
    }

    res = await fetchFollowing(username, token);
    if (res.length) {
        first_following = res[0].login;
        set('first_following', first_following);
    }
};

export const requestCommits = async token => {
    const username = user.login;

    dayCommitsDirectory = {};
    commitsAtNight = {
        total: 0,
        latestTime: 0,
    };

    // TODO: 比如996.TSC 这种不是自己的项目，但自己参与了commits，需要判断

    await Promise.all(
        repos.map(async repo => {
            const commitsList = await fetchCommits(repo.full_name, token);
            // 计算晚上提交的commits数据
            commitsList.forEach(({ commit, author }) => {
                const login = author && author.login;
                const login2 = commit.author.name;
                const date = commit.author.date;
                // const { name, date } = commit.author;
                if (
                    (login === username || login2 === username) &&
                    is2019(date)
                ) {
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
    if (dayCommitsDirectory && dayCommitsDirectory[dateIndex]) {
        dayCommitsDirectory[dateIndex].forEach(commit => {
            if (!repoCommitsDirectory[commit.repoName]) {
                repoCommitsDirectory[commit.repoName] = [commit];
            } else {
                repoCommitsDirectory[commit.repoName].push(commit);
            }
        });
    }

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

export const fetchData = async token => {
    await Promise.all([requestRepos(token), requestUser(token)]);

    requestFollowing(token);
    return {
        created_at: dealTime(user.created_at),
        first_repo: repos[repos.length - 1].name,
        days: days2Now(user.created_at),
    };
};
