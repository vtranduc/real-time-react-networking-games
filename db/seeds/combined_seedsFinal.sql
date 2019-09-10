INSERT INTO users
  (username, first_name, last_name, bio, email, pass, avatar,background)
VALUES('jzizzless', 'jayjay', 'ting', 'I am simply the best in the world', 'jayjay_ting@hotmail.com', 'hello', 'https://i.pinimg.com/originals/66/3f/6d/663f6dbf145854a9fb0917fe35f8156a.gif', 'https://images5.alphacoders.com/587/587597.jpg'),
  ('a', 'a', 'aa', 'This is a', 'aa@aa.com', 'a', 'https://media.giphy.com/media/WW7vnXiXTuGhq/giphy.gif', 'https://images.wallpaperscraft.com/image/anime_girl_window_reflection_drop_rain_look_28847_1920x1080.jpg'),
  ('b', 'b', 'bb', 'This is b', 'bb@bb.com', 'b', 'https://media.giphy.com/media/gx54W1mSpeYMg/giphy.gif', 'https://images.wallpaperscraft.com/image/katagiri_hinata_girl_kimono_art_107169_1920x1080.jpg'),
  ('c', 'c', 'cc', 'This is c', 'cc@cc.com', 'c', 'https://media.giphy.com/media/Rov6QSZGBQgNO/giphy.gif', 'https://images.wallpaperscraft.com/image/girl_anime_art_umbrella_104966_2480x1930.jpg'),
  ('sushi', 'viet', 'nien', 'I am the worlds best soccer player', 'viet@cc.com', 'c', 'https://media.giphy.com/media/krI1lBPsluByg/giphy.gif', 'https://images.wallpaperscraft.com/image/girl_anime_wings_art_105421_1920x1665.jpg'),
  ('joji', 'yob', 'nieman', 'I like eating ginger', 'bobby@gmail.com', 'yoyo', 'http://giphygifs.s3.amazonaws.com/media/5xqKWd6761tkY/giphy.gif', 'https://wallpapersite.com/images/wallpapers/anime-girl-1920x1080-fantasy-4k-17884.jpg'),
  ('vickylicious', 'vicky', 'lee', 'waiting for my prince <3', 'vickylicious@gmail.com', 'iloveyou', 'https://media.giphy.com/media/100QWMdxQJzQC4/giphy.gif', 'https://images6.alphacoders.com/103/thumb-1920-1037400.png'),
  ('wowowiseeyou', 'see', 'you', 'I can see you all day', 'see@cc.com', 'banana', 'https://media.giphy.com/media/UVk5yzljef0kGiayL1/source.gif', 'https://images3.alphacoders.com/103/1039237.jpg');



INSERT INTO follow
  (user_id, follow_id)
VALUES(1, 2),
  (1, 3),
  (1, 4),
  (2, 5),
  (2, 3),
  (1, 4),
  (4, 3),
  (5, 3);



INSERT INTO soccer_session
  (start_time, end_time)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO soccer_player
  (score, team, user_id, session_id)
VALUES
  (3, 'left', 1, 1),
  (4, 'left', 2, 1),
  (5, 'right', 3, 1),
  (6, 'right', 4, 1),
  (8, 'right', 3, 7),
  (2, 'left', 6, 2),
  (5, 'right', 8, 2);


INSERT INTO friendship
  (user_id, receiver_id, request_status)
VALUES(1, 2, false),
  (1, 3, false),
  (2, 3, true),
  (5, 4, true),
  (3, 5, true),
  (1, 6, true),
  (4, 8, true),
  (7, 4, true);

INSERT INTO user_posts
  (sender_id, receiver_id, message_title,sent_message, time_of_post)
VALUES
  (1, 2, 'song' , 'I dont wanna close my eyeyeyeyeyeys, dont wanna see you baby cuz you feel me babe, and i dont wanna miss a thang', CURRENT_TIMESTAMP),
  (2, 3, 'flirt', 'you naughty boy~', CURRENT_TIMESTAMP),
  (2 , 4, 'flirting', 'no.... YOU are naughty~', CURRENT_TIMESTAMP),
  (4, 6, 'Belieber', 'I love Bieber', CURRENT_TIMESTAMP),
  (1, 5, 'For Vicky', 'I love vicky', CURRENT_TIMESTAMP),
  (4, 7, 'sups', 'youre gonna die', CURRENT_TIMESTAMP),
  (2, 3, 'youtube', 'hey checkout this link', CURRENT_TIMESTAMP),
  (6, 4, 'Belieber', 'I love Bieber', CURRENT_TIMESTAMP);









