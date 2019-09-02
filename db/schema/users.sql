DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, 
    room_id INTEGER REFERENCES room(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES game(id) ON DELETE CASCADE 
);





