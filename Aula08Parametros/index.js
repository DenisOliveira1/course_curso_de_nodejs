/**
 * const para enviar sobre-escrever essa variável
 * app guardara o modulo express inteiro
 * acessa o servidor pelo navegador: localhost:porta
 * uma função de callback é uma função que é excutada quando um evento acontece
 * quando o evento, a funcao app.listen, acontece a função dentro dela é executada
 */

const express = require("express")
const app = express() // tudo a partir de agora será feito a partir do app

app.get("/", function(req,res){
    res.send("Seja bem vindo")
})

app.get("/sobre", function(req,res){
    res.send("Minha página sobre")
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


