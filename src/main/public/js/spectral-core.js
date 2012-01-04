/**
 * spectral-core.js
 * 
 * Defines the global spectral analysis object with
 * utility methods and variables for use client-side
 */

// Define the global object
var spectralCore = {
  modules: {},
  util: {}
};

// Import necessary modules
include.includeInit([
  
  /***** LIBRARIES *****/
  'js/lib/jquery-1.7.1.min.js',
  'js/lib/jquery-ui-1.8.16.custom.min.js',
  'js/lib/sylvester.js'
  
]);