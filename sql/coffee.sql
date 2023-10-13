

create table if not exists account (
    account_id uuid not null primary key,
    account_email varchar(50) not null unique,
    account_hash char(30) not null,
    account_name varchar(25) not null unique
)