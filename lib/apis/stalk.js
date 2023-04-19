const axios = require('axios');

const anya = {
  headers: {
    accept: '*/*',
    'cookie': 'ab_tests=%7B%7D',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0'
  }
}

function StalkInstagram(username){
  return new Promise(async(reject, resolve) => {
    try {
      let { data, status } = await axios.get('https://storiesig.me/api/profile/info?username=' + username, anya)
      if (status === 200) {
        var husilz = {}
        husilz.info = data;
        resolve(husilz)
      }
    } catch(err) {
      console.error(err)
    }
  })
}

function StoryIG(user){
  return new Promise(async(resolve, reject) => {
    try {
      let { data, status } = await axios.get('https://storiesig.me/api/profile/stories?username=' + user, anya)
      let arr = [];
      for (let i of data) {
        if (i.id) {
          if (i.type === 'video') {
            arr.push({ url: i.url, type: i.type });
          } else {
            arr.push({
              url: i.url,
              url_original: i.originalUrl,
              type: i.type
            });
          };
        };
      };
      resolve(arr)
    } catch(err) {
      console.error(err)
    }
  })
}

function GithubStalk(user) {
  return new Promise(async(resolve, reject) => {
    try {
      const { data, status } = await axios.get(`https://api.github.com/users/${user}`);
      if (data.message) return resolve(data.message);
      const { login, id, node_id, avatar_url, gravatar_id, url, html_url, followers_url, following_url, gists_url, starred_url, subscriptions_url, organizations_url, repos_url, events_url, received_events_url, type, site_admin, name, company, blog, location, email, hireable, bio, twitter_username, public_repos, public_gists, followers, following, created_at, updated_at, } = data;
      var hasil = {
        user: {
          login: login,
          id: id,
          node_id: node_id,
          avatar_url: avatar_url,
          gravatar_id: gravatar_id,
          url: url,
          html_url: html_url,
          followers_url: followers_url,
          following_url: following_url,
          gists_url: gists_url,
          starred_url: starred_url,
          subscriptions_url: subscriptions_url,
          organizations_url: organizations_url,
          repos_url: repos_url,
          events_url: events_url,
          received_events_url: received_events_url,
          type: type,
          site_admin: site_admin,
          name: name,
          company: company,
          blog: blog,
          location: location,
          email: email,
          hireable: hireable,
          bio: bio,
          twitter_username: twitter_username,
          public_repos: public_repos,
          public_gists: public_gists,
          followers: followers,
          following: following,
          created_at: created_at,
          updated_at: updated_at
        }
      };
      resolve(hasil)
    } catch(err) {
      console.error(err)
    }
  })
}

function GithubRepo(user) {
  return new Promise(async(reject, resolve) => {
    try {
      const { data, status } = await axios.get(`https://api.github.com/users/${user}`);
      if (data.message) return resolve(data.message);
      let repos = await axios.get(data.repos_url);
      var hasil = {}
      if (!repos.data) {
        hasil.repos = []
      }
      hasil.repos = repos.data
      resolve(hasil)
    } catch(err) {
      console.error(err)
    }
  })
}

module.exports = {
  GithubRepo,
  GithubStalk,
  StoryIG,
  StalkInstagram
}