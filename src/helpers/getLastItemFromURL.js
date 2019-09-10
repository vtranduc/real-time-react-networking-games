const getLastItemFromURL = function(url) {
  let index = 0;
  for (let i = url.length - 1; i > 0; i--) {
    if (url[i] === "/") {
      index = i;
      break;
    }
  }
  return url.slice(index + 1, url.length);
};

module.exports = getLastItemFromURL;
