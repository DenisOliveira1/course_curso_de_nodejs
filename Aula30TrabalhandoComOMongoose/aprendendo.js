 /**
  * myql - mongodb
  * database - database
  * tabela - collection
  * 
  * mostra databases:
  * ---------------- show databases;
  * entrar na database:
  * ---------------- use aprendendo;
  * mostra collections(tabelas):
  * ---------------- show collections;
  * exibir todas as instancias da tabela:
  * ---------------- db.usuarios.find();
  * 
  */
 const mongoose = require("mongoose")

 mongoose.Promise = global.Promise//evita alguns erros
 mongoose.connect("mongodb://localhost/aprendendo").then(function(){//function convercional
     console.log("Conectado com o banco de dados!")
 }).catch((erro) => {//arrow function
     console.log("ERRO: "+erro)
 })

 //models
 const UsuariosSchema = mongoose.Schema({
    nome:{
        type: String, //String, Number, Date, Object
        require:true //torna o campo obrigatorio, nao delcarar é o mesmo que colocar false
    },
    sobrenome:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    idade:{
        type: Number,
        require:true
    },
    pais:{
        type: String,
        require:false
    }
 })

 //colection
 mongoose.model("usuarios", UsuariosSchema)//nome da collection (equivalente a tabela do mysql)
//nao precisa comentar essa linha como se fazia no sequelize

 //inserir instância na colection
 const novoUsuario = mongoose.model("usuarios")
 new novoUsuario({
     nome:"Denis2",
     sobrenome:"Oliveira",
     email:"denisb.oliveira@live.com",
     idade:24,
     pais:"Brasil"
 }).save().then(() => {
     console.log("Usuario cadastrado com sucesso!")
 }).catch((erro) => {
    console.log("ERRO: "+erro)
 })

//cada instância recebe automaticamente um id, assim como no sequelize 
