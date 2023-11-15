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
    shop_url varchar(512) not null,
    shop_photo_url varchar(512) null
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
        'jolene@yahoo.com',
        '$argon2id$v=19$m=65536,t=3,p=1$O1mv+FewvEnfWRTXdLLvxA$TkBR7RRvQjSMJGmoNw/jKSV/LMCmPb+IfWQBqbkDXBM',
        null,
        'Jolene');


-- busy group

insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'Morning');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'Brunch');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'Lunch');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'Afternoon');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'Evening');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'busy', 'Late');

-- customer service group

insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Great');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Amazing');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Outstanding');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Excellent');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Bussin Bussin');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Pleasant');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Helpful');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Satisfactory');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Good');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Okay');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Acceptable');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Average');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Subpar');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Unhelpful');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Dissatisfactory');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Lousy');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Poor');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'service', 'Bad');

-- brewing method groups

insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Drip coffee');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Pour-over');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'French press');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Latte');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Espresso');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Cortado');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Cold brew');
insert into tag(tag_id, tag_group, tag_label) VALUES (gen_random_uuid(), 'brewing', 'Tea Latte');