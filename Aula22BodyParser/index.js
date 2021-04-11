/**
 * modulo para acessar o conteudo dos formularios recebidos:
 * ------------- npm install --save body-parser
 */

const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const Sequelize = require("sequelize")

//config
    //template engine
    app.engine(
        "handlebars",
        handlebars({
            defaultLayout: "main"})
    )
    app.set("view engine", "handlebars")
    //body parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    //conexao com o banco de dados mysql
    const sequelize = new Sequelize("sistemaDeCadastro","root","root",{
    host: "localhost",
    dialect: "mysql"
})
//rotas
    app.get("/cadastro", function(req,res){
        res.render('formulario')//exibe o formulario.handlebars
    })
    app.post("/formularioRecebido", function(req,res){//essa rota só podera ser acessada atraves do método post
        res.send("Formulario recebido! Título:"+ req.body.titulo+" e Conteúdo:"+ req.body.conteudo)
    })

app.listen(8081, function(){
    console.log("Servidor online!")
})

