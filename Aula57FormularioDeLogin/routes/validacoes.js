const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/postagem")
const Postagem = mongoose.model("postagens")
require("../models/categoria")
const Categoria = mongoose.model("categorias")

const validacaoCategoria = (nome, slug) =>{
    var erros = []

    if((!nome) || (typeof nome == undefined) ||(nome == null)){
        erros.push({texto:"Nome inválido"});
    }
    if((!slug) || (typeof slug == undefined) ||(slug == null)){
        erros.push({texto:"Slug inválido"});
    }
    if(nome.length < 2){
        erros.push({texto:"Nome muito pequeno"});
    }
    if(slug.length < 2){
        erros.push({texto:"Slug muito pequeno"});
    }

    Categoria.findOne({nome}).then((cat) => {
        if (cat){
            erros.push({texto:"Categoria já cadastrada no sistema"});
        }
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro interno")
        res.redirect("/admin/categorias")
    })

    return erros
}

const validacaoPostagem = (titulo,slug,desc,cont,cat) =>{
    var erros = []

    if((!titulo) || (typeof titulo == undefined) ||(titulo == null)){
        erros.push({texto:"Título inválido"});
    }
    if((!slug) || (typeof slug == undefined) ||(slug == null)){
        erros.push({texto:"Slug inválido"});
    }
    if((!desc) || (typeof desc == undefined) ||(desc == null)){
        erros.push({texto:"Descrição inválida"});
    }
    if((!cont) || (typeof cont == undefined) ||(cont== null)){
        erros.push({texto:"Conteúdo inválido"});
    }
    if(titulo.length < 2){
        erros.push({texto:"Título muito pequeno"});
    }
    if(slug.length < 2){
        erros.push({texto:"Slug muito pequeno"});
    }
    if(desc.length < 2){
        erros.push({texto:"Descrição muito pequena"});
    }
    if(cont.length < 2){
        erros.push({texto:"Conteúdo muito pequeno"});
    }
    if(cat == 0){
        erros.push({texto:"A postagem deve estar associada à uma categoria"});
    }

    Postagem.findOne({titulo}).then((pos) => {
        if (pos){
            erros.push({texto:"Título já cadastrado no sistema"});
        }
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro interno")
        res.redirect("/admin/categorias")
    })

    return erros
}

const validacaoUsuario = (nome,email,senha,senha2) =>{
    var erros = []

    if((!nome) || (typeof nome == undefined) ||(nome == null)){
        erros.push({texto:"Nome inválido"});
    }
    if((!email) || (typeof email == undefined) ||(email== null)){
        erros.push({texto:"Email inválido"});
    }
    if((!senha) || (typeof senha == undefined) ||(senha== null)){
        erros.push({texto:"Senha inválida"});
    }
    if(nome.length < 2){l.
        erros.push({texto:"Nome muito pequeno"});
    }
    if(email.length < 2){
        erros.push({texto:"Email muito pequeno"});
    }
    if(senha.length < 4){
        erros.push({texto:"Senha muito pequena"});
    }
    if(senha != senha2){
        erros.push({texto:"Senhas diferentes"});
    }

    Usuario.findOne({email}).then((usuario) => {
        if (usuario){
            erros.push({texto:"E-mail já cadastrado no sistema"});
        }
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro interno")
        res.redirect("/usuarios/registro")
    })

    Usuario.findOne({nome}).then((usuario) => {
        if (usuario){
            erros.push({texto:"Nome de usuário já cadastrado no sistema"});
        }
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro interno")
        res.redirect("/usuarios/registro")
    })
    
    return erros
}

//final
module.exports = {
    validacaoCategoria,
    validacaoPostagem,
    validacaoUsuario
}