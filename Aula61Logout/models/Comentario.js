const mongoose = require("mongoose")
const Schema = mongoose.Schema;

 const Comentario = new Schema({
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
     postagem:{
         //basicamente vai armazenar o id de uma postagem
        type: Schema.Types.ObjectId,
        ref:"postagens",
        required: true
     },
     date:{
        type:Date,
        default: Date.now()//valor padrao
     }
 })

 mongoose.model("comentarios", Comentario)