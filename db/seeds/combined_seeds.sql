INSERT INTO history (start_time, end_time, winners)
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'joe'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'moe'),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'poe');


INSERT INTO game_room(game_to_room_id,room_to_game_id)
VALUES(1,1);


INSERT INTO game (game_name)
VALUES('SOCCER'),
('FLAPPYBIRD');



INSERT INTO room(room_name, room_password)
VALUES('bitch', 'younaughty');

INSERT INTO users (first_name, last_name, email, token, room_id, game_id)
VALUES('jayjay', 'ting', 'jayjay_ting@hotmail.com',2, 1, 1),
('a', 'aa', 'aa@aa.com', 2, 1, 1),
('b', 'bb', 'bb@bb.com',2,1, 1),
('c', 'cc', 'cc@cc.com',2, 1, 1);
