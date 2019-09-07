DROP TABLE IF EXISTS history CASCADE;

CREATE TABLE history (
    id SERIAL PRIMARY KEY NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    winners VARCHAR(255) NOT NULL
);

