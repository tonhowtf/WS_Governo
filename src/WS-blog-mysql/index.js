const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql2')



const pool = mysql.createPool({
  connectionLimit: 15,
  host: 'localhost',
  user: 'root',
  password: 'senha123',
  database: 'blog'
});

const salvandodados = (dt) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('INSERT INTO noticias set ?', dt, function (error, result, fields) {
      console.log('Cadastrando noticias');
      connection.release();

      if (error) throw error;
    })
  })
}

function gravando(linhas) {
  const dados = {
    titulo: linhas.titulo,
    linkimg: linhas.linkimg,
    texto: linhas.texto

  }
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('select * from `noticias` where `titulo` = ?', dados.titulo, function (error, result, fields) {
      let countresult = result.length
      if (countresult === 0) {
        salvandodados(dados)
      } else {
        console.log('Titulo cadastrado!')
      }
      if (error) throw error;
    });
  })

}

const url = "https://www.gov.br/mds/pt-br/noticias-e-conteudos/noticias"

function extraidados(link) {
  axios.get(link)
    .then(resp => {
      const dadoshtml = resp.data
      const $ = cheerio.load(dadoshtml)
      const titulo = $('h1').text()
      const linkimg = $('img').attr('src')
      //const datapublicacao = $('.value').text()
      const texto = $('div[property="rnews:articleBody"]').text();
      const dados = { titulo, linkimg, texto }

      //console.log(dados)
      gravando(dados);
    });
}

const links = axios.get(url)
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

setTimeout(() => {
  pool.end();
}, 25000);