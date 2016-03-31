
/**
 * Methods.
 */

var methods = [
  'debug',
  'info',
  'warn',
  'error',
  'critical',
  'alert',
  'emergency',
  'notice',
  'fatal'
];

/**
 * Expose methods.
 */

methods.forEach(function(method){
  exports[method] = function(){};
});
