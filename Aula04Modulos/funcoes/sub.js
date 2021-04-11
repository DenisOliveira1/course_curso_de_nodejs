var sub = function(a, b){
    return a - b;
}

var subErrado = function(a, b){
    return 0;
}

module.exports = {
    sub,
    sub2:subErrado
}

//para exportar varias funcoes de ma vez deve-se por elas em um objeto