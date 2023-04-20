const axios = require('axios')
const cheerio = require('cheerio')

function TixID() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.tix.id/tix-now/')
      const $ = cheerio.load(data)
      const hasil = []
      $('div.gt-blog-list > .gt-item').each((i, u) => {
        hasil.push({
          link: $(u).find('.gt-image > a').attr('href'),
          image: $(u).find('.gt-image > a > img').attr('data-src'),
          judul: $(u).find('.gt-title > a').text(),
          tanggal: $(u).find('.gt-details > ul > .gt-date > span').text(),
          deskripsi: $(u).find('.gt-excerpt > p').text(),
        })
      })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function ListHero() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://mobile-legends.fandom.com/wiki/List_of_heroes');
      const $ = cheerio.load(data);
      let _data = []

      $('table.wikitable.sortable > tbody > tr').each((i, u) => {
        let hero_icon = $(u).find('td:nth-child(1) > center > a > img').attr('data-src')
        if (typeof hero_icon === 'undefined') return
        let name = $(u).find('td:nth-child(2)').text().trim()
        let hero_code = $(u).find('td:nth-child(3)').text().trim()
        let role = $(u).find('td:nth-child(4)').text().trim()
        let specialties = $(u).find('td:nth-child(5)').text().trim()
        let laning = $(u).find('td:nth-child(6)').text().trim()
        let release = $(u).find('td:nth-child(7)').text().trim()
        let price = $(u).find('td:nth-child(8)').text().trim()
        _data.push({
          hero_icon: hero_icon,
          name: name,
          hero_code: hero_code,
          role: role,
          specialties: specialties,
          laning: laning,
          release: release,
          price: price,
        })
      })
      resolve(_data)
    } catch (err) {
      console.error(err)
    }
  })
}
function Hero(querry) {
  return new Promise(async (resolve, reject) => {
    try {
      let upper = querry.charAt(0).toUpperCase() + querry.slice(1).toLowerCase()
      const { data, status } = await axios.get('https://mobile-legends.fandom.com/wiki/' + upper);
      if (status === 200) {
        const $ = cheerio.load(data);
        let atributes = []
        let rill = []
        let rull = []
        let rell = []
        let hero_img = $('figure.pi-item.pi-image > a > img').attr('src')
        let desc = $('div.mw-parser-output > p:nth-child(6)').text()
        $('.mw-parser-output > table:nth-child(9) > tbody > tr').each((u, i) => {
          let _doto = []
          $(i).find('td').each((o, p) => { _doto.push($(p).text().trim()) })
          if (_doto.length === 0) return
          atributes.push({
            attribute: _doto[0],
            level_1: _doto[1],
            level_15: _doto[2],
            growth: _doto.pop()
          })
        })
        $('div.pi-item.pi-data.pi-item-spacing.pi-border-color > div.pi-data-value.pi-font').each((i, u) => { rill.push($(u).text().trim()) })
        $('aside.portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default').each((i, u) => { rull.push($(u).html()) })
        const _$ = cheerio.load(rull[1])
        _$('.pi-item.pi-data.pi-item-spacing.pi-border-color').each((l, m) => {
          rell.push(_$(m).text().trim().replace(/\n/g, ':').replace(/\t/g, ''))
        })
        const result = rell.reduce((acc, curr) => {
          const [key, value] = curr.split('::');
          acc[key] = value;
          return acc;
        }, {});
        let anu = {
          hero_img: hero_img,
          desc: desc,
          release: rill[0],
          role: rill[1],
          specialty: rill[2],
          lane: rill[3],
          price: rill[4],
          gameplay_info: {
            durability: rill[5],
            offense: rill[6],
            control_effect: rill[7],
            difficulty: rill[8],
          },
          story_info_list: result,
          story_info_array: rell,
          attributes: atributes
        }
        resolve(anu)
      } else if (status === 400) {
        resolve({ mess: 'hh'})
      }
      console.log(status)
    } catch (err) {
      resolve({ mess: 'asu'})
    }
  })
}

module.exports = {
  TixID,
  ListHero,
  Hero
}