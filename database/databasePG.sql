-- DROP TABLE users;

create table users (
    id serial primary key,
    email varchar(200) not null unique,
    full_name varchar(255) not null,
    password TEXT NOT NULL,
    phone_number varchar(20),
    account_validate smallint default 0,
    accout_confirmed smallint default 0
);

ALTER TABLE users  OWNER TO guibusr;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    createat timestamp DEFAULT now(),
    updatedat timestamp DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users (id)
);


ALTER TABLE posts OWNER TO guibusr;
