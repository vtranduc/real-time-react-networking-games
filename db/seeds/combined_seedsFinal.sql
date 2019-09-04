INSERT INTO users (first_name, last_name, email,pass, avatar, sp_highscore)
VALUES('jayjay', 'ting', 'jayjay_ting@hotmail.com','hello', 'https://i.pinimg.com/originals/66/3f/6d/663f6dbf145854a9fb0917fe35f8156a.gif' , 600),
('a', 'aa', 'aa@aa.com','a', 'https://i.pinimg.com/originals/66/3f/6d/663f6dbf145854a9fb0917fe35f8156a.gif', 20),
('b', 'bb', 'bb@bb.com','b','https://i.pinimg.com/originals/66/3f/6d/663f6dbf145854a9fb0917fe35f8156a.gif', 10),
('c', 'cc', 'cc@cc.com','c', 'https://i.pinimg.com/originals/66/3f/6d/663f6dbf145854a9fb0917fe35f8156a.gif', 20);


INSERT INTO soccer_game_history (start_time, end_time)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO soccer_player(score, team, user_id, session_id)
VALUES(3, 'left', 1, 1),
(4, 'left', 2, 1),
(5, 'right', 3, 1),
(6, 'right', 4, 1);


INSERT INTO friend_requests(user_id, user_inquired_id, request_status)
VALUES(1, 2, false),
(1, 3, false),
(2, 3, true),
(3, 4, true);






