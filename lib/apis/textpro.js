const axios = require('axios');
const { JSDOM } = require('jsdom');
const FormData = require("form-data");

async function post(url, formdata = {}, cookies) {
  let encode = encodeURIComponent;
  let body = Object.keys(formdata)
    .map((key) => {
      let vals = formdata[key];
      let isArray = Array.isArray(vals);
      let keys = encode(key + (isArray ? "[]" : ""));
      if (!isArray) vals = [vals];
      let out = [];
      for (let valq of vals) out.push(keys + "=" + encode(valq));
      return out.join("&");
    }).join("&");
  return await axios(`${url}?${body}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: cookies,
    },
  });
}

function textpro(url, text) {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(text)) throw new Error("Text is array");
    if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url)) throw new Error("Wrong url");
    const GetToken = await axios(url);
    let hasilcookie = GetToken.headers.get("set-cookie")[0];
    let dom = new JSDOM(GetToken.data).window.document;
    let an = dom.querySelector('#token-element').innerHTML;
    let token = /<input type="hidden" name="token" value="(.*?)" id="token">/g.exec(an)[1];
    const form = new FormData();
    if (typeof text === "string") text = [text];
    for (let texts of text) form.append("text[]", texts);
    form.append("submit", "Go");
    form.append("token", token);
    form.append("build_server", "https://textpro.me");
    form.append("build_server_id", 1);
    const geturl2 = await axios(url, {
      method: "POST",
      data: form.getBuffer(),
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "GoogleBot",
        Cookie: hasilcookie,
        ...form.getHeaders(),
      },
    });
    const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(geturl2.data)[0].replace(/(<([^>]+)>)/gi, '');
    if (!token2) throw new Error("Token Not Found");
    post("https://textpro.me/effect/create-image", JSON.parse(token2), hasilcookie)
      .then(({ data }) => {
        let hasil = {
          image: 'https://textpro.me' + data.fullsize_image,
          image_code: data.image_code
        };
        resolve(hasil);
      })
      .catch((er) => {
        reject(er);
      });
  });
};

module.exports.textpro = textpro