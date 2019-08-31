// const moveItem = function(item, time) {
//   if (ball.vel.x !== 0) {
//     if (ball.vel.x < 0) {
//       ball.pos.x += displacement(ball.vel.x, ball.resistance.x, frameDuration);
//       ball.vel.x += ball.resistance.x * frameDuration;
//       if (ball.vel.x > 0) {
//         ball.vel.x = 0;
//       }
//     } else if (ball.vel.x > 0) {
//       ball.pos.x += displacement(ball.vel.x, -ball.resistance.x, frameDuration);
//       ball.vel.x -= ball.resistance.x * frameDuration;
//       if (ball.vel.x < 0) {
//         ball.vel.x = 0;
//       }
//     }
//   }
//   if (ball.vel.y !== 0) {
//     if (ball.vel.y < 0) {
//       ball.pos.y += displacement(ball.vel.y, ball.resistance.y, frameDuration);
//       ball.vel.y += ball.resistance.y * frameDuration;
//       if (ball.vel.y > 0) {
//         ball.vel.y = 0;
//       }
//     } else if (ball.vel.y > 0) {
//       ball.pos.y += displacement(ball.vel.y, -ball.resistance.y, frameDuration);
//       ball.vel.y -= ball.resistance.y * frameDuration;
//       if (ball.vel.y < 0) {
//         ball.vel.y = 0;
//       }
//     }
//   }
// };
// const updataItemBottomRight = function(item, itemSize) {};
// const handleItemOutsideRange = function() {};
// const moveItemWithCommand = function() {};
// const handleItemsCollision = function() {};
// const elasticCollision = function() {};
// const collisionDetector = function() {};
// const displacement = function(vi, accel, time) {
//   return vi * time + 0.5 * accel * time * time;
// };

// module.exports = {
//   moveItem,
//   updataItemBottomRight,
//   handleItemOutsideRange,
//   moveItemWithCommand,
//   handleItemsCollision,
//   elasticCollision,
//   collisionDetector,
//   displacement
// };
