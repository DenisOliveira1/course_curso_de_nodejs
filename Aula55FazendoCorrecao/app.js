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
    require("./models/postagem")
    const Postagem = mongoose.model("postagens");
    require("./models/categoria")
    const Categoria = mongoose.model("categorias");
    const usuarios = require("./routes/usuario")

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
            //console.log("Middleware ativado")
            //1 - declara variaveis globais
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
        Postagem.find().populate("categoria").sort({date:"desc"}).then((postagens) => {
            res.render("index",{pos:postagens})
        }).catch((erro) => {
            req.flash("erro_msg","Houve um erro ao listar as postagens")
            res.redirect("/404")
        })
    })

    app.get("/404",(req,res) => {
        res.send("Erro 404!")
    })

    app.get("/postagem/:slug",(req,res) => {
        Postagem.findOne({slug:req.params.slug}).then((postagem) => {
            if(postagem){
                res.render("postagem/index", {pos:postagem})
            }
            else{
                req.flash("erro_msg","Essa postagem não existe")
                res.redirect("/")
            }
        }).catch((erro) => {
            req.flash("erro_msg","Erro interno")
            res.redirect("/")
        })
    })

    app.get("/categorias",(req,res) => {
        Categoria.find().then((categorias) => {
            res.render("categorias/index",{categorias})
        }).catch(() => {
            req.flash("erro_msg","Houve um erro interno ao carregar as categorias")
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug",(req,res) => {
        Categoria.findOne({slug:req.params.slug}).then((categoria) => {
            if(categoria){
                Postagem.find({categoria:categoria._id}).then((postagens) => {
                    res.render("categorias/postagens",{pos:postagens,categoria})
                }).catch(() => {
                    req.flash("erro_msg","Houve um erro interno ao carregar as postagens")
                    res.redirect("/")
                })
            }else{
                req.flash("erro_msg","Essa categoria não existe")
                res.redirect("/")
            }
        }).catch(() => {
            req.flash("erro_msg","Houve um erro interno ao carregar a categoria")
            res.redirect("/")
        })
    })

    app.use("/admin",admin)
    app.use("/usuarios",usuarios)

 //outros
    const porta = 8081
    app.listen(porta,() => {
        console.log("Servidor online!")
    })
