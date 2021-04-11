const express = require("express")
const router = express.Router()

router.get("/",(req,res) => {
    res.send("Pagina principal do painel adm")
})

router.get("/postagens",(req,res) => {
    res.send("Pagina de postagens")
})

router.get("/categorias",(req,res) => {
    res.send("Pagina de categorias")
})



//final
module.exports = router