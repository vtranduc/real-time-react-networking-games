const spaceRemover = function(str) {
  let marker=null;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " "){
      marker = i;
      break;
    }
  }
  if (!marker) {
    return "";
  }
  let output = str.slice(marker);
  for (let i = output.length -1; i>=0; i--){
    if (output[i] !== " "){
      marker = i;
      break;
    }
  }
  return output.slice(0, marker+1)
  
};
