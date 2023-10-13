

create table if not exists account (
    account_id uuid not null primary key,
    account_email varchar(50) not null unique,
    account_hash char(30) not null,
    account_name varchar(25) not null unique
);

create table if not exists shop (
    shop_id uuid not null primary key,
    shop_address varchar(60) not null,
    shop_description text not null,
    shop_phone_number varchar(30) not null
);

create table if not exists photo (
    photo_shop_id uuid not null,
    photo_credit varchar (512) not null,
    photo_description varchar (512) not null,
    photo_order date not null,
    photo_url varchar(512) null,
    foreign key (photo_shop_id) references shop (shop_id)
);

create index on photo (photo_shop_id);

create table if not exists tag (
    tag_id uuid not null primary key,
    tag_group varchar(512) not null,
    tag_label varchar(512) not null
);


