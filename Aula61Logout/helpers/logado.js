module.exports = {
    logado: function(req,res,next){
        if(req.isAuthenticated()){//autenticado
            return next();
        }
        req.flash("erro_msg","É necessario estar logado")
        res.redirect("/")
    }
}