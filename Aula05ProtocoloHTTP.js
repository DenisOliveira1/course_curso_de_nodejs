var http = require("http"); //é um modulo dentro do proprio node, então não se digita um caminho

http.createServer(function(req,res){
    res.end("Olá")
}).listen(8081);

console.log("O servidor está rodando!")
//acessa no navegador: localhost:porta