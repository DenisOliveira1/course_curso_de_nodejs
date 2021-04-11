/**
 * .all() foi substituido por .findAll()
 */
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const Postagem = require("./models/Postagem")


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
    
//rotas
    app.get("/", function(req,res){
        Postagem.findAll({order: [["id","DESC"]]}).then(function(p){
            res.render('home',{p})//exibe o home.handlebars
        })  
    })
    app.get("/cadastro", function(req,res){
        res.render('formulario')//exibe o formulario.handlebars
    })
    app.post("/formularioRecebido", function(req,res){//essa rota só podera ser acessada atraves do método post
        Postagem.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            //res.send("Postagem cadastrada com sucesso!")
            res.redirect("/")//mananda pra home
        }).catch(function(erro){
            res.send("Houve um erro: "+erro)
        })
    })
    app.get("/deletar/:id", function(req,res){
        Postagem.destroy({where: {id:req.params.id}}).then(function(){
            res.send("Essa postagem nfoi deletada com sucesso")
        }).catch(function(){
            res.send("Essa postagem não existe")
        })
        res.redirect("/")
    })

app.listen(8081, function(){
    console.log("Servidor online!")
})

