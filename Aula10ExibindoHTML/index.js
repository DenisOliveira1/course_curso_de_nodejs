/**
 * -------------- npm install nodemon -g
 * -------------- nodemon
 * 
 * agora, ao inves de executar o projeto com node, executar com nodemon
 * -------------- nodemon index.js
 */

const express = require("express")
const app = express() // tudo a partir de agora será feito a partir do app

app.get("/", function(req,res){
    res.sendfile(__dirname + "/html/index.html")
})

app.get("/sobre", function(req,res){
    res.sendfile(__dirname + "/html/sobre.html")
})

app.get("/blog", function(req,res){
    res.send("Minha página blog")
})

app.get("/ola/:cargo/:nome", function(req,res){
    res.send("<h1> Olá " + req.params.cargo +" "+req.params.nome +" ! </h1>")
    //res.send(req.params)
    //só pode devolver um unico send
})

app.listen(8081, function(){
    console.log("Servidor online!")
})//essa deve ser a ultima linha do codigo, toda a aplicação deve ser programada acima dela


