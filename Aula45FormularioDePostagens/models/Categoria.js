/**
 * É uma boa pratica criar o modelo com o nome no singular e com a primeira letra maiuscula 
 */

 const mongoose = require("mongoose")
 const Schema = mongoose.Schema;

 const Categoria = new Schema({
     nome:{
         type:String,
         required: true
     },
     slug:{
        type:String,
        required: true
     },
     date:{
        type:Date,
        default: Date.now()//valor padrao
     }
 })

 mongoose.model("categorias", Categoria)