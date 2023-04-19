const axios = require('axios');
const cheerio = require('cheerio');

function Pinterest(query){
  return new Promise(async(resolve, reject) => {
    try {
      const { data, status } = await axios.get("https://id.pinterest.com/search/pins/?autologin=true&q=" + query, {
        headers: {
          cookie:
            '_auth=1; _b="AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg="; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0',
        },
      })
      if (status === 200) {
        const $ = cheerio.load(data);
        const result = [];
        const hasil = [];
        $("div > a").get().map((b) => {
            const link = $(b).find("img").attr("src");
            result.push(link);
        });
        result.forEach((v) => {
          if (v == undefined) return;
          hasil.push(v.replace(/236/g, "736"));
        });
        hasil.shift();
        if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
        resolve(hasil)
      } else {
        resolve({ developer: '@xorizn', mess: 'no result found' })
      }
    } catch(err) {
      console.error(err)
    }
  })
}

function Wallpaper(query, pages = '1'){
  return new Promise(async(resolve, reject) => {
    try {
      const { data, status } = await axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${pages}&q=${query}`)
      if (status === 200) {
        const $ = cheerio.load(data)
        const hasil = []
        $('div.grid-item').each(function (a, b) {
          hasil.push({
            title: $(b).find('div.info > p').text(),
            type: $(b).find('div.info > a:nth-child(2)').text(),
            source: 'https://www.besthdwallpaper.com' + $(b).find('a').attr('href'),
            image: [$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')]
          })
        })
        if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
        resolve(hasil)
      } else {
        resolve({ developer: '@xorizn', mess: 'no result found' })
      }
    } catch(err) {
      console.error(err)
    }
  })
}
function WallpaperFlare(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query, {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "cookie": "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
        }
      })
      const $ = cheerio.load(data)
      const result = [];
      $('#gallery > li > figure > a').each(function (a, b) {
        result.push($(b).find('img').attr('data-src'))
      })
      resolve(result)
    } catch (err) {
      console.error(err)
    }
  })
}

module.exports = {
  Pinterest,
  Wallpaper,
  WallpaperFlare
}