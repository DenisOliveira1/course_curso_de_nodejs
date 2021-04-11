/**
 * instalando moongoose para trabalhar com o mongoDB:
 * ---------------- npm install --save mongoose
 * mysql ligava o servidor sozinho, mongo precisa lgar em um terminal digitando:
 * ---------------- mongod 
 * mostra databases:
 * ---------------- show databases;
 * criar database direto no mongo (porem não aparece até ter ao menos um registro nele):
 * ---------------- use loja;
 * pode-se criar o banco via connect no js, não precisa ser dirato no mongo
 * como é no mysql
 */
 const mongoose = require("mongoose")

 mongoose.Promise = global.Promise//evita alguns erros
 mongoose.connect("mongodb://localhost/aprendendo").then(function(){//function convercional
     console.log("Conectado com o banco de dados!")
 }).catch((erro) => {//arrow function
     console.log("ERRO: "+erro)
 })