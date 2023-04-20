<div align="center">

<h1>Api Scraper</h1>

![xorizn-downloads](https://socialify.git.ci/Xorizn/xorizn-apis/image?description=1&descriptionEditable=This%20is%20a%20scraper%20API%20that%20I%20made%20myself.%20You%20can%20use%20it%20by%20entering%20the%20Vercel%20link%20above%20and%20then%20just%20use%20it.%20Below%20there%20is%20an%20example%20of%20how%20to%20use%20this%20API.&font=Jost&forks=1&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FXorizn%2Fimage%2Fmain%2Flight-node-opened-svgrepo-com.svg%3Ftoken%3DGHSAT0AAAAAACAVCJHFBZ67ZLA6JXXDKK5UZCAWG4Q&name=1&owner=1&pattern=Signal&pulls=1&stargazers=1&theme=Light)

</div>

## Other Scraper

- [DOWNLOADS-API](https://github.com/Xorizn/xorizn-downloads)
- [SEARCH-API](#Stalk)

# List API

- [NEWS](#news)
- [STALK](#stalk)
- [ANIME](#anime)
- [RANDOM](#random)
- [IMAGES](#images)
- [TEXT-PRO](#text-pro)
- [GAME](#game)
- [ISLAMIC-AND-OTHER](#islamic-and-other)

### News
```http
  GET api/news/:param
```

| Param                   | req param  | Method | Example     |
| :----------             | :-------   | :--    | :--         |
| `/gempa`                |            | GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/gempa)    |
| `/gempa2`               |            | GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/gempa2)    |
| `/covid/world`          |            | GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/covid/world)    |
| `/covid/country/:negara`| `negara:` all country names around the world| GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/covid/country/indonesia)    |
| `/kompas/:type`         | `type:` *global*, *news*, *terpopuler* | GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/kompas/news)    |
| `/cnbc/:type`           | `type:` *news*, *market*, *investment*, *entrepreneur*, *syariah*, *tech*, *lifestyle* | GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/cnbc/news)    |
| `/rumahkeadilan`        |            | GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/rumahkeadilan)    |
| `/tixid`                |            | GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/tixid)    |
| `/v2/:type`             | `type:` *cnn-news*, *cnbc-news*, *republika-news*, *tempo-news*, *kumparan-news*, *okezone-news*, *bbc-news*, *vice*, *suara*, *voa* | GET    | [`=>`](https://xorizn-apis-v1.vercel.app/api/news/v2/cnn-news)    |

### Stalk
```http
  GET api/stalk/:param
```

| Param                   | req param  | req query  | Method  | Example     |
| :----------             | :-------   | :-------   |:--      | :--         |
| `/instagram/:type`  | `type:` *profile*, *story*, *post*, *highlights*, *cash* | `username` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/stalk/instagram/profile?username=farrhnn)
| `/github/:type`  | `type:` *profile*, *repo* | `username` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/stalk/github/profile?username=xorizn)
| `/npm/v2`  |  | `packages` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/stalk/npm/v2?packages=nhentai)

### Anime
> This anime search api's, include /api

| Param                   | req param  | req query  | Method  | Example     |
| :----------             | :-------   | :-------   |:--      | :--         |
| `/myanimelist/:type` | `type:` *character*, *manga*, *anime*, *topanime* | `search` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/myanimelist/character?search=naruto)
| `/myanimelist/topanime/:type` | `type:` *airing*, *upcoming*, *tv*, *movie*, *ova*, *ona*, *special*, *bypopularity*, *favorite* |  | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/myanimelist/topanime/airing)

### Random
```http
  GET api/random/:param
```

| Param                   | req query  | Method | Example     |
| :----------             | :-------   | :--    | :--         |
| `/quotes-anime` | | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/random/quotes-anime)
| `/waifu-generator` | | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/random/waifu-generator)
| `/nekopoi` | | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/random/nekopoi)
| `/darkjokes` | | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/random/darkjokes)
| `/waifu` | `type:` *nsfw*, *sfw* | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/random/waifu?type=nsfw)
| `/sfw` | `type:` *waifu*, *neko*, *shinobu*, *megumin*, *bully*, *cuddle*, *cry*, *hug*, *awoo*, *kiss*, *lick*, *pat*, *smug*, *bonk*, *yeet*, *blush*, *smile*, *wave*, *highfive*, *handhold*, *nom*, *bite*, *glomp*, *slap*, *kill*, *kick*, *happy*, *wink*, *poke*, *dance*, *cringe* | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/random/sfw?type=waifu)
| `/nsfw` | `type:` *waifu*, *neko*, *trap*, *blowjob* | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/random/nsfw?type=neko)
| `/hentai` | | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/random/hentai)

### Images
```http
  GET api/image/:param
```
| Param                   | req query  | Method | Example     |
| :----------             | :-------   | :--    | :--         |
| `/pinterest/v2` | `search` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/image/pinterest/v2?search=ANIME+ICON)
| `/pinterest` | `search` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/image/pinterest?search=ANIME+ICON)
| ~~`/wallpaperflare`~~ | `search` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/image/wallpaperflare?search=anime) This feature is getting error 504
| `/wallpaper` | `search` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/image/wallpaper?search=anime)


### Text Pro
> This is text maker/generator api's

| Param                   | req param | req query | Method | Example     |
| :----------             | :-------  | :-------- | :--    | :--         |
| `/textpro/:type` | `type:` *holo*, *fluid*, *deep-sea*, *thunder2*, *thunder*, *matrix*, *technology*, *devilwings*, *blackpink2*, *glitch*, *whitegold*, *ice*, *frozen*, *candy*, *bokeh*, *holographic*, *orange*, *berry*, *comic*, *luxury*, *blackpink*, *cloud*, *newyear*, *multicolor*, *halloween*, *batman*, *transformer*, *blackpink3*, *crystal*, *graffiti*, *pencil*, *paper-cut* | `text` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/textpro/holo?text=XORIZN)
| `/textpro/v2/:type` | `type:` *glitch* *glitch2* *vintage* *blackpink* *thor* *graffiti* *graffiti2* *pornhub* *natural* *marvel* *marvel2* *avengers* *space* *spooky* *layered* | `text` `text2` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/textpro/v2/glitch?text=XORIZN&text2=anjas)

### Game
> Features that make you nostalgic and fun

| Param                | query | Method | Example     |
| :----------          |:-- | :--    | :--         |
| `/game/tebak-gambar`| | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/game/tebak-gambar)
| `/game/caklontong`| | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/game/caklontong)
| `/game/list-hero-ml`| | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/game/list-hero-ml)
| `/game/detail-hero`| `search` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/game/detail-hero?search=miya)

### Islamic and other
>This feature helps our Muslim friends. and there are other features

| Param                | query | Method | Example     |
| :----------          |:----- | :--    | :--         |
| `/islam/surah` | `nomer` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/islam/surah?nomer=2)
| `/islam/jadwal-sholat` | `nomer` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/islam/jadwal-sholat?nomer=549)
| `/shorturl` | `url` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/shorturl?url=https://github.com/xorizn)
| `/simsimi` | `text`, `lang:` *default id*,  `key:` *simi api* | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/simsimi?text=hello&lang=en)

## Installation

If you want to add this project in your own machine, you can install this project by following the step below

1. Clone this repository

```
git clone https://github.com/Xorizn/xorizn-downloads.git
```

2. Install dependencies

In my case, i'm using pnpm for package manager, you can adjust with your favorite package manager

```
npm install
```

# MAKASIH LORT
* [`Satya Wikananda`](https://github.com/satyawikananda)

ed by Express and vercel. Code licensed under [MIT License](https://raw.githubusercontent.com/Xorizn/xorizn-downloads/master/LICENSE)
