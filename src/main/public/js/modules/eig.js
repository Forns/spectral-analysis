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
        diagonalMultiplicities[x] = [];
        diagonalMultiplicities[x].push(i);
      } else {
        diagonalMultiplicities[x].push(i);
      }
    });
    return diagonalMultiplicities;
  };
  
  // Helper function to find the position of the first non-zero
  // element in an array; [0, 0, 0] if otherwise no position
  spectralCore.matrix.firstNonZero = function (matrix) {
    for (var i = 1; i <= matrix.rows(); i++) {
      for (var j = 1; j <= matrix.cols(); j++) {
        var currentElement = matrix.e(i, j);
        if (currentElement) {
          return [i, j, currentElement];
        }
      }
    }
    return [0, 0, 0];
  };
  
  // Transform an upper triangular matrix into reduced row echelon form
  // using Gaussian elimination
  spectralCore.util.gaussianElimination = function (matrix) {
    for (var currentRow = 1; currentRow <= matrix.rows(); currentRow++) {
      var pivot = 0,
          basePosition = currentRow; 
      while (pivot === 0 && basePosition <= matrix.cols()) {
        pivot = matrix.e(currentRow, basePosition);
        if (pivot) {
          for (var i = 1; i <= basePosition; i++) {
            if (i !== currentRow) {
              for (var j = 1; j <= matrix.cols(); j++) {
                var elementValue = matrix.e(i, j) - matrix.e(currentRow, j) * (matrix.e(i, basePosition) / matrix.e(currentRow, basePosition));
                matrix.setElement(i, j, elementValue);
              }
            }
          }
        } else if (currentRow < matrix.rows()) {
          var currentPosition = spectralCore.matrix.firstNonZero(matrix.minor(currentRow + 1, basePosition, matrix.rows() - currentRow, 1))[0];
          if (currentPosition) {
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
  
  // Helper method to order the rows by index of pivot, and dividing by pivot
  // Note, there should never be two rows sharing the same firstNonzero index
  spectralCore.util.pivotSwap = function (matrix) {
    var result = Matrix.Zero(matrix.rows(), matrix.cols()),
        firstNonZeroResult = [0, 0, 0];
    // Iterate through each row, finding its pivot, dividing the row by it,
    // and then placing it in the correct position
    for (var i = 1; i <= matrix.rows(); i++) {
      firstNonZeroResult = spectralCore.matrix.firstNonZero(matrix.minor(i, 1, 1, matrix.cols()));
      if (firstNonZeroResult[1]) {
        result.setRow(firstNonZeroResult[1], matrix.row(i).multiply(1 / firstNonZeroResult[2]));
      }
    }
    return result;
  };
  
  // Returns the eigenvalues and vectors in a 2D array
  spectralCore.modules.eig = function (upperTriangularMatrix) {
    // Begin by gathering the diagonal entries and their multiplicities
    var diagonalsVector = upperTriangularMatrix.diagonal(),
        diagonalsMatrix = diagonalsVector.toDiagonalMatrix(),
        diagonalMultiplicities = spectralCore.util.multiplicities(diagonalsVector),
        eigenvectors = Matrix.Zero(upperTriangularMatrix.rows(), upperTriangularMatrix.cols());
        
    // For each eigenvalue, compute the orthogonal complement of eigenspace:
    for (var eigenvalue in diagonalMultiplicities) {
      // T = pivotSwap ( reducedMatrix ( R - lambda * I ) )
      var identityTimesEigenvalue = Matrix.I(upperTriangularMatrix.rows()).multiply(parseFloat(eigenvalue)),
          characteristicMatrix = upperTriangularMatrix.subtract(identityTimesEigenvalue),
          eigenspacePerpendicular = spectralCore.util.pivotSwap(spectralCore.util.gaussianElimination(characteristicMatrix)),
          columnSelect = 0;
          console.warn("Perpendicular Eigenspace for Eigenvalue: " + parseFloat(eigenvalue) + "\n" + eigenspacePerpendicular.inspect());
      // Now, with the eigenspace perpendicular for the particular eigenvalue,
      // we subtract the identity matrix and normalize each column, replacing
      // the same one in the input matrix
      eigenspacePerpendicular = eigenspacePerpendicular.subtract(Matrix.I(eigenspacePerpendicular.rows()));
      for (j = 1; j <= upperTriangularMatrix.rows(); j++) {
        currentColumn = eigenspacePerpendicular.col(j);
        if (!currentColumn.isZeroVector()) {
          upperTriangularMatrix.setCol(j, currentColumn.toUnitVector());
        }
      }
    }
    console.warn("FINAL:\n" + upperTriangularMatrix.inspect() + "\n");
  };
  
});
