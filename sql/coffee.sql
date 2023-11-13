create extension if not exists pg_trgm;

create table if not exists account (
    account_id uuid not null primary key,
    account_email varchar(50) not null unique,
    account_hash char(97) not null,
    account_activation_token char(32),
    account_name varchar(25) not null unique
);

create table if not exists shop (
    shop_id uuid not null primary key,
    shop_address varchar(512) not null,
    shop_name varchar (200) not null,
    shop_phone_number varchar(30) not null,
    shop_url varchar(512) not null
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



-- Test account
INSERT INTO account(account_id, account_email, account_hash, account_activation_token, account_name)
VALUES ('78110022-3ea1-4d51-9094-ba887e2fb580',
        'test@test.test',
        '$argon2id$v=19$m=65536,t=3,p=1$O1mv+FewvEnfWRTXdLLvxA$TkBR7RRvQjSMJGmoNw/jKSV/LMCmPb+IfWQBqbkDXBM',
        null,
        'Little Jimmy');


-- busy group

insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'busy:morning');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'busy:afternoon');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'busy:evening');

-- customer service group

insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'service:great');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'service:ok');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'service:poor');

-- brewing method groups

insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Drip coffee');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Pour-over');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'French press');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'AeroPress');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Espresso');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Stove-top');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Cold brew');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Japanese iced coffee');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Percolator');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Turkish');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Coffee bag');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Clever dripper');