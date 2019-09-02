DROP TABLE IF EXISTS game CASCADE;

CREATE TABLE game (
    id SERIAL PRIMARY KEY NOT NULL,
    game_name VARCHAR(255) NOT NULL,
    game_history_id INTEGER REFERENCES history(id) ON DELETE CASCADE
);