//carregando modulos
    const express = require("express")
    const app = express()
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const mongoose = require("mongoose")
    const admin = require("./routes/admin")
    const path = require("path")

 //configuraçoes
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
