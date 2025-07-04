CREATE DATABASE auth_db;
\c auth_db


CREATE TABLE roles(
    role_id SERIAL,
    role_name VARCHAR(25) NOT NULL,
    PRIMARY KEY(role_id)
);


CREATE TABLE genders(
    gender_id SERIAL,
    gender_name VARCHAR(25) NOT NULL,
    PRIMARY KEY(gender_id)
);


CREATE TABLE users(
    user_id SERIAL,
    user_first_name VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    birthday DATE,
    role_id INTEGER NOT NULL,
    gender_id INTEGER NOT NULL,
    PRIMARY KEY(user_id),
    FOREIGN KEY(role_id) REFERENCES roles(role_id),
    FOREIGN KEY(gender_id) REFERENCES genders(gender_id)
);


CREATE TABLE sessions(
    session_id SERIAL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY(session_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);


CREATE TABLE auths(
    auth_id SERIAL,
    session_id INTEGER NOT NULL,
    token_uuid VARCHAR(100) NOT NULL,
    PRIMARY KEY(auth_id),
    FOREIGN KEY(session_id) REFERENCES sessions(session_id)
);


ALTER TABLE users ALTER COLUMN role_id SET DEFAULT 2;