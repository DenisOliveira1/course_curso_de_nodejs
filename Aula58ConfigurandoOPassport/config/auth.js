const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: "email", passwordField: "senha" },(email,senha,done) => {
        Usuario.findOne({email}).then((usuario) =>{
            if(usuario){
                bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                    if(batem){
                        return done(null,usuario)
                    }
                    else{
                        return done(null,false,{message:"Senha incorreta"})
                    }
                })
            }
            else{
                return done(null,false,{message:"Essa conta não existe"})
            }
        })
    
    }))
    
    passport.serializeUser((usuario, done) =>{
        done(null,usuario._id)
    })

    passport.deserializeUser((id, done) =>{
        Usuario.findById(id,(erro, usuario) =>{
            done(erro, usuario)
        })
    })
}

