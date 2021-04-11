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
    res.render("admin/categorias")
    //res.send("Pagina de categorias")
})

router.get("/categorias/add",(req,res) => {
    res.render("admin/addcategoria")
})

router.post("/categorias/nova",(req,res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug,
    }
    new Categoria(novaCategoria).save().then(() => {
        console.log("Categoria salva com sucesso!")
    }).catch((erro) => {
        console.log("Erro ao salvar categoria "+erro)
    })
})



//final
module.exports = router