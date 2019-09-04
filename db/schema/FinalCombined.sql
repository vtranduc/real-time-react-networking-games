
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS soccer_game_history CASCADE;
DROP TABLE IF EXISTS soccer_player CASCADE;
DROP TABLE IF EXISTS friend_requests CASCADE;


CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL, 
    avatar TEXT NOT NULL,
    sp_highscore INTEGER
    
);



CREATE TABLE soccer_game_history(
    id SERIAL PRIMARY KEY NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);


CREATE TABLE soccer_player(
    id SERIAL PRIMARY KEY NOT NULL,
    score INTEGER NOT NULL,
    team VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_id INTEGER REFERENCES soccer_game_history(id) ON DELETE CASCADE
     
);






CREATE TABLE friend_requests(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    user_inquired_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    request_status BOOLEAN DEFAULT false
    
);