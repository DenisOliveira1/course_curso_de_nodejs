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
