const axios = require('axios')
const cheerio = require('cheerio')

function Surah(no) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://kalam.sindonews.com/surah/' + no + '/al-fatihah')
      const $ = cheerio.load(data)
      const result = [];
      const ar = [];
      const id = [];
      const lt = [];
      const cc = {};
      $('div.breadcrumb-new > ul > li:nth-child(5)').each(function (c, d) {
        cc.audio = $(d).find('a').attr('href').replace('surah', 'audioframe')
      })
      $('div.ayat-arab').each(function (a, b) {
        ar.push($(b).text())
      })
      $('li > div.ayat-text').each(function (e, f) {
        id.push($(f).text().replace(',', '').trim())
      })
      $('div.ayat-latin').each(function (g, h) {
        lt.push($(h).text().trim())
      })
      for (let i = 0; i < ar.length; i++) {
        result.push({
          arab: ar[i],
          indo: id[i],
          latin: lt[i],
        })
      }
      resolve({ audio: cc.audio, surah: result })
    } catch (err) {
      console.error(err)
    }
  })
}
function JadwalSholat(NO) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://kalam.sindonews.com/jadwalsholat/' + NO)
      const $ = cheerio.load(data)
      const result = [];
      $('div.imsakiyah-content > table > tbody > tr').each(function (a, b) {
        result.push({
          tanggal: $(b).find('td:nth-child(1)').text(),
          imsak: $(b).find('td:nth-child(2)').text(),
          subuh: $(b).find('td:nth-child(3)').text(),
          zuhur: $(b).find('td:nth-child(4)').text(),
          ashar: $(b).find('td:nth-child(5)').text(),
          maghrib: $(b).find('td:nth-child(6)').text(),
          isya: $(b).find('td:nth-child(7)').text()
        })
      })
      resolve(result)
    } catch (err) {
      console.error(err)
    }
  })
}

module.exports = {
  Surah,
  JadwalSholat
}