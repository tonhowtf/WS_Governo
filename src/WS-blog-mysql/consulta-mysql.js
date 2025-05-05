const mysql = require('mysql2')

const titulo = 'MDS assina acordo com ministérios para qualificar cozinhas solidárias e promover dignidade à população em situação de rua'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'senha123',
  database: 'blog'
});


const consulta = (msg) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query('select * from `noticias` where `titulo` = ?', msg, function (error, result, fields) {
      let countresult = result.length
      if (countresult === 0) {
        console.log('Titulo não cadastrado!');
      } else {
        console.log('Titulo cadastrado!')
      }
      if (error) throw error;
    });
  })
};
consulta(titulo);