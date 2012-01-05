/*
 * Unit tests for the Spectral Analysis computations.
 * 
 * The following tests are run under QUnit. 
 */

$(function () {

  /*
   * Tests for the Math module
   */
  module("Math Module");
  
  test("Factorial", function () {
    equal(Math.factorial(0), 1);
    equal(Math.factorial(1), 1);
    equal(Math.factorial(3), 6);
  });
  
  test("Choose", function () {
    equal(Math.choose(1, 1), 1);
    equal(Math.choose(2, 1), 2);
    equal(Math.choose(2, 2), 1);
    equal(Math.choose(4, 2), 6);
  });
  
  
  /*
   * Tests for the matrix components
   * including the Sylvester objects
   */
  module("Matrices");
  
  test("Matrix Definitions", function () {
    ok($M([0]));
    ok($M([1, 2, 3]));
    ok($M([
      [1, 2, 3],
      [2, 4, 5],
      [-1, 20, 0]
    ]));
  });
  
  test("Matrix Element Sums", function () {
    equal(spectralCore.matrix.sum(
      $M(
        [0]
      ), 1
    ), 0);
    
    equal(spectralCore.matrix.sum(
      $M(
        [0, 0, 1]
      ), 1
    ), 1);
    
    equal(spectralCore.matrix.sum(
      $M(
        [0, 0, 1]
      )
    ), 1);
    
    equal(spectralCore.matrix.sum(
      $M([
        [-1, 1, 1],
        [2, 2, 2]
      ]), 1
    ), 7);
    
    equal(spectralCore.matrix.sum(
      $M([
        [-1, 1, 1],
        [2, 2, 2]
      ])
    ), 7);
    
    equal(spectralCore.matrix.sum(
      $M([
        [-1, 1, 1],
        [2, 2, 2]
      ]), 2
    ), 15);
  });
  
  test("Matrix Norm", function () {
    equal(spectralCore.matrix.norm(
      $M(
        [0]
      )
    ), 0);
    
    equal(spectralCore.matrix.norm(
      $M(
        [0, 1, -1]
      )
    ), Math.sqrt(2));
    
    equal(spectralCore.matrix.norm(
      $M([
        [0, 1, 1],
        [2, 2, Math.sqrt(6)]
      ])
    ), 4);
  });
  
  test("Matrix Ones", function () {
    ok(
      spectralCore.matrix.ones(1, 1).eql(
        $M([1])
      )
    );
    
    ok(
      spectralCore.matrix.ones(2, 1).eql(
        $M([
          [1],
          [1]
        ])
      )
    );
    
    ok(
      spectralCore.matrix.ones(1, 2).eql(
        $M([
          [1, 1]
        ])
      )
    );
    
    ok(
      spectralCore.matrix.ones(3, 3).eql(
        $M([
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1]
        ])
      )
    );
  });
  
  test("Matrix Sort", function () {
    ok(
      spectralCore.matrix.sort(
        $M([1])
      ).eql($M(
        [1]
      ))
    );
    
    ok(
      spectralCore.matrix.sort(
        $M([1, 2])
      ).eql($M(
        [1, 2]
      ))
    );
    
    ok(
      spectralCore.matrix.sort(
        $M([
          [1, 2, 3],
          [2, 1, 2]
        ])
      ).eql($M([
        [1, 1, 2],
        [2, 2, 3]
      ]))
    );
    
    ok(
      spectralCore.matrix.sort(
        $M([
          [-1, 2, -3],
          [2, 1, -2],
          [5, 0, 0]
        ])
      ).eql($M([
        [-1, 0, -3],
        [2, 1, -2],
        [5, 2, 0]
      ]))
    );
  });
  
  /*
   * Tests for the vector components
   * including the Sylvester objects
   */
  module("Vectors");
  
  test("Vector Definitions", function () {
    ok($V([0]));
    ok($V([0, -1, 2, 0]));
  });
  
  test("Vector Sums", function () {
    equal(spectralCore.vector.sum(
      $V([0])
    ), 0);
    
    equal(spectralCore.vector.sum(
      $V([0, 1])
    ), 1);
    
    equal(spectralCore.vector.sum(
      $V([-1, 0, 1])
    ), 0);
    
    equal(spectralCore.vector.sum(
      $V([0, 2, 5, -1, 0, 2])
    ), 8);
  });
  
});
