drop table if exists account cascade;
drop table if exists shop cascade;
drop table if exists photo cascade;
drop table if exists tag cascade;
drop table if exists active_tag cascade;
drop table if exists bookmark cascade;

create table if not exists account (
    account_id uuid not null primary key,
    account_email varchar(50) not null unique,
    account_hash char(97) not null,
    account_activation_token char(32) not null,
    account_name varchar(25) not null unique
);

create table if not exists shop (
    shop_id uuid not null primary key,
    shop_address varchar(60) not null,
    shop_name varchar (200) not null,
    shop_phone_number varchar(30) not null,
    shop_url varchar(500) not null
);

create table if not exists photo (
    photo_id uuid not null primary key,
    photo_shop_id uuid not null,
    photo_credit varchar (512) not null,
    photo_description varchar (512) not null,
    photo_order integer not null,
    photo_url varchar(512) null,
    foreign key (photo_shop_id) references shop (shop_id)
);

create index on photo (photo_shop_id);

create table if not exists tag (
    tag_id uuid not null primary key,
    tag_group varchar(512) not null,
    tag_label varchar(512) not null unique
);

create table if not exists active_tag(
    active_tag_account_id uuid not null,
    active_tag_shop_id uuid not null,
    active_tag_tag_id uuid not null,
    foreign key (active_tag_account_id) references account(account_id),
    foreign key (active_tag_shop_id) references shop(shop_id),
    foreign key (active_tag_tag_id) references tag(tag_id)
);
create index on active_tag(active_tag_account_id);
create index on active_tag(active_tag_shop_id);
create index on active_tag(active_tag_tag_id);

create table if not exists bookmark (
    bookmark_account_id uuid not null,
    bookmark_shop_id uuid not null,
    bookmark_order integer not null,
    foreign key (bookmark_account_id) references account(account_id),
    foreign key (bookmark_shop_id) references shop(shop_id)
);
create index on bookmark(bookmark_account_id);
create index on bookmark(bookmark_shop_id);