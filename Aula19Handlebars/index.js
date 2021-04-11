/**
 * esse modulo permite usar estruturas condicionais dentro do html e exibir variaveis do js no html:
 * -------------- npm install --save express-handlebars
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
            defaultLayout: "main"})//se refere a view/layouts/main.handlebars
    )
    app.set("view engine", "handlebars")
    //conexao com o banco de dados mysql
    const sequelize = new Sequelize("sistemaDeCadastro","root","root",{
    host: "localhost",
    dialect: "mysql"
})

app.get("/", function(req,res){
    res.send("Seja bem vindo")
})

app.listen(8081, function(){
    console.log("Servidor online!")
})

