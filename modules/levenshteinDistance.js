const levenshteinDistance = (orig, comp) => {
    /*
    if (!orig.length) return comp.length;
    if (!comp.length) return orig.length;

    return Math.min(
        levenshteinDistance(orig.substr(1), comp) + 1,
        levenshteinDistance(comp.substr(1), orig) + 1,
        levenshteinDistance(orig.substr(1), comp.substr(1)) + (orig[0] !== comp[0] ? 1 : 0)
    ) + 1;
    */

   if(orig.length == 0) return comp.length; 
   if(comp.length == 0) return orig.length; 
 
   var matrix = [];
 
   var i;
   for(i = 0; i <= comp.length; i++){
       matrix[i] = [i];
   }
 
   var j;
   for(j = 0; j <= orig.length; j++){
       matrix[0][j] = j;
   }
 
   // Fill in the rest of the matrix
   for(i = 1; i <= comp.length; i++){
       for(j = 1; j <= orig.length; j++){
           if(comp.charAt(i-1) == orig.charAt(j-1)){
               matrix[i][j] = matrix[i-1][j-1];
           } else {
               matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
               Math.min(matrix[i][j-1] + 1, // insertion
               matrix[i-1][j] + 1)); // deletion
           }
       }
   }

   return matrix[comp.length][orig.length];
}

/*

https://github.com/dumb-password-rules/dumb-password-rules

exports.getEditDistance = function(a, b){
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                Math.min(matrix[i][j-1] + 1, // insertion
                matrix[i-1][j] + 1)); // deletion
            }
        }
    }
  
    return matrix[b.length][a.length];
};
*/

exports.levenshteinDistance = levenshteinDistance;