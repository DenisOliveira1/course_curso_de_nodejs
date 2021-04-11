const mongoose = require("mongoose")
const Schema = mongoose.Schema;

 const Postagem = new Schema({
     titulo:{
         type:String,
         required: true
     },
     slug:{
        type:String,
        required: true
     },
     descricao:{
        type:String,
        required: true
     },
     conteudo:{
        type:String,
        required: true
     },
     autor:{
      //basicamente vai armazenar o id de um usuario
        type: Schema.Types.ObjectId,
        ref:"usuarios",
        required: true
      },
     categoria:{
         //basicamente vai armazenar o id de uma categoria
        type: Schema.Types.ObjectId,
        ref:"categorias",
        required: true
     },
     date:{
        type:Date,
        default: Date.now()//valor padrao
     }
 })

 mongoose.model("postagens", Postagem)