const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/comentario")
const Comentario = mongoose.model("comentarios")
const validacao = require("../helpers/validacoes")
require("../models/postagem")
const Postagem = mongoose.model("postagens")
const {logado} = require("../helpers/logado")

router.post("/novo", logado, (req,res) => {

    var cont = req.body.conteudo
    var autor = req.body.autor//resolvi mandar pelo form como hidden
    var pos = req.body.postagem
    var slug = req.body.slug

   if(res.locals.user == null){
        req.flash("erro_msg","Você precisa estar logado")
        res.redirect("/postagem/"+slug)
   }
   else{
        //validação
        var erros = validacao.validacaoComentario(cont)

        if (erros.length > 0){
            Postagem.findOne({slug}).populate("autor").then((postagem) => {
                if(postagem){
                    Comentario.find({postagem:postagem._id}).populate("autor").then((comentarios) => {
                        if(comentarios){               
                            res.render("postagem/index", {pos:postagem,comentarios,e:erros})            
                        }
                    }).catch((erro) => {
                        req.flash("erro_msg","Erro ao carregar comentários")
                        res.redirect("/")
                    })       
                }
                else{
                    req.flash("erro_msg","Essa postagem não existe")
                    res.redirect("/")
                }
            }).catch((erro) => {
                req.flash("erro_msg","Erro interno")
                res.redirect("/")
            })
        }
        else{
            const novoComentario = {
                conteudo:cont,
                postagem:pos,
                autor
            }
            new Comentario(novoComentario).save().then(() => {
                req.flash("sucesso_msg","Comentário publicado com sucesso")
                res.redirect("/postagem/"+slug)
            }).catch((erro) => {
                req.flash("erro_msg","Houve um erro ao publicar o comentário"+erro)
                res.redirect("/postagem/"+slug)
            })
        }
   }
})

router.get("/edit/:id", logado,(req,res) => {
    var id = req.params.id
    
    if(res.locals.user == null){
        req.flash("erro_msg","Você precisa estar logado")
        res.redirect("/")
    }
    else{
        Comentario.findOne({_id:id}).populate("postagem").then((comentario) => {
            res.render("comentario/editcomentario",{comentario})
        }).catch((erro) => {
            req.flash("erro_msg","Esse comentário não existe")
            res.redirect("/")
        })
    }
})

router.post("/edit", logado,(req,res) => {
        var id = req.body.id
        var cont = req.body.conteudo
        var slug = req.body.slug

        const comTemp = {
            cont
        }

    if(res.locals.user == null){
        req.flash("erro_msg","Você precisa estar logado")
        res.redirect("/postagem/"+slug)
    }
    else{

        //validação
        var erros = validacao.validacaoComentario(cont)
        
        if(erros.length > 0){
            Postagem.findOne({slug}).populate("autor").then((postagem) => {
                if(postagem){
                    Comentario.find({postagem:postagem._id}).populate("autor").then((comentarios) => {
                        if(comentarios){               
                            res.render("postagem/index", {pos:postagem,comentarios,e:erros})            
                        }
                    }).catch((erro) => {
                        req.flash("erro_msg","Erro ao carregar comentários")
                        res.redirect("/")
                    })       
                }
                else{
                    req.flash("erro_msg","Essa postagem não existe")
                    res.redirect("/")
                }
            }).catch((erro) => {
                req.flash("erro_msg","Erro interno")
                res.redirect("/")
            })
        }
        else{

            Comentario.findOne({_id:id}).then((comentario) =>{
                comentario.conteudo = cont
                comentario.date = Date.now()
                comentario.save().then(() => {
                    req.flash("sucesso_msg","Comentário editado com sucesso")
                    res.redirect("/postagem/"+slug)
                }).catch((erro) => {
                    req.flash("erro_msg","Houve um erro interno ao salvar a edição do comentário")
                    res.redirect("/postagem/"+slug)
                })

            }).catch(() => {
                req.flash("erro_msg","Houve um erro ao editar o comentário")
                res.redirect("/postagem/"+slug)
            })
        }
    }
})

router.get("/delete/:id", logado,(req,res) => {
    
    var id = req.params.id
    var slug

    Comentario.findOne({_id:id}).populate("postagem").then((comentario) => {

        slug = comentario.postagem.slug 

        Comentario.deleteOne({_id:id}).then(() => {
            req.flash("sucesso_msg","Comentário deletado com sucesso")
            res.redirect("/postagem/"+slug)
        }).catch((erro) => {
            req.flash("erro_msg","Houve um erro interno ao deletar o comentário")
            res.redirect("/postagem/"+slug)
        })
    }).catch(() => {
        req.flash("erro_msg","Houve um erro interno ao deletar o comentário")
        res.redirect("/")
    })
    
})

//final
module.exports = router

