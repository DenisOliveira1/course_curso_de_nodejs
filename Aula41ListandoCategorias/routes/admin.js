const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/categoria")
const Categoria = mongoose.model("categorias");

router.get("/",(req,res) => {
    res.render("admin/index")
    //res.send("Pagina principal do painel adm")
})

router.get("/postagens",(req,res) => {
    res.send("Pagina de postagens")
})

router.get("/categorias",(req,res) => {
    Categoria.find().sort({date:"desc"}).then((categorias) => {
        res.render("admin/categorias",{categorias})
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})

router.get("/categorias/add",(req,res) => {
    res.render("admin/addcategoria")
})

router.post("/categorias/nova",(req,res) => {

    //validação
    nome = req.body.nome
    slug = req.body.slug

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
    if(erros.length > 0){
        res.render("admin/addcategoria",{e:erros})//passa erros com o nome e
    }
    else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug,
        }
        
        new Categoria(novaCategoria).save().then(() => {
            //2 - atribui valor para as variaveis globais
            req.flash("sucesso_msg","Categoria criada com sucesso")
            res.redirect("/admin/categorias/")//redirect usa url e render usa caminho de pastas
            console.log("Categoria salva com sucesso!")
        }).catch((erro) => {
            req.flash("erro_msg","Houve um erro ao salvar a categoria")
            res.redirect("/admin")
            console.log("Erro ao salvar categoria "+erro)
        })
    }
    
})



//final
module.exports = router