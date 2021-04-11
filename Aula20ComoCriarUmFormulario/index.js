/**
 * não precisa por html em nenhum handler aem do main, o main já oferece esse conteudo pra todos os outros
 */

const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const Sequelize = require("sequelize")

//config
    //template engine
    app.engine(
        "handlebars",
        handlebars({
            defaultLayout: "main"})
    )
    app.set("view engine", "handlebars")
    //conexao com o banco de dados mysql
    const sequelize = new Sequelize("sistemaDeCadastro","root","root",{
    host: "localhost",
    dialect: "mysql"
})
//rotas
    app.get("/cadastro", function(req,res){
        res.render('formulario')//exibe o formulario.handlebars
    })

app.listen(8081, function(){
    console.log("Servidor online!")
})

