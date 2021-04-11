if(process.env.NODE_ENV == "production"){//se estar no ambiente de produção (heroku)
    module.exports = {
        mongoURI:"mongodb+srv://admin:admin@cluster0-bpwi7.mongodb.net/test?retryWrites=true&w=majority"
    }
}else{
    module.exports = {
        mongoURI:"mongodb://localhost/blogapp"
    }
}