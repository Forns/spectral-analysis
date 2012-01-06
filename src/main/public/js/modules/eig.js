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
  
  // Helper function to find the position of the first non-zero
  // element in an array; [0, 0] if otherwise no position
  spectralCore.matrix.firstNonZero = function (matrix) {
    for (var i = 1; i <= matrix.rows(); i++) {
      for (var j = 1; j <= matrix.cols(); j++) {
        if (matrix.e(i, j)) {
          return [i, j];
        }
      }
    }
    return [0, 0];
  };
  
  // Transform an upper triangular matrix into reduced ro echelon form
  // using Gaussian elimination
  spectralCore.util.gaussianElimination = function (matrix) {
    console.warn("\n--------NEW RUN!--------")
    for (var currentRow = 1; currentRow <= matrix.rows(); currentRow++) {
      var pivot = 0,
          basePosition = currentRow;
      while (pivot === 0 && basePosition <= matrix.cols()) {
        console.warn("pivot: " + pivot + " basePosition: " + basePosition + " currentRow: " + currentRow);
        pivot = matrix.e(currentRow, basePosition);
        if (pivot) {
          console.warn("Pivot found! " + pivot);
          for (var i = 1; i <= basePosition; i++) {
            if (i !== currentRow) {
              for (var j = 1; j <= matrix.cols(); j++) {
                var elementValue = matrix.e(i, j) - matrix.e(currentRow, j) * (matrix.e(i, basePosition) / matrix.e(currentRow, basePosition));
                matrix.setElement(i, j, elementValue);
              }
            }
          }
        } else if (currentRow < matrix.rows()) {
          // FLAG: Methinks something is wrong in here; requires investigation
          console.warn("Finding First Nonzero!\n" + matrix.minor(currentRow + 1, basePosition, matrix.rows(), 1).inspect());
          var currentPosition = spectralCore.matrix.firstNonZero(matrix.minor(currentRow + 1, basePosition, matrix.rows(), 1))[0];
          console.warn("Results of nonzero search: " + currentPosition);
          if (currentPosition) {
            console.warn("Swapping: " + currentRow + " & " + (currentRow + currentPosition));
            matrix.swapRows(currentRow, currentRow + currentPosition);
          } else {
            basePosition += 1;
          }
        } else {
          basePosition += 1;
        }
      }
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
