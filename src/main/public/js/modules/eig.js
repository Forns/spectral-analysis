/**
 * eig.js
 * 
 * Contains computations necessary for finding eigenvalues / -vectors
 */

$(function () {
  
  // Returns a map containing the multiplicities of diagonals
  spectralCore.util.multiplicities = function (vector) {
    var diagonalMultiplicities = {};
    vector.each(function (x, i) {
      if (typeof(diagonalMultiplicities[x]) === "undefined") {
        diagonalMultiplicities[x] = 1;
      } else {
        diagonalMultiplicities[x] += 1;
      }
    });
    return diagonalMultiplicities;
  };
  
  // Returns a reduced-row echalon form of the given matrix
  spectralCore.util.gaussianElimination = function (matrix) {
    // Begin by iterating through each column and finding the max abs value
    for (var k = 1; k <= matrix.cols(); k++) {
      // Find the pivot for column k
      var columnPivot = 0,
          pivotMax = 0;
      for (var n = k; n <= matrix.rows(); n++) {
        var columnEntry = matrix.e(n, k);
        if (Math.abs(columnEntry) >= pivotMax) {
          pivotMax = Math.abs(columnEntry);
          columnPivot = n;
        }
      }
      // If our columnPivot was 0, then find the next pivot,
      // otherwise we continue the elimination with given pivot
      if (columnPivot) {
        // Swap the current row with the pivot index row
        matrix.swapRows(k, columnPivot);
        
        // For each row below the pivot, use pivot to annihilate column entries
        for (var i = 1; i <= matrix.rows(); i++) {
          if (i !== k) {
            for (var j = k; j <= matrix.cols(); j++) {
              var elementValue = matrix.e(i, j) - matrix.e(k, j) * (matrix.e(i, k) / matrix.e(k, k));
              matrix.setElement(i, j, elementValue);
            }
          }
        }
        for (var i = k + 1; i <= matrix.rows(); i++) {
          matrix.setElement(i, k, 0);
        }
      }
      console.warn(matrix.inspect());
    }
    return matrix;
  };
  
  // Returns the eigenvalues and vectors in a 2D array
  spectralCore.modules.eig = function (upperTriangularMatrix) {
    // Begin by gathering the diagonal entries and their multiplicities
    var diagonalsVector = upperTriangularMatrix.diagonal(),
        diagonalsMatrix = diagonalsVector.toDiagonalMatrix(),
        diagonalMultiplicities = spectralCore.util.multiplicities(diagonalsVector);
  };
  
});
