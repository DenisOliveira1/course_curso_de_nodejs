const Sequelize = require("sequelize")
const sequelize = new Sequelize("sistemaDeCadastro","root","root",{
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(//se o evento ocorrer sem falhas é chamado o then
    function(){
        console.log("Conectado com sucesso!")
    }  
).catch(//se o evento ocorrer com falhas é chamado o catch
    function(erro){
        console.log("Falha ao se conectar: "+ erro)
    }

)

const Postagem = sequelize.define(
    "postagens",
    {
        titulo:{
            type: Sequelize.STRING //diz que essa variavel vai ser varchar de tamanho limitado
        },
        conteudo:{
            type: Sequelize.TEXT //diz que essa variavel vai ser varchar de tamanho ilimitado
        }
    }
)
//cria a tabela com os campos definidos, um id auto increment como chave primaria e 2 campos de datas de controle
//Postagem.sync({force:true}) //comentar para não recriar

const Usuario = sequelize.define(
    "usuario",
    {
        nome:{
            type: Sequelize.STRING
        },
        sobrenome:{
            type: Sequelize.STRING
        },
        idade:{
            type: Sequelize.INTEGER//um int
        },
        email:{
            type: Sequelize.STRING
        },
    }
)
//Usuario.sync({force:true})

/* comentar para nao inserir de novo
Postagem.create({//fez um insert
    titulo:"Meu primeiro titulo",
    conteudo: "Meu primeiro conteudo"
})
*/


