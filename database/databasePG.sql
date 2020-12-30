create table users (
    id serial primary key,
    email varchar(200) not null unique,
    full_name varchar(255) not null,
    phone_number varchar(20),
    account_validade smallint default 0,
    accout_confirmed smallint default 0
);
