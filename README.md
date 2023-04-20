<div align="center">

<h1>Api Scraper</h1>

![xorizn-downloads](https://socialify.git.ci/xorizn/xorizn-apis/image?description=1&forks=1&issues=1&logo=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F26%2F91%2Ff2%2F2691f2fa1a0f078f5f274edf7fea6763.png&owner=1&pulls=1&stargazers=1&theme=Light)

</div>

## Other Scraper

- [DOWNLOADS-API](https://github.com/Xorizn/xorizn-downloads)
- [SEARCH-API](https://github.com/Xorizn/xorizn-api#stalk)

# List API

### News Api's
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

### Stalk Api's
```http
  GET api/stalk/:param
```
<div id="stalk"></div>
| Param                   | req param  | req query  | Method  | Example     |
| :----------             | :-------   | :-------   |:--      | :--         |
| `/instagram/:type`  | `type:` *profile*, *story*, *post*, *highlights*, *cash* | `username` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/stalk/instagram/profile?username=farrhnn)
| `/github/:type`  | `type:` *profile*, *repo* | `username` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/stalk/github/profile?username=xorizn)
| `/npm`  |  | `packages` | GET | [`=>`](https://xorizn-apis-v1.vercel.app/api/stalk/npm?packages=nhentai)

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
