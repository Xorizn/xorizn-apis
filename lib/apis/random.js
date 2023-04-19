const axios = require('axios');
const cheerio = require('cheerio');

function WaifuGenerator() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://waifu-generator.vercel.app/api/v1')
      resolve(data)
    } catch (err) {
      console.error(err)
    }
  })
}
function QuotesAnime() {
  return new Promise(async (resolve, reject) => {
    try {
      const page = Math.floor(Math.random() * 184)
      const { data } = await axios.get('https://otakotaku.com/quote/feed/' + page)
      const $ = cheerio.load(data)
      const hasil = []
      $('div.kotodama-list').each(function (l, h) {
        hasil.push({
          link: $(h).find('a').attr('href'),
          gambar: $(h).find('img').attr('data-src'),
          karakter: $(h).find('div.char-name').text().trim(),
          anime: $(h).find('div.anime-title').text().trim(),
          episode: $(h).find('div.meta').text(),
          up_at: $(h).find('small.meta').text(),
          quotes: $(h).find('div.quote').text().trim()
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function NekopoiDcVideo() {
  return new Promise(async (resolve, reject) => {
    try {
      const random = require('./random_data').Random_neko()
      const rdm = random[Math.floor(random.length * Math.random())];
      resolve(rdm)
    } catch (err) {
      console.error(err)
    }
  })
}
function Hentai() {
  return new Promise(async (resolve, reject) => {
    try {
      const page = Math.floor(Math.random() * 1153)
      const { data } = await axios.get('https://sfmcompile.club/page/' + page)
      const $ = cheerio.load(data)
      const hasil = []
      $('#primary > div > div > ul > li > article').each(function (a, b) {
        hasil.push({
          title: $(b).find('header > h2').text(),
          link: $(b).find('header > h2 > a').attr('href'),
          category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
          share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
          views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
          type: $(b).find('source').attr('type') || 'image/jpeg',
          video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
          video_2: $(b).find('video > a').attr('href') || ''
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function DarkJokes() {
  return new Promise(async (resolve, reject) => {
    try {
      const random = require('./random_data').random_dark()
      const rdm = random[Math.floor(random.length * Math.random())];
      const url = rdm.result;
      resolve(url)
    } catch (err) {
      console.error(err)
    }
  })
}
function Waifu(type = 'sfw') {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios(`https://api.waifu.pics/many/${type}/waifu`, {
        method: 'post',
        data: new URLSearchParams(Object.entries({ "exclude": [] }))
      })
      resolve(data.files)
    } catch (err) {
      console.error(err)
    }
  })
}
function Nsfw(category = 'waifu') {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://api.waifu.pics/nsfw/` + category);
      resolve(data)
    } catch (err) {
      console.error(err)
    }
  })
}
function Sfw(category = 'waifu') {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://api.waifu.pics/sfw/` + category)
      resolve(data)
    } catch (err) {
      console.error(err)
    }
  })
}

module.exports = {
  WaifuGenerator,
  QuotesAnime,
  NekopoiDcVideo,
  Hentai,
  DarkJokes,
  Waifu,
  Nsfw,
  Sfw
}