const Sequelize = require("sequelize")

//conexao com o banco de dados mysql
const sequelize = new Sequelize("postapp","root","root",{
    host: "localhost",
    dialect: "mysql"
})
//se não der um nome, a variavel é referenciado pelo nome que já possui
//por exemplo: s1:Sequelize, s2: sequelize
module.exports = {
    Sequelize,
    sequelize
}