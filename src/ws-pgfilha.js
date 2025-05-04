const axios = require('axios')
const cheerio = require('cheerio')


const urlfilho = 'https://www.gov.br/mds/pt-br/noticias-e-conteudos/desenvolvimento-social/noticias-desenvolvimento-social/mds-amplia-investimentos-no-amapa-para-inclusao-socioeconomica-e-seguranca-alimentar'

axios.get(urlfilho)
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
