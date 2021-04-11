const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const validacao = require("./validacoes")
const bcrypt = require("bcryptjs")

router.get("/registro",(req,res) => {
    res.render("usuarios/registro")
})

router.post("/registro/novo",(req,res) => {

    var nome = req.body.nome; 
    var email = req.body.email;
    var senha = req.body.senha; 
    var senha2 = req.body.senha2; 
/*
    usuTemp = {
        nome,
        email,
        senha
    }
*/
    //validação
    var erros = validacao.validacaoUsuario(nome,email,senha,senha2)

    if (erros.length > 0){
        res.render("usuarios/registro",{e:erros})//passa erros com o nome e
    }
    else{
        const novoUsuario = new Usuario({
            nome,
            email,
            senha
        })
        console.log(novoUsuario)
        bcrypt.genSalt(10,(erro,salt) => {
            bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                if(erro){
                    req.flash("erro_msg","Houve um erro ao salvar o usuario")
                    res.redirect("/usuarios/registro")
                }
                novoUsuario.senha = hash

                novoUsuario.save().then(()=>{
                    req.flash("sucesso_msg","Usuário cadastrado com sucesso")
                    res.redirect("/")
                }).catch((erro) => {
                    req.flash("erro_msg","Houve um erro ao salvar o usuario")
                    res.redirect("/usuarios/registro")
                })
            })
        })
        
    }
    
})

//final
module.exports = router

