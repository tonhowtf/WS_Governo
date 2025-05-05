const mongoose = require('mongoose')

const blog = mongoose.model(
  'blog',
  mongoose.schema({
    titulo: String,
    linkimg: String,
    datapublicacao: String,
    texto: String
  })
);

module.exports = blog;