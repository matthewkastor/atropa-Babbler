(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Babbler = require('../src/atropa-Babbler.js');

try {
    Object.keys(Babbler).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = Babbler[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-Babbler.js');
}

Object.keys(Babbler.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = Babbler.data[prop];
    }
);

},{"../src/atropa-Babbler.js":8}],2:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Utilities for handling arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @namespace Utilities for handling arrays.
 */
atropa.arrays = {};
/**
 * Compares two arrays based on size, contents, and element order.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} array1 One array you want compared to another.
 * @param {Array} array2 The other array.
 * @returns {Boolean} Returns true or false depending on
 *  whether or not the arrays matched in size, composition, and
 *  element order.
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.match(x,y);
 * // returns false
 * @example
 * var x = [1,2];
 * var y = [1,2];
 * atropa.arrays.match(x,y);
 * // returns true
 * @example
 * var x = [1,2];
 * var y = [2,1];
 * atropa.arrays.match(x,y);
 * // returns false because the elements are not in the same order.
 * @example
 * var x = [1,{'aProp' : 'aValue'}];
 * var y = [1,{'aProp' : 'aValue'}];
 * atropa.arrays.match(x,y);
 * // returns false because even though the object looks the same, the
 * // two objects are in fact distinct objects.
 * @example
 * var obj = {'aProp' : 'aValue'};
 * var x = [1,obj];
 * var y = [1,obj];
 * atropa.arrays.match(x,y);
 * // returns true because the objects referenced in the arrays are
 * // in fact the same object.
 */
atropa.arrays.match = function arraysMatch(array1, array2) {
    "use strict";
    var x,
    l;
    if (array1.length !== array2.length) {
        return false;
    }
    l = array1.length;
    for (x = 0; x < l; x += 1) {
        if (array1[x] !== array2[x]) {
            return false;
        }
    }
    return true;
};
/**
 * Subtracts one array from another array based on the unique values in both
 *  sets.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} a (subtrahend) The array to subtract.
 * @param {Array} fromB (minuend) The array with elements duplicated in <code>a</code>
 * @returns {Array} Returns a new array containing only the unique
 *  values found in <code>fromB</code> that are not present in <code>a</code>
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.subtract(x,y);
 * // returns [3]
 * @example
 * var x = [1,3];
 * var y = [3,1];
 * atropa.arrays.subtract(x,y);
 * // returns []
 * @example
 * var x = [1,3];
 * var y = [3,1,1,9];
 * atropa.arrays.subtract(x,y);
 * // returns [9]
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'}
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.subtract(x,y);
 * // returns [] 
 * // because the objects referenced in the arrays are the same object.
 */
atropa.arrays.subtract = function(a, fromB) {
    "use strict";
    var the = {};
    the.result = [];
    fromB.forEach(function(item){
        the.mark = false;
        a.forEach(function(rm){
            if(item === rm) {
                the.mark = true;
            }
        });
        if(the.mark !== true) {
            the.result.push(item);
        }
    });
    return the.result;
};
/**
 * Returns an array of values found in both of the given arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} array1 An array.
 * @param {Array} array2 Another array.
 * @returns {Array} Returns an array of values found in both of the given
 *  arrays.
 * @example
 * var x = [1,3,4];
 * var y = [3,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3]
 * @example
 * var x = [1,1,3,4];
 * var y = [3,1,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,1,3]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3,{'aProp' : 'aVal'}]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 */
atropa.arrays.intersect = function intersect(array1, array2) {
    "use strict";
    var smallArray, largeArray, intersection = [];
    if(array1.length > array2.length) {
        largeArray = array1.splice(0);
        smallArray = array2.splice(0);
    } else {
        largeArray = array2.splice(0);
        smallArray = array1.splice(0);
    }
    smallArray.forEach(function (item) {
        var idxInLargeArray = largeArray.indexOf(item);
        if (0 <= idxInLargeArray) { // has word
            intersection.push(largeArray.splice(idxInLargeArray, 1)[0]);
        }
    });
    return intersection;
};
/**
 * Calculates the frequency of items occurring in an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array to calculate frequencies from.
 * @returns {Object} Returns an object whose keys are each unique
 *  elements from the array and their value is their frequency of
 *  occurrence within the array. Be careful that your array does
 *  not contain values matching object instance property names.
 * @example
 * var x = [1,1,1,1,1,3,3];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 5,
 * //     "3": 2
 * // }
 * @example
 * var x = ["bill", "fred", "fred", "jane"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "bill": 1,
 * //     "fred": 2,
 * //     "jane": 1
 * // }
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 1
 * // }
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var otherObj = {};
 * var x = [1,3,obj,otherObj,{'aDoughnut' : 'sprinkles'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 3
 * // }
 * @example
 * var x = [1,3,"toString"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "toString": "function toString() {\n    [native code]\n}1"
 * // }
 */
atropa.arrays.getFrequency = function (arr) {
    "use strict";
    var out = arr.reduce(function (acc, curr) {
        if (acc[curr] === undefined) {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    return out;
};
/**
 * Gets Unique values from an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} largeArray The array with duplicate values in it.
 * @returns {Array} Returns a new array containing only the unique
 *  values found in the largeArray.
 * @example
 * var x = [1,1,1,4,4,3,6];
 * atropa.arrays.getUnique(x);
 * // returns [ "1", "4", "3", "6" ]
 * @example
 * var x = ["bill", "fred", "jane", "fred"];
 * atropa.arrays.getUnique(x);
 * // returns ["bill", "fred", "jane"]
 * @example
 * var x = [ 
 *     "bill",
 *     {"aProp" : "aValue"},
 *     {"aGuy" : "fred"},
 *     {"aLady" : "jane"}
 * ];
 * atropa.arrays.getUnique(x);
 * // returns [ "bill", "[object Object]" ]
 */
atropa.arrays.getUnique = function (largeArray) {
    "use strict";
    return Object.keys(atropa.arrays.getFrequency(largeArray)).sort();
};
/**
 * Removes empty strings from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arrayWithEmptyElements The array with empty strings in it.
 * @returns {Array} Returns a new array with empty strings removed.
 * @example
 * var x = [ 10, , 5, "", '', 7 ];
 * console.log('starting length ' + x.length);
 * console.log(x);
 * x = atropa.arrays.removeEmptyElements(x);
 * console.log('ending length ' + x.length);
 * console.log(x);
 * // displays the following
 * // starting length 6
 * // [10, undefined, 5, "", "", 7]
 * // ending length 3
 * // [10, 5, 7]
 */
atropa.arrays.removeEmptyElements = function (arrayWithEmptyElements) {
    "use strict";
    return arrayWithEmptyElements.filter(function (item) {
        return !atropa.inquire.isEmptyString(item);
    });
};
/**
 * Reindexes an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array with discontinuous keys.
 * @returns {Array} Returns an array with continuous keys.
 * @example
 * var x = [ "a", "b", "c", undefined ];
 * console.log(x); // [ "a", "b", "c", undefined ]
 * console.log(x.length); // 4
 * 
 * delete x[1]; // deletes the key from the array but
 *              // the array length remains the same
 *              // at this point the arrays keys are 0, 2, and 3
 * console.log(x); // [ "a", undefined, "c", undefined ]
 * console.log(x.length); // 4
 * 
 * x = atropa.arrays.reindex(x);
 * console.log(x); //  [ "a", "c", undefined ]
 *    // note that the last element existed in the array, its value was
 *    // undefined but it did have a key so the element remains in the array.
 *    //
 *    // The deleted element was in fact deleted from the array so there was no
 *    // key x[1] at all, when trying to access this non existing element the
 *    // value of undefined was returned. This behavior is confusing unless you
 *    // think about the arrayas an object whose properties are named by
 *    // numbers. Accessing an undefined property returns undefined regardless
 *    // of whether the property existed in the past or not.
 * console.log(x.length); // 3
 */
atropa.arrays.reindex = function reindex(arr) {
    "use strict";
    var idx, out;
    out = [];
    for(idx in arr) {
        if(arr.hasOwnProperty(idx)) {
            out.push(arr[idx]);
        }
    }
    return out;
};
/**
 * Sorts an array's elements numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @param {Array} arr The array to sort. All elements of the array must be
 *  number-ish.
 * @returns {Array} Returns an array whose elements are in numeric order.
 * @example
 * var x = [3, 2, 9, 26, 10, 1, 99, 15];
 * console.log( atropa.arrays.sortNumerically(x) );
 * // logs [1, 2, 3, 9, 10, 15, 26, 99]
 */
atropa.arrays.sortNumerically = function sortNumerically(arr) {
    "use strict";
    return arr.sort(function (a, b) {
        return (a - b);
    });
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.arrays.sortAlphabetically = function sortAlphabetically(arr) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Deletes the given element from the array at the given index. It basically
 *  does what you would expect the delete operator to do, except the delete
 *  operator doesn't do what you would expect.
 * @param {Array} arr The array.
 * @param {Number} index The index of the element to delete.
 * @returns Returns an array with the element removed, contiguous keys, and
 *  whose length is 1 less than the input array.
 */
atropa.arrays.deleteElement = function (arr, index) {
    "use strict";
    delete arr[index];
    return atropa.arrays.reindex(arr);
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3,"atropa-inquire":4}],3:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],4:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Container for functions that test the state of inputs.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for functions that test the state of inputs.
 */
atropa.inquire = {};
/**
 * Checks whether the input is null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be null.
 * @returns {Boolean} Returns true if x === null.
 */
atropa.inquire.isNull = function (x) {
    "use strict";
    return (x === null);
};
/**
 * Checks whether the input is an object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be an object.
 * @returns {Boolean} Returns true if typeof(x) === 'object'.
 */
atropa.inquire.isObject = function (x) {
    "use strict";
    return (typeof x === 'object');
};
/**
 * Checks whether the input is both an object and not null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be both an
 * object and null.
 * @returns {Boolean} Returns true if x is both an object and
 * not null. (null is an object).
 */
atropa.inquire.isObjectNotNull = function (x) {
    "use strict";
    return atropa.inquire.isObject(x) && (!atropa.inquire.isNull(x));
};
/**
 * Checks an object for the existence of a property
 * regardless of whether the property was inherited
 * or not.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj An object which may or may not
 * have the property identified by prop.
 * @param {String} prop A string value representing the
 * name of the property.
 * @returns {Boolean} Returns true if obj.prop exists,
 * otherwise returns false.
 */
atropa.inquire.hasProperty = function (obj, prop) {
    "use strict";
    if (atropa.inquire.isObjectNotNull(obj)) {
        return (prop in obj);
    }
    return false;
};
/**
 * Checks whether the input is an empty string.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} str The string you want to know about
 * @returns {Boolean} Returns true if str is an empty string,
 *  otherwise returns false.
 */
atropa.inquire.isEmptyString = function (str) {
    "use strict";
    var out = false;
    if ('' === str) {
        out = true;
    }
    return out;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3}],5:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Provides random strings and numbers.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Provides random strings and numbers.
 */
atropa.random = {};
/**
 * Gives you a random string whose length and characters you specify.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Number} stringLength This is the length of the string.
 * @param {String} characterClass Optional. May be one of:
 *  numeric, caps, lower, alpha, alphanumeric, punctuation, vowel, consonant
 *  This is the type of characters you want returned to you. Defaults to
 *  alphanumeric.
 * @return {String} A random string of specified length and composition.
 */
atropa.random.string = function randomString(stringLength, characterClass) {
    'use strict';
    var numeric,
    vowel,
    consonant,
    lower,
    caps,
    alpha,
    alphanumeric,
    punctuation,
    chars,
    string_length,
    randomstring,
    i,
    character;
    
    numeric = '0123456789';
    vowel = 'aeiouy';
    consonant = 'bcdfghjklmnpqrstvwxz';
    lower = vowel + consonant;
    caps = lower.toUpperCase();
    alpha = caps + lower;
    alphanumeric = numeric + caps + lower;
    punctuation = '.?!';
    randomstring = '';
    switch (characterClass) {
    case 'numeric':
        chars = numeric;
        break;
    case 'caps':
        chars = caps;
        break;
    case 'lower':
        chars = lower;
        break;
    case 'alpha':
        chars = alpha;
        break;
    case 'alphanumeric':
        chars = alphanumeric;
        break;
    case 'punctuation':
        chars = punctuation;
        break;
    case 'vowel':
        chars = vowel;
        break;
    case 'consonant':
        chars = consonant;
        break;
    default:
        chars = alphanumeric;
        break;
    }
    if (stringLength === undefined) {
        string_length = 4;
    } else {
        string_length = stringLength;
    }
    for (i = 0; i < string_length; i++) {
        character = Math.floor(Math.random() * chars.length);
        randomstring += chars[character];
    }
    return randomstring;
};
/**
 * Generates a random number between the specified min and max value.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Number} min The lowest number you want returned
 * @param {Number} max The highest number you want returned
 * @returns {Number} A random number within the specified range.
 */
atropa.random.integer = function randomInteger(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * Get a random property name from the given object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj The object to select a random
 *  property name from.
 * @return {String} A random property name from the
 *  given object.
 */
atropa.random.getPropertyName = function (obj) {
    "use strict";
    var arr;
    arr = Object.keys(obj);
    return arr[atropa.random.getArrayKey(arr)];
};
/**
 * Get a random key from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} arr The array to select a random
 *  key from. The keys of the array must be contiguous.
 * @return {Number} A random integer between 0 and
 *  <code>arr.length</code>
 */
atropa.random.getArrayKey = function (arr) {
    "use strict";
    return Math.floor(Math.random() * arr.length);
};
/**
 * Get a random value from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} arr The array to select a random
 *  value from. The keys of the array must be contiguous.
 * @return {Mixed} A random value from the given array.
 */
atropa.random.getArrayValue = function (arr) {
    "use strict";
    return arr[atropa.random.getArrayKey(arr)];
};
/**
 * Remove a random element from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} arr The array to remove a random
 *  element from. The keys of the array must be contiguous.
 * @return {Mixed} A random value from the given array.
 */
atropa.random.pullArrayElement = function (arr) {
    "use strict";
    var k,
    d;
    k = atropa.random.getArrayKey(arr);
    d = arr[k];
    arr.splice(k, 1);
    return d;
};
/**
 * Remove a random property from the given object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj The object to remove a random
 *  property from.
 * @return {Mixed} A random value from the given object.
 */
atropa.random.pullProperty = function (obj) {
    "use strict";
    var pName,
    objData;
    pName = atropa.random.getPropertyName(obj);
    objData = obj[pName];
    delete obj[pName];
    return objData;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3}],6:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Container for regex functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for regex functions.
 */
atropa.regex = {};
/**
 * Regex patterns
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Regex patterns.
 */
atropa.regex.patterns = {
    /**
     * finds repeated words and phrases
     * @type RegExp
     */
    repeatedWords : /(\b.{3,}\b)\s*(\1)/g,
    /**
     * finds paragraph breaks
     * @type RegExp
     */
    paragraphBreaks : /(\r\n\r\n|\n\n|\r\r)/g,
    /**
     * finds line breaks
     * @type RegExp
     */
    lineBreaks : /(\r\n|\r|\n)/g
};
/**
 * Appends common prefix, suffix, and word boundary regex strings to
 * the supplied word.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 * @param {String} word The word to append prefix and suffix to
 * @param {Integer} threshold The word.length at which it does not
 * make sense to append prefix and suffix. Defaults to 3.
 * @returns {String} Returns the supplied word with prefix, suffix,
 * and word boundaries attached. If the word.length was not greater
 * than the threshold, only word boundaries are attached. The string
 * represents a RegEx which should pick out most forms of regular
 * words.
 */
atropa.regex.appendPrefixesAndSuffixes = function (word, threshold) {
    "use strict";
    var prefixes,
    suffixes;
    prefixes = '(pre|un|re)?';
    suffixes = '(ification|' +
                'tionally|' +
                'ication|' +
                'ified|istic|iness|' +
                'fare|tion|ance|ence|less|ally|able|ness|ized|ised|' +
                'ous|ify|ing|ity|ful|ant|ate|est|ism|izm|ist|' +
                'ic|al|ed|er|et|ly|rs|in|' +
                'y|s|r|d)?';
    
    threshold = threshold === undefined ? 3 : threshold;
    
    if (word.length > threshold) {
        word = '\\b' + prefixes + word + suffixes + '\\b';
    } else {
        word = '\\b()' + word + '()\\b';
    }
    return word;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3}],7:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.regex = require('atropa-regex').regex;
atropa.arrays = require('atropa-arrays').arrays;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * A few utilities for manipulating strings.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace A few utilities for manipulating strings.
 * @requires atropa.regex.patterns
 */
atropa.string = {};
/**
 * Replaces repeated words and phrases with a single word or phrase.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to remove repeated words from.
 * @returns {String} Returns the given string with repeated words and
 *  phrases removed.
 */
atropa.string.removeRepeatedWord = function removeRepeatedWord (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.repeatedWords, '$1');
};
/**
 * Creates paragraph breaks at every occurrence of two consecutive line breaks.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to insert paragraph tags into.
 * @returns {String} Returns the given string with paragraph breaks inserted.
 */
atropa.string.lineBreaksToParagraphTags = function lineBreaksToParagraphTags (string) {
    "use strict";
    var out = string.replace(atropa.regex.patterns.paragraphBreaks, '</p><p>');
    out = '<p>' + out.trim() + '</p>';
    out = out.replace(/\s+<\/(p|br)>/g, '</$1>');
    return out;
};
/**
 * Creates break tags at every line break.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to insert break tags into.
 * @returns {String} Returns the given string with break tags inserted.
 */
atropa.string.lineBreaksToBreakTags = function lineBreaksToBreakTags (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.lineBreaks, '<br>');
};
/**
 * Normalizes line breaks to `\n`.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to normalize.
 * @returns {String} Returns the given string with normalized line breaks.
 */
atropa.string.normalizeEol = function normalizeEol (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.lineBreaks, '\n');
};
/**
 * Converts the first character of a given string to
 * uppercase.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} string The string for which you want the
 * first letter to be in upper case.
 * @returns {String} The given string with it's first letter capitalized.
 */
atropa.string.ucFirst = function ucFirst(string) {
    "use strict";
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
};
/**
 * Converts the given string to camel case.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130823
 * @param {String} string The string to camelize.
 * @returns {String} The camelized string.
 * @example
 *  atropa.string.camelize('get it together');
 *  // returns "getItTogether"
 */
atropa.string.camelize = function camelize (str) {
    "use strict";
    var arr, out;
    arr = str.split(' ');
    out = arr.shift();
    arr = arr.map(function (item) {
        return atropa.string.ucFirst(item);
    });
    out += arr.join('');
    return out;
};
/**
 * Counts words.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @param {String} someText Plain text.
 * @return {Number} Returns the count of words in someText.
 */
atropa.string.countWords = function countWords(someText) {
    "use strict";
    var wordCount, re, len = 0;
    if(someText !== undefined && someText !== null) {
        someText = someText.trim();
        if(someText !== '') {
            wordCount = 0;
            re = /\s+/gi;
            wordCount = someText.split(re);
            len = wordCount.length;
        }
    }
    return len;
};
/**
 * Converts end of line markers into whatever you want. 
 * Automatically detects any of \r\n, \n, or \r and 
 * replaces it with the user specified EOL marker.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text you want processed.
 * @param {String} newEOL The replacement for the current EOL marks.
 * @returns {String} Returns the processed text.
 */
atropa.string.convertEol = function convertEOL(text, newEOL) {
    'use strict';
    return text.replace(atropa.regex.patterns.lineBreaks, newEOL);
};

/**
 * Removes a quantity of leading spaces specified by offset.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process.
 * @param {Number} offset The amount of spaces you want removed 
 * from the beginning of the text.
 * @returns Returns the processed text.
 */
atropa.string.offsetWhiteSpace = function offsetWhiteSpace(text, offset) {
    'use strict';
    var regx;
    regx = new RegExp('^ {' + offset + '}');
    text = text.replace(regx, '');
    return text;
};

/**
 * Converts all tabs in leading whitespace into four spaces.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process
 * @returns {String} Returns the processed text.
 */
atropa.string.normalizeWhiteSpacePrefix = function normalizeWhiteSpacePrefix(
    text
) {
    'use strict';
    var prefix = text.match(/^\s*/);
    if(prefix) {
        prefix = prefix[0];
        prefix = prefix.replace(/\t/g, '    ');
        text = text.replace(/^\s*/, prefix);
    }
    return text;
};

/**
 * Converts all tabs into four spaces.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process
 * @returns {String} Returns the processed text.
 */
atropa.string.normalizeWhiteSpace = function normalizeWhiteSpace(text) {
    'use strict';
    text = text.replace(/\t/g, '    ');
    return text;
};

/**
 * Counts the number of leading space or tab characters but not both.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to analyze.
 * @returns {Number} Returns the quantity of leading spaces or tabs.
 */
atropa.string.getOffset = function getOffset(text) {
    'use strict';
    var offset = 0,
        leadingChar = text.charAt(0);
        
    if( leadingChar === ' ' || leadingChar === '\t') {
        while(text.charAt(offset) === leadingChar && offset < text.length) {
            offset++;
        }
    }
    return offset;
};
/**
 * Breaks a string into an array of words.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} text The text to analyze.
 * @returns {Array} Returns an array of the words in
 *  the given text.
 * @requires atropa.arrays.removeEmptyElements
 */
atropa.string.getWords = function (text) {
    "use strict";
    var out = [];
    function invalidChars(element) {
        var matched = /^[\-'’`]+$/.test(element);
        // invert the result of test. throw out elements that match.
        return !matched;
    }
    out = atropa.arrays.removeEmptyElements(
        text.split(/[^A-Za-z\-'’`]+/gi)
    );
    out = out.filter(invalidChars);
    return out;
};
/**
 * Escapes <code>CDATA</code> sections in text
 *  so that the text may be embedded into a 
 *  <code>CDATA</code> section. This should be run
 *  on any text which may contain the string 
 *  <code>]]></code> since said string will effectively
 *  end the <code>CDATA</code> section prematurely.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} text The text containing 
 *  <code>CDATA</code> sections to escape.
 * @returns {Array} Returns a string with escaped
 *  <code>CDATA</code> sections.
 * @see <a href="http://en.wikipedia.org/wiki/CDATA#Nesting">
 *  http://en.wikipedia.org/wiki/CDATA#Nesting</a>
 * @see <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=98168">
 *  https://bugzilla.mozilla.org/show_bug.cgi?id=98168</a>
 */
atropa.string.escapeCdata = function escapeCdata(text) {
    "use strict";
    return String(text).replace(/\]\]>/g, ']]]]><![CDATA[>');
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-arrays":2,"atropa-header":3,"atropa-regex":6}],8:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    node: true
*/
var atropa = require('atropa-header');
atropa.random = require('atropa-random').random;
atropa.string = require('atropa-string').string;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

atropa.requires(
    'Babbler',
    function () {
        "use strict";
        var supported = true;
        
        [
            atropa.random.integer,
            atropa.string.ucFirst,
            atropa.random.string
        ].forEach(function (prerequisite) {
            if(prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    }
);

/**
 * This class represents a babbler. The babbler
 * produces lorum ipsum text, to user specifications.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @class This class represents a babbler
 * @param {Number} wrdCount The amount of "words" you would like
 * the babbler to produce.
 * @returns {Babbler} Returns a babbler.
 * @requires atropa.random.integer
 * @requires atropa.string.ucFirst
 * @requires atropa.random.string
 * @example
 * var babbler = new atropa.Babbler(30);
 * // resets the word count
 * babbler.resetWordCount(10)
 * console.log(babbler.getWordCount());
 * 
 * // displays a 10 word sentence of nonsense words.
 * console.log(babbler.generateBabble(10));
 * // displays a 3 word sentence
 * console.log(babbler.generateBabble(3));
 * 
 * // displays the user stored or last generated babble
 * console.log(babbler.getBabble());
 * 
 * // clears the stored babble
 * babbler.resetBabble();
 * console.log(babbler.getBabble());
 * 
 * // sets the babble
 * babbler.setBabble('here be gibberish ');
 * console.log(babbler.getBabble());
 * 
 * // append more gibberish to the current babble
 * babbler.setBabble(babbler.getBabble() + babbler.generateBabble(5));
 * console.log(babbler.getBabble());
 * 
 * // generate a sentence
 * babbler.resetWordCount(10);
 * console.log(babbler.generateSentence(5, 20));
 * 
 * // generate random punctuation
 * console.log(babbler.punctuate());
 * 
 * // generate a word
 * console.log(babbler.generateWord(3,7));
 * console.log(babbler.generateWord(7,10));
 */
atropa.Babbler = function Babbler(wrdCount) {
    'use strict';
    var my = this,
        babble = '',
        wordCount = 0;
    /**
     * Sets the word count.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130313
     * @methodOf atropa.Babbler#
     * @param {Number} wrdCount The amount of "words" which you want the
     * babbler to produce.
     * @returns {Number} Returns the set word count for this babbler.
     */
    this.setWordCount = function (wrdCount) {
        if (typeof wrdCount !== 'number') {
            wordCount = 250;
        } else {
            wordCount = wrdCount;
        }
        return wordCount;
    };
    /**
     * Resets the word count for this babbler.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130313
     * @methodOf atropa.Babbler#
     * @param {Number} wordCount The amount of "words" you would like
     * to set for this babbler.
     * @returns {Number} Returns the set word count for this babbler.
     */
    this.resetWordCount = function resetWordCount(wordCount) {
        my.setWordCount(wordCount);
        return wordCount;
    };
    /**
     * Gets the current word count.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @returns {Number} Returns the word count for this babbler.
     */
    this.getWordCount = function getWordCount() {
        return wordCount;
    };
    /**
     * Generates a word with a specified length. Lowers the word count by one.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @param {Number} stringMin the shortest word, in characters.
     * @param {Number} stringMax The longest word, in characters.
     * @returns {String} Returns a random string of characters
     * within the specified range of length.
     * @requires atropa.random.integer
     * @requires atropa.random.string
     */
    this.generateWord = function generateWord(stringMin, stringMax) {
        var wordLength,
        word;
        wordLength = atropa.random.integer(stringMin, stringMax);
        word = atropa.random.string(wordLength, 'lower');
        wordCount--;
        return word;
    };
    /**
     * Provides random punctuation.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @returns {String} Returns a random punctuation
     * character ( . ! or ? ).
     * @requires atropa.random.string
     */
    this.punctuate = function punctuate() {
        var punctuation;
        punctuation = atropa.random.string(1, 'punctuation');
        return punctuation;
    };
    /**
     * Generates a sentence of specified length in words. The quantity
     *  of words in the generated sentence will be between the minimum
     *  and maximum set, with the maximum capped at the current words
     *  count. The word count will be lowered by the
     *  quantity of words in the generated sentence. If the word count
     *  is 0 then there will be no words in the sentence. If the word
     *  count is 3 then the maximum possible number of words in the
     *  sentence will be three.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130313
     * @methodOf atropa.Babbler#
     * @param {Number} sentenceMin The shortest sentence, in words,
     * you would like returned.
     * @param {Number} sentenceMax The longest sentence, in words,
     * you would like returned.
     * @returns {String} Returns a "sentence" within the specified
     * range of length.
     * @requires atropa.random.integer
     * @requires atropa.string.ucFirst
     */
    this.generateSentence = function generateSentence(
        sentenceMin, sentenceMax
    ) {
        var word,
        sentenceLength,
        sentence;
        sentenceLength = atropa.random.integer(sentenceMin, sentenceMax);
        sentence = '';
        if (sentenceLength > wordCount) {
            sentenceLength = wordCount;
        }
        for (sentenceLength; sentenceLength > 0; sentenceLength--) {
            if (wordCount > 0) {
                word = my.generateWord(4, 12);
                sentence += ' ' + word;
            } else {
                sentenceLength = 0;
            }
        }
        sentence += my.punctuate();
        return atropa.string.ucFirst(sentence.trim());
    };
    /**
     * Sets the babble.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130313
     * @methodOf atropa.Babbler#
     * @param {String} babbleString Specified babble to set.
     * @returns {String} Returns the stored babble.
     */
    this.setBabble = function setBabble(babbleString) {
        if (typeof babbleString === 'string') {
            babble = babbleString;
        } else {
            my.resetBabble();
        }
        return babble;
    };
    /**
     * Clears the stored babble.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @returns {String} Returns the stored babble.
     */
    this.resetBabble = function resetBabble() {
        babble = '';
        return babble;
    };
    /**
     * Gets the last generated babble.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @returns {String} Returns the stored babble.
     */
    this.getBabble = function getBabble() {
        return babble;
    };
    /**
     * Generates babble to a user specified length in words.
     *  The word count will be zero after this and the stored
     *  babble will be set to the generated babble.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.Babbler#
     * @param {Number} wordsCt The desired word count for the
     * generated babble.
     * @returns {String} Returns babble of specified length in words.
     * @see atropa.Babbler#getWordCount
     */
    this.generateBabble = function generateBabble(wordsCt) {
        my.resetBabble();
        my.resetWordCount(wordsCt);
        for (wordCount; wordCount > 0; babble += ' ') {
            my.setBabble(babble + my.generateSentence(5, 20));
        }
        return babble;
    };
    
    atropa.supportCheck('Babbler');
    this.resetWordCount(wrdCount);
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3,"atropa-random":5,"atropa-string":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYnJvd3Nlck1haW4uanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtaGVhZGVyL3NyYy9hdHJvcGEtaGVhZGVyLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1pbnF1aXJlL3NyYy9hdHJvcGEtaW5xdWlyZS5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtcmFuZG9tL3NyYy9hdHJvcGEtcmFuZG9tLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1yZWdleC9zcmMvYXRyb3BhLXJlZ2V4LmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1zdHJpbmcvc3JjL2F0cm9wYS1zdHJpbmcuanMiLCJzcmMvYXRyb3BhLUJhYmJsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgQmFiYmxlciA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtQmFiYmxlci5qcycpO1xyXG5cclxudHJ5IHtcclxuICAgIE9iamVjdC5rZXlzKEJhYmJsZXIpLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgaWYoIWF0cm9wYVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhW3Byb3BdID0gQmFiYmxlcltwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgYXRyb3BhID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1CYWJibGVyLmpzJyk7XHJcbn1cclxuXHJcbk9iamVjdC5rZXlzKEJhYmJsZXIuZGF0YSkuZmlsdGVyKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9XHJcbikuZm9yRWFjaChcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSBCYWJibGVyLmRhdGFbcHJvcF07XHJcbiAgICB9XHJcbik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIGFycmF5cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXHJcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzID0ge307XHJcbi8qKlxyXG4gKiBDb21wYXJlcyB0d28gYXJyYXlzIGJhc2VkIG9uIHNpemUsIGNvbnRlbnRzLCBhbmQgZWxlbWVudCBvcmRlci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBPbmUgYXJyYXkgeW91IHdhbnQgY29tcGFyZWQgdG8gYW5vdGhlci5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIFRoZSBvdGhlciBhcnJheS5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb25cclxuICogIHdoZXRoZXIgb3Igbm90IHRoZSBhcnJheXMgbWF0Y2hlZCBpbiBzaXplLCBjb21wb3NpdGlvbiwgYW5kXHJcbiAqICBlbGVtZW50IG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDEsM107XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgdHJ1ZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsyLDFdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSB0aGUgZWxlbWVudHMgYXJlIG5vdCBpbiB0aGUgc2FtZSBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XHJcbiAqIHZhciB5ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSBldmVuIHRob3VnaCB0aGUgb2JqZWN0IGxvb2tzIHRoZSBzYW1lLCB0aGVcclxuICogLy8gdHdvIG9iamVjdHMgYXJlIGluIGZhY3QgZGlzdGluY3Qgb2JqZWN0cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWx1ZSd9O1xyXG4gKiB2YXIgeCA9IFsxLG9ial07XHJcbiAqIHZhciB5ID0gWzEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIHRydWUgYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlXHJcbiAqIC8vIGluIGZhY3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5tYXRjaCA9IGZ1bmN0aW9uIGFycmF5c01hdGNoKGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB4LFxyXG4gICAgbDtcclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbCA9IGFycmF5MS5sZW5ndGg7XHJcbiAgICBmb3IgKHggPSAwOyB4IDwgbDsgeCArPSAxKSB7XHJcbiAgICAgICAgaWYgKGFycmF5MVt4XSAhPT0gYXJyYXkyW3hdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuLyoqXHJcbiAqIFN1YnRyYWN0cyBvbmUgYXJyYXkgZnJvbSBhbm90aGVyIGFycmF5IGJhc2VkIG9uIHRoZSB1bmlxdWUgdmFsdWVzIGluIGJvdGhcclxuICogIHNldHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhIChzdWJ0cmFoZW5kKSBUaGUgYXJyYXkgdG8gc3VidHJhY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGZyb21CIChtaW51ZW5kKSBUaGUgYXJyYXkgd2l0aCBlbGVtZW50cyBkdXBsaWNhdGVkIGluIDxjb2RlPmE8L2NvZGU+XHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxyXG4gKiAgdmFsdWVzIGZvdW5kIGluIDxjb2RlPmZyb21CPC9jb2RlPiB0aGF0IGFyZSBub3QgcHJlc2VudCBpbiA8Y29kZT5hPC9jb2RlPlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDEsM107XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzXTtcclxuICogdmFyIHkgPSBbMywxXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFtdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsM107XHJcbiAqIHZhciB5ID0gWzMsMSwxLDldO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzldXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFtdIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmUgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGEsIGZyb21CKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB0aGUgPSB7fTtcclxuICAgIHRoZS5yZXN1bHQgPSBbXTtcclxuICAgIGZyb21CLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgdGhlLm1hcmsgPSBmYWxzZTtcclxuICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24ocm0pe1xyXG4gICAgICAgICAgICBpZihpdGVtID09PSBybSkge1xyXG4gICAgICAgICAgICAgICAgdGhlLm1hcmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodGhlLm1hcmsgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhlLnJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoZS5yZXN1bHQ7XHJcbn07XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlbiBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgQW4gYXJyYXkuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBBbm90aGVyIGFycmF5LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuXHJcbiAqICBhcnJheXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyw0XTtcclxuICogdmFyIHkgPSBbMywxLDVdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwzLDRdO1xyXG4gKiB2YXIgeSA9IFszLDEsMSw1XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwxLDNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV1cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmludGVyc2VjdCA9IGZ1bmN0aW9uIGludGVyc2VjdChhcnJheTEsIGFycmF5Mikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgc21hbGxBcnJheSwgbGFyZ2VBcnJheSwgaW50ZXJzZWN0aW9uID0gW107XHJcbiAgICBpZihhcnJheTEubGVuZ3RoID4gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xyXG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcclxuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcclxuICAgIH1cclxuICAgIHNtYWxsQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpZHhJbkxhcmdlQXJyYXkgPSBsYXJnZUFycmF5LmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgaWYgKDAgPD0gaWR4SW5MYXJnZUFycmF5KSB7IC8vIGhhcyB3b3JkXHJcbiAgICAgICAgICAgIGludGVyc2VjdGlvbi5wdXNoKGxhcmdlQXJyYXkuc3BsaWNlKGlkeEluTGFyZ2VBcnJheSwgMSlbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGludGVyc2VjdGlvbjtcclxufTtcclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGZyZXF1ZW5jeSBvZiBpdGVtcyBvY2N1cnJpbmcgaW4gYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIGNhbGN1bGF0ZSBmcmVxdWVuY2llcyBmcm9tLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZSBlYWNoIHVuaXF1ZVxyXG4gKiAgZWxlbWVudHMgZnJvbSB0aGUgYXJyYXkgYW5kIHRoZWlyIHZhbHVlIGlzIHRoZWlyIGZyZXF1ZW5jeSBvZlxyXG4gKiAgb2NjdXJyZW5jZSB3aXRoaW4gdGhlIGFycmF5LiBCZSBjYXJlZnVsIHRoYXQgeW91ciBhcnJheSBkb2VzXHJcbiAqICBub3QgY29udGFpbiB2YWx1ZXMgbWF0Y2hpbmcgb2JqZWN0IGluc3RhbmNlIHByb3BlcnR5IG5hbWVzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMSwxLDEsMywzXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDUsXHJcbiAqIC8vICAgICBcIjNcIjogMlxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJmcmVkXCIsIFwiamFuZVwiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCJiaWxsXCI6IDEsXHJcbiAqIC8vICAgICBcImZyZWRcIjogMixcclxuICogLy8gICAgIFwiamFuZVwiOiAxXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAxXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIG90aGVyT2JqID0ge307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmosb3RoZXJPYmoseydhRG91Z2hudXQnIDogJ3Nwcmlua2xlcyd9XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDNcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMsXCJ0b1N0cmluZ1wiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwidG9TdHJpbmdcIjogXCJmdW5jdGlvbiB0b1N0cmluZygpIHtcXG4gICAgW25hdGl2ZSBjb2RlXVxcbn0xXCJcclxuICogLy8gfVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN1cnIpIHtcclxuICAgICAgICBpZiAoYWNjW2N1cnJdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYWNjW2N1cnJdID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhY2NbY3Vycl0gKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXRzIFVuaXF1ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGxhcmdlQXJyYXkgVGhlIGFycmF5IHdpdGggZHVwbGljYXRlIHZhbHVlcyBpbiBpdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXHJcbiAqICB2YWx1ZXMgZm91bmQgaW4gdGhlIGxhcmdlQXJyYXkuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwxLDQsNCwzLDZdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbIFwiMVwiLCBcIjRcIiwgXCIzXCIsIFwiNlwiIF1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImphbmVcIiwgXCJmcmVkXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImphbmVcIl1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIFxyXG4gKiAgICAgXCJiaWxsXCIsXHJcbiAqICAgICB7XCJhUHJvcFwiIDogXCJhVmFsdWVcIn0sXHJcbiAqICAgICB7XCJhR3V5XCIgOiBcImZyZWRcIn0sXHJcbiAqICAgICB7XCJhTGFkeVwiIDogXCJqYW5lXCJ9XHJcbiAqIF07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFsgXCJiaWxsXCIsIFwiW29iamVjdCBPYmplY3RdXCIgXVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUgPSBmdW5jdGlvbiAobGFyZ2VBcnJheSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kobGFyZ2VBcnJheSkpLnNvcnQoKTtcclxufTtcclxuLyoqXHJcbiAqIFJlbW92ZXMgZW1wdHkgc3RyaW5ncyBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5V2l0aEVtcHR5RWxlbWVudHMgVGhlIGFycmF5IHdpdGggZW1wdHkgc3RyaW5ncyBpbiBpdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggZW1wdHkgc3RyaW5ncyByZW1vdmVkLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgMTAsICwgNSwgXCJcIiwgJycsIDcgXTtcclxuICogY29uc29sZS5sb2coJ3N0YXJ0aW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTtcclxuICogeCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyh4KTtcclxuICogY29uc29sZS5sb2coJ2VuZGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcclxuICogY29uc29sZS5sb2coeCk7XHJcbiAqIC8vIGRpc3BsYXlzIHRoZSBmb2xsb3dpbmdcclxuICogLy8gc3RhcnRpbmcgbGVuZ3RoIDZcclxuICogLy8gWzEwLCB1bmRlZmluZWQsIDUsIFwiXCIsIFwiXCIsIDddXHJcbiAqIC8vIGVuZGluZyBsZW5ndGggM1xyXG4gKiAvLyBbMTAsIDUsIDddXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMgPSBmdW5jdGlvbiAoYXJyYXlXaXRoRW1wdHlFbGVtZW50cykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyYXlXaXRoRW1wdHlFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gIWF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcoaXRlbSk7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIFJlaW5kZXhlcyBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgd2l0aCBkaXNjb250aW51b3VzIGtleXMuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aXRoIGNvbnRpbnVvdXMga2V5cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdO1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcclxuICogXHJcbiAqIGRlbGV0ZSB4WzFdOyAvLyBkZWxldGVzIHRoZSBrZXkgZnJvbSB0aGUgYXJyYXkgYnV0XHJcbiAqICAgICAgICAgICAgICAvLyB0aGUgYXJyYXkgbGVuZ3RoIHJlbWFpbnMgdGhlIHNhbWVcclxuICogICAgICAgICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgdGhlIGFycmF5cyBrZXlzIGFyZSAwLCAyLCBhbmQgM1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gWyBcImFcIiwgdW5kZWZpbmVkLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XHJcbiAqIFxyXG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gIFsgXCJhXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiAgICAvLyBub3RlIHRoYXQgdGhlIGxhc3QgZWxlbWVudCBleGlzdGVkIGluIHRoZSBhcnJheSwgaXRzIHZhbHVlIHdhc1xyXG4gKiAgICAvLyB1bmRlZmluZWQgYnV0IGl0IGRpZCBoYXZlIGEga2V5IHNvIHRoZSBlbGVtZW50IHJlbWFpbnMgaW4gdGhlIGFycmF5LlxyXG4gKiAgICAvL1xyXG4gKiAgICAvLyBUaGUgZGVsZXRlZCBlbGVtZW50IHdhcyBpbiBmYWN0IGRlbGV0ZWQgZnJvbSB0aGUgYXJyYXkgc28gdGhlcmUgd2FzIG5vXHJcbiAqICAgIC8vIGtleSB4WzFdIGF0IGFsbCwgd2hlbiB0cnlpbmcgdG8gYWNjZXNzIHRoaXMgbm9uIGV4aXN0aW5nIGVsZW1lbnQgdGhlXHJcbiAqICAgIC8vIHZhbHVlIG9mIHVuZGVmaW5lZCB3YXMgcmV0dXJuZWQuIFRoaXMgYmVoYXZpb3IgaXMgY29uZnVzaW5nIHVubGVzcyB5b3VcclxuICogICAgLy8gdGhpbmsgYWJvdXQgdGhlIGFycmF5YXMgYW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIG5hbWVkIGJ5XHJcbiAqICAgIC8vIG51bWJlcnMuIEFjY2Vzc2luZyBhbiB1bmRlZmluZWQgcHJvcGVydHkgcmV0dXJucyB1bmRlZmluZWQgcmVnYXJkbGVzc1xyXG4gKiAgICAvLyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdGVkIGluIHRoZSBwYXN0IG9yIG5vdC5cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyAzXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnJlaW5kZXggPSBmdW5jdGlvbiByZWluZGV4KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgaWR4LCBvdXQ7XHJcbiAgICBvdXQgPSBbXTtcclxuICAgIGZvcihpZHggaW4gYXJyKSB7XHJcbiAgICAgICAgaWYoYXJyLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgb3V0LnB1c2goYXJyW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBhcnJheSdzIGVsZW1lbnRzIG51bWVyaWNhbGx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBzb3J0LiBBbGwgZWxlbWVudHMgb2YgdGhlIGFycmF5IG11c3QgYmVcclxuICogIG51bWJlci1pc2guXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aG9zZSBlbGVtZW50cyBhcmUgaW4gbnVtZXJpYyBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMywgMiwgOSwgMjYsIDEwLCAxLCA5OSwgMTVdO1xyXG4gKiBjb25zb2xlLmxvZyggYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkoeCkgKTtcclxuICogLy8gbG9ncyBbMSwgMiwgMywgOSwgMTAsIDE1LCAyNiwgOTldXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnROdW1lcmljYWxseShhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhIC0gYik7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIFRocm93cyBhbiBlcnJvciwgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBpcyBub3QgXHJcbiAqICBzdGFuZGFyZGl6ZWQuXHJcbiAqIFxyXG4gKiAgWWVzLCBsb2NhbGVDb21wYXJlIGlzIGluIHRoZSBzdGFuZGFyZCBidXQsIGF0IHRoaXMgdGltZSB0aGUgYWN0dWFsXHJcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcclxuICogIGNhbiBiZSBkaWZmZXJlbnQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy4gV2hhdCBJIGZvdW5kIHdhcyB0aGF0IGluIG5vZGUgdGhlXHJcbiAqICBhcnJheSBvZiA8Y29kZT5bJ2EnLCdaJywnQScsJ3onXTwvY29kZT4gd291bGQgYmUgc29ydGVkIHRvXHJcbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxyXG4gKiAgZmlyZWZveCBpdCB3b3VsZCBiZSBzb3J0ZWQgdG8gPGNvZGU+WydhJywnQScsJ3onLCdaJ108L2NvZGU+LiBXaG8ga25vd3MgaWZcclxuICogIGFub3RoZXIgaW1wbGVtZW50b3Igd291bGQgc29ydCBpdCA8Y29kZT5bJ0EnLCdhJywnWicsJ3onXTwvY29kZT4/XHJcbiAqIFxyXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGEgcmVsaWFibGUgaW1wbGVtZW50YXRpb24gSSB3b3VsZCBoYXZlIHRvIGNyZWF0ZSBteSBvd25cclxuICogIGltcGxlbWVudGF0aW9uIG9mIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gYW5kIHRoYXQnc1xyXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cclxuICogQHRocm93cyB7RXJyb3J9IFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zb3J0QWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0QWxwaGFiZXRpY2FsbHkoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG4vKipcclxuICogRGVsZXRlcyB0aGUgZ2l2ZW4gZWxlbWVudCBmcm9tIHRoZSBhcnJheSBhdCB0aGUgZ2l2ZW4gaW5kZXguIEl0IGJhc2ljYWxseVxyXG4gKiAgZG9lcyB3aGF0IHlvdSB3b3VsZCBleHBlY3QgdGhlIGRlbGV0ZSBvcGVyYXRvciB0byBkbywgZXhjZXB0IHRoZSBkZWxldGVcclxuICogIG9wZXJhdG9yIGRvZXNuJ3QgZG8gd2hhdCB5b3Ugd291bGQgZXhwZWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5LlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZS5cclxuICogQHJldHVybnMgUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBlbGVtZW50IHJlbW92ZWQsIGNvbnRpZ3VvdXMga2V5cywgYW5kXHJcbiAqICB3aG9zZSBsZW5ndGggaXMgMSBsZXNzIHRoYW4gdGhlIGlucHV0IGFycmF5LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5kZWxldGVFbGVtZW50ID0gZnVuY3Rpb24gKGFyciwgaW5kZXgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgZGVsZXRlIGFycltpbmRleF07XHJcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5yZWluZGV4KGFycik7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYSA9IHt9O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjbGFzcyBoYXMgYmVlbiBtYXJrZWQgYXMgdW5zdXBwb3J0ZWQgYW5kIHRocm93cyBhbiBcclxuICogIGVycm9yIGlmIGl0IGhhcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIE9wdGlvbmFsLiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlLiBEZWZhdWx0cyB0b1xyXG4gKiAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvclxyXG4gKi9cclxuYXRyb3BhLnN1cHBvcnRDaGVjayA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBjbGFzc05hbWUgPSBTdHJpbmcoY2xhc3NOYW1lKTtcclxuICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yO1xyXG4gICAgZXJyb3JNZXNzYWdlID0gU3RyaW5nKGVycm9yTWVzc2FnZSk7XHJcbiAgICBcclxuICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9PT0gJ3Vuc3VwcG9ydGVkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogUHVzaGVzIGEgcmVxdWlyZW1lbnQgY2hlY2sgaW50byBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMuIFRoZSB0ZXN0XHJcbiAqICB0ZXN0cyB3aGV0aGVyIHRoZSBjbGFzcyBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gU2V0c1xyXG4gKiAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSdzIHN1cHBvcnQgdG8gdW5zdXBwb3J0ZWQgYW5kIGVycm9yIHRvIGVycm9yTWVzc2FnZVxyXG4gKiAgaWYgdGhlIHJlcXVpcmVtZW50Rm4gcmV0dXJucyBmYWxzZS4gVGhlIHJlcXVpcmVtZW50IGNoZWNrcyB3aWxsIGFsbCBiZSBydW5cclxuICogIGFmdGVyIHRoZSBsaWJyYXJ5IGhhcyBsb2FkZWQuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVxdWlyZW1lbnRGbiBBIGZ1bmN0aW9uIHRvIHRlc3Qgd2hldGhlciBvciBub3QgdGhlIGNsYXNzXHJcbiAqICBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gSWYgc3VwcG9ydGVkLCByZXR1cm5zIHRydWUgb3RoZXJ3aXNlXHJcbiAqICByZXR1cm4gZmFsc2UuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UgdG8gdXNlIHdoZW4gdGhpcyBjbGFzcyBvciBpdHNcclxuICogIG1ldGhvZHMgYXJlIGNhbGxlZCBpbiB1bnN1cHBvcnRlZCBlbnZpcm9ubWVudHMuIERlZmF1bHRzIHRvOlxyXG4gKiAgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gKi9cclxuYXRyb3BhLnJlcXVpcmVzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgcmVxdWlyZW1lbnRGbiwgZXJyb3JNZXNzYWdlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLnJlcXVpcmVzIHJlcXVpcmVzIHRoZSBjbGFzcyBuYW1lIHRvIGJlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3NwZWNpZmllZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodHlwZW9mIHJlcXVpcmVtZW50Rm4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVtZW50Rm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArXHJcbiAgICAgICAgICAgICAgICAgICAgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gcmVxdWlyZW1lbnRGbigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3IgPSBlcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0ZXN0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wdXNoKGNoZWNrKTtcclxufTtcclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXHJcbiAqL1xyXG5hdHJvcGEuZGF0YSA9IHt9O1xyXG5cclxuYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzID0gW107XHJcblxyXG5hdHJvcGEubm9wID0gZnVuY3Rpb24gbm9wICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG5cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZnVuY3Rpb25zIHRoYXQgdGVzdCB0aGUgc3RhdGUgb2YgaW5wdXRzLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBudWxsLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBudWxsLlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggPT09IG51bGwuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc051bGwgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gKHggPT09IG51bGwpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGFuIG9iamVjdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYW4gb2JqZWN0LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHR5cGVvZih4KSA9PT0gJ29iamVjdCcuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiAodHlwZW9mIHggPT09ICdvYmplY3QnKTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBib3RoIGFuIG9iamVjdCBhbmQgbm90IG51bGwuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIGJvdGggYW5cclxuICogb2JqZWN0IGFuZCBudWxsLlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggaXMgYm90aCBhbiBvYmplY3QgYW5kXHJcbiAqIG5vdCBudWxsLiAobnVsbCBpcyBhbiBvYmplY3QpLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0KHgpICYmICghYXRyb3BhLmlucXVpcmUuaXNOdWxsKHgpKTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyBhbiBvYmplY3QgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSBwcm9wZXJ0eVxyXG4gKiByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IHdhcyBpbmhlcml0ZWRcclxuICogb3Igbm90LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3Qgd2hpY2ggbWF5IG9yIG1heSBub3RcclxuICogaGF2ZSB0aGUgcHJvcGVydHkgaWRlbnRpZmllZCBieSBwcm9wLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBBIHN0cmluZyB2YWx1ZSByZXByZXNlbnRpbmcgdGhlXHJcbiAqIG5hbWUgb2YgdGhlIHByb3BlcnR5LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIG9iai5wcm9wIGV4aXN0cyxcclxuICogb3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5oYXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgaWYgKGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbChvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIChwcm9wIGluIG9iaik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gZW1wdHkgc3RyaW5nLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHlvdSB3YW50IHRvIGtub3cgYWJvdXRcclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBzdHIgaXMgYW4gZW1wdHkgc3RyaW5nLFxyXG4gKiAgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gZmFsc2U7XHJcbiAgICBpZiAoJycgPT09IHN0cikge1xyXG4gICAgICAgIG91dCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyByYW5kb20gc3RyaW5ncyBhbmQgbnVtYmVycy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgUHJvdmlkZXMgcmFuZG9tIHN0cmluZ3MgYW5kIG51bWJlcnMuXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tID0ge307XHJcbi8qKlxyXG4gKiBHaXZlcyB5b3UgYSByYW5kb20gc3RyaW5nIHdob3NlIGxlbmd0aCBhbmQgY2hhcmFjdGVycyB5b3Ugc3BlY2lmeS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdMZW5ndGggVGhpcyBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjaGFyYWN0ZXJDbGFzcyBPcHRpb25hbC4gTWF5IGJlIG9uZSBvZjpcclxuICogIG51bWVyaWMsIGNhcHMsIGxvd2VyLCBhbHBoYSwgYWxwaGFudW1lcmljLCBwdW5jdHVhdGlvbiwgdm93ZWwsIGNvbnNvbmFudFxyXG4gKiAgVGhpcyBpcyB0aGUgdHlwZSBvZiBjaGFyYWN0ZXJzIHlvdSB3YW50IHJldHVybmVkIHRvIHlvdS4gRGVmYXVsdHMgdG9cclxuICogIGFscGhhbnVtZXJpYy5cclxuICogQHJldHVybiB7U3RyaW5nfSBBIHJhbmRvbSBzdHJpbmcgb2Ygc3BlY2lmaWVkIGxlbmd0aCBhbmQgY29tcG9zaXRpb24uXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLnN0cmluZyA9IGZ1bmN0aW9uIHJhbmRvbVN0cmluZyhzdHJpbmdMZW5ndGgsIGNoYXJhY3RlckNsYXNzKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgbnVtZXJpYyxcclxuICAgIHZvd2VsLFxyXG4gICAgY29uc29uYW50LFxyXG4gICAgbG93ZXIsXHJcbiAgICBjYXBzLFxyXG4gICAgYWxwaGEsXHJcbiAgICBhbHBoYW51bWVyaWMsXHJcbiAgICBwdW5jdHVhdGlvbixcclxuICAgIGNoYXJzLFxyXG4gICAgc3RyaW5nX2xlbmd0aCxcclxuICAgIHJhbmRvbXN0cmluZyxcclxuICAgIGksXHJcbiAgICBjaGFyYWN0ZXI7XHJcbiAgICBcclxuICAgIG51bWVyaWMgPSAnMDEyMzQ1Njc4OSc7XHJcbiAgICB2b3dlbCA9ICdhZWlvdXknO1xyXG4gICAgY29uc29uYW50ID0gJ2JjZGZnaGprbG1ucHFyc3R2d3h6JztcclxuICAgIGxvd2VyID0gdm93ZWwgKyBjb25zb25hbnQ7XHJcbiAgICBjYXBzID0gbG93ZXIudG9VcHBlckNhc2UoKTtcclxuICAgIGFscGhhID0gY2FwcyArIGxvd2VyO1xyXG4gICAgYWxwaGFudW1lcmljID0gbnVtZXJpYyArIGNhcHMgKyBsb3dlcjtcclxuICAgIHB1bmN0dWF0aW9uID0gJy4/ISc7XHJcbiAgICByYW5kb21zdHJpbmcgPSAnJztcclxuICAgIHN3aXRjaCAoY2hhcmFjdGVyQ2xhc3MpIHtcclxuICAgIGNhc2UgJ251bWVyaWMnOlxyXG4gICAgICAgIGNoYXJzID0gbnVtZXJpYztcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NhcHMnOlxyXG4gICAgICAgIGNoYXJzID0gY2FwcztcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2xvd2VyJzpcclxuICAgICAgICBjaGFycyA9IGxvd2VyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnYWxwaGEnOlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdhbHBoYW51bWVyaWMnOlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGFudW1lcmljO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAncHVuY3R1YXRpb24nOlxyXG4gICAgICAgIGNoYXJzID0gcHVuY3R1YXRpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICd2b3dlbCc6XHJcbiAgICAgICAgY2hhcnMgPSB2b3dlbDtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NvbnNvbmFudCc6XHJcbiAgICAgICAgY2hhcnMgPSBjb25zb25hbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGFudW1lcmljO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0cmluZ0xlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RyaW5nX2xlbmd0aCA9IDQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0cmluZ19sZW5ndGggPSBzdHJpbmdMZW5ndGg7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnMubGVuZ3RoKTtcclxuICAgICAgICByYW5kb21zdHJpbmcgKz0gY2hhcnNbY2hhcmFjdGVyXTtcclxuICAgIH1cclxuICAgIHJldHVybiByYW5kb21zdHJpbmc7XHJcbn07XHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gdGhlIHNwZWNpZmllZCBtaW4gYW5kIG1heCB2YWx1ZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtaW4gVGhlIGxvd2VzdCBudW1iZXIgeW91IHdhbnQgcmV0dXJuZWRcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgaGlnaGVzdCBudW1iZXIgeW91IHdhbnQgcmV0dXJuZWRcclxuICogQHJldHVybnMge051bWJlcn0gQSByYW5kb20gbnVtYmVyIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5pbnRlZ2VyID0gZnVuY3Rpb24gcmFuZG9tSW50ZWdlcihtaW4sIG1heCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXQgYSByYW5kb20gcHJvcGVydHkgbmFtZSBmcm9tIHRoZSBnaXZlbiBvYmplY3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gc2VsZWN0IGEgcmFuZG9tXHJcbiAqICBwcm9wZXJ0eSBuYW1lIGZyb20uXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gQSByYW5kb20gcHJvcGVydHkgbmFtZSBmcm9tIHRoZVxyXG4gKiAgZ2l2ZW4gb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5nZXRQcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBhcnI7XHJcbiAgICBhcnIgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgcmV0dXJuIGFyclthdHJvcGEucmFuZG9tLmdldEFycmF5S2V5KGFycildO1xyXG59O1xyXG4vKipcclxuICogR2V0IGEgcmFuZG9tIGtleSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc2VsZWN0IGEgcmFuZG9tXHJcbiAqICBrZXkgZnJvbS4gVGhlIGtleXMgb2YgdGhlIGFycmF5IG11c3QgYmUgY29udGlndW91cy5cclxuICogQHJldHVybiB7TnVtYmVyfSBBIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gMCBhbmRcclxuICogIDxjb2RlPmFyci5sZW5ndGg8L2NvZGU+XHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLmdldEFycmF5S2V5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCk7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXQgYSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNlbGVjdCBhIHJhbmRvbVxyXG4gKiAgdmFsdWUgZnJvbS4gVGhlIGtleXMgb2YgdGhlIGFycmF5IG11c3QgYmUgY29udGlndW91cy5cclxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5nZXRBcnJheVZhbHVlID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyW2F0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKV07XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmUgYSByYW5kb20gZWxlbWVudCBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gcmVtb3ZlIGEgcmFuZG9tXHJcbiAqICBlbGVtZW50IGZyb20uIFRoZSBrZXlzIG9mIHRoZSBhcnJheSBtdXN0IGJlIGNvbnRpZ3VvdXMuXHJcbiAqIEByZXR1cm4ge01peGVkfSBBIHJhbmRvbSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICovXHJcbmF0cm9wYS5yYW5kb20ucHVsbEFycmF5RWxlbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGssXHJcbiAgICBkO1xyXG4gICAgayA9IGF0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKTtcclxuICAgIGQgPSBhcnJba107XHJcbiAgICBhcnIuc3BsaWNlKGssIDEpO1xyXG4gICAgcmV0dXJuIGQ7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmUgYSByYW5kb20gcHJvcGVydHkgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHJlbW92ZSBhIHJhbmRvbVxyXG4gKiAgcHJvcGVydHkgZnJvbS5cclxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5yYW5kb20ucHVsbFByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcE5hbWUsXHJcbiAgICBvYmpEYXRhO1xyXG4gICAgcE5hbWUgPSBhdHJvcGEucmFuZG9tLmdldFByb3BlcnR5TmFtZShvYmopO1xyXG4gICAgb2JqRGF0YSA9IG9ialtwTmFtZV07XHJcbiAgICBkZWxldGUgb2JqW3BOYW1lXTtcclxuICAgIHJldHVybiBvYmpEYXRhO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIHJlZ2V4IGZ1bmN0aW9ucy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciByZWdleCBmdW5jdGlvbnMuXHJcbiAqL1xyXG5hdHJvcGEucmVnZXggPSB7fTtcclxuLyoqXHJcbiAqIFJlZ2V4IHBhdHRlcm5zXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIFJlZ2V4IHBhdHRlcm5zLlxyXG4gKi9cclxuYXRyb3BhLnJlZ2V4LnBhdHRlcm5zID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBmaW5kcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlc1xyXG4gICAgICogQHR5cGUgUmVnRXhwXHJcbiAgICAgKi9cclxuICAgIHJlcGVhdGVkV29yZHMgOiAvKFxcYi57Myx9XFxiKVxccyooXFwxKS9nLFxyXG4gICAgLyoqXHJcbiAgICAgKiBmaW5kcyBwYXJhZ3JhcGggYnJlYWtzXHJcbiAgICAgKiBAdHlwZSBSZWdFeHBcclxuICAgICAqL1xyXG4gICAgcGFyYWdyYXBoQnJlYWtzIDogLyhcXHJcXG5cXHJcXG58XFxuXFxufFxcclxccikvZyxcclxuICAgIC8qKlxyXG4gICAgICogZmluZHMgbGluZSBicmVha3NcclxuICAgICAqIEB0eXBlIFJlZ0V4cFxyXG4gICAgICovXHJcbiAgICBsaW5lQnJlYWtzIDogLyhcXHJcXG58XFxyfFxcbikvZ1xyXG59O1xyXG4vKipcclxuICogQXBwZW5kcyBjb21tb24gcHJlZml4LCBzdWZmaXgsIGFuZCB3b3JkIGJvdW5kYXJ5IHJlZ2V4IHN0cmluZ3MgdG9cclxuICogdGhlIHN1cHBsaWVkIHdvcmQuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gd29yZCBUaGUgd29yZCB0byBhcHBlbmQgcHJlZml4IGFuZCBzdWZmaXggdG9cclxuICogQHBhcmFtIHtJbnRlZ2VyfSB0aHJlc2hvbGQgVGhlIHdvcmQubGVuZ3RoIGF0IHdoaWNoIGl0IGRvZXMgbm90XHJcbiAqIG1ha2Ugc2Vuc2UgdG8gYXBwZW5kIHByZWZpeCBhbmQgc3VmZml4LiBEZWZhdWx0cyB0byAzLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdXBwbGllZCB3b3JkIHdpdGggcHJlZml4LCBzdWZmaXgsXHJcbiAqIGFuZCB3b3JkIGJvdW5kYXJpZXMgYXR0YWNoZWQuIElmIHRoZSB3b3JkLmxlbmd0aCB3YXMgbm90IGdyZWF0ZXJcclxuICogdGhhbiB0aGUgdGhyZXNob2xkLCBvbmx5IHdvcmQgYm91bmRhcmllcyBhcmUgYXR0YWNoZWQuIFRoZSBzdHJpbmdcclxuICogcmVwcmVzZW50cyBhIFJlZ0V4IHdoaWNoIHNob3VsZCBwaWNrIG91dCBtb3N0IGZvcm1zIG9mIHJlZ3VsYXJcclxuICogd29yZHMuXHJcbiAqL1xyXG5hdHJvcGEucmVnZXguYXBwZW5kUHJlZml4ZXNBbmRTdWZmaXhlcyA9IGZ1bmN0aW9uICh3b3JkLCB0aHJlc2hvbGQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHByZWZpeGVzLFxyXG4gICAgc3VmZml4ZXM7XHJcbiAgICBwcmVmaXhlcyA9ICcocHJlfHVufHJlKT8nO1xyXG4gICAgc3VmZml4ZXMgPSAnKGlmaWNhdGlvbnwnICtcclxuICAgICAgICAgICAgICAgICd0aW9uYWxseXwnICtcclxuICAgICAgICAgICAgICAgICdpY2F0aW9ufCcgK1xyXG4gICAgICAgICAgICAgICAgJ2lmaWVkfGlzdGljfGluZXNzfCcgK1xyXG4gICAgICAgICAgICAgICAgJ2ZhcmV8dGlvbnxhbmNlfGVuY2V8bGVzc3xhbGx5fGFibGV8bmVzc3xpemVkfGlzZWR8JyArXHJcbiAgICAgICAgICAgICAgICAnb3VzfGlmeXxpbmd8aXR5fGZ1bHxhbnR8YXRlfGVzdHxpc218aXptfGlzdHwnICtcclxuICAgICAgICAgICAgICAgICdpY3xhbHxlZHxlcnxldHxseXxyc3xpbnwnICtcclxuICAgICAgICAgICAgICAgICd5fHN8cnxkKT8nO1xyXG4gICAgXHJcbiAgICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgPT09IHVuZGVmaW5lZCA/IDMgOiB0aHJlc2hvbGQ7XHJcbiAgICBcclxuICAgIGlmICh3b3JkLmxlbmd0aCA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgIHdvcmQgPSAnXFxcXGInICsgcHJlZml4ZXMgKyB3b3JkICsgc3VmZml4ZXMgKyAnXFxcXGInO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3b3JkID0gJ1xcXFxiKCknICsgd29yZCArICcoKVxcXFxiJztcclxuICAgIH1cclxuICAgIHJldHVybiB3b3JkO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEucmVnZXggPSByZXF1aXJlKCdhdHJvcGEtcmVnZXgnKS5yZWdleDtcclxuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIEEgZmV3IHV0aWxpdGllcyBmb3IgbWFuaXB1bGF0aW5nIHN0cmluZ3MuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIEEgZmV3IHV0aWxpdGllcyBmb3IgbWFuaXB1bGF0aW5nIHN0cmluZ3MuXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEucmVnZXgucGF0dGVybnNcclxuICovXHJcbmF0cm9wYS5zdHJpbmcgPSB7fTtcclxuLyoqXHJcbiAqIFJlcGxhY2VzIHJlcGVhdGVkIHdvcmRzIGFuZCBwaHJhc2VzIHdpdGggYSBzaW5nbGUgd29yZCBvciBwaHJhc2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gcmVtb3ZlIHJlcGVhdGVkIHdvcmRzIGZyb20uXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIHJlcGVhdGVkIHdvcmRzIGFuZFxyXG4gKiAgcGhyYXNlcyByZW1vdmVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5yZW1vdmVSZXBlYXRlZFdvcmQgPSBmdW5jdGlvbiByZW1vdmVSZXBlYXRlZFdvcmQgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnJlcGVhdGVkV29yZHMsICckMScpO1xyXG59O1xyXG4vKipcclxuICogQ3JlYXRlcyBwYXJhZ3JhcGggYnJlYWtzIGF0IGV2ZXJ5IG9jY3VycmVuY2Ugb2YgdHdvIGNvbnNlY3V0aXZlIGxpbmUgYnJlYWtzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc2VydCBwYXJhZ3JhcGggdGFncyBpbnRvLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBwYXJhZ3JhcGggYnJlYWtzIGluc2VydGVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5saW5lQnJlYWtzVG9QYXJhZ3JhcGhUYWdzID0gZnVuY3Rpb24gbGluZUJyZWFrc1RvUGFyYWdyYXBoVGFncyAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMucGFyYWdyYXBoQnJlYWtzLCAnPC9wPjxwPicpO1xyXG4gICAgb3V0ID0gJzxwPicgKyBvdXQudHJpbSgpICsgJzwvcD4nO1xyXG4gICAgb3V0ID0gb3V0LnJlcGxhY2UoL1xccys8XFwvKHB8YnIpPi9nLCAnPC8kMT4nKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGJyZWFrIHRhZ3MgYXQgZXZlcnkgbGluZSBicmVhay5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNlcnQgYnJlYWsgdGFncyBpbnRvLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBicmVhayB0YWdzIGluc2VydGVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5saW5lQnJlYWtzVG9CcmVha1RhZ3MgPSBmdW5jdGlvbiBsaW5lQnJlYWtzVG9CcmVha1RhZ3MgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsICc8YnI+Jyk7XHJcbn07XHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIGxpbmUgYnJlYWtzIHRvIGBcXG5gLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIG5vcm1hbGl6ZS5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggbm9ybWFsaXplZCBsaW5lIGJyZWFrcy5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubm9ybWFsaXplRW9sID0gZnVuY3Rpb24gbm9ybWFsaXplRW9sIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCAnXFxuJyk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgZ2l2ZW4gc3RyaW5nIHRvXHJcbiAqIHVwcGVyY2FzZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyBmb3Igd2hpY2ggeW91IHdhbnQgdGhlXHJcbiAqIGZpcnN0IGxldHRlciB0byBiZSBpbiB1cHBlciBjYXNlLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZ2l2ZW4gc3RyaW5nIHdpdGggaXQncyBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLnVjRmlyc3QgPSBmdW5jdGlvbiB1Y0ZpcnN0KHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBzdHJpbmcgPSBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcbiAgICByZXR1cm4gc3RyaW5nO1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgdGhlIGdpdmVuIHN0cmluZyB0byBjYW1lbCBjYXNlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA4MjNcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNhbWVsaXplLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY2FtZWxpemVkIHN0cmluZy5cclxuICogQGV4YW1wbGVcclxuICogIGF0cm9wYS5zdHJpbmcuY2FtZWxpemUoJ2dldCBpdCB0b2dldGhlcicpO1xyXG4gKiAgLy8gcmV0dXJucyBcImdldEl0VG9nZXRoZXJcIlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5jYW1lbGl6ZSA9IGZ1bmN0aW9uIGNhbWVsaXplIChzdHIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGFyciwgb3V0O1xyXG4gICAgYXJyID0gc3RyLnNwbGl0KCcgJyk7XHJcbiAgICBvdXQgPSBhcnIuc2hpZnQoKTtcclxuICAgIGFyciA9IGFyci5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gYXRyb3BhLnN0cmluZy51Y0ZpcnN0KGl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgICBvdXQgKz0gYXJyLmpvaW4oJycpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIENvdW50cyB3b3Jkcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb21lVGV4dCBQbGFpbiB0ZXh0LlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFJldHVybnMgdGhlIGNvdW50IG9mIHdvcmRzIGluIHNvbWVUZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5jb3VudFdvcmRzID0gZnVuY3Rpb24gY291bnRXb3Jkcyhzb21lVGV4dCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgd29yZENvdW50LCByZSwgbGVuID0gMDtcclxuICAgIGlmKHNvbWVUZXh0ICE9PSB1bmRlZmluZWQgJiYgc29tZVRleHQgIT09IG51bGwpIHtcclxuICAgICAgICBzb21lVGV4dCA9IHNvbWVUZXh0LnRyaW0oKTtcclxuICAgICAgICBpZihzb21lVGV4dCAhPT0gJycpIHtcclxuICAgICAgICAgICAgd29yZENvdW50ID0gMDtcclxuICAgICAgICAgICAgcmUgPSAvXFxzKy9naTtcclxuICAgICAgICAgICAgd29yZENvdW50ID0gc29tZVRleHQuc3BsaXQocmUpO1xyXG4gICAgICAgICAgICBsZW4gPSB3b3JkQ291bnQubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsZW47XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBlbmQgb2YgbGluZSBtYXJrZXJzIGludG8gd2hhdGV2ZXIgeW91IHdhbnQuIFxyXG4gKiBBdXRvbWF0aWNhbGx5IGRldGVjdHMgYW55IG9mIFxcclxcbiwgXFxuLCBvciBcXHIgYW5kIFxyXG4gKiByZXBsYWNlcyBpdCB3aXRoIHRoZSB1c2VyIHNwZWNpZmllZCBFT0wgbWFya2VyLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgeW91IHdhbnQgcHJvY2Vzc2VkLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3RU9MIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGN1cnJlbnQgRU9MIG1hcmtzLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuY29udmVydEVvbCA9IGZ1bmN0aW9uIGNvbnZlcnRFT0wodGV4dCwgbmV3RU9MKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCBuZXdFT0wpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBzcGVjaWZpZWQgYnkgb2Zmc2V0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gcHJvY2Vzcy5cclxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBUaGUgYW1vdW50IG9mIHNwYWNlcyB5b3Ugd2FudCByZW1vdmVkIFxyXG4gKiBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRleHQuXHJcbiAqIEByZXR1cm5zIFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5vZmZzZXRXaGl0ZVNwYWNlID0gZnVuY3Rpb24gb2Zmc2V0V2hpdGVTcGFjZSh0ZXh0LCBvZmZzZXQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciByZWd4O1xyXG4gICAgcmVneCA9IG5ldyBSZWdFeHAoJ14geycgKyBvZmZzZXQgKyAnfScpO1xyXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShyZWd4LCAnJyk7XHJcbiAgICByZXR1cm4gdGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbGwgdGFicyBpbiBsZWFkaW5nIHdoaXRlc3BhY2UgaW50byBmb3VyIHNwYWNlcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3NcclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZVdoaXRlU3BhY2VQcmVmaXggPSBmdW5jdGlvbiBub3JtYWxpemVXaGl0ZVNwYWNlUHJlZml4KFxyXG4gICAgdGV4dFxyXG4pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBwcmVmaXggPSB0ZXh0Lm1hdGNoKC9eXFxzKi8pO1xyXG4gICAgaWYocHJlZml4KSB7XHJcbiAgICAgICAgcHJlZml4ID0gcHJlZml4WzBdO1xyXG4gICAgICAgIHByZWZpeCA9IHByZWZpeC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxzKi8sIHByZWZpeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbGwgdGFicyBpbnRvIGZvdXIgc3BhY2VzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gcHJvY2Vzc1xyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubm9ybWFsaXplV2hpdGVTcGFjZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVdoaXRlU3BhY2UodGV4dCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0L2csICcgICAgJyk7XHJcbiAgICByZXR1cm4gdGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb3VudHMgdGhlIG51bWJlciBvZiBsZWFkaW5nIHNwYWNlIG9yIHRhYiBjaGFyYWN0ZXJzIGJ1dCBub3QgYm90aC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHF1YW50aXR5IG9mIGxlYWRpbmcgc3BhY2VzIG9yIHRhYnMuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmdldE9mZnNldCA9IGZ1bmN0aW9uIGdldE9mZnNldCh0ZXh0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgb2Zmc2V0ID0gMCxcclxuICAgICAgICBsZWFkaW5nQ2hhciA9IHRleHQuY2hhckF0KDApO1xyXG4gICAgICAgIFxyXG4gICAgaWYoIGxlYWRpbmdDaGFyID09PSAnICcgfHwgbGVhZGluZ0NoYXIgPT09ICdcXHQnKSB7XHJcbiAgICAgICAgd2hpbGUodGV4dC5jaGFyQXQob2Zmc2V0KSA9PT0gbGVhZGluZ0NoYXIgJiYgb2Zmc2V0IDwgdGV4dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgb2Zmc2V0Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mZnNldDtcclxufTtcclxuLyoqXHJcbiAqIEJyZWFrcyBhIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHdvcmRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gYW5hbHl6ZS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSB3b3JkcyBpblxyXG4gKiAgdGhlIGdpdmVuIHRleHQuXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHNcclxuICovXHJcbmF0cm9wYS5zdHJpbmcuZ2V0V29yZHMgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gW107XHJcbiAgICBmdW5jdGlvbiBpbnZhbGlkQ2hhcnMoZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBtYXRjaGVkID0gL15bXFwtJ+KAmWBdKyQvLnRlc3QoZWxlbWVudCk7XHJcbiAgICAgICAgLy8gaW52ZXJ0IHRoZSByZXN1bHQgb2YgdGVzdC4gdGhyb3cgb3V0IGVsZW1lbnRzIHRoYXQgbWF0Y2guXHJcbiAgICAgICAgcmV0dXJuICFtYXRjaGVkO1xyXG4gICAgfVxyXG4gICAgb3V0ID0gYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzKFxyXG4gICAgICAgIHRleHQuc3BsaXQoL1teQS1aYS16XFwtJ+KAmWBdKy9naSlcclxuICAgICk7XHJcbiAgICBvdXQgPSBvdXQuZmlsdGVyKGludmFsaWRDaGFycyk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogRXNjYXBlcyA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMgaW4gdGV4dFxyXG4gKiAgc28gdGhhdCB0aGUgdGV4dCBtYXkgYmUgZW1iZWRkZWQgaW50byBhIFxyXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb24uIFRoaXMgc2hvdWxkIGJlIHJ1blxyXG4gKiAgb24gYW55IHRleHQgd2hpY2ggbWF5IGNvbnRhaW4gdGhlIHN0cmluZyBcclxuICogIDxjb2RlPl1dPjwvY29kZT4gc2luY2Ugc2FpZCBzdHJpbmcgd2lsbCBlZmZlY3RpdmVseVxyXG4gKiAgZW5kIHRoZSA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbiBwcmVtYXR1cmVseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IGNvbnRhaW5pbmcgXHJcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMgdG8gZXNjYXBlLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBzdHJpbmcgd2l0aCBlc2NhcGVkXHJcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMuXHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ0RBVEEjTmVzdGluZ1wiPlxyXG4gKiAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DREFUQSNOZXN0aW5nPC9hPlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODE2OFwiPlxyXG4gKiAgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTgxNjg8L2E+XHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmVzY2FwZUNkYXRhID0gZnVuY3Rpb24gZXNjYXBlQ2RhdGEodGV4dCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gU3RyaW5nKHRleHQpLnJlcGxhY2UoL1xcXVxcXT4vZywgJ11dXV0+PCFbQ0RBVEFbPicpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgbm9kZTogdHJ1ZVxyXG4qL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEucmFuZG9tID0gcmVxdWlyZSgnYXRyb3BhLXJhbmRvbScpLnJhbmRvbTtcclxuYXRyb3BhLnN0cmluZyA9IHJlcXVpcmUoJ2F0cm9wYS1zdHJpbmcnKS5zdHJpbmc7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgJ0JhYmJsZXInLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyLFxyXG4gICAgICAgICAgICBhdHJvcGEuc3RyaW5nLnVjRmlyc3QsXHJcbiAgICAgICAgICAgIGF0cm9wYS5yYW5kb20uc3RyaW5nXHJcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgIH1cclxuKTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBiYWJibGVyLiBUaGUgYmFiYmxlclxyXG4gKiBwcm9kdWNlcyBsb3J1bSBpcHN1bSB0ZXh0LCB0byB1c2VyIHNwZWNpZmljYXRpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQGNsYXNzIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIGJhYmJsZXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IHdyZENvdW50IFRoZSBhbW91bnQgb2YgXCJ3b3Jkc1wiIHlvdSB3b3VsZCBsaWtlXHJcbiAqIHRoZSBiYWJibGVyIHRvIHByb2R1Y2UuXHJcbiAqIEByZXR1cm5zIHtCYWJibGVyfSBSZXR1cm5zIGEgYmFiYmxlci5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uaW50ZWdlclxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnN0cmluZy51Y0ZpcnN0XHJcbiAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLnN0cmluZ1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYmFiYmxlciA9IG5ldyBhdHJvcGEuQmFiYmxlcigzMCk7XHJcbiAqIC8vIHJlc2V0cyB0aGUgd29yZCBjb3VudFxyXG4gKiBiYWJibGVyLnJlc2V0V29yZENvdW50KDEwKVxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldFdvcmRDb3VudCgpKTtcclxuICogXHJcbiAqIC8vIGRpc3BsYXlzIGEgMTAgd29yZCBzZW50ZW5jZSBvZiBub25zZW5zZSB3b3Jkcy5cclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZUJhYmJsZSgxMCkpO1xyXG4gKiAvLyBkaXNwbGF5cyBhIDMgd29yZCBzZW50ZW5jZVxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDMpKTtcclxuICogXHJcbiAqIC8vIGRpc3BsYXlzIHRoZSB1c2VyIHN0b3JlZCBvciBsYXN0IGdlbmVyYXRlZCBiYWJibGVcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XHJcbiAqIFxyXG4gKiAvLyBjbGVhcnMgdGhlIHN0b3JlZCBiYWJibGVcclxuICogYmFiYmxlci5yZXNldEJhYmJsZSgpO1xyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldEJhYmJsZSgpKTtcclxuICogXHJcbiAqIC8vIHNldHMgdGhlIGJhYmJsZVxyXG4gKiBiYWJibGVyLnNldEJhYmJsZSgnaGVyZSBiZSBnaWJiZXJpc2ggJyk7XHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xyXG4gKiBcclxuICogLy8gYXBwZW5kIG1vcmUgZ2liYmVyaXNoIHRvIHRoZSBjdXJyZW50IGJhYmJsZVxyXG4gKiBiYWJibGVyLnNldEJhYmJsZShiYWJibGVyLmdldEJhYmJsZSgpICsgYmFiYmxlci5nZW5lcmF0ZUJhYmJsZSg1KSk7XHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xyXG4gKiBcclxuICogLy8gZ2VuZXJhdGUgYSBzZW50ZW5jZVxyXG4gKiBiYWJibGVyLnJlc2V0V29yZENvdW50KDEwKTtcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZVNlbnRlbmNlKDUsIDIwKSk7XHJcbiAqIFxyXG4gKiAvLyBnZW5lcmF0ZSByYW5kb20gcHVuY3R1YXRpb25cclxuICogY29uc29sZS5sb2coYmFiYmxlci5wdW5jdHVhdGUoKSk7XHJcbiAqIFxyXG4gKiAvLyBnZW5lcmF0ZSBhIHdvcmRcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZVdvcmQoMyw3KSk7XHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVXb3JkKDcsMTApKTtcclxuICovXHJcbmF0cm9wYS5CYWJibGVyID0gZnVuY3Rpb24gQmFiYmxlcih3cmRDb3VudCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIG15ID0gdGhpcyxcclxuICAgICAgICBiYWJibGUgPSAnJyxcclxuICAgICAgICB3b3JkQ291bnQgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB3b3JkIGNvdW50LlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd3JkQ291bnQgVGhlIGFtb3VudCBvZiBcIndvcmRzXCIgd2hpY2ggeW91IHdhbnQgdGhlXHJcbiAgICAgKiBiYWJibGVyIHRvIHByb2R1Y2UuXHJcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBzZXQgd29yZCBjb3VudCBmb3IgdGhpcyBiYWJibGVyLlxyXG4gICAgICovXHJcbiAgICB0aGlzLnNldFdvcmRDb3VudCA9IGZ1bmN0aW9uICh3cmRDb3VudCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygd3JkQ291bnQgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IDI1MDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3b3JkQ291bnQgPSB3cmRDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdvcmRDb3VudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGUgd29yZCBjb3VudCBmb3IgdGhpcyBiYWJibGVyLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd29yZENvdW50IFRoZSBhbW91bnQgb2YgXCJ3b3Jkc1wiIHlvdSB3b3VsZCBsaWtlXHJcbiAgICAgKiB0byBzZXQgZm9yIHRoaXMgYmFiYmxlci5cclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHNldCB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzZXRXb3JkQ291bnQgPSBmdW5jdGlvbiByZXNldFdvcmRDb3VudCh3b3JkQ291bnQpIHtcclxuICAgICAgICBteS5zZXRXb3JkQ291bnQod29yZENvdW50KTtcclxuICAgICAgICByZXR1cm4gd29yZENvdW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB3b3JkIGNvdW50LlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXHJcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2V0V29yZENvdW50ID0gZnVuY3Rpb24gZ2V0V29yZENvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB3b3JkQ291bnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYSB3b3JkIHdpdGggYSBzcGVjaWZpZWQgbGVuZ3RoLiBMb3dlcnMgdGhlIHdvcmQgY291bnQgYnkgb25lLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RyaW5nTWluIHRoZSBzaG9ydGVzdCB3b3JkLCBpbiBjaGFyYWN0ZXJzLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0cmluZ01heCBUaGUgbG9uZ2VzdCB3b3JkLCBpbiBjaGFyYWN0ZXJzLlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIHJhbmRvbSBzdHJpbmcgb2YgY2hhcmFjdGVyc1xyXG4gICAgICogd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2Ugb2YgbGVuZ3RoLlxyXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uaW50ZWdlclxyXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2VuZXJhdGVXb3JkID0gZnVuY3Rpb24gZ2VuZXJhdGVXb3JkKHN0cmluZ01pbiwgc3RyaW5nTWF4KSB7XHJcbiAgICAgICAgdmFyIHdvcmRMZW5ndGgsXHJcbiAgICAgICAgd29yZDtcclxuICAgICAgICB3b3JkTGVuZ3RoID0gYXRyb3BhLnJhbmRvbS5pbnRlZ2VyKHN0cmluZ01pbiwgc3RyaW5nTWF4KTtcclxuICAgICAgICB3b3JkID0gYXRyb3BhLnJhbmRvbS5zdHJpbmcod29yZExlbmd0aCwgJ2xvd2VyJyk7XHJcbiAgICAgICAgd29yZENvdW50LS07XHJcbiAgICAgICAgcmV0dXJuIHdvcmQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyByYW5kb20gcHVuY3R1YXRpb24uXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSByYW5kb20gcHVuY3R1YXRpb25cclxuICAgICAqIGNoYXJhY3RlciAoIC4gISBvciA/ICkuXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5zdHJpbmdcclxuICAgICAqL1xyXG4gICAgdGhpcy5wdW5jdHVhdGUgPSBmdW5jdGlvbiBwdW5jdHVhdGUoKSB7XHJcbiAgICAgICAgdmFyIHB1bmN0dWF0aW9uO1xyXG4gICAgICAgIHB1bmN0dWF0aW9uID0gYXRyb3BhLnJhbmRvbS5zdHJpbmcoMSwgJ3B1bmN0dWF0aW9uJyk7XHJcbiAgICAgICAgcmV0dXJuIHB1bmN0dWF0aW9uO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGEgc2VudGVuY2Ugb2Ygc3BlY2lmaWVkIGxlbmd0aCBpbiB3b3Jkcy4gVGhlIHF1YW50aXR5XHJcbiAgICAgKiAgb2Ygd29yZHMgaW4gdGhlIGdlbmVyYXRlZCBzZW50ZW5jZSB3aWxsIGJlIGJldHdlZW4gdGhlIG1pbmltdW1cclxuICAgICAqICBhbmQgbWF4aW11bSBzZXQsIHdpdGggdGhlIG1heGltdW0gY2FwcGVkIGF0IHRoZSBjdXJyZW50IHdvcmRzXHJcbiAgICAgKiAgY291bnQuIFRoZSB3b3JkIGNvdW50IHdpbGwgYmUgbG93ZXJlZCBieSB0aGVcclxuICAgICAqICBxdWFudGl0eSBvZiB3b3JkcyBpbiB0aGUgZ2VuZXJhdGVkIHNlbnRlbmNlLiBJZiB0aGUgd29yZCBjb3VudFxyXG4gICAgICogIGlzIDAgdGhlbiB0aGVyZSB3aWxsIGJlIG5vIHdvcmRzIGluIHRoZSBzZW50ZW5jZS4gSWYgdGhlIHdvcmRcclxuICAgICAqICBjb3VudCBpcyAzIHRoZW4gdGhlIG1heGltdW0gcG9zc2libGUgbnVtYmVyIG9mIHdvcmRzIGluIHRoZVxyXG4gICAgICogIHNlbnRlbmNlIHdpbGwgYmUgdGhyZWUuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzZW50ZW5jZU1pbiBUaGUgc2hvcnRlc3Qgc2VudGVuY2UsIGluIHdvcmRzLFxyXG4gICAgICogeW91IHdvdWxkIGxpa2UgcmV0dXJuZWQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc2VudGVuY2VNYXggVGhlIGxvbmdlc3Qgc2VudGVuY2UsIGluIHdvcmRzLFxyXG4gICAgICogeW91IHdvdWxkIGxpa2UgcmV0dXJuZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgXCJzZW50ZW5jZVwiIHdpdGhpbiB0aGUgc3BlY2lmaWVkXHJcbiAgICAgKiByYW5nZSBvZiBsZW5ndGguXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnN0cmluZy51Y0ZpcnN0XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2VuZXJhdGVTZW50ZW5jZSA9IGZ1bmN0aW9uIGdlbmVyYXRlU2VudGVuY2UoXHJcbiAgICAgICAgc2VudGVuY2VNaW4sIHNlbnRlbmNlTWF4XHJcbiAgICApIHtcclxuICAgICAgICB2YXIgd29yZCxcclxuICAgICAgICBzZW50ZW5jZUxlbmd0aCxcclxuICAgICAgICBzZW50ZW5jZTtcclxuICAgICAgICBzZW50ZW5jZUxlbmd0aCA9IGF0cm9wYS5yYW5kb20uaW50ZWdlcihzZW50ZW5jZU1pbiwgc2VudGVuY2VNYXgpO1xyXG4gICAgICAgIHNlbnRlbmNlID0gJyc7XHJcbiAgICAgICAgaWYgKHNlbnRlbmNlTGVuZ3RoID4gd29yZENvdW50KSB7XHJcbiAgICAgICAgICAgIHNlbnRlbmNlTGVuZ3RoID0gd29yZENvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHNlbnRlbmNlTGVuZ3RoOyBzZW50ZW5jZUxlbmd0aCA+IDA7IHNlbnRlbmNlTGVuZ3RoLS0pIHtcclxuICAgICAgICAgICAgaWYgKHdvcmRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHdvcmQgPSBteS5nZW5lcmF0ZVdvcmQoNCwgMTIpO1xyXG4gICAgICAgICAgICAgICAgc2VudGVuY2UgKz0gJyAnICsgd29yZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbnRlbmNlTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZW50ZW5jZSArPSBteS5wdW5jdHVhdGUoKTtcclxuICAgICAgICByZXR1cm4gYXRyb3BhLnN0cmluZy51Y0ZpcnN0KHNlbnRlbmNlLnRyaW0oKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBiYWJibGUuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYWJibGVTdHJpbmcgU3BlY2lmaWVkIGJhYmJsZSB0byBzZXQuXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdG9yZWQgYmFiYmxlLlxyXG4gICAgICovXHJcbiAgICB0aGlzLnNldEJhYmJsZSA9IGZ1bmN0aW9uIHNldEJhYmJsZShiYWJibGVTdHJpbmcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGJhYmJsZVN0cmluZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgYmFiYmxlID0gYmFiYmxlU3RyaW5nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG15LnJlc2V0QmFiYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYWJibGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIHN0b3JlZCBiYWJibGUuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN0b3JlZCBiYWJibGUuXHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzZXRCYWJibGUgPSBmdW5jdGlvbiByZXNldEJhYmJsZSgpIHtcclxuICAgICAgICBiYWJibGUgPSAnJztcclxuICAgICAgICByZXR1cm4gYmFiYmxlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbGFzdCBnZW5lcmF0ZWQgYmFiYmxlLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdG9yZWQgYmFiYmxlLlxyXG4gICAgICovXHJcbiAgICB0aGlzLmdldEJhYmJsZSA9IGZ1bmN0aW9uIGdldEJhYmJsZSgpIHtcclxuICAgICAgICByZXR1cm4gYmFiYmxlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGJhYmJsZSB0byBhIHVzZXIgc3BlY2lmaWVkIGxlbmd0aCBpbiB3b3Jkcy5cclxuICAgICAqICBUaGUgd29yZCBjb3VudCB3aWxsIGJlIHplcm8gYWZ0ZXIgdGhpcyBhbmQgdGhlIHN0b3JlZFxyXG4gICAgICogIGJhYmJsZSB3aWxsIGJlIHNldCB0byB0aGUgZ2VuZXJhdGVkIGJhYmJsZS5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdvcmRzQ3QgVGhlIGRlc2lyZWQgd29yZCBjb3VudCBmb3IgdGhlXHJcbiAgICAgKiBnZW5lcmF0ZWQgYmFiYmxlLlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBiYWJibGUgb2Ygc3BlY2lmaWVkIGxlbmd0aCBpbiB3b3Jkcy5cclxuICAgICAqIEBzZWUgYXRyb3BhLkJhYmJsZXIjZ2V0V29yZENvdW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2VuZXJhdGVCYWJibGUgPSBmdW5jdGlvbiBnZW5lcmF0ZUJhYmJsZSh3b3Jkc0N0KSB7XHJcbiAgICAgICAgbXkucmVzZXRCYWJibGUoKTtcclxuICAgICAgICBteS5yZXNldFdvcmRDb3VudCh3b3Jkc0N0KTtcclxuICAgICAgICBmb3IgKHdvcmRDb3VudDsgd29yZENvdW50ID4gMDsgYmFiYmxlICs9ICcgJykge1xyXG4gICAgICAgICAgICBteS5zZXRCYWJibGUoYmFiYmxlICsgbXkuZ2VuZXJhdGVTZW50ZW5jZSg1LCAyMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYmFiYmxlO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnQmFiYmxlcicpO1xyXG4gICAgdGhpcy5yZXNldFdvcmRDb3VudCh3cmRDb3VudCk7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiJdfQ==
