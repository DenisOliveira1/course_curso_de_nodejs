const express = require("express")
const router = express.Router()

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



//final
module.exports = router