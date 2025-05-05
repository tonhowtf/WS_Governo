const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

const urlpai = "https://www.gov.br/mds/pt-br/noticias-e-conteudos/noticias"

mongoose.connect('mongodb+srv://tonhowtf:@cluster0.d6ps0ri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(result => {
    console.log('Conexão funcionando!')
  })
  .catch(error => {
    console.log('Deu problema! ' + error)
  });

function extraidados(link) {
  axios.get(link)
    .then(resp => {
      const dadoshtml = resp.data
      const $ = cheerio.load(dadoshtml)
      const titulo = $('h1').text()
      const linkimg = $('img').attr('src')
      const datapublicacao = $('.value').text()
      const texto = $('div[property="rnews:articleBody"]').text();
      const dados = { titulo, linkimg, datapublicacao, texto }

      console.log(dados)
    })
}

const links = axios.get(urlpai)
  .then(resp => {
    const dadoshtml = resp.data;
    const $ = cheerio.load(dadoshtml);
    const noticias = []
    $('a.summary.url')
      .each((i, e) => {
        const link = $(e).attr('href')
        noticias.push(link)
      });
    return noticias
  });


async function main() {
  const lnks = await links;
  lnks.map((i, e) => {
    extraidados(i);
  })

};

main();