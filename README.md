### Welcome!

This is a project that was created by Jay Jay Ting and Viet-Nhien Tran Duc to show their understanding of everything they have learned throughout their 3 months at Lighthouse Labs. The project has included a full tech stack which included the following:
backend: PostgreSQL, node.js, socket.io, and express
frontend: React, Phaser, HTML, and CSS

The project was completed in two weeks. The users on this website is able to do the following:

User Profile Page

- create an account with their desired username and passcode
- have their own profile page with customizable avatars and background image.
- able to follow and request for friends
- able to view friends and follows list
- able to create posts on the users own and others profile (sort of like a tweet)
- able to have private chat messages to other players.

Game Lobby

- the game lobby is a place where users are able to create or join private rooms where they can send messages and interact with each other.
- users are able to create rooms with custom name and passcode.
- users are able to chat with each other.
- users are able to join rooms and be redirected to multiplayer games as a group
- each room is a seperate instance, and will not interfere with other rooms

Phaser Game - Comet Race: A single player game created with Phaser game engine

- user is able to control the spaceship with w,a,s,d keys
- is user touches a comet, the game will reset (Game Over)
- user is able to collect stars to gain points
- difficulty is based on play duration, and comets will come down more frequently as time goes by
- user cannot 'Win', it is an arcade game

Multiplayer game - Divine Soccer: Game created with HTML, CSS, JavaScript, and React

\*\* Unfortunately, as the phaser game engine is run on the client side, it is difficult to determine character movement and interactions. We needed to have the game logic to be determined on the server side so that there should be only 'one source of truth'. So, instead of user Phaser game engine, we created a game engine ourselves specifically made on the server side. All physics interactiions, hitboxes, and collision detection is custom created to make this game. Bascially a game made from scratch.

- user is able to connect to a desired room, and within that room able to play with other users a soccer game
- user is able to kick, redirect the ball and score into opponents goals.
- user is able to direct the ball to a desired location and kick it.
- winner will be logged into the database.
- soccer game room also has a private chat area for users

Multiplayer Game - Rock Paper Scissors: basically a rock paper scissers game made for multiplayers

- user is able to connect to a desired room with other users
- user is able to choose either rock, paper, or scissors.
- winner will be logged into database
- users are able to chat with each other.

Multiplayer Chat World - Chat World: A virtual reality chat room where all users can move around and chat with each other.

- users are able to join the world as a guest or user
- users can walk around this game world map
- users can customize their own avatar
- users can chat with other users as their avatar

### `npm install`

Install all dependencies and start the server!

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
