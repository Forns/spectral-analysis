/**
 * linear-algebra.js
 *
 * Contains supplementary linear-algebra functions and methods
 */

$(function () {
  
  /***** MATRIX *****/
 
  // Provides the sum of all matrix elements raised to a power
  spectralCore.matrix.sum = function (matrix, power) {
    var result = 0;
    // Default to a power of 1 if none specified
    if (typeof(power) === "undefined") {
      power = 1;
    }
    for (var i = 1; i <= matrix.rows(); i++) {
      for (var j = 1; j <= matrix.cols(); j++) {
        result += Math.pow(matrix.e(i, j), power);
      }
    }
    return result;
  }
  
  // The norm of a matrix is a scalar that gives some
  // measure of the magnitude of the elements of the matrix
  spectralCore.matrix.norm = function (matrix) {
    return Math.sqrt(spectralCore.matrix.sum(matrix, 2));
  };
  
  // Creates a matrix of all ones with specified dimensions
  spectralCore.matrix.ones = function (rows, columns) {
    var result = [],
        addedRow = [];
    // Construct the row full of ones...
    for (var i = 0; i < columns; i++) {
      addedRow.push(1);
    }
    // ...then push each into the matrix
    for (var j = 0; j < rows; j++) {
      result.push(addedRow);
    }
    return $M(result);
  };
  
  // Helper method for the matrix sorting that determines
  // ascending sorting method
  spectralCore.util.sortNumber = function (a, b) {
    return a - b;
  };
  
  // Sorts a given matrix by column and returns the new matrix
  spectralCore.matrix.sort = function (matrix) {
    var result = [];
    for (var i = 1; i <= matrix.cols(); i++) {
      var currentCol = [];
      // Have to get the column's elements as the return is a vector
      matrix.col(i).each(function (x, i) {
        currentCol.push(x);
      });
      currentCol = currentCol.sort(spectralCore.util.sortNumber);
      for (var j = 0; j < currentCol.length; j++) {
        if (typeof(result[j]) === "undefined") {
          result[j] = [];
        }
        result[j].push(currentCol[j]);
      }
    }
    return $M(result);
  };
  
  /***** VECTOR *****/
 
  // Provides the sum of all vector elements
  spectralCore.vector.sum = function (vector) {
    result = 0;
    vector.each(function (x, i) {
      result += x;
    });
    return result;
  };
  
});
