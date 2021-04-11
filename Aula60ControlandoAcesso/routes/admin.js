const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/categoria")
const Categoria = mongoose.model("categorias");
require("../models/postagem")
const Postagem = mongoose.model("postagens");
const validacao = require("../helpers/validacoes")
const {eAdmin} = require("../helpers/eAdmin")//só vou pegar a função eAdmin desse modulo

router.get("/", eAdmin, (req,res) => {
})

router.get("/categorias", eAdmin, (req,res) => {
    Categoria.find().sort({date:"desc"}).then((categorias) => {
        res.render("admin/categorias",{categorias})
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro ao listar as categorias")
        res.redirect("/admin/categorias")
    })
})

router.get("/categorias/add", eAdmin, (req,res) => {
    res.render("admin/addcategoria")
})

router.post("/categorias/nova", eAdmin, (req,res) => {

    var nome = req.body.nome
    var slug = req.body.slug

    //validação
    var erros = validacao.validacaoCategoria(nome,slug)
    
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
            res.redirect("/admin/categorias")
            console.log("Erro ao salvar categoria "+erro)
        })
    }
    
})

router.get("/categorias/edit/:id", eAdmin, (req,res) => {
        Categoria.findOne({_id:req.params.id}).then((cat) => {
            res.render("admin/editcategoria",{cat})
    }).catch((erro) => {
        req.flash("erro_msg","Essa categoria não existe"+erro)
        res.redirect("/admin/categorias")
    })
    
})

router.post("/categorias/edit/", eAdmin, (req,res) => {
    
    var id = req.body.id
    var nome = req.body.nome
    var slug = req.body.slug

    const catTemp = {
        id_:id,
        nome,
        slug
    }
    
    //validação
    var erros = validacao.validacaoCategoria(nome,slug)
    
    if(erros.length > 0){
        res.render("admin/editcategoria",{e:erros,cat:catTemp})//passa erros com o nome e
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

//forms só trabalhando com get e post
router.post("/categorias/delete", eAdmin, (req,res) => {
    var id = req.body.id
    Categoria.deleteOne({_id:id}).then(() => {
        req.flash("sucesso_msg","Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro interno ao deletar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens", eAdmin, (req,res) =>{
    //com o populate as informacoes das categorias associadas a cada postagem tambem sao recuperadas
    //categoria é o campo de postagem que carrega essa associação
    Postagem.find().populate("categoria").sort({date:"desc"}).then((postagens) => {
        res.render("admin/postagens",{postagens})
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro ao listar as postagens")
        res.redirect("/admin/postagens")
    })
})

router.get("/postagens/add", eAdmin, (req,res) =>{
    Categoria.find().then((categorias) => {
        res.render("admin/addpostagem",{categorias})
    }).catch((erro) => {
        req.flash("erro_msg","Houe um erro ao carregar as categorias")
    })
})   

router.post("/postagens/nova", eAdmin, (req,res) =>{

    var titulo = req.body.titulo
    var slug = req.body.slug
    var desc = req.body.descricao
    var cont = req.body.conteudo
    var cat = req.body.categoria

    //validação
    var erros = validacao.validacaoPostagem(titulo,slug,desc,cont,cat)

    if(erros.length > 0){
        res.render("admin/addpostagem",{e:erros,cat})
    }
    else{
        const novaPostagem = {
            titulo,
            slug,
            descricao:desc,
            conteudo:cont,
            categoria:cat
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("sucesso_msg","Postagem criada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((erro) => {
            req.flash("erro_msg","Houve um erro ao criar a postagem")
            res.redirect("/admin/postagens")
        })
    }

    
})

router.get("/postagens/edit/:id", eAdmin, (req,res) => {
    Postagem.findOne({_id:req.params.id}).then((pos) => {    
        Categoria.find().then((categorias) => {    
            res.render("admin/editpostagem",{pos,categorias})
        }).catch((erro) => {
            req.flash("erro_msg","Houve um erro ao recuperar a categoria"+erro)
            res.redirect("/admin/postagens")
        })
    }).catch((erro) => {
        req.flash("erro_msg","Essa postagem não existe"+erro)
        res.redirect("/admin/postagens")
    })

})

router.post("/postagens/edit/", eAdmin, (req,res) => {

    var id = req.body.id
    var titulo = req.body.titulo
    var slug = req.body.slug
    var desc = req.body.descricao
    var cont = req.body.conteudo
    var cat = req.body.categoria

    const posTemp = {
        _id:id,
        titulo,
        slug,
        descricao:desc,
        conteudo:cont,
        categoria:cat
    }

    //validação
    var erros = validacao.validacaoPostagem(titulo,slug,desc,cont,cat)

    if(erros.length > 0){
        Categoria.find().then((categorias) => {    
            res.render("admin/editpostagem",{e:erros,pos:posTemp,categorias})
        }).catch((erro) => {
            req.flash("erro_msg","Houve um erro ao recuperar a categoria"+erro)
            res.redirect("/admin/postagens")
        })
    }
    else{

        Postagem.findOne({_id:id}).then((pos) =>{
            pos.titulo = titulo
            pos.slug = slug
            pos.descricao = desc
            pos.conteudo = cont
            pos.categoria = cat
            pos.date = Date.now()
            pos.save().then(() => {
                req.flash("sucesso_msg","Postagem editada com sucesso")
                res.redirect("/admin/postagens")
            }).catch((erro) => {
                req.flash("erro_msg","Houve um erro interno ao salvar a edição da postagem")
                res.redirect("/admin/postagens")
            })

        }).catch(() => {
            req.flash("erro_msg","Houve um erro ao editar a postagem")
            res.redirect("/admin/postagens")
        })
    }

})

//outra forma de deletar, nao recomentado pois é uma rota get
//pode-se usar o formulario como foi feito em categorias, para poder usar o post
//links somente funcionam com get, não post
//formularios somente funcionam com get e post, nenhm outro metodo
router.get("/postagens/delete/:id", eAdmin, (req,res) => {
    var id = req.params.id

    Postagem.deleteOne({_id:id}).then(() => {
        req.flash("sucesso_msg","Postagem deletada com sucesso")
        res.redirect("/admin/postagens")
    }).catch((erro) => {
        req.flash("erro_msg","Houve um erro interno ao deletar a postagem")
        res.redirect("/admin/postagens")
    })
})

//final
module.exports = router