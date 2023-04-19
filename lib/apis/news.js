const axios = require('axios');
const cheerio = require('cheerio');

const get = async (url) => {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    return $
  } catch (err) {
    console.error(err)
    return { mess: 'error' }
  }
}

function InfoGempa(){
  return new Promise(async(resolve, reject) => {
    try{
      const { data, status } = await axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg');
      const $ = cheerio.load(data)
      const hasil = []
      $('table.table-hover.table-striped > tbody > tr').each((i,u) => {
        let posisi = $(u).find('td:nth-child(3)').text().split(' ')
        let map = $(u).find('td:nth-child(6) > a').attr('data-target').replace().replace(/#/g, '')
        let wilayah_data = $(u).find('td:nth-child(6) > div').html()
        let wilayah = wilayah_data.match(/<span class="label label-warning">(.*?)<\/span>/g)
        .map(wilayah_data => wilayah_data.replace(/<\/?span.*?>/g, '').replace(/\t/g, ' '));

        hasil.push({
          index: $(u).find('td:nth-child(1)').text(),
          waktu: $(u).find('td:nth-child(2)').html().replace(/<br>/g, ' '),
          lintang: `${posisi[0]} ${posisi[1]}`,
          bujur: `${posisi[2]} ${posisi[3]}`,
          magnitudo: $(u).find('td:nth-child(4)').text(),
          kedalaman: $(u).find('td:nth-child(5)').text(),
          wilayah: $(u).find('td:nth-child(6) > a').text(),
          wilayah_dirasakan: wilayah,
          img_map: `https://ews.bmkg.go.id/TEWS/data/${map}.mmi.jpg`,
          google_map: `https://www.google.com/maps/place/${posisi[0]}%C2%B0S+${posisi[2]}%C2%B0E`
        })
      })
      resolve(hasil)
    } catch(err) {
      console.error(err)
    }
  })
}

function InfoGempa_2(){
  return new Promise(async(resolve, reject) => {
    try {
      const { data, status } = await axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg')
      if (status === 200) {
        const $ = cheerio.load(data);
        let gempa = $('table.table-hover.table-striped');
        let map = $(gempa).find('tbody > tr > td:nth-child(6) > a').attr('data-target').replace().replace(/#/g, '');
        for (let i = 0; i < gempa.length; i++) {
          let _gempa = $(gempa[i]).find('tbody')[0];
          if (_gempa) {
            let _url = $(_gempa).find('tr')[0];
            let tanggal = $(_url).find('td')[1];
            let letak = $(_url).find('td')[2];
            let magnitudo = $(_url).find('td')[3];
            let kedalaman = $(_url).find('td')[4];
            let wilayah = $(_url).find('td')[5];
            let lintang = $(letak).text().split(' ')[0];
            let bujur = $(letak).text().split(' ')[2];
            let hasil = {
              waktu: $(tanggal).text(),
              lintang: lintang,
              bujur: bujur,
              magnitudo: $(magnitudo).text(),
              kedalaman: $(kedalaman).text().replace(/\t/g, '').replace(/I/g, ''),
              wilayah: $(wilayah).text().replace(/\t/g, '').replace(/I/g, '').replace('-', '').replace(/\r/g, '').split('\n')[0],
              img_map: `https://ews.bmkg.go.id/TEWS/data/${map}.mmi.jpg`,
              google_map: `https://www.google.com/maps/place/${lintang}%C2%B0S+${bujur}%C2%B0E`
            };
            resolve(hasil);
          };
        };
      } else {
        resolve({ developer: '@xorizn', mess: 'no result found' })
      }
    } catch(err) {
      console.error(err)
    }
  })
}

function Covid_World(){
  return new Promise(async(resolve, reject) => {
    try {
      const { data, status } = await axios.get('https://www.worldometers.info/coronavirus/')
      if (status === 200) {
        const $ = cheerio.load(data);
        let _data = [];
        let _case = [];
        let lastUp
        $('.maincounter-number').each((i, e) => {
          _data.push($(e).text().trim());
        });
        $('.number-table-main').each((i, e) => {
          _case.push($(e).text().trim());
        });
        lastUp = $('div[style="font-size:13px; color:#999; margin-top:5px; text-align:center"]').text();
        let hasil = {
          total_cases: _data[0],
          recovered: _data[2],
          deaths: _data[1],
          active_cases: _case[0],
          closed_cases: _case[1],
          last_update: lastUp.replace('Last updated: ', '').replace(', 17:50 GMT', '').trim(),
        };
        resolve(hasil)
      } else {
        resolve({ developer: '@xorizn', mess: 'no result found' })
      }
    } catch(err) {
      console.error(err)
    }
  })
}

function Covid_Indo2(){
  return new Promise(async(resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.antaranews.com/covid-19')
      const $ = cheerio.load(data)
      const covid = $('div.col-md-8 > div:nth-child(2)')
      const hasil = {
        dirawat: covid.find('div:nth-child(1) > div:nth-child(2)').text(),
        terkonfirmasi: covid.find('div:nth-child(2) > span:nth-child(2)').text(),
        terkonfirmasi_tambahan: covid.find('div:nth-child(2) > span:nth-child(3)').text(),
        sembuh: covid.find('div:nth-child(3) > div:nth-child(2)').text(),
        meniggal: covid.find('div:nth-child(4) > div:nth-child(2)').text(),
        last_update: covid.find('div:nth-child(5)').text().trim(),
      }
      resolve(hasil)
    } catch(err) {
      console.error(err)
    }
  })
}

function Covid_Indo() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.worldometers.info/coronavirus/country/indonesia/')
      const $ = cheerio.load(data)
      let _data = [];
      let _info = [];
      let lastUp = $('div[style="font-size:13px; color:#999; text-align:center"]').text();
      $('li.news_li').each((u, i) => {
        _info.push($(i).text().trim())
      })
      $('.maincounter-number').each((i, e) => {
        _data.push($(e).text().trim());
      });

      let hasil = {
        total_cases: _data[0],
        recovered: _data[2],
        deaths: _data[1],
        last_update: lastUp,
        info: _info[0]
      }
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}

function Covid_Country(country) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.worldometers.info/coronavirus/country/' + country)
      const $ = cheerio.load(data)
      let _data = [];
      let _info = [];
      let lastUp = $('div[style="font-size:13px; color:#999; text-align:center"]').text();
      $('li.news_li').each((u, i) => {
        _info.push($(i).text().trim())
      })
      $('.maincounter-number').each((i, e) => {
        _data.push($(e).text().trim());
      });
      if (typeof _data[0] === 'undefined') return resolve({ developer: '@xorizn', mess: 'Country not found' })
      let hasil = {
        total_cases: _data[0],
        recovered: _data[2],
        deaths: _data[1],
        last_update: lastUp,
        info: _info[0]
      }
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}

function Kompas_Global(){
  return new Promise(async(resolve, reject) => {
    try {
      const ros = await get('https://www.kompas.com/global')
      const _data = [];
      ros('div.row div.col-bs10-7 div.trenLatest div.trenLatest__item').each((i, u) => {
        var hasil = {
          judul: ros(u).find('div.trenLatest__box h3.trenLatest__title').text().trim(),
          tanggal: ros(u).find('div.trenLatest__box div.tren__date').text(),
          img: ros(u).find('div.trenLatest__img a img').attr('src'),
          link: ros(u).find('div.trenLatest__img a').attr('href')
        }
        _data.push(hasil)
      })
      if (_data.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(_data)
    } catch(err) {
      console.error(err)
    }
  })
}

function Kompas_News(){
  return new Promise(async(resolve, reject) => {
    try {
      const ros = await get('https://news.kompas.com/')
      const _data = [];
      ros('div.col-bs10-7 div.latest div.ga--latest div.row div.col-bs9-3').each((i, u) => {
        var hasil = {
          judul: ros(u).find('div.article__grid div.article__box h3.article__title a').text(),
          deskripsi: ros(u).find('div.article__grid div.article__box div.article__lead').text(),
          tanggal: ros(u).find('div.article__grid div.article__box div.article__date').text(),
          artikel: ros(u).find('div.article__grid div.article__boxsubtitle h2').text().trim(),
          img: ros(u).find('div.article__grid div.article__asset a img').attr('data-src'),
          link: ros(u).find('div.article__grid div.article__asset a').attr('href')
        }
        _data.push(hasil)
      })
      if (_data.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(_data)
    } catch(err) {
      console.log(err)
    }
  })
}

function Kompas_Terpopuler(){
  return new Promise(async(resolve, reject) => {
    try {
      const ros = await get('https://indeks.kompas.com/terpopuler')
      const _data = [];
      ros('div.col-bs10-7 div.latest--indeks div.article__list').each((i, u) => {
        var hasil = {
          judul: ros(u).find('div.article__list__title h3').text(),
          tanngal: ros(u).find('div.article__list__info div.article__date').text(),
          img: ros(u).find('div.article__list__asset div.article__asset img').attr('src'),
          link: ros(u).find('div.article__list__title h3 a').attr('href')
        }
        _data.push(hasil)
      })
      if (_data.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(_data)
    } catch(err) {
      console.log(err)
    }
  })
}

function CnBc(category){
  return new Promise(async(resolve, reject) => {
    try {
      const _ktgr = category.toLowerCase();
      let link
      if (/news/.test(_ktgr)) link = 'news'
      if (/market/.test(_ktgr)) link = 'market'
      if (/investment/.test(_ktgr)) link = 'investment'
      if (/entrepreneur/.test(_ktgr)) link = 'entrepreneur'
      if (/syariah/.test(_ktgr)) link = 'syariah'
      if (/tech/.test(_ktgr)) link = 'tech'
      if (/lifestyle/.test(_ktgr)) link = 'lifestyle'

      const ros = await get('https://www.cnbcindonesia.com/' + link)
      const _data = [];
      ros('article').each((i, u) => {
        let link = ros(u).find('a').attr('href')
        let title = ros(u).find('a').attr('dtr-ttl')
        let time = ros(u).find('a > .box_text > .date').text()
        let img = ros(u).find('a > .box_img > .lqd > img').attr('src')
        if (typeof link === 'undefined') return
        let hasil = {
          waktu: time,
          title: title,
          img: img,
          link: link
        }
        _data.push(hasil)
      })
      if (_data.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(_data)
    } catch(err) {
      console.log(err)
    }
  })
}
function RumahKeadilan(){
  return new Promise(async(resolve, reject) => {
    try {
      const ros = await get('https://rumahkeadilan.co.id/')
      const _data = [];
      ros('div.site div.content-area article').each((i, u) => {
        var hasil = {
          judul: ros(u).find('div.inside-article header h2').text(),
          penulis: ros(u).find('div.inside-article header span').first().text().replace('by', ''),
          deskripsi: ros(u).find('div.inside-article div.entry-summary p').text().replace('Baca Selengkapnya', ''),
          tautan: ros(u).find('div.inside-article div.post-image a').attr('href'),
          thumbnail: ros(u).find('div.inside-article div.post-image a img').attr('data-lazy-src')
        }
        _data.push(hasil)
      })
      if (_data.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(_data)
    } catch(err) {
      console.log(err)
    }
  })
}

module.exports = {
  InfoGempa,
  InfoGempa_2,
  Covid_World,
  Covid_Indo,
  Covid_Indo2,
  Covid_Country,
  Kompas_Global,
  Kompas_News,
  Kompas_Terpopuler,
  CnBc,
  RumahKeadilan
}