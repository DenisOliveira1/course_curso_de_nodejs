const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/categoria")
const Categoria = mongoose.model("categorias");

router.get("/",(req,res) => {
    res.render("admin/index")
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

    var nome = req.body.nome
    var slug = req.body.slug
    //validação
    var erros = validacao(nome,slug)
    
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

router.get("/categorias/edit/:id",(req,res) => {
        Categoria.findOne({_id:req.params.id}).then((cat) => {
            res.render("admin/editcategoria",{cat})
    }).catch((erro) => {
        req.flash("erro_msg","Essa categoria não existe"+erro)
        res.redirect("/admin/categorias")
    })
    
})

router.post("/categorias/edit/",(req,res) => {
    
    var id = req.body.id
    var nome = req.body.nome
    var slug = req.body.slug
    
    //validação
    var erros = validacao(nome,slug)
    
    if(erros.length > 0){
        Categoria.findOne({_id:id}).then((cat) =>{
            res.render("admin/editcategoria",{e:erros,cat})//passa erros com o nome e
        })
    }
    else{

        Categoria.findOne({_id:id}).then((cat) =>{
            cat.nome = nome
            cat.slug = slug
            cat.date = Date.now()
            cat.save().then(() => {
                req.flash("sucesso_msg","Categoria editada com sucesso")
                res.redirect("/admin/categorias")
            }).catch((erro) => {
                req.flash("erro_msg","Houve um erro interno ao salvar a edição da categoria")
                res.redirect("/admin/categorias")
            })

        }).catch(() => {
            req.flash("erro_msg","Houve um erro ao editar a categoria")
            res.redirect("/admin/categorias")
        })
    }
    
})

//fors só trabalhando com get e post
router.post("/categorias/delete",(req,res) => {
    var id = req.body.id
    Categoria.deleteOne({_id:id}).then(() => {
        req.flash("sucesso_msg","Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro interno ao deletar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens",(req,res) =>{
    res.render("admin/postagens")
})

router.get("/postagens/add",(req,res) =>{
    Categoria.find().sort({date:"desc"}).then((categorias) => {
        res.render("admin/addpostagem",{categorias})
    }).catch((erro) => {
        req.flash("erro_msg","Houe um erro ao carregar as categorias")
    })
})   

router.get("/postagens/nova",(req,res) =>{
})

//funcoes
const validacao = (nome, slug) =>{
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

    return erros
}

//final
module.exports = router