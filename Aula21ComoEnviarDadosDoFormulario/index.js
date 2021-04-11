/**
 * no formulario deve-se por o method, GET ou POST:
 * GET = envia os dados pela URL da requisição
 * POST = envia os dados no compo da requisição, mais seguro
 * 
 * no formulario, ainda á o action onde você deve colocar qual rota receberá o formulario
 * 
 * as rotas são os tipos de metodos http GET, POST, PUT, DELETE...
 * via a barra de url só se pode acessar via GET
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
    app.post("/formularioRecebido", function(req,res){//essa rota só podera ser acessada atraves do método post
        res.send('Formulario recebido!')
    })

app.listen(8081, function(){
    console.log("Servidor online!")
})

