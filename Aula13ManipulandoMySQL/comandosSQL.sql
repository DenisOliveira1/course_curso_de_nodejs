create table usuarios(
    nome varchar(50),
    email varchar(100),
    idade int
);

insert into usuarios(nome,email,idade) values(
    "Denis",
    "denisb.oliveira@live.com",
    24
);

insert into usuarios(idade,nome,email) values(
    25,
    "Maria",
    "mariab.oliveira@live.com"
);


insert into usuarios(idade,nome,email) values(
    8,
    "Joao",
    "joaob.oliveira@live.com"
);

select * from usuarios;
select * from usuarios where idade = 24;
select * from usuarios where nome = "Denis";
select * from usuarios where idade <= 24;