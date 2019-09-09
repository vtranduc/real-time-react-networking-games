INSERT INTO users (username, first_name, last_name, bio, email, pass, avatar,background)
VALUES('jzizzless', 'jayjay', 'ting', 'I am simply the best in the world','jayjay_ting@hotmail.com','hello', 'https://i.pinimg.com/originals/66/3f/6d/663f6dbf145854a9fb0917fe35f8156a.gif', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
('a','a', 'aa', 'This is a','aa@aa.com','a', 'https://media.giphy.com/media/WW7vnXiXTuGhq/giphy.gif','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem'),
('b','b', 'bb', 'This is b','bb@bb.com','b','https://media.giphy.com/media/gx54W1mSpeYMg/giphy.gif', 'ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'),
('c','c', 'cc', 'This is c','cc@cc.com','c', 'https://media.giphy.com/media/Rov6QSZGBQgNO/giphy.gif','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'),
('sushi','viet', 'nien', 'I am the worlds best soccer player','viet@cc.com','c', 'https://media.giphy.com/media/krI1lBPsluByg/giphy.gif',' Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molest'),
('joji','yob', 'nieman', 'I like eating ginger','bobby@gmail.com','yoyo', 'http://giphygifs.s3.amazonaws.com/media/5xqKWd6761tkY/giphy.gif','On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.'),
('vickylicious','vicky', 'lee', 'waiting for my prince <3','vickylicious@gmail.com','iloveyou', 'https://media.giphy.com/media/100QWMdxQJzQC4/giphy.gif','These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and'),
('wowowiseeyou','see', 'you', 'I can see you all day','see@cc.com','banana', 'https://media.giphy.com/media/UVk5yzljef0kGiayL1/source.gif',' owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.');



INSERT INTO follow(user_id, follow_id)
VALUES(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 3),
(1, 4),
(4, 3),
(5, 3);



INSERT INTO soccer_session (start_time, end_time)
VALUES(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO soccer_player(score, team, user_id, session_id)
VALUES
(3, 'left', 1, 1),
(4, 'left', 2, 1),
(5, 'right', 3, 1),
(6, 'right', 4, 1),
(8, 'right', 3, 7),
(2, 'left', 6, 2),
(5, 'right', 8, 2);


INSERT INTO friendship(user_id, receiver_id, request_status)
VALUES(1, 2, false),
(1, 3, false),
(2, 3, true),
(5, 4, true),
(3, 2, true),
(1, 6, true),
(4, 8, true),
(7, 4, true);

INSERT INTO user_posts(sender_id, receiver_id, message_title,sent_message, time_of_post)
VALUES (1, 2,'song' ,'I dont wanna close my eyeyeyeyeyeys, dont wanna see you baby cuz you feel me babe, and i dont wanna miss a thang', CURRENT_TIMESTAMP),
(2, 3, 'flirt', 'you naughty boy~', CURRENT_TIMESTAMP),
(2 ,4, 'flirting','no.... YOU are naughty~', CURRENT_TIMESTAMP),
(4, 6, 'Belieber','I love Bieber', CURRENT_TIMESTAMP),
(1, 5, 'For Vicky','I love vicky', CURRENT_TIMESTAMP),
(4, 7, 'sups','youre gonna die', CURRENT_TIMESTAMP),
(2, 3, 'youtube','hey checkout this link', CURRENT_TIMESTAMP),
(6, 4, 'Belieber','I love Bieber', CURRENT_TIMESTAMP);









