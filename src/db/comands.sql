create database JBregister;

create table balance(
    id int primary key,
    name varchar(50) not null,
    balance numeric(10,2) not null default 0.00
);

create table balance(
    id int primary key,
    name varchar(50) not null,
    balance numeric(10,2) not null default 0.00  #presicion 10 digits, 2 decimal digits
);

create table b1(
    id int primary key,
    name varchar(50),
    balance int not null default 0.00 
);

#crear tabla balance con 3 columnas: id, name y balance
create table balance(
    id int primary key,
    name varchar(50) not null,
    balance numeric(10,2) not null default 0.00  
);
#add data to table balance
insert into balance (id, name, balance) values (1, 'Juan', 150.00);

insert into balance (id, name, balance) values (2, 'Pedro', 200.00);

#crear tabla con id 
create table bal (
    id integer primary key generated always as identity,
    name varchar(50) not null,
    balance numeric(10,2) not null default 0.00
);