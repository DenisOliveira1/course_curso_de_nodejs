module.exports = {
    eAdmin: function(req,res,next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){//autenticado E administrador
            return next();
        }

        req.flash("erro_msg","Não autorizado")
        res.redirect("/")
    }
}