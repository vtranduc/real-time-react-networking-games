DROP TABLE IF EXISTS room CASCADE;

CREATE TABLE room (
    id SERIAL PRIMARY KEY NOT NULL,
    room_name VARCHAR(255) NOT NULL,
    room_password  VARCHAR(255)  
);