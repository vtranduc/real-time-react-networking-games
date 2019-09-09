INSERT INTO users (username, first_name, last_name, bio, email, pass, avatar)
VALUES('jzizzless', 'jayjay', 'ting', 'I am simply the best in the world','jayjay_ting@hotmail.com','hello', 'https://i.pinimg.com/originals/66/3f/6d/663f6dbf145854a9fb0917fe35f8156a.gif'),
('a','a', 'aa', 'This is a','aa@aa.com','a', 'https://media.giphy.com/media/WW7vnXiXTuGhq/giphy.gif'),
('b','b', 'bb', 'This is b','bb@bb.com','b','https://media.giphy.com/media/gx54W1mSpeYMg/giphy.gif'),
('c','c', 'cc', 'This is c','cc@cc.com','c', 'https://media.giphy.com/media/Rov6QSZGBQgNO/giphy.gif');

INSERT INTO follow(user_id, follow_id)
VALUES(1, 2),
(1, 3),
(1, 4),
(2, 3);


INSERT INTO soccer_session (start_time, end_time)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO soccer_player(score, team, user_id, session_id)
VALUES(3, 'left', 1, 1),
(4, 'left', 2, 1),
(5, 'right', 3, 1),
(6, 'right', 4, 1),
(5, 'right', 3, 2),
(6, 'left', 4, 2);


INSERT INTO friendship(user_id, receiver_id, request_status)
VALUES(1, 2, false),
(1, 3, false),
(2, 3, true),
(3, 4, true);

INSERT INTO user_posts(sender_id, receiver_id, message_title,sent_message, time_of_post)
VALUES (1, 2,'song' ,'I dont wanna close my eyeyeyeyeyeys, dont wanna see you baby cuz you feel me babe, and i dont wanna miss a thang', CURRENT_TIMESTAMP),
(2, 3, 'flirt', 'you naughty boy~', CURRENT_TIMESTAMP),
(2 ,4, 'flirting','no.... YOU are naughty~', CURRENT_TIMESTAMP),
(1, 3, 'emo','why dont you talk to me anymore... I wanna kill myself', CURRENT_TIMESTAMP);









