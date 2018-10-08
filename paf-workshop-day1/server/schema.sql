create database rsvp;
use rsvp;

create table birthday (
    email       varchar(64) not null,
    given_name  varchar(64) not null,
    phone       varchar(20) not null,
    attending   enum('yes', 'no') not null,
    remarks     text,

    primary key(email)
);