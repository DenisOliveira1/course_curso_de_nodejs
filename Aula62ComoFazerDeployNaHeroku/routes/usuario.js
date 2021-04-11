const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const validacao = require("../helpers/validacoes")
const bcrypt = require("bcryptjs")
const passport = require("passport")
require("../models/comentario")
const Comentario = mongoose.model("comentarios")
const {logado} = require("../helpers/logado")

router.get("/registro",(req,res) => {
    res.render("usuarios/registro")
})

router.post("/registro/novo",(req,res) => {

    var nome = req.body.nome; 
    var email = req.body.email;
    var senha = req.body.senha; 
    var senha2 = req.body.senha2; 

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
                //console.log(novoUsuario)       
                novoUsuario.save().then(()=>{
                    //login automatico
                    passport.authenticate("local")(req,res,() => {
                        req.flash("sucesso_msg","Usuário cadastrado com sucesso")
                        res.redirect("/")
                    })                    
                }).catch((erro) => {
                    req.flash("erro_msg","Houve um erro ao salvar o usuario")
                    res.redirect("/usuarios/registro")
                })
            })
        })
        
    }
    
})

router.get("/login",(req,res) => {
    res.render("usuarios/login")
})

router.post("/login/auth",(req,res,next) => {
    passport.authenticate("local",{
            successRedirect: "/",
            failureRedirect: "/usuarios/login",
            failureFlash: true
        })(req,res,next)
})

router.get("/logout",(req,res) => {
    req.logout();
    req.flash("sucesso_msg","Deslogado com sucesso")
    res.redirect("/")
})

router.get("/senha/edit", logado, (req,res) => {
    res.render("usuarios/editsenha")
})

router.post("/senha/edit/:id", logado, (req,res) => {
    var id = req.params.id
    var senha = req.body.senha
    var novasenha = req.body.novasenha
    var novasenha2 = req.body.novasenha2
    
    //validação
    var erros = validacao.validacaoAlterarSenha(novasenha,novasenha2)
    
    if(erros.length > 0){
        res.render("usuarios/editsenha",{e:erros})//passa erros com o nome e
    }
    else{
        Usuario.findById(id).then((usuario) =>{
            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    bcrypt.genSalt(10,(erro,salt) => {
                        bcrypt.hash(novasenha, salt, (erro, hash) => {
                            if(erro){
                                req.flash("erro_msg","Houve um erro ao alterar a senha")
                                res.redirect("/usuarios/senha/edit")
                            }
                            usuario.senha = hash
                            console.log(usuario)                 
                            usuario.save().then(()=>{
                                req.flash("sucesso_msg","Senha alterada com sucesso")
                                res.redirect("/")
                            }).catch((erro) => {
                                req.flash("erro_msg","Houve um erro ao alterar a senha")
                                res.redirect("/usuarios/senha/edit")
                            })
                        })
                    })
                }
                else{
                    req.flash("erro_msg","Senha incorreta")
                    res.redirect("/usuarios/senha/edit")
                }
            })
        }).catch(() => {
            req.flash("erro_msg","Houve um erro ao alterar a senha")
            res.redirect("/usuarios/senha/edit")
        })                  
    }
})

router.get("/nome/edit", logado, (req,res) => {
    res.render("usuarios/editnome")
})

router.post("/nome/edit/:id", logado, (req,res) => {
    var id = req.params.id
    var novonome = req.body.novonome
    var senha = req.body.senha
    
    //validação
    var erros = validacao.validacaoAlterarNome(id,senha,novonome)
    
    if(erros.length > 0){
        res.render("usuarios/editnome",{e:erros})//passa erros com o nome e
    }
    else{
        Usuario.findById(id).then((usuario) =>{
            
            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    usuario.nome = novonome
                    usuario.save().then(()=>{
                        req.flash("sucesso_msg","Nome alterado com sucesso")
                        res.redirect("/")
                    }).catch((erro) => {
                        req.flash("erro_msg","Houve um erro ao alterar o nome")
                        res.redirect("/usuarios/nome/edit")
                    })
                }
                else{
                    req.flash("erro_msg","Senha incorreta")
                    res.redirect("/usuarios/nome/edit")
                }        
            })    
        }).catch(() => {
            req.flash("erro_msg","Houve um erro ao alterar o nome")
            res.redirect("/usuarios/nome/edit")
        })              
    }
})

router.get("/historico/:id", logado, (req,res) => {
    var id = req.params.id

    Comentario.find({autor:id}).populate("autor").populate("postagem").sort({date:"desc"}).then((comentarios) =>{
        res.render("usuarios/historico",{comentarios})
    }).catch(() => {
        req.flash("erro_msg","Houve um erro carregar o historico")
        res.redirect("/")
    })      
})

//final
module.exports = router

