/**
 * ------------ npm install --save express
 * ------------ npm install --save express-handlebars
 * ------------ npm install --save body-parser
 * ------------ npm install --save mongoose
 */

 //carregando modulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    //const mongoose = require("mongoose")
    const app = express();

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

 //outros
    const porta = 8081
    app.listen(porta,() => {
        console.log("Servidor online!")
    })
