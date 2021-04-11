/**
 * ------------ npm install --save express
 * ------------ npm install --save express-handlebars
 * ------------ npm install --save body-parser
 * ------------ npm install --save mongoose
 */

 //carregando modulos
    const express = require("express")
    const app = express()
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    //const mongoose = require("mongoose")
    const admin = require("./routes/admin")

 //configuraçoes
    //body parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //handlebars
        app.engine("handlebars",handlebars({defaultLayout: "main"}))
        app.set("view engine","handlebars")
    //mongoose
        //em breve

 //rotas
    app.get("/",(req,res) => {
        res.send("Pagina principal")
    })

    app.use("/admin",admin)

 //outros
    const porta = 8081
    app.listen(porta,() => {
        console.log("Servidor online!")
    })
