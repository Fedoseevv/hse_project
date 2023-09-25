create table if not exists person
(
    user_id  varchar not null
        constraint pk_person_user_id
            primary key,
    surname  varchar(100),
    name     varchar(100),
    weight   double precision,
    height   double precision,
    position varchar,
    age      integer
);

comment on table person is 'Информация о человеке, использующем датчик';

comment on column person.user_id is 'Идентификатор';

comment on column person.surname is 'Фамилия игрока';

comment on column person.name is 'Имя игрока';

comment on column person.weight is 'Вес игрока';

comment on column person.height is 'Рост игрока';

comment on column person.position is 'Позиция игрока';

comment on column person.age is 'Возраст игрока';

alter table person
    owner to postgres;

create table if not exists device
(
    device_id varchar
        constraint unq_device_device_id
            unique,
    alias     varchar
);

comment on table device is 'Информация об устройстах';

comment on column device.device_id is 'Идентификатор устройства';

comment on column device.alias is 'Псевдоним устройства';

alter table device
    owner to postgres;

create table if not exists session
(
    session_id   integer generated by default as identity
        constraint pk_d_session_id
            primary key,
    session_name varchar(100),
    date         date default CURRENT_DATE
);

comment on table session is 'Информация о занятии';

comment on column session.session_id is 'Идентификатор сессии';

comment on column session.session_name is 'Название сессии';

comment on column session.date is 'Дата занятия';

alter table session
    owner to postgres;

create table if not exists binding_devices
(
    id         integer generated by default as identity
        constraint pk_binding_devices_id
            primary key,
    session_id integer
        constraint fk_session
            references session,
    user_id    varchar
        constraint fk_user
            references person,
    device_id  varchar
        constraint fk_device
            references device (device_id)
);

comment on table binding_devices is 'Информация о принадлежности устройства в рамках одной сессии';

comment on column binding_devices.id is 'Первичный ключ';

comment on column binding_devices.session_id is 'Идентификатор сессии (внешний ключ)';

comment on constraint fk_session on binding_devices is 'Внешний ключ на таблицу с сессией';

comment on column binding_devices.user_id is 'Внешний ключ на таблицу пользователей';

comment on constraint fk_user on binding_devices is 'Внешний ключ на пользователя';

comment on column binding_devices.device_id is 'Внешний ключ на таблицу устройств';

comment on constraint fk_device on binding_devices is 'Внешний ключ на тиблицу устройств';

alter table binding_devices
    owner to postgres;

create table if not exists monitoring
(
    id         integer generated by default as identity
        constraint pk_monitoring_id
            primary key,
    session_id integer
        constraint fk_session
            references session,
    device_id  varchar,
    pulse      double precision,
    longitude  double precision,
    latitude   double precision,
    aox        double precision,
    aoy        double precision,
    aoz        double precision,
    current_ts timestamp default CURRENT_TIMESTAMP
);

comment on table monitoring is 'Информация по мониторингу';

comment on column monitoring.id is 'Первичный ключ';

comment on column monitoring.session_id is 'Внешний ключ на таблицу сессии';

comment on constraint fk_session on monitoring is 'Внешний ключ на таблицу сессий';

comment on column monitoring.device_id is 'Иденификатор устройства, с которого приходят данные';

comment on column monitoring.pulse is 'Пульс';

comment on column monitoring.longitude is 'Долгота';

comment on column monitoring.latitude is 'Широта';

comment on column monitoring.aox is 'Ускорение по оси Оx';

comment on column monitoring.aoy is 'Ускорение по оси Оy';

comment on column monitoring.aoz is 'Ускорение по оси Оz';

alter table monitoring
    owner to postgres;

create table if not exists dim_inn
(
    inn      varchar,
    time_key date
);

alter table dim_inn
    owner to postgres;

create table if not exists kontur_json
(
    method   varchar,
    json     text,
    time_key date
);

alter table kontur_json
    owner to postgres;

create table if not exists "user"
(
    user_id  integer generated always as identity
        primary key,
    email    varchar,
    password varchar
);

alter table "user"
    owner to postgres;
