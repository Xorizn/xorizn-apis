//server
__path = process.cwd()
var express = require('express');
var router = express.Router();

//module
const axios = require('axios'),
  request = require('request'),
  develop = '@xorizn';

async function GetBuff(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });
    const base64 = `${response.data.toString('base64')}`
    const buffer = Buffer.from(base64, 'base64')
    return buffer
  } catch (err) {
    console.error(err)
  }
}
const PromiseRes = (hasil) => {
  return { developer: '@xorizn', status: 200, result: hasil }
}
//Module downloads
const { textpro } = require('../lib/apis/textpro')
const { Base } = require('../lib/apis/base')
const { Pinterest, Wallpaper, WallpaperFlare } = require('../lib/apis/image')
const { Surah, JadwalSholat } = require('../lib/apis/islam')
const { InfoGempa, InfoGempa_2, Covid_World, Covid_Country, Kompas_Global, Kompas_News, Kompas_Terpopuler, CnBc, RumahKeadilan } = require('../lib/apis/news')
const { GithubRepo, GithubStalk, StoryIG } = require('../lib/apis/stalk')
const { MalSearchAnime, MalSearchCharacter, MalSearchManga, MalUpcoming } = require('../lib/apis/anime')
const { WaifuGenerator, QuotesAnime, NekopoiDcVideo, Hentai, DarkJokes, Waifu, Nsfw, Sfw } = require('../lib/apis/random')
const { ListHero, Hero, TixID } = require('../lib/apis/search')

//function
const mess = {
  null_api: {
    developer: develop,
    mess: "Input parameter 'apikey'"
  },
  null_url: {
    developer: develop,
    mess: "Input parameter 'url'"
  },
  null_username: {
    developer: develop,
    mess: "Input parameter 'username'"
  },
  null_search: {
    developer: develop,
    mess: "Input parameter 'search'"
  },
  null_icon: {
    developer: develop,
    mess: "Input parameter 'icon'"
  },
  null_user: {
    developer: develop,
    mess: "Input parameter 'user'"
  },
  null_bgurl: {
    developer: develop,
    mess: "Input parameter 'bgurl'"
  },
  null_name: {
    developer: develop,
    mess: "Input parameter 'name'"
  },
  null_gcname: {
    developer: develop,
    mess: "Input parameter 'gcname'"
  },
  null_picurl: {
    developer: develop,
    mess: "Input parameter 'picurl'"
  },
  null_avatar: {
    developer: develop,
    mess: "Input parameter 'avatar'"
  },
  null_gcicon: {
    developer: develop,
    mess: "Input parameter 'gcicon'"
  },
  null_iminator: {
    developer: develop,
    mess: "Input parameter 'iminator'"
  },
  null_text: {
    developer: develop,
    mess: "Input parameter 'text'"
  },
  null_text2: {
    developer: develop,
    mess: "Input parameter 'text2'"
  },
  null_mem: {
    developer: develop,
    mess: 'Input parameter number of mem'
  },
  null_nomer: {
    developer: develop,
    mess: "Input parameter 'nomer'"
  },
  is_url: {
    developer: develop,
    mess: 'Insert url!'
  }
}

router.get('/base/:type', async (req, res, next) => {
  try {
    const type = req.params.type,
      encode = req.query.encode,
      decode = req.query.decode;

    if (type == 'base64' && encode) {
      var hasil = await Base("b64enc", encode)
      res.json(PromiseRes(hasil)).status(200)
    } else if (type == 'base64' && decode) {
      var hasil = await Base("b64dec", decode)
      res.json(PromiseRes(hasil)).status(200)
    } else if (type == 'base32' && encode) {
      var hasil = await Base('b32enc', encode)
      res.json(PromiseRes(hasil)).status(200)
    } else if (type == 'base32' && decode) {
      var hasil = await Base('b32dec', decode)
      res.json(PromiseRes(hasil)).status(200)
    } else if (!(encode || decode)) {
      res.json({ developer: develop, message: 'add encode/decode parameters' })
    } else {
      res.json({ developer: develop, mess: `type ${type} not found, available types: base64, base32` })
    }
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})

//==================================NEWS==================================\\
router.get('/news/gempa', async (req, res, next) => {
  try {
    let hasil = await InfoGempa()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/news/v2/:type', async (req, res, next) => {
  try {
    const type = req.params.type,
      tipes = ['cnn-news', 'cnbc-news', 'republika-news', 'tempo-news', 'kumparan-news', 'okezone-news', 'bbc-news', 'vice', 'suara', 'voa']
    if (!tipes.includes(type)) return res.json({ developer: develop, mess: type + ` not found, try input: ${tipes.join(', ')}` })

    let { data } = await axios.get('https://berita-indo-api.vercel.app/v1/' + type)
    res.json(PromiseRes(data.data)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/news/gempa2', async (req, res, next) => {
  try {
    let hasil = await InfoGempa_2()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/news/covid/world', async (req, res, next) => {
  try {
    let hasil = await Covid_World()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/news/covid/country/:negara', async (req, res, next) => {
  try {
    const negara = req.params.negara;

    let hasil = await Covid_Country(negara)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/news/kompas/:type', async (req, res, next) => {
  try {
    const type = req.params.type,
      tipes = ['global', 'news', 'terpopuler'];
    if (tipes.includes(type)) return res.json({ developer: develop, mess: type + ' kompas not found' })

    if (type === 'global') {
      var hasil = await Kompas_Global()
    } else if (type === 'news') {
      var hasil = await Kompas_News()
    } else if (type === 'terpopuler') {
      var hasil = await Kompas_Terpopuler()
    }
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/news/cnbc/:type', async (req, res, next) => {
  try {
    const type = req.params.type,
      list = ['news', 'market', 'investment', 'entrepreneur', 'syariah', 'tech', 'lifestyle'];
    if (!list.includes(type)) return res.json({ developer: develop, mess: `categories ${type} not found, available categories: ${list.join(', ')}` });

    let hasil = await CnBc(type)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/news/rumahkeadilan', async (req, res, next) => {
  try {
    let hasil = await RumahKeadilan()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/news/tixid', async (req, res, next) => {
  try {
    let hasil = await TixID()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
//==================================STALK==================================\\
router.get('/stalk/instagram/:type', async (req, res, next) => {
  try {
    const user = req.query.username,
      type = req.params.type,
      tipes = ['profile', 'story', 'post', 'highlights', 'cash'];
    if (!tipes.includes(type)) return res.json({ developer: develop, mess: type + ' instagram not found' })
    if (!user) return res.json(mess.null_username)
    const anya = { headers: { accept: '*/*', 'cookie': '_ga=GA1.2.1207987969.1680840450; __gads=ID=b26fd0857b3cff25-22ccef1502df0050:T=1680840450:RT=1680840450:S=ALNI_MaDqL-T5KCdhDZoTOiXpOvdcwJBdA; _gid=GA1.2.866837131.1681305528; __gpi=UID=00000bedb580261c:T=1680840450:RT=1681378876:S=ALNI_MacS9h_essTbZighLSVsRkvI1pm8A; ab_tests=%7B%7D; _gat=1', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0' } }
    if (type === 'profile') {
      var { data } = await axios.get('https://storiesig.me/api/profile/info?username=' + user, anya)
    } else if (type === 'story') {
      var data = await StoryIG(user)
    } else if (type === 'post') {
      var { data } = await axios.get('https://storiesig.me/api/profile/publications?username=' + user, anya)
    } else if (type === 'highlights') {
      var { data } = await axios.get('https://storiesig.me/api/profile/highlights?username=' + user, anya)
    } else if (type === 'cash') {
      var { data } = await axios.get('https://storiesig.me/api/profile/cash?username=' + user, anya)
    }
    res.json(PromiseRes(data)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/stalk/github/:type', async (req, res, next) => {
  try {
    const user = req.query.username,
      type = req.params.type,
      tipes = ['profile', 'repo'];
    if (!tipes.includes(type)) return res.json({ developer: develop, mess: type + ' github not found' })
    if (!user) return res.json(mess.null_username)
    if (type === 'profile') {
      var hasil = await GithubStalk(user)
    } else if (type === 'repo') {
      var hasil = await GithubRepo(user)
    }
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/stalk/npm', async (req, res, next) => {
  try {
    const query = req.params.npm;

    if (!query) return res.json({ developer: develop, mess: "Input parameter 'npm'" })

    let { data } = await axios.get('https://registry.npmjs.org/' + query)
    res.json(PromiseRes(data)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
//==================================ANIMEEEEEEEEEEE==================================\\
router.get('/myanimelist/:type', async (req, res, next) => {
  try {
    const search = req.query.search,
      type = req.params.type,
      tipes = ['character', 'manga', 'anime', 'topanime'];

    if (!tipes.includes(type)) return res.json({ developer: develop, mess: type + ' myanimelist not found' })

    if (type === 'character') {
      if (!search) return res.json(mess.null_search)
      var hasil = await MalSearchCharacter(search)
    } else if (type === 'manga') {
      if (!search) return res.json(mess.null_search)
      var hasil = await MalSearchManga(search)
    } else if (type === 'anime') {
      if (!search) return res.json(mess.null_search)
      var hasil = await MalSearchAnime(search)
    } else if (type === 'topanime') {
      var hasil = await MalUpcoming()
    }
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/myanimelist/topanime/:type', async (req, res, next) => {
  try {
    const type = req.params.type,
      tipes = ['airing', 'upcoming', 'tv', 'movie', 'ova', 'ona', 'special', 'bypopularity', 'favorite'];
    if (!tipes.includes(type)) return res.json({ developer: develop, mess: type + ' myanimelist not found' })

    let hasil = await MalUpcoming(type)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
//==================================RANDOM==================================\\
router.get('/random/quotes-anime', async (req, res, next) => {
  try {
    let hasil = await QuotesAnime()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/random/waifu-generator', async (req, res, next) => {
  try {
    let hasil = await WaifuGenerator()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/random/nekopoi', async (req, res, next) => {
  try {
    let hasil = await NekopoiDcVideo()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/random/hentai', async (req, res, next) => {
  try {
    let hasil = await Hentai()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/random/darkjokes', async (req, res, next) => {
  try {
    let hasil = await DarkJokes()
    let buffer = await GetBuff(hasil)
    res.type('png').send(buffer);
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/random/waifu', async (req, res, next) => {
  try {
    const type = req.query.type,
      listtp = ['nsfw', 'sfw'],
      tipes = type ? type : 'sfw'
    if (!listtp.includes(tipes)) return res.json({
      developer: develop, mess: `type ${type} not found, available types: ${listtp.join(', ')}`
    })

    let hasil = await Waifu(tipes)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/random/sfw', async (req, res, next) => {
  try {
    const type = req.query.type,
      ctgr = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'],
      tipes = type ? type : 'waifu'
    if (!ctgr.includes(tipes)) return res.json({
      developer: develop, mess: `type ${type} not found, available types: ${ctgr.join(', ')}`
    })

    let hasil = await Sfw(tipes)
    let buffer = await GetBuff(hasil.url)
    res.type('png').send(buffer);
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/random/nsfw', async (req, res, next) => {
  try {
    const type = req.query.type,
      ctgr = ['waifu', 'neko', 'trap', 'blowjob'],
      tipes = type ? type : 'waifu'

    if (!ctgr.includes(tipes)) return res.json({
      developer: develop, mess: `type ${type} not found, available types: ${ctgr.join(', ')}`
    })

    let hasil = await Nsfw(tipes)
    let buffer = await GetBuff(hasil.url)
    res.type('png').send(buffer);
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
//===========IMAGE==========\\
router.get('/image/pinterest/v2', async (req, res, next) => {
  try {
    const search = req.query.search;

    if (!search) return res.json(mess.null_search)

    let hasil = await Pinterest(search)
    let rdm = hasil[Math.floor(hasil.length * Math.random())];
    let buffer = await GetBuff(rdm)
    res.type('png').send(buffer);
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/image/pinterest', async (req, res, next) => {
  try {
    const search = req.query.search;

    if (!search) return res.json(mess.null_search)

    let hasil = await Pinterest(search)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/image/wallpaperflare', async (req, res, next) => {
  try {
    const search = req.query.search;

    if (!search) return res.json(mess.null_search)

    let hasil = await WallpaperFlare(search)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/image/wallpaper', async (req, res, next) => {
  try {
    const search = req.query.search;

    if (!search) return res.json(mess.null_search)

    let hasil = await Wallpaper(search)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})

//===========TEXTPRO===========\\
router.get('/textpro/:type', async (req, res, next) => {
  try {
    const type = req.params.type,
      text = req.query.text,
      anu = 'https://textpro.me/';

    if (!text) return res.json(mess.null_text)

    let link
    if (/holo/.test(type)) link = anu + 'hologram-color-3d-text-effect-generator-online-1117.html'
    if (/fluid/.test(type)) link = anu + 'fluid-art-metal-paint-text-effect-maker-1118.html'
    if (/deep-sea/.test(type)) link = anu + 'create-3d-deep-sea-metal-text-effect-online-1053.html' //de
    if (/thunder2/.test(type)) link = anu + 'online-thunder-text-effect-generator-1031.html' //thund
    if (/thunder/.test(type)) link = anu + 'create-thunder-text-effect-online-881.html'
    if (/matrix/.test(type)) link = anu + 'matrix-style-text-effect-online-884.html'
    if (/technology/.test(type)) link = anu + 'create-a-futuristic-technology-neon-light-text-effect-1006.html'
    if (/devilwings/.test(type)) link = anu + 'create-neon-devil-wings-text-effect-online-free-1014.html'
    if (/blackpink2/.test(type)) link = anu + 'create-neon-light-blackpink-logo-text-effect-online-1081.html'
    if (/glitch/.test(type)) link = anu + 'create-impressive-glitch-text-effects-online-1027.html'
    if (/whitegold/.test(type)) link = anu + 'elegant-white-gold-3d-text-effect-online-free-1070.html'
    if (/ice/.test(type)) link = anu + 'ice-cold-text-effect-862.html'
    if (/frozen/.test(type)) link = anu + 'create-realistic-3d-text-effect-frozen-winter-1099.html'
    if (/candy/.test(type)) link = anu + 'create-christmas-candy-cane-text-effect-1056.html'
    if (/bokeh/.test(type)) link = anu + 'bokeh-text-effect-876.html'
    if (/holographic/.test(type)) link = anu + 'holographic-3d-text-effect-975.html'
    if (/orange/.test(type)) link = anu + 'create-a-3d-orange-juice-text-effect-online-1084.html'
    if (/berry/.test(type)) link = anu + 'create-berry-text-effect-online-free-1033.html'
    if (/comic/.test(type)) link = anu + 'create-3d-comic-text-effects-online-1091.html'
    if (/luxury/.test(type)) link = anu + 'create-a-3d-luxury-metallic-text-effect-for-free-1071.html'
    if (/blackpink/.test(type)) link = anu + 'create-blackpink-logo-style-online-1001.html'
    if (/cloud/.test(type)) link = anu + 'create-a-cloud-text-effect-in-the-sky-online-997.html'
    if (/newyear/.test(type)) link = anu + 'new-year-celebration-3d-gold-text-effect-1102.html'
    if (/multicolor/.test(type)) link = anu + 'create-3d-multicolor-paint-text-effect-online-1114.html'
    if (/halloween/.test(type)) link = anu + 'halloween-fire-text-effect-940.html'
    if (/batman/.test(type)) link = anu + 'make-a-batman-logo-online-free-1066.html'
    if (/transformer/.test(type)) link = anu + 'create-a-transformer-text-effect-online-1035.html'
    if (/blackpink3/.test(type)) link = anu + 'create-a-blackpink-logo-decorated-with-roses-online-free-1080.html'
    if (/crystal/.test(type)) link = anu + 'create-luxury-3d-crystal-text-effects-online-1116.html'
    if (/graffiti/.test(type)) link = anu + 'create-wonderful-graffiti-art-text-effect-1011.html'
    if (/pencil/.test(type)) link = anu + 'create-a-sketch-text-effect-online-1044.html'
    if (/paper-cut/.test(type)) link = anu + 'create-art-paper-cut-text-effect-online-1022.html'

    let hasil = await textpro(link, [text])
    let buffer = await GetBuff(hasil.image)
    res.type('png').send(buffer);
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/textpro/v2/:type', async (req, res, next) => {
  try {
    const type = req.params.type,
      text = req.query.text,
      text2 = req.query.text2,
      anu = 'https://textpro.me/';

    if (!text) return res.json(mess.null_text)
    if (!text2) return res.json(mess.null_text2)

    let link
    if (/glitch/.test(type)) link = anu + 'create-glitch-text-effect-style-tik-tok-983.html'
    if (/glitch2/.test(type)) link = anu + 'create-a-glitch-text-effect-online-free-1026.html'
    if (/vintage/.test(type)) link = anu + 'create-realistic-vintage-style-light-bulb-1000.html'
    if (/blackpink/.test(type)) link = anu + 'create-blackpink-s-born-pink-album-theme-logo-online-1092.html'
    if (/thor/.test(type)) link = anu + 'create-thor-logo-style-text-effect-online-1064.html'
    if (/graffiti/.test(type)) link = anu + 'create-a-cool-graffiti-text-on-the-wall-1010.html'
    if (/graffiti2/.test(type)) link = anu + 'create-cool-wall-graffiti-text-effect-online-1009.html'
    if (/pornhub/.test(type)) link = anu + 'pornhub-style-logo-online-generator-free-977.html'
    if (/natural/.test(type)) link = anu + 'natural-leaves-text-effect-931.html'
    if (/marvel/.test(type)) link = anu + 'create-logo-style-marvel-studios-online-971.html'
    if (/marvel2/.test(type)) link = anu + 'create-logo-style-marvel-studios-ver-metal-972.html'
    if (/avengers/.test(type)) link = anu + 'create-3d-avengers-logo-online-974.html'
    if (/space/.test(type)) link = anu + 'create-space-3d-text-effect-online-985.html'
    if (/spooky/.test(type)) link = anu + 'create-a-spooky-halloween-text-effect-online-1046.html'
    if (/layered/.test(type)) link = anu + 'create-layered-text-effects-online-free-1032.html'

    let hasil = await textpro(link, [text, text2])
    let buffer = await GetBuff(hasil.image)
    res.type('png').send(buffer);
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
//================GAME===================\\
router.get('/game/tebak-gambar', async (req, res, next) => {
  try {
    let { data } = await axios.get('https://raw.githubusercontent.com/Xorizn/database-api/main/fun/tebak-gambar.json')
    let hasil = data[Math.floor(data.length * Math.random())]
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/game/caklontong', async (req, res, next) => {
  try {
    let { data } = await axios.get('https://raw.githubusercontent.com/Xorizn/database-api/main/fun/caklontong.json')
    let hasil = data[Math.floor(data.length * Math.random())]
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/game/list-hero-ml', async (req, res, next) => {
  try {
    let hasil = await ListHero()
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/game/detail-hero', async (req, res, next) => {
  try {
    const search = req.query.search;

    if (!search) return res.json(mess.null_search);

    let hasil = await Hero(search)
    if (hasil.mess) return res.status(404).json({ developer: develop, mess: `Not found 404 :(` })
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
//SIMSIMI
router.get('/simsimi', async (req, res, next) => {
  try {
    const text = req.query.text,
      lang = req.query.lang,
      key = req.query.key;

    if (!text) return res.json(mess.null_text);

    let { data } = await axios.post('https://api.simsimi.vn/v1/simtalk', {
      text: text,
      lc: lang ? lang : 'id',
      key: key ? key : ''
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    let rapi = {
      language: data.language,
      text: data.text,
      message: data.message,
      time: data.time
    }
    res.json(PromiseRes(rapi)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
//=============ISLAM============\\
router.get('/islam/surah', async (req, res, next) => {
  try {
    const nomer = req.query.nomer;

    if (!nomer) return res.json(mess.null_nomer);

    let no = Number(nomer)
    if (isNaN(no)) return res.json({ developer: develop, mess: 'Input number, not a string!' })
    let hasil = await Surah(no)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
router.get('/islam/jadwal-sholat', async (req, res, next) => {
  try {
    const nomer = req.query.nomer;


    let hasil = await JadwalSholat(nomer)
    res.json(PromiseRes(hasil)).status(200)
  } catch (err) {
    res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
  }
})
//SHORT URL
router.get('/shorturl', async (req, res, next) => {
  const url = req.query.url;
  if (!url) return res.json(mess.null_url)
  request(`https://tinyurl.com/api-create.php?url=${url}`, function (error, response, body) {
    try {
      res.json(PromiseRes({ url: body }))
    } catch (err) {
      res.status(500).json({ developer: develop, mess: `${err.toString()}. Report this error to Developer(Xorizn)` })
    }
  })
})

module.exports = router
