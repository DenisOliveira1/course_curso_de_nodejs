/**
 * npm install --save express-session
 * npm install --save connect-flash
 * 
 * Tudo que tem app.use são middlewares!!!!!!!!!!!!!!!!!!!!!!
 */

//carregando modulos
    const express = require("express")
    const app = express()
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const mongoose = require("mongoose")
    const admin = require("./routes/admin")
    const path = require("path")
    const session = require("express-session")
    const flash = require("connect-flash")

 //configuraçoes
    //configurar sessao
        app.use(session({
            secret: "cursodenode",
            reseve: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //middleware
        app.use((req,res,next) => {
            console.log("Middleware ativado")
            //variaveis globais
            res.locals.sucesso_msg = req.flash("sucesso_msg")
            res.locals.erro_msg = req.flash("erro_msg")
            next() //o middleware libera a requisição
        })
    //body parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //handlebars
        app.engine("handlebars",handlebars({defaultLayout: "main"}))
        app.set("view engine","handlebars")
    //mongoose
        mongoose.connect("mongodb://localhost/blogapp").then(()=>{
            console.log("Conectado ao mongo!")
        }).catch((erro) => {
            console.log("Erro ao conectar-se ao mongo: "+erro)
        })
    //public
        app.use(express.static(path.join(__dirname,"public")))//caminho absoluto para evitar erros

 //rotas
    app.get("/",(req,res) => {
        res.render("admin/index")
        //res.send("Pagina principal")
    })

    app.use("/admin",admin)

 //outros
    const porta = 8081
    app.listen(porta,() => {
        console.log("Servidor online!")
    })
