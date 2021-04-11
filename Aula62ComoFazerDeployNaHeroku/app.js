/**
 * ------------ npm init
 * vai gerar 2 arquivos
 * a heroku identifica as dependencias usadas no projeto pelo package,json
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
    require("./models/postagem")
    const Postagem = mongoose.model("postagens")
    require("./models/categoria")
    const Categoria = mongoose.model("categorias")
    const usuarios = require("./routes/usuario")
    const passport = require("passport")
    require("./config/auth")(passport)
    require("./models/comentario")
    const Comentario = mongoose.model("comentarios")
    const comentarios = require("./routes/comentario")
    const db = require("./config/db")
    


 //configuraçoes
    //configurar sessao (tudo nessa ordem)
        app.use(session({
            secret: "cursodenode",
            reseve: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    //middleware
        app.use((req,res,next) => {
            //essas variaveis são acessadas nos html dentro da pasta view pelo nome direto: user
            //essas variaveis sao acessadas no js pelo nome completo: res.locals.user
            //essas variaveis para serem usas dentro de outras tags assim {{ {{../var}} }}
            //existe tambem o app.locals
            //console.log("Middleware ativado")
            //1 - declara variaveis globais
            res.locals.sucesso_msg = req.flash("sucesso_msg")
            res.locals.erro_msg = req.flash("erro_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            Categoria.find().then((categorias)=>{
                res.locals.categoriasnav = categorias
            })
            next() //o middleware libera a requisição
        })
    //body parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //handlebars
    const hbs = handlebars.create({
        defaultLayout: "main",
            helpers:{
                eif: function(a,b,c,options){
                    if (a.equals(b) || (c == 1)){//comparar ids do mongo so funciona com equals
                        return options.fn(this)
                    }else{
                        return options.inverse(this)
                    }
                }
            }
        })
        app.engine("handlebars",hbs.engine)
        app.set("view engine","handlebars")
        
        
    //mongoose
        mongoose.connect(db.mongoURI).then(()=>{
            console.log("Conectado ao mongo!")
        }).catch((erro) => {
            console.log("Erro ao conectar-se ao mongo: "+erro)
        })
    //public
        app.use(express.static(path.join(__dirname,"public")))//caminho absoluto para evitar erros

 //rotas
    app.get("/",(req,res) => {
        //o populate faz a categoria inteira ser pega, não só seu id
        Postagem.find().populate("categoria").populate("autor").sort({date:"desc"}).limit(5).then((postagens) => {
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
        Postagem.findOne({slug:req.params.slug}).populate("autor").then((postagem) => {
            if(postagem){
                Comentario.find({postagem:postagem._id}).populate("autor").then((comentarios) => {
                    if(comentarios){               
                        res.render("postagem/index", {pos:postagem,comentarios})            
                    }
                }).catch((erro) => {
                    req.flash("erro_msg","Erro ao carregar comentários")
                    res.redirect("/")
                })       
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
                Postagem.find({categoria:categoria._id}).populate("autor").sort({date:"desc"}).then((postagens) => {
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
    app.use("/comentarios",comentarios)

 //outros
    const porta = process.env.PORT ||8081 //pega a porta do heroku, se não tiver fica com a 8081
    app.listen(porta,() => {
        console.log("Servidor online!")
    })
