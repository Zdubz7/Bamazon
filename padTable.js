// This function pads the SQL output table in the app.
function padText(titleText, entryText){
  
  // These variables are left and right padding.
  var padLeft;
  var padRight;

  // This variable subtracts the lengths of the text.
  var splitLength = (titleText.length - entryText.length)/2;

 // This variable loops through the varying length difference to get the user the propper padding.
  var pad = '';
  for(var j=0; j < splitLength; j++){
    pad += ' ';
  }
  // This section controls the odd size lengths of the padding.
  if(Number.isInteger(splitLength)){
    padLeft = pad;
    padRight = pad;
  }
  else{
    padLeft = pad;
    // This section removes the last space.
    padRight = pad.substring(0, pad.length-1); 
  }
// This section returns the newly padded user input for the table.
  return padLeft + entryText + padRight;
}

// This section exports padtext to the other Bamazon scripts within the app.
module.exports = padText;