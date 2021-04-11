/**
 * É uma boa pratica criar o modelo com o nome no singular e com a primeira letra maiuscula 
 */

 const mongoose = require("mongoose")
 const Schema = mongoose.Schema;

 const Usuario = new Schema({
     nome:{
         type:String,
         required: true
     },
     senha:{
        type:String,
        required: true
     },
     email:{
        type:String,
        required: true
     },
     eAdmin:{
        type:Number,
        default:0//por padrao novos usuarios não são admnistradores
     }
 })

 mongoose.model("usuarios", Usuario)