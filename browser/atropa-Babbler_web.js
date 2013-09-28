;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../src/atropa-Babbler.js":2}],2:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
atropa.random = require('atropa-random').random;
atropa.string = require('atropa-string').string;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.Babbler">tests</a>
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

},{"atropa-header":4,"atropa-random":6,"atropa-string":8}],3:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.arrays">tests</a>
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
 * @param {Array} (minuend) fromB The array with elements duplicated in <code>a</code>
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

},{"atropa-header":4,"atropa-inquire":5}],4:[function(require,module,exports){
var atropa = {};

/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>

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
var atropa;
atropa = {};
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


},{}],5:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.inquire">tests</a>
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

},{"atropa-header":4}],6:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.random">tests</a>
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

},{"atropa-header":4}],7:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.regex">tests</a>
 */
atropa.regex = {};
/**
 * Regex patterns.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Regex patterns.
 */
atropa.regex.patterns = {
    /** finds repeated words and phrases */
    repeatedWords : /(\b.{3,}\b)\s*(\1)/g,
    /** finds paragraph breaks */
    paragraphBreaks : /(\r\n\r\n|\n\n|\r\r)/g,
    /** finds line breaks */
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

},{"atropa-header":4}],8:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
atropa.regex = require('atropa-regex').regex;
atropa.arrays = require('atropa-arrays').arrays;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.string">tests</a>
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

},{"atropa-arrays":3,"atropa-header":4,"atropa-regex":7}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1CYWJibGVyXFxkZXZcXGJyb3dzZXJNYWluLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtQmFiYmxlclxcc3JjXFxhdHJvcGEtQmFiYmxlci5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWFycmF5c1xcc3JjXFxhdHJvcGEtYXJyYXlzLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtaGVhZGVyXFxzcmNcXGF0cm9wYS1oZWFkZXIuanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1pbnF1aXJlXFxzcmNcXGF0cm9wYS1pbnF1aXJlLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtcmFuZG9tXFxzcmNcXGF0cm9wYS1yYW5kb20uanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1yZWdleFxcc3JjXFxhdHJvcGEtcmVnZXguanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1zdHJpbmdcXHNyY1xcYXRyb3BhLXN0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQmFiYmxlciA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtQmFiYmxlci5qcycpO1xyXG5cclxudHJ5IHtcclxuICAgIE9iamVjdC5rZXlzKEJhYmJsZXIpLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgaWYoIWF0cm9wYVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhW3Byb3BdID0gQmFiYmxlcltwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgYXRyb3BhID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1CYWJibGVyLmpzJyk7XHJcbn1cclxuXHJcbk9iamVjdC5rZXlzKEJhYmJsZXIuZGF0YSkuZmlsdGVyKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9XHJcbikuZm9yRWFjaChcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSBCYWJibGVyLmRhdGFbcHJvcF07XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEucmFuZG9tID0gcmVxdWlyZSgnYXRyb3BhLXJhbmRvbScpLnJhbmRvbTtcclxuYXRyb3BhLnN0cmluZyA9IHJlcXVpcmUoJ2F0cm9wYS1zdHJpbmcnKS5zdHJpbmc7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgJ0JhYmJsZXInLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIHZhciBzdXBwb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyLFxyXG4gICAgICAgICAgICBhdHJvcGEuc3RyaW5nLnVjRmlyc3QsXHJcbiAgICAgICAgICAgIGF0cm9wYS5yYW5kb20uc3RyaW5nXHJcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgIH1cclxuKTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBiYWJibGVyLiBUaGUgYmFiYmxlclxyXG4gKiBwcm9kdWNlcyBsb3J1bSBpcHN1bSB0ZXh0LCB0byB1c2VyIHNwZWNpZmljYXRpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICogQGNsYXNzIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIGJhYmJsZXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IHdyZENvdW50IFRoZSBhbW91bnQgb2YgXCJ3b3Jkc1wiIHlvdSB3b3VsZCBsaWtlXHJcbiAqIHRoZSBiYWJibGVyIHRvIHByb2R1Y2UuXHJcbiAqIEByZXR1cm5zIHtCYWJibGVyfSBSZXR1cm5zIGEgYmFiYmxlci5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5yYW5kb20uaW50ZWdlclxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnN0cmluZy51Y0ZpcnN0XHJcbiAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLnN0cmluZ1xyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5CYWJibGVyXCI+dGVzdHM8L2E+XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBiYWJibGVyID0gbmV3IGF0cm9wYS5CYWJibGVyKDMwKTtcclxuICogLy8gcmVzZXRzIHRoZSB3b3JkIGNvdW50XHJcbiAqIGJhYmJsZXIucmVzZXRXb3JkQ291bnQoMTApXHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0V29yZENvdW50KCkpO1xyXG4gKiBcclxuICogLy8gZGlzcGxheXMgYSAxMCB3b3JkIHNlbnRlbmNlIG9mIG5vbnNlbnNlIHdvcmRzLlxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDEwKSk7XHJcbiAqIC8vIGRpc3BsYXlzIGEgMyB3b3JkIHNlbnRlbmNlXHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2VuZXJhdGVCYWJibGUoMykpO1xyXG4gKiBcclxuICogLy8gZGlzcGxheXMgdGhlIHVzZXIgc3RvcmVkIG9yIGxhc3QgZ2VuZXJhdGVkIGJhYmJsZVxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdldEJhYmJsZSgpKTtcclxuICogXHJcbiAqIC8vIGNsZWFycyB0aGUgc3RvcmVkIGJhYmJsZVxyXG4gKiBiYWJibGVyLnJlc2V0QmFiYmxlKCk7XHJcbiAqIGNvbnNvbGUubG9nKGJhYmJsZXIuZ2V0QmFiYmxlKCkpO1xyXG4gKiBcclxuICogLy8gc2V0cyB0aGUgYmFiYmxlXHJcbiAqIGJhYmJsZXIuc2V0QmFiYmxlKCdoZXJlIGJlIGdpYmJlcmlzaCAnKTtcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XHJcbiAqIFxyXG4gKiAvLyBhcHBlbmQgbW9yZSBnaWJiZXJpc2ggdG8gdGhlIGN1cnJlbnQgYmFiYmxlXHJcbiAqIGJhYmJsZXIuc2V0QmFiYmxlKGJhYmJsZXIuZ2V0QmFiYmxlKCkgKyBiYWJibGVyLmdlbmVyYXRlQmFiYmxlKDUpKTtcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZXRCYWJibGUoKSk7XHJcbiAqIFxyXG4gKiAvLyBnZW5lcmF0ZSBhIHNlbnRlbmNlXHJcbiAqIGJhYmJsZXIucmVzZXRXb3JkQ291bnQoMTApO1xyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlU2VudGVuY2UoNSwgMjApKTtcclxuICogXHJcbiAqIC8vIGdlbmVyYXRlIHJhbmRvbSBwdW5jdHVhdGlvblxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLnB1bmN0dWF0ZSgpKTtcclxuICogXHJcbiAqIC8vIGdlbmVyYXRlIGEgd29yZFxyXG4gKiBjb25zb2xlLmxvZyhiYWJibGVyLmdlbmVyYXRlV29yZCgzLDcpKTtcclxuICogY29uc29sZS5sb2coYmFiYmxlci5nZW5lcmF0ZVdvcmQoNywxMCkpO1xyXG4gKi9cclxuYXRyb3BhLkJhYmJsZXIgPSBmdW5jdGlvbiBCYWJibGVyKHdyZENvdW50KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgbXkgPSB0aGlzLFxyXG4gICAgICAgIGJhYmJsZSA9ICcnLFxyXG4gICAgICAgIHdvcmRDb3VudCA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHdvcmQgY291bnQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3cmRDb3VudCBUaGUgYW1vdW50IG9mIFwid29yZHNcIiB3aGljaCB5b3Ugd2FudCB0aGVcclxuICAgICAqIGJhYmJsZXIgdG8gcHJvZHVjZS5cclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHNldCB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2V0V29yZENvdW50ID0gZnVuY3Rpb24gKHdyZENvdW50KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB3cmRDb3VudCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgd29yZENvdW50ID0gMjUwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IHdyZENvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd29yZENvdW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVzZXRzIHRoZSB3b3JkIGNvdW50IGZvciB0aGlzIGJhYmJsZXIuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTNcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3b3JkQ291bnQgVGhlIGFtb3VudCBvZiBcIndvcmRzXCIgeW91IHdvdWxkIGxpa2VcclxuICAgICAqIHRvIHNldCBmb3IgdGhpcyBiYWJibGVyLlxyXG4gICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgc2V0IHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNldFdvcmRDb3VudCA9IGZ1bmN0aW9uIHJlc2V0V29yZENvdW50KHdvcmRDb3VudCkge1xyXG4gICAgICAgIG15LnNldFdvcmRDb3VudCh3b3JkQ291bnQpO1xyXG4gICAgICAgIHJldHVybiB3b3JkQ291bnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHdvcmQgY291bnQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHdvcmQgY291bnQgZm9yIHRoaXMgYmFiYmxlci5cclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRXb3JkQ291bnQgPSBmdW5jdGlvbiBnZXRXb3JkQ291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdvcmRDb3VudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBhIHdvcmQgd2l0aCBhIHNwZWNpZmllZCBsZW5ndGguIExvd2VycyB0aGUgd29yZCBjb3VudCBieSBvbmUuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdNaW4gdGhlIHNob3J0ZXN0IHdvcmQsIGluIGNoYXJhY3RlcnMuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RyaW5nTWF4IFRoZSBsb25nZXN0IHdvcmQsIGluIGNoYXJhY3RlcnMuXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGEgcmFuZG9tIHN0cmluZyBvZiBjaGFyYWN0ZXJzXHJcbiAgICAgKiB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSBvZiBsZW5ndGguXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5pbnRlZ2VyXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLnJhbmRvbS5zdHJpbmdcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZW5lcmF0ZVdvcmQgPSBmdW5jdGlvbiBnZW5lcmF0ZVdvcmQoc3RyaW5nTWluLCBzdHJpbmdNYXgpIHtcclxuICAgICAgICB2YXIgd29yZExlbmd0aCxcclxuICAgICAgICB3b3JkO1xyXG4gICAgICAgIHdvcmRMZW5ndGggPSBhdHJvcGEucmFuZG9tLmludGVnZXIoc3RyaW5nTWluLCBzdHJpbmdNYXgpO1xyXG4gICAgICAgIHdvcmQgPSBhdHJvcGEucmFuZG9tLnN0cmluZyh3b3JkTGVuZ3RoLCAnbG93ZXInKTtcclxuICAgICAgICB3b3JkQ291bnQtLTtcclxuICAgICAgICByZXR1cm4gd29yZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIHJhbmRvbSBwdW5jdHVhdGlvbi5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIHJhbmRvbSBwdW5jdHVhdGlvblxyXG4gICAgICogY2hhcmFjdGVyICggLiAhIG9yID8gKS5cclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLnN0cmluZ1xyXG4gICAgICovXHJcbiAgICB0aGlzLnB1bmN0dWF0ZSA9IGZ1bmN0aW9uIHB1bmN0dWF0ZSgpIHtcclxuICAgICAgICB2YXIgcHVuY3R1YXRpb247XHJcbiAgICAgICAgcHVuY3R1YXRpb24gPSBhdHJvcGEucmFuZG9tLnN0cmluZygxLCAncHVuY3R1YXRpb24nKTtcclxuICAgICAgICByZXR1cm4gcHVuY3R1YXRpb247XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYSBzZW50ZW5jZSBvZiBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLiBUaGUgcXVhbnRpdHlcclxuICAgICAqICBvZiB3b3JkcyBpbiB0aGUgZ2VuZXJhdGVkIHNlbnRlbmNlIHdpbGwgYmUgYmV0d2VlbiB0aGUgbWluaW11bVxyXG4gICAgICogIGFuZCBtYXhpbXVtIHNldCwgd2l0aCB0aGUgbWF4aW11bSBjYXBwZWQgYXQgdGhlIGN1cnJlbnQgd29yZHNcclxuICAgICAqICBjb3VudC4gVGhlIHdvcmQgY291bnQgd2lsbCBiZSBsb3dlcmVkIGJ5IHRoZVxyXG4gICAgICogIHF1YW50aXR5IG9mIHdvcmRzIGluIHRoZSBnZW5lcmF0ZWQgc2VudGVuY2UuIElmIHRoZSB3b3JkIGNvdW50XHJcbiAgICAgKiAgaXMgMCB0aGVuIHRoZXJlIHdpbGwgYmUgbm8gd29yZHMgaW4gdGhlIHNlbnRlbmNlLiBJZiB0aGUgd29yZFxyXG4gICAgICogIGNvdW50IGlzIDMgdGhlbiB0aGUgbWF4aW11bSBwb3NzaWJsZSBudW1iZXIgb2Ygd29yZHMgaW4gdGhlXHJcbiAgICAgKiAgc2VudGVuY2Ugd2lsbCBiZSB0aHJlZS5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNlbnRlbmNlTWluIFRoZSBzaG9ydGVzdCBzZW50ZW5jZSwgaW4gd29yZHMsXHJcbiAgICAgKiB5b3Ugd291bGQgbGlrZSByZXR1cm5lZC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzZW50ZW5jZU1heCBUaGUgbG9uZ2VzdCBzZW50ZW5jZSwgaW4gd29yZHMsXHJcbiAgICAgKiB5b3Ugd291bGQgbGlrZSByZXR1cm5lZC5cclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSBcInNlbnRlbmNlXCIgd2l0aGluIHRoZSBzcGVjaWZpZWRcclxuICAgICAqIHJhbmdlIG9mIGxlbmd0aC5cclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEucmFuZG9tLmludGVnZXJcclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuc3RyaW5nLnVjRmlyc3RcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZW5lcmF0ZVNlbnRlbmNlID0gZnVuY3Rpb24gZ2VuZXJhdGVTZW50ZW5jZShcclxuICAgICAgICBzZW50ZW5jZU1pbiwgc2VudGVuY2VNYXhcclxuICAgICkge1xyXG4gICAgICAgIHZhciB3b3JkLFxyXG4gICAgICAgIHNlbnRlbmNlTGVuZ3RoLFxyXG4gICAgICAgIHNlbnRlbmNlO1xyXG4gICAgICAgIHNlbnRlbmNlTGVuZ3RoID0gYXRyb3BhLnJhbmRvbS5pbnRlZ2VyKHNlbnRlbmNlTWluLCBzZW50ZW5jZU1heCk7XHJcbiAgICAgICAgc2VudGVuY2UgPSAnJztcclxuICAgICAgICBpZiAoc2VudGVuY2VMZW5ndGggPiB3b3JkQ291bnQpIHtcclxuICAgICAgICAgICAgc2VudGVuY2VMZW5ndGggPSB3b3JkQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoc2VudGVuY2VMZW5ndGg7IHNlbnRlbmNlTGVuZ3RoID4gMDsgc2VudGVuY2VMZW5ndGgtLSkge1xyXG4gICAgICAgICAgICBpZiAod29yZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd29yZCA9IG15LmdlbmVyYXRlV29yZCg0LCAxMik7XHJcbiAgICAgICAgICAgICAgICBzZW50ZW5jZSArPSAnICcgKyB3b3JkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VudGVuY2VMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbnRlbmNlICs9IG15LnB1bmN0dWF0ZSgpO1xyXG4gICAgICAgIHJldHVybiBhdHJvcGEuc3RyaW5nLnVjRmlyc3Qoc2VudGVuY2UudHJpbSgpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGJhYmJsZS5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJhYmJsZVN0cmluZyBTcGVjaWZpZWQgYmFiYmxlIHRvIHNldC5cclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN0b3JlZCBiYWJibGUuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2V0QmFiYmxlID0gZnVuY3Rpb24gc2V0QmFiYmxlKGJhYmJsZVN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYmFiYmxlU3RyaW5nID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBiYWJibGUgPSBiYWJibGVTdHJpbmc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXkucmVzZXRCYWJibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJhYmJsZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgc3RvcmVkIGJhYmJsZS5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5CYWJibGVyI1xyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3RvcmVkIGJhYmJsZS5cclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNldEJhYmJsZSA9IGZ1bmN0aW9uIHJlc2V0QmFiYmxlKCkge1xyXG4gICAgICAgIGJhYmJsZSA9ICcnO1xyXG4gICAgICAgIHJldHVybiBiYWJibGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsYXN0IGdlbmVyYXRlZCBiYWJibGUuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQmFiYmxlciNcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN0b3JlZCBiYWJibGUuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2V0QmFiYmxlID0gZnVuY3Rpb24gZ2V0QmFiYmxlKCkge1xyXG4gICAgICAgIHJldHVybiBiYWJibGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYmFiYmxlIHRvIGEgdXNlciBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLlxyXG4gICAgICogIFRoZSB3b3JkIGNvdW50IHdpbGwgYmUgemVybyBhZnRlciB0aGlzIGFuZCB0aGUgc3RvcmVkXHJcbiAgICAgKiAgYmFiYmxlIHdpbGwgYmUgc2V0IHRvIHRoZSBnZW5lcmF0ZWQgYmFiYmxlLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkJhYmJsZXIjXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd29yZHNDdCBUaGUgZGVzaXJlZCB3b3JkIGNvdW50IGZvciB0aGVcclxuICAgICAqIGdlbmVyYXRlZCBiYWJibGUuXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIGJhYmJsZSBvZiBzcGVjaWZpZWQgbGVuZ3RoIGluIHdvcmRzLlxyXG4gICAgICogQHNlZSBhdHJvcGEuQmFiYmxlciNnZXRXb3JkQ291bnRcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZW5lcmF0ZUJhYmJsZSA9IGZ1bmN0aW9uIGdlbmVyYXRlQmFiYmxlKHdvcmRzQ3QpIHtcclxuICAgICAgICBteS5yZXNldEJhYmJsZSgpO1xyXG4gICAgICAgIG15LnJlc2V0V29yZENvdW50KHdvcmRzQ3QpO1xyXG4gICAgICAgIGZvciAod29yZENvdW50OyB3b3JkQ291bnQgPiAwOyBiYWJibGUgKz0gJyAnKSB7XHJcbiAgICAgICAgICAgIG15LnNldEJhYmJsZShiYWJibGUgKyBteS5nZW5lcmF0ZVNlbnRlbmNlKDUsIDIwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYWJibGU7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCdCYWJibGVyJyk7XHJcbiAgICB0aGlzLnJlc2V0V29yZENvdW50KHdyZENvdW50KTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIGFycmF5cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXHJcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLmFycmF5c1wiPnRlc3RzPC9hPlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cyA9IHt9O1xyXG4vKipcclxuICogQ29tcGFyZXMgdHdvIGFycmF5cyBiYXNlZCBvbiBzaXplLCBjb250ZW50cywgYW5kIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgT25lIGFycmF5IHlvdSB3YW50IGNvbXBhcmVkIHRvIGFub3RoZXIuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBUaGUgb3RoZXIgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uXHJcbiAqICB3aGV0aGVyIG9yIG5vdCB0aGUgYXJyYXlzIG1hdGNoZWQgaW4gc2l6ZSwgY29tcG9zaXRpb24sIGFuZFxyXG4gKiAgZWxlbWVudCBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwxLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2VcclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwyXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIHRydWVcclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMiwxXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgdGhlIGVsZW1lbnRzIGFyZSBub3QgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xyXG4gKiB2YXIgeSA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgZXZlbiB0aG91Z2ggdGhlIG9iamVjdCBsb29rcyB0aGUgc2FtZSwgdGhlXHJcbiAqIC8vIHR3byBvYmplY3RzIGFyZSBpbiBmYWN0IGRpc3RpbmN0IG9iamVjdHMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsdWUnfTtcclxuICogdmFyIHggPSBbMSxvYmpdO1xyXG4gKiB2YXIgeSA9IFsxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyB0cnVlIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZVxyXG4gKiAvLyBpbiBmYWN0IHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMubWF0Y2ggPSBmdW5jdGlvbiBhcnJheXNNYXRjaChhcnJheTEsIGFycmF5Mikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgeCxcclxuICAgIGw7XHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGwgPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgZm9yICh4ID0gMDsgeCA8IGw7IHggKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJheTFbeF0gIT09IGFycmF5Mlt4XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcbi8qKlxyXG4gKiBTdWJ0cmFjdHMgb25lIGFycmF5IGZyb20gYW5vdGhlciBhcnJheSBiYXNlZCBvbiB0aGUgdW5pcXVlIHZhbHVlcyBpbiBib3RoXHJcbiAqICBzZXRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTJcclxuICogQHBhcmFtIHtBcnJheX0gYSAoc3VidHJhaGVuZCkgVGhlIGFycmF5IHRvIHN1YnRyYWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSAobWludWVuZCkgZnJvbUIgVGhlIGFycmF5IHdpdGggZWxlbWVudHMgZHVwbGljYXRlZCBpbiA8Y29kZT5hPC9jb2RlPlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcclxuICogIHZhbHVlcyBmb3VuZCBpbiA8Y29kZT5mcm9tQjwvY29kZT4gdGhhdCBhcmUgbm90IHByZXNlbnQgaW4gPGNvZGU+YTwvY29kZT5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwxLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsM107XHJcbiAqIHZhciB5ID0gWzMsMV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDNdO1xyXG4gKiB2YXIgeSA9IFszLDEsMSw5XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFs5XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcclxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfVxyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbXSBcclxuICogLy8gYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlIHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuc3VidHJhY3QgPSBmdW5jdGlvbihhLCBmcm9tQikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdGhlID0ge307XHJcbiAgICB0aGUucmVzdWx0ID0gW107XHJcbiAgICBmcm9tQi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIHRoZS5tYXJrID0gZmFsc2U7XHJcbiAgICAgICAgYS5mb3JFYWNoKGZ1bmN0aW9uKHJtKXtcclxuICAgICAgICAgICAgaWYoaXRlbSA9PT0gcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoZS5tYXJrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHRoZS5tYXJrICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoZS5yZXN1bHQucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGUucmVzdWx0O1xyXG59O1xyXG4vKipcclxuICogUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW4gYXJyYXlzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTJcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIEFuIGFycmF5LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgQW5vdGhlciBhcnJheS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlblxyXG4gKiAgYXJyYXlzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMsNF07XHJcbiAqIHZhciB5ID0gWzMsMSw1XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMyw0XTtcclxuICogdmFyIHkgPSBbMywxLDEsNV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsMSwzXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QoYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHNtYWxsQXJyYXksIGxhcmdlQXJyYXksIGludGVyc2VjdGlvbiA9IFtdO1xyXG4gICAgaWYoYXJyYXkxLmxlbmd0aCA+IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcclxuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XHJcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XHJcbiAgICB9XHJcbiAgICBzbWFsbEFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaWR4SW5MYXJnZUFycmF5ID0gbGFyZ2VBcnJheS5pbmRleE9mKGl0ZW0pO1xyXG4gICAgICAgIGlmICgwIDw9IGlkeEluTGFyZ2VBcnJheSkgeyAvLyBoYXMgd29yZFxyXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb24ucHVzaChsYXJnZUFycmF5LnNwbGljZShpZHhJbkxhcmdlQXJyYXksIDEpWzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnRlcnNlY3Rpb247XHJcbn07XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBmcmVxdWVuY3kgb2YgaXRlbXMgb2NjdXJyaW5nIGluIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBjYWxjdWxhdGUgZnJlcXVlbmNpZXMgZnJvbS5cclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2hvc2Uga2V5cyBhcmUgZWFjaCB1bmlxdWVcclxuICogIGVsZW1lbnRzIGZyb20gdGhlIGFycmF5IGFuZCB0aGVpciB2YWx1ZSBpcyB0aGVpciBmcmVxdWVuY3kgb2ZcclxuICogIG9jY3VycmVuY2Ugd2l0aGluIHRoZSBhcnJheS4gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgYXJyYXkgZG9lc1xyXG4gKiAgbm90IGNvbnRhaW4gdmFsdWVzIG1hdGNoaW5nIG9iamVjdCBpbnN0YW5jZSBwcm9wZXJ0eSBuYW1lcy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDEsMSwxLDMsM107XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiA1LFxyXG4gKiAvLyAgICAgXCIzXCI6IDJcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiZnJlZFwiLCBcImphbmVcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiYmlsbFwiOiAxLFxyXG4gKiAvLyAgICAgXCJmcmVkXCI6IDIsXHJcbiAqIC8vICAgICBcImphbmVcIjogMVxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogMVxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciBvdGhlck9iaiA9IHt9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqLG90aGVyT2JqLHsnYURvdWdobnV0JyA6ICdzcHJpbmtsZXMnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAzXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLFwidG9TdHJpbmdcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcInRvU3RyaW5nXCI6IFwiZnVuY3Rpb24gdG9TdHJpbmcoKSB7XFxuICAgIFtuYXRpdmUgY29kZV1cXG59MVwiXHJcbiAqIC8vIH1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjdXJyKSB7XHJcbiAgICAgICAgaWYgKGFjY1tjdXJyXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWNjW2N1cnJdICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogR2V0cyBVbmlxdWUgdmFsdWVzIGZyb20gYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBsYXJnZUFycmF5IFRoZSBhcnJheSB3aXRoIGR1cGxpY2F0ZSB2YWx1ZXMgaW4gaXQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxyXG4gKiAgdmFsdWVzIGZvdW5kIGluIHRoZSBsYXJnZUFycmF5LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMSw0LDQsMyw2XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgWyBcIjFcIiwgXCI0XCIsIFwiM1wiLCBcIjZcIiBdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCIsIFwiZnJlZFwiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyBcclxuICogICAgIFwiYmlsbFwiLFxyXG4gKiAgICAge1wiYVByb3BcIiA6IFwiYVZhbHVlXCJ9LFxyXG4gKiAgICAge1wiYUd1eVwiIDogXCJmcmVkXCJ9LFxyXG4gKiAgICAge1wiYUxhZHlcIiA6IFwiamFuZVwifVxyXG4gKiBdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbIFwiYmlsbFwiLCBcIltvYmplY3QgT2JqZWN0XVwiIF1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlID0gZnVuY3Rpb24gKGxhcmdlQXJyYXkpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KGxhcmdlQXJyYXkpKS5zb3J0KCk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmVzIGVtcHR5IHN0cmluZ3MgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVdpdGhFbXB0eUVsZW1lbnRzIFRoZSBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgaW4gaXQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgcmVtb3ZlZC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIDEwLCAsIDUsIFwiXCIsICcnLCA3IF07XHJcbiAqIGNvbnNvbGUubG9nKCdzdGFydGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcclxuICogY29uc29sZS5sb2coeCk7XHJcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoeCk7XHJcbiAqIGNvbnNvbGUubG9nKCdlbmRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpO1xyXG4gKiAvLyBkaXNwbGF5cyB0aGUgZm9sbG93aW5nXHJcbiAqIC8vIHN0YXJ0aW5nIGxlbmd0aCA2XHJcbiAqIC8vIFsxMCwgdW5kZWZpbmVkLCA1LCBcIlwiLCBcIlwiLCA3XVxyXG4gKiAvLyBlbmRpbmcgbGVuZ3RoIDNcclxuICogLy8gWzEwLCA1LCA3XVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzID0gZnVuY3Rpb24gKGFycmF5V2l0aEVtcHR5RWxlbWVudHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGFycmF5V2l0aEVtcHR5RWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuICFhdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nKGl0ZW0pO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZWluZGV4ZXMgYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHdpdGggZGlzY29udGludW91cyBrZXlzLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2l0aCBjb250aW51b3VzIGtleXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXTtcclxuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XHJcbiAqIFxyXG4gKiBkZWxldGUgeFsxXTsgLy8gZGVsZXRlcyB0aGUga2V5IGZyb20gdGhlIGFycmF5IGJ1dFxyXG4gKiAgICAgICAgICAgICAgLy8gdGhlIGFycmF5IGxlbmd0aCByZW1haW5zIHRoZSBzYW1lXHJcbiAqICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSBhcnJheXMga2V5cyBhcmUgMCwgMiwgYW5kIDNcclxuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIHVuZGVmaW5lZCwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxyXG4gKiBcclxuICogeCA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh4KTtcclxuICogY29uc29sZS5sb2coeCk7IC8vICBbIFwiYVwiLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogICAgLy8gbm90ZSB0aGF0IHRoZSBsYXN0IGVsZW1lbnQgZXhpc3RlZCBpbiB0aGUgYXJyYXksIGl0cyB2YWx1ZSB3YXNcclxuICogICAgLy8gdW5kZWZpbmVkIGJ1dCBpdCBkaWQgaGF2ZSBhIGtleSBzbyB0aGUgZWxlbWVudCByZW1haW5zIGluIHRoZSBhcnJheS5cclxuICogICAgLy9cclxuICogICAgLy8gVGhlIGRlbGV0ZWQgZWxlbWVudCB3YXMgaW4gZmFjdCBkZWxldGVkIGZyb20gdGhlIGFycmF5IHNvIHRoZXJlIHdhcyBub1xyXG4gKiAgICAvLyBrZXkgeFsxXSBhdCBhbGwsIHdoZW4gdHJ5aW5nIHRvIGFjY2VzcyB0aGlzIG5vbiBleGlzdGluZyBlbGVtZW50IHRoZVxyXG4gKiAgICAvLyB2YWx1ZSBvZiB1bmRlZmluZWQgd2FzIHJldHVybmVkLiBUaGlzIGJlaGF2aW9yIGlzIGNvbmZ1c2luZyB1bmxlc3MgeW91XHJcbiAqICAgIC8vIHRoaW5rIGFib3V0IHRoZSBhcnJheWFzIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBuYW1lZCBieVxyXG4gKiAgICAvLyBudW1iZXJzLiBBY2Nlc3NpbmcgYW4gdW5kZWZpbmVkIHByb3BlcnR5IHJldHVybnMgdW5kZWZpbmVkIHJlZ2FyZGxlc3NcclxuICogICAgLy8gb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgZXhpc3RlZCBpbiB0aGUgcGFzdCBvciBub3QuXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gM1xyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5yZWluZGV4ID0gZnVuY3Rpb24gcmVpbmRleChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGlkeCwgb3V0O1xyXG4gICAgb3V0ID0gW107XHJcbiAgICBmb3IoaWR4IGluIGFycikge1xyXG4gICAgICAgIGlmKGFyci5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIG91dC5wdXNoKGFycltpZHhdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gYXJyYXkncyBlbGVtZW50cyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc29ydC4gQWxsIGVsZW1lbnRzIG9mIHRoZSBhcnJheSBtdXN0IGJlXHJcbiAqICBudW1iZXItaXNoLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGluIG51bWVyaWMgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzMsIDIsIDksIDI2LCAxMCwgMSwgOTksIDE1XTtcclxuICogY29uc29sZS5sb2coIGF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5KHgpICk7XHJcbiAqIC8vIGxvZ3MgWzEsIDIsIDMsIDksIDEwLCAxNSwgMjYsIDk5XVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0TnVtZXJpY2FsbHkoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnIuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBUaHJvd3MgYW4gZXJyb3IsIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gaXMgbm90IFxyXG4gKiAgc3RhbmRhcmRpemVkLlxyXG4gKiBcclxuICogIFllcywgbG9jYWxlQ29tcGFyZSBpcyBpbiB0aGUgc3RhbmRhcmQgYnV0LCBhdCB0aGlzIHRpbWUgdGhlIGFjdHVhbFxyXG4gKiAgY29tcGFyaXNvbiBpcyBpbXBsZW1lbnRhdGlvbiBkZXBlbmRhbnQuIFRoaXMgbWVhbnMgdGhhdCBcImFscGhhYmV0aWNhbCBvcmRlclwiXHJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxyXG4gKiAgYXJyYXkgb2YgPGNvZGU+WydhJywnWicsJ0EnLCd6J108L2NvZGU+IHdvdWxkIGJlIHNvcnRlZCB0b1xyXG4gKiAgPGNvZGU+WydBJywnWicsJ2EnLCd6XCJdPC9jb2RlPiwgd2hpbGUgb25cclxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXHJcbiAqICBhbm90aGVyIGltcGxlbWVudG9yIHdvdWxkIHNvcnQgaXQgPGNvZGU+WydBJywnYScsJ1onLCd6J108L2NvZGU+P1xyXG4gKiBcclxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXHJcbiAqICBpbXBsZW1lbnRhdGlvbiBvZiA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGFuZCB0aGF0J3NcclxuICogIGp1c3QgdG9vIG11Y2ggd29yayBmb3IgbWUgdG8gZG8gYWxvbmUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcclxuICovXHJcbmF0cm9wYS5hcnJheXMuc29ydEFscGhhYmV0aWNhbGx5ID0gZnVuY3Rpb24gc29ydEFscGhhYmV0aWNhbGx5KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcclxufTtcclxuLyoqXHJcbiAqIERlbGV0ZXMgdGhlIGdpdmVuIGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkgYXQgdGhlIGdpdmVuIGluZGV4LiBJdCBiYXNpY2FsbHlcclxuICogIGRvZXMgd2hhdCB5b3Ugd291bGQgZXhwZWN0IHRoZSBkZWxldGUgb3BlcmF0b3IgdG8gZG8sIGV4Y2VwdCB0aGUgZGVsZXRlXHJcbiAqICBvcGVyYXRvciBkb2Vzbid0IGRvIHdoYXQgeW91IHdvdWxkIGV4cGVjdC5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBkZWxldGUuXHJcbiAqIEByZXR1cm5zIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgZWxlbWVudCByZW1vdmVkLCBjb250aWd1b3VzIGtleXMsIGFuZFxyXG4gKiAgd2hvc2UgbGVuZ3RoIGlzIDEgbGVzcyB0aGFuIHRoZSBpbnB1dCBhcnJheS5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZGVsZXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhcnIsIGluZGV4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGRlbGV0ZSBhcnJbaW5kZXhdO1xyXG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMucmVpbmRleChhcnIpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCJ2YXIgYXRyb3BhID0ge307XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhO1xyXG5hdHJvcGEgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXHJcbiAqICBlcnJvciBpZiBpdCBoYXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcclxuICovXHJcbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcclxuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xyXG4gICAgXHJcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxyXG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcclxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXHJcbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xyXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxyXG4gKiAgcmV0dXJuIGZhbHNlLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXHJcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcclxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICovXHJcbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcclxuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLmRhdGEgPSB7fTtcclxuXHJcbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xyXG5cclxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuXHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGZ1bmN0aW9ucyB0aGF0IHRlc3QgdGhlIHN0YXRlIG9mIGlucHV0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLmlucXVpcmVcIj50ZXN0czwvYT5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlID0ge307XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgbnVsbC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgbnVsbC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4ID09PSBudWxsLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNOdWxsID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuICh4ID09PSBudWxsKTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBvYmplY3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIGFuIG9iamVjdC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YoeCkgPT09ICdvYmplY3QnLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNPYmplY3QgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gKHR5cGVvZiB4ID09PSAnb2JqZWN0Jyk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYm90aCBhbiBvYmplY3QgYW5kIG5vdCBudWxsLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBib3RoIGFuXHJcbiAqIG9iamVjdCBhbmQgbnVsbC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4IGlzIGJvdGggYW4gb2JqZWN0IGFuZFxyXG4gKiBub3QgbnVsbC4gKG51bGwgaXMgYW4gb2JqZWN0KS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhdHJvcGEuaW5xdWlyZS5pc09iamVjdCh4KSAmJiAoIWF0cm9wYS5pbnF1aXJlLmlzTnVsbCh4KSk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3MgYW4gb2JqZWN0IGZvciB0aGUgZXhpc3RlbmNlIG9mIGEgcHJvcGVydHlcclxuICogcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSB3YXMgaW5oZXJpdGVkXHJcbiAqIG9yIG5vdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0IHdoaWNoIG1heSBvciBtYXkgbm90XHJcbiAqIGhhdmUgdGhlIHByb3BlcnR5IGlkZW50aWZpZWQgYnkgcHJvcC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgQSBzdHJpbmcgdmFsdWUgcmVwcmVzZW50aW5nIHRoZVxyXG4gKiBuYW1lIG9mIHRoZSBwcm9wZXJ0eS5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBvYmoucHJvcCBleGlzdHMsXHJcbiAqIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaGFzUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGlmIChhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwob2JqKSkge1xyXG4gICAgICAgIHJldHVybiAocHJvcCBpbiBvYmopO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGFuIGVtcHR5IHN0cmluZy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB5b3Ugd2FudCB0byBrbm93IGFib3V0XHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgc3RyIGlzIGFuIGVtcHR5IHN0cmluZyxcclxuICogIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IGZhbHNlO1xyXG4gICAgaWYgKCcnID09PSBzdHIpIHtcclxuICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIHJhbmRvbSBzdHJpbmdzIGFuZCBudW1iZXJzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQG5hbWVzcGFjZSBQcm92aWRlcyByYW5kb20gc3RyaW5ncyBhbmQgbnVtYmVycy5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEucmFuZG9tXCI+dGVzdHM8L2E+XHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tID0ge307XHJcbi8qKlxyXG4gKiBHaXZlcyB5b3UgYSByYW5kb20gc3RyaW5nIHdob3NlIGxlbmd0aCBhbmQgY2hhcmFjdGVycyB5b3Ugc3BlY2lmeS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpbmdMZW5ndGggVGhpcyBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjaGFyYWN0ZXJDbGFzcyBPcHRpb25hbC4gTWF5IGJlIG9uZSBvZjpcclxuICogIG51bWVyaWMsIGNhcHMsIGxvd2VyLCBhbHBoYSwgYWxwaGFudW1lcmljLCBwdW5jdHVhdGlvbiwgdm93ZWwsIGNvbnNvbmFudFxyXG4gKiAgVGhpcyBpcyB0aGUgdHlwZSBvZiBjaGFyYWN0ZXJzIHlvdSB3YW50IHJldHVybmVkIHRvIHlvdS4gRGVmYXVsdHMgdG9cclxuICogIGFscGhhbnVtZXJpYy5cclxuICogQHJldHVybiB7U3RyaW5nfSBBIHJhbmRvbSBzdHJpbmcgb2Ygc3BlY2lmaWVkIGxlbmd0aCBhbmQgY29tcG9zaXRpb24uXHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLnN0cmluZyA9IGZ1bmN0aW9uIHJhbmRvbVN0cmluZyhzdHJpbmdMZW5ndGgsIGNoYXJhY3RlckNsYXNzKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgbnVtZXJpYyxcclxuICAgIHZvd2VsLFxyXG4gICAgY29uc29uYW50LFxyXG4gICAgbG93ZXIsXHJcbiAgICBjYXBzLFxyXG4gICAgYWxwaGEsXHJcbiAgICBhbHBoYW51bWVyaWMsXHJcbiAgICBwdW5jdHVhdGlvbixcclxuICAgIGNoYXJzLFxyXG4gICAgc3RyaW5nX2xlbmd0aCxcclxuICAgIHJhbmRvbXN0cmluZyxcclxuICAgIGksXHJcbiAgICBjaGFyYWN0ZXI7XHJcbiAgICBcclxuICAgIG51bWVyaWMgPSAnMDEyMzQ1Njc4OSc7XHJcbiAgICB2b3dlbCA9ICdhZWlvdXknO1xyXG4gICAgY29uc29uYW50ID0gJ2JjZGZnaGprbG1ucHFyc3R2d3h6JztcclxuICAgIGxvd2VyID0gdm93ZWwgKyBjb25zb25hbnQ7XHJcbiAgICBjYXBzID0gbG93ZXIudG9VcHBlckNhc2UoKTtcclxuICAgIGFscGhhID0gY2FwcyArIGxvd2VyO1xyXG4gICAgYWxwaGFudW1lcmljID0gbnVtZXJpYyArIGNhcHMgKyBsb3dlcjtcclxuICAgIHB1bmN0dWF0aW9uID0gJy4/ISc7XHJcbiAgICByYW5kb21zdHJpbmcgPSAnJztcclxuICAgIHN3aXRjaCAoY2hhcmFjdGVyQ2xhc3MpIHtcclxuICAgIGNhc2UgJ251bWVyaWMnOlxyXG4gICAgICAgIGNoYXJzID0gbnVtZXJpYztcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NhcHMnOlxyXG4gICAgICAgIGNoYXJzID0gY2FwcztcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2xvd2VyJzpcclxuICAgICAgICBjaGFycyA9IGxvd2VyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnYWxwaGEnOlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdhbHBoYW51bWVyaWMnOlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGFudW1lcmljO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAncHVuY3R1YXRpb24nOlxyXG4gICAgICAgIGNoYXJzID0gcHVuY3R1YXRpb247XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICd2b3dlbCc6XHJcbiAgICAgICAgY2hhcnMgPSB2b3dlbDtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NvbnNvbmFudCc6XHJcbiAgICAgICAgY2hhcnMgPSBjb25zb25hbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNoYXJzID0gYWxwaGFudW1lcmljO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0cmluZ0xlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RyaW5nX2xlbmd0aCA9IDQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0cmluZ19sZW5ndGggPSBzdHJpbmdMZW5ndGg7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnMubGVuZ3RoKTtcclxuICAgICAgICByYW5kb21zdHJpbmcgKz0gY2hhcnNbY2hhcmFjdGVyXTtcclxuICAgIH1cclxuICAgIHJldHVybiByYW5kb21zdHJpbmc7XHJcbn07XHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gdGhlIHNwZWNpZmllZCBtaW4gYW5kIG1heCB2YWx1ZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtaW4gVGhlIGxvd2VzdCBudW1iZXIgeW91IHdhbnQgcmV0dXJuZWRcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgaGlnaGVzdCBudW1iZXIgeW91IHdhbnQgcmV0dXJuZWRcclxuICogQHJldHVybnMge051bWJlcn0gQSByYW5kb20gbnVtYmVyIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5pbnRlZ2VyID0gZnVuY3Rpb24gcmFuZG9tSW50ZWdlcihtaW4sIG1heCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXQgYSByYW5kb20gcHJvcGVydHkgbmFtZSBmcm9tIHRoZSBnaXZlbiBvYmplY3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gc2VsZWN0IGEgcmFuZG9tXHJcbiAqICBwcm9wZXJ0eSBuYW1lIGZyb20uXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gQSByYW5kb20gcHJvcGVydHkgbmFtZSBmcm9tIHRoZVxyXG4gKiAgZ2l2ZW4gb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5nZXRQcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBhcnI7XHJcbiAgICBhcnIgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgcmV0dXJuIGFyclthdHJvcGEucmFuZG9tLmdldEFycmF5S2V5KGFycildO1xyXG59O1xyXG4vKipcclxuICogR2V0IGEgcmFuZG9tIGtleSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc2VsZWN0IGEgcmFuZG9tXHJcbiAqICBrZXkgZnJvbS4gVGhlIGtleXMgb2YgdGhlIGFycmF5IG11c3QgYmUgY29udGlndW91cy5cclxuICogQHJldHVybiB7TnVtYmVyfSBBIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gMCBhbmRcclxuICogIDxjb2RlPmFyci5sZW5ndGg8L2NvZGU+XHJcbiAqL1xyXG5hdHJvcGEucmFuZG9tLmdldEFycmF5S2V5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCk7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXQgYSByYW5kb20gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNlbGVjdCBhIHJhbmRvbVxyXG4gKiAgdmFsdWUgZnJvbS4gVGhlIGtleXMgb2YgdGhlIGFycmF5IG11c3QgYmUgY29udGlndW91cy5cclxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKi9cclxuYXRyb3BhLnJhbmRvbS5nZXRBcnJheVZhbHVlID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyW2F0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKV07XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmUgYSByYW5kb20gZWxlbWVudCBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gcmVtb3ZlIGEgcmFuZG9tXHJcbiAqICBlbGVtZW50IGZyb20uIFRoZSBrZXlzIG9mIHRoZSBhcnJheSBtdXN0IGJlIGNvbnRpZ3VvdXMuXHJcbiAqIEByZXR1cm4ge01peGVkfSBBIHJhbmRvbSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICovXHJcbmF0cm9wYS5yYW5kb20ucHVsbEFycmF5RWxlbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGssXHJcbiAgICBkO1xyXG4gICAgayA9IGF0cm9wYS5yYW5kb20uZ2V0QXJyYXlLZXkoYXJyKTtcclxuICAgIGQgPSBhcnJba107XHJcbiAgICBhcnIuc3BsaWNlKGssIDEpO1xyXG4gICAgcmV0dXJuIGQ7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmUgYSByYW5kb20gcHJvcGVydHkgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHJlbW92ZSBhIHJhbmRvbVxyXG4gKiAgcHJvcGVydHkgZnJvbS5cclxuICogQHJldHVybiB7TWl4ZWR9IEEgcmFuZG9tIHZhbHVlIGZyb20gdGhlIGdpdmVuIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5yYW5kb20ucHVsbFByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcE5hbWUsXHJcbiAgICBvYmpEYXRhO1xyXG4gICAgcE5hbWUgPSBhdHJvcGEucmFuZG9tLmdldFByb3BlcnR5TmFtZShvYmopO1xyXG4gICAgb2JqRGF0YSA9IG9ialtwTmFtZV07XHJcbiAgICBkZWxldGUgb2JqW3BOYW1lXTtcclxuICAgIHJldHVybiBvYmpEYXRhO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciByZWdleCBmdW5jdGlvbnMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5yZWdleFwiPnRlc3RzPC9hPlxyXG4gKi9cclxuYXRyb3BhLnJlZ2V4ID0ge307XHJcbi8qKlxyXG4gKiBSZWdleCBwYXR0ZXJucy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgUmVnZXggcGF0dGVybnMuXHJcbiAqL1xyXG5hdHJvcGEucmVnZXgucGF0dGVybnMgPSB7XHJcbiAgICAvKiogZmluZHMgcmVwZWF0ZWQgd29yZHMgYW5kIHBocmFzZXMgKi9cclxuICAgIHJlcGVhdGVkV29yZHMgOiAvKFxcYi57Myx9XFxiKVxccyooXFwxKS9nLFxyXG4gICAgLyoqIGZpbmRzIHBhcmFncmFwaCBicmVha3MgKi9cclxuICAgIHBhcmFncmFwaEJyZWFrcyA6IC8oXFxyXFxuXFxyXFxufFxcblxcbnxcXHJcXHIpL2csXHJcbiAgICAvKiogZmluZHMgbGluZSBicmVha3MgKi9cclxuICAgIGxpbmVCcmVha3MgOiAvKFxcclxcbnxcXHJ8XFxuKS9nXHJcbn07XHJcbi8qKlxyXG4gKiBBcHBlbmRzIGNvbW1vbiBwcmVmaXgsIHN1ZmZpeCwgYW5kIHdvcmQgYm91bmRhcnkgcmVnZXggc3RyaW5ncyB0b1xyXG4gKiB0aGUgc3VwcGxpZWQgd29yZC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB3b3JkIFRoZSB3b3JkIHRvIGFwcGVuZCBwcmVmaXggYW5kIHN1ZmZpeCB0b1xyXG4gKiBAcGFyYW0ge0ludGVnZXJ9IHRocmVzaG9sZCBUaGUgd29yZC5sZW5ndGggYXQgd2hpY2ggaXQgZG9lcyBub3RcclxuICogbWFrZSBzZW5zZSB0byBhcHBlbmQgcHJlZml4IGFuZCBzdWZmaXguIERlZmF1bHRzIHRvIDMuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHN1cHBsaWVkIHdvcmQgd2l0aCBwcmVmaXgsIHN1ZmZpeCxcclxuICogYW5kIHdvcmQgYm91bmRhcmllcyBhdHRhY2hlZC4gSWYgdGhlIHdvcmQubGVuZ3RoIHdhcyBub3QgZ3JlYXRlclxyXG4gKiB0aGFuIHRoZSB0aHJlc2hvbGQsIG9ubHkgd29yZCBib3VuZGFyaWVzIGFyZSBhdHRhY2hlZC4gVGhlIHN0cmluZ1xyXG4gKiByZXByZXNlbnRzIGEgUmVnRXggd2hpY2ggc2hvdWxkIHBpY2sgb3V0IG1vc3QgZm9ybXMgb2YgcmVndWxhclxyXG4gKiB3b3Jkcy5cclxuICovXHJcbmF0cm9wYS5yZWdleC5hcHBlbmRQcmVmaXhlc0FuZFN1ZmZpeGVzID0gZnVuY3Rpb24gKHdvcmQsIHRocmVzaG9sZCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcHJlZml4ZXMsXHJcbiAgICBzdWZmaXhlcztcclxuICAgIHByZWZpeGVzID0gJyhwcmV8dW58cmUpPyc7XHJcbiAgICBzdWZmaXhlcyA9ICcoaWZpY2F0aW9ufCcgK1xyXG4gICAgICAgICAgICAgICAgJ3Rpb25hbGx5fCcgK1xyXG4gICAgICAgICAgICAgICAgJ2ljYXRpb258JyArXHJcbiAgICAgICAgICAgICAgICAnaWZpZWR8aXN0aWN8aW5lc3N8JyArXHJcbiAgICAgICAgICAgICAgICAnZmFyZXx0aW9ufGFuY2V8ZW5jZXxsZXNzfGFsbHl8YWJsZXxuZXNzfGl6ZWR8aXNlZHwnICtcclxuICAgICAgICAgICAgICAgICdvdXN8aWZ5fGluZ3xpdHl8ZnVsfGFudHxhdGV8ZXN0fGlzbXxpem18aXN0fCcgK1xyXG4gICAgICAgICAgICAgICAgJ2ljfGFsfGVkfGVyfGV0fGx5fHJzfGlufCcgK1xyXG4gICAgICAgICAgICAgICAgJ3l8c3xyfGQpPyc7XHJcbiAgICBcclxuICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZCA9PT0gdW5kZWZpbmVkID8gMyA6IHRocmVzaG9sZDtcclxuICAgIFxyXG4gICAgaWYgKHdvcmQubGVuZ3RoID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgd29yZCA9ICdcXFxcYicgKyBwcmVmaXhlcyArIHdvcmQgKyBzdWZmaXhlcyArICdcXFxcYic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdvcmQgPSAnXFxcXGIoKScgKyB3b3JkICsgJygpXFxcXGInO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdvcmQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEucmVnZXggPSByZXF1aXJlKCdhdHJvcGEtcmVnZXgnKS5yZWdleDtcclxuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIEEgZmV3IHV0aWxpdGllcyBmb3IgbWFuaXB1bGF0aW5nIHN0cmluZ3MuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIEEgZmV3IHV0aWxpdGllcyBmb3IgbWFuaXB1bGF0aW5nIHN0cmluZ3MuXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEucmVnZXgucGF0dGVybnNcclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEuc3RyaW5nXCI+dGVzdHM8L2E+XHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nID0ge307XHJcbi8qKlxyXG4gKiBSZXBsYWNlcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyB3aXRoIGEgc2luZ2xlIHdvcmQgb3IgcGhyYXNlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIHJlbW92ZSByZXBlYXRlZCB3b3JkcyBmcm9tLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCByZXBlYXRlZCB3b3JkcyBhbmRcclxuICogIHBocmFzZXMgcmVtb3ZlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcucmVtb3ZlUmVwZWF0ZWRXb3JkID0gZnVuY3Rpb24gcmVtb3ZlUmVwZWF0ZWRXb3JkIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5yZXBlYXRlZFdvcmRzLCAnJDEnKTtcclxufTtcclxuLyoqXHJcbiAqIENyZWF0ZXMgcGFyYWdyYXBoIGJyZWFrcyBhdCBldmVyeSBvY2N1cnJlbmNlIG9mIHR3byBjb25zZWN1dGl2ZSBsaW5lIGJyZWFrcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNlcnQgcGFyYWdyYXBoIHRhZ3MgaW50by5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggcGFyYWdyYXBoIGJyZWFrcyBpbnNlcnRlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubGluZUJyZWFrc1RvUGFyYWdyYXBoVGFncyA9IGZ1bmN0aW9uIGxpbmVCcmVha3NUb1BhcmFncmFwaFRhZ3MgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnBhcmFncmFwaEJyZWFrcywgJzwvcD48cD4nKTtcclxuICAgIG91dCA9ICc8cD4nICsgb3V0LnRyaW0oKSArICc8L3A+JztcclxuICAgIG91dCA9IG91dC5yZXBsYWNlKC9cXHMrPFxcLyhwfGJyKT4vZywgJzwvJDE+Jyk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQ3JlYXRlcyBicmVhayB0YWdzIGF0IGV2ZXJ5IGxpbmUgYnJlYWsuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zZXJ0IGJyZWFrIHRhZ3MgaW50by5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggYnJlYWsgdGFncyBpbnNlcnRlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubGluZUJyZWFrc1RvQnJlYWtUYWdzID0gZnVuY3Rpb24gbGluZUJyZWFrc1RvQnJlYWtUYWdzIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCAnPGJyPicpO1xyXG59O1xyXG4vKipcclxuICogTm9ybWFsaXplcyBsaW5lIGJyZWFrcyB0byBgXFxuYC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBub3JtYWxpemUuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIG5vcm1hbGl6ZWQgbGluZSBicmVha3MuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZUVvbCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUVvbCAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgJ1xcbicpO1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIGdpdmVuIHN0cmluZyB0b1xyXG4gKiB1cHBlcmNhc2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgZm9yIHdoaWNoIHlvdSB3YW50IHRoZVxyXG4gKiBmaXJzdCBsZXR0ZXIgdG8gYmUgaW4gdXBwZXIgY2FzZS5cclxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGdpdmVuIHN0cmluZyB3aXRoIGl0J3MgZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy51Y0ZpcnN0ID0gZnVuY3Rpb24gdWNGaXJzdChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgc3RyaW5nID0gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgcmV0dXJuIHN0cmluZztcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBzdHJpbmcgdG8gY2FtZWwgY2FzZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwODIzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjYW1lbGl6ZS5cclxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGNhbWVsaXplZCBzdHJpbmcuXHJcbiAqIEBleGFtcGxlXHJcbiAqICBhdHJvcGEuc3RyaW5nLmNhbWVsaXplKCdnZXQgaXQgdG9nZXRoZXInKTtcclxuICogIC8vIHJldHVybnMgXCJnZXRJdFRvZ2V0aGVyXCJcclxuICovXHJcbmF0cm9wYS5zdHJpbmcuY2FtZWxpemUgPSBmdW5jdGlvbiBjYW1lbGl6ZSAoc3RyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBhcnIsIG91dDtcclxuICAgIGFyciA9IHN0ci5zcGxpdCgnICcpO1xyXG4gICAgb3V0ID0gYXJyLnNoaWZ0KCk7XHJcbiAgICBhcnIgPSBhcnIubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5zdHJpbmcudWNGaXJzdChpdGVtKTtcclxuICAgIH0pO1xyXG4gICAgb3V0ICs9IGFyci5qb2luKCcnKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBDb3VudHMgd29yZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gc29tZVRleHQgUGxhaW4gdGV4dC5cclxuICogQHJldHVybiB7TnVtYmVyfSBSZXR1cm5zIHRoZSBjb3VudCBvZiB3b3JkcyBpbiBzb21lVGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuY291bnRXb3JkcyA9IGZ1bmN0aW9uIGNvdW50V29yZHMoc29tZVRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHdvcmRDb3VudCwgcmUsIGxlbiA9IDA7XHJcbiAgICBpZihzb21lVGV4dCAhPT0gdW5kZWZpbmVkICYmIHNvbWVUZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgc29tZVRleHQgPSBzb21lVGV4dC50cmltKCk7XHJcbiAgICAgICAgaWYoc29tZVRleHQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHJlID0gL1xccysvZ2k7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IHNvbWVUZXh0LnNwbGl0KHJlKTtcclxuICAgICAgICAgICAgbGVuID0gd29yZENvdW50Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVuO1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgZW5kIG9mIGxpbmUgbWFya2VycyBpbnRvIHdoYXRldmVyIHlvdSB3YW50LiBcclxuICogQXV0b21hdGljYWxseSBkZXRlY3RzIGFueSBvZiBcXHJcXG4sIFxcbiwgb3IgXFxyIGFuZCBcclxuICogcmVwbGFjZXMgaXQgd2l0aCB0aGUgdXNlciBzcGVjaWZpZWQgRU9MIG1hcmtlci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHlvdSB3YW50IHByb2Nlc3NlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IG5ld0VPTCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBjdXJyZW50IEVPTCBtYXJrcy5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmNvbnZlcnRFb2wgPSBmdW5jdGlvbiBjb252ZXJ0RU9MKHRleHQsIG5ld0VPTCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgbmV3RU9MKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGEgcXVhbnRpdHkgb2YgbGVhZGluZyBzcGFjZXMgc3BlY2lmaWVkIGJ5IG9mZnNldC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3MuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgVGhlIGFtb3VudCBvZiBzcGFjZXMgeW91IHdhbnQgcmVtb3ZlZCBcclxuICogZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0ZXh0LlxyXG4gKiBAcmV0dXJucyBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcub2Zmc2V0V2hpdGVTcGFjZSA9IGZ1bmN0aW9uIG9mZnNldFdoaXRlU3BhY2UodGV4dCwgb2Zmc2V0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgcmVneDtcclxuICAgIHJlZ3ggPSBuZXcgUmVnRXhwKCdeIHsnICsgb2Zmc2V0ICsgJ30nKTtcclxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVneCwgJycpO1xyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYWxsIHRhYnMgaW4gbGVhZGluZyB3aGl0ZXNwYWNlIGludG8gZm91ciBzcGFjZXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVXaGl0ZVNwYWNlUHJlZml4ID0gZnVuY3Rpb24gbm9ybWFsaXplV2hpdGVTcGFjZVByZWZpeChcclxuICAgIHRleHRcclxuKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgcHJlZml4ID0gdGV4dC5tYXRjaCgvXlxccyovKTtcclxuICAgIGlmKHByZWZpeCkge1xyXG4gICAgICAgIHByZWZpeCA9IHByZWZpeFswXTtcclxuICAgICAgICBwcmVmaXggPSBwcmVmaXgucmVwbGFjZSgvXFx0L2csICcgICAgJyk7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxccyovLCBwcmVmaXgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYWxsIHRhYnMgaW50byBmb3VyIHNwYWNlcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3NcclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZVdoaXRlU3BhY2UgPSBmdW5jdGlvbiBub3JtYWxpemVXaGl0ZVNwYWNlKHRleHQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpO1xyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ291bnRzIHRoZSBudW1iZXIgb2YgbGVhZGluZyBzcGFjZSBvciB0YWIgY2hhcmFjdGVycyBidXQgbm90IGJvdGguXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBhbmFseXplLlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBvciB0YWJzLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQodGV4dCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIG9mZnNldCA9IDAsXHJcbiAgICAgICAgbGVhZGluZ0NoYXIgPSB0ZXh0LmNoYXJBdCgwKTtcclxuICAgICAgICBcclxuICAgIGlmKCBsZWFkaW5nQ2hhciA9PT0gJyAnIHx8IGxlYWRpbmdDaGFyID09PSAnXFx0Jykge1xyXG4gICAgICAgIHdoaWxlKHRleHQuY2hhckF0KG9mZnNldCkgPT09IGxlYWRpbmdDaGFyICYmIG9mZnNldCA8IHRleHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvZmZzZXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBCcmVha3MgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB3b3Jkcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgd29yZHMgaW5cclxuICogIHRoZSBnaXZlbiB0ZXh0LlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmdldFdvcmRzID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IFtdO1xyXG4gICAgZnVuY3Rpb24gaW52YWxpZENoYXJzKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgbWF0Y2hlZCA9IC9eW1xcLSfigJlgXSskLy50ZXN0KGVsZW1lbnQpO1xyXG4gICAgICAgIC8vIGludmVydCB0aGUgcmVzdWx0IG9mIHRlc3QuIHRocm93IG91dCBlbGVtZW50cyB0aGF0IG1hdGNoLlxyXG4gICAgICAgIHJldHVybiAhbWF0Y2hlZDtcclxuICAgIH1cclxuICAgIG91dCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyhcclxuICAgICAgICB0ZXh0LnNwbGl0KC9bXkEtWmEtelxcLSfigJlgXSsvZ2kpXHJcbiAgICApO1xyXG4gICAgb3V0ID0gb3V0LmZpbHRlcihpbnZhbGlkQ2hhcnMpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIEVzY2FwZXMgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zIGluIHRleHRcclxuICogIHNvIHRoYXQgdGhlIHRleHQgbWF5IGJlIGVtYmVkZGVkIGludG8gYSBcclxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBydW5cclxuICogIG9uIGFueSB0ZXh0IHdoaWNoIG1heSBjb250YWluIHRoZSBzdHJpbmcgXHJcbiAqICA8Y29kZT5dXT48L2NvZGU+IHNpbmNlIHNhaWQgc3RyaW5nIHdpbGwgZWZmZWN0aXZlbHlcclxuICogIGVuZCB0aGUgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb24gcHJlbWF0dXJlbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCBjb250YWluaW5nIFxyXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zIHRvIGVzY2FwZS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgc3RyaW5nIHdpdGggZXNjYXBlZFxyXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3RpbmdcIj5cclxuICogIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ0RBVEEjTmVzdGluZzwvYT5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTgxNjhcIj5cclxuICogIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTk4MTY4PC9hPlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5lc2NhcGVDZGF0YSA9IGZ1bmN0aW9uIGVzY2FwZUNkYXRhKHRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIFN0cmluZyh0ZXh0KS5yZXBsYWNlKC9cXF1cXF0+L2csICddXV1dPjwhW0NEQVRBWz4nKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIl19
;