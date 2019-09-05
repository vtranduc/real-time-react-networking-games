
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS soccer_player CASCADE;
DROP TABLE IF EXISTS follow CASCADE;
DROP TABLE IF EXISTS soccer_session CASCADE;
DROP TABLE IF EXISTS friendship CASCADE;
DROP TABLE IF EXISTS user_posts CASCADE;


-- 
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL, 
    avatar TEXT NOT NULL
    
);
-- 
-- 
CREATE TABLE follow(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    follow_id INTEGER REFERENCES users(id) ON DELETE CASCADE 
);
-- 



-- 
CREATE TABLE soccer_session(
    id SERIAL PRIMARY KEY NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);
-- 
-- 
CREATE TABLE soccer_player(
    id SERIAL PRIMARY KEY NOT NULL,
    score INTEGER NOT NULL,
    team VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_id INTEGER REFERENCES soccer_session(id) ON DELETE CASCADE
     
);
-- 

-- 
CREATE TABLE friendship(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reciever_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    request_status BOOLEAN DEFAULT false
    
);
-- 
CREATE TABLE user_posts(
    id SERIAL PRIMARY KEY NOT NULL,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reciever_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    sent_message TEXT NOT NULL,
    time_of_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
