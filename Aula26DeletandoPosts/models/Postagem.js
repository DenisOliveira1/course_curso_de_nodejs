const db = require("./db")

const Postagem = db.sequelize.define(
    "postagens",{
        titulo:{
            type: db.Sequelize.STRING
        },
        conteudo:{
            type: db.Sequelize.TEXT
        }
    }
);

//comentar essa linha abaixo depois de criar a tabela, para evitar recriá-la e perder tudo que esta salvo
//Postagem.sync({force:true})

module.exports = Postagem