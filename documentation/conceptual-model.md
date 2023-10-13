# Coffee Capstone Conceptual Model


## account
* PK account_id
* account_password_hash
* account_email
* account_name

## shop
* PK shop_id
* shop_phone_number
* shop_address
* shop_description

## photo
* FK shop_id
* photo_url
* photo_credit
* photo_description
* photo_order

## tag
* PK tag_id
* tag_label
* tag_group

## active_tag
* FK1 shop_id
* FK2 tag_id
* FK3 account_id

## shop_bookmark
* FK1 account_id
* FK2 shop_id
* shop_bookmark_order

(pk = primary key) 
 (fk = foreign key)
