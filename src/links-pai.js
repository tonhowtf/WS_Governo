const axios = require('axios');
const cheerio = require('cheerio')

const urlpai = 'https://www.gov.br/mds/pt-br/noticias-e-conteudos/noticias'

axios.get(urlpai)
  .then(resp => {
    const dadoshtml = resp.data;
    const $ = cheerio.load(dadoshtml);
    const noticias = []
    $('a.summary.url')
      .each((i, e) => {
        const link = $(e).attr('href')
        noticias.push(link)
      });
    console.log(noticias)
  })