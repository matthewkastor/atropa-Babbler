
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary></summary>
        /// <field name="data" type="">Container for gobal data related to the classes and functions.</field>
        /// <field name="random" type="">Provides random strings and numbers.</field>
        /// <field name="string" type="">A few utilities for manipulating strings.</field>
        /// <returns type="atropa"/>
                
        supportCheck: function(className, errorMessage) {
            /// <summary>Checks whether this class has been marked as unsupported and throws an 
            ///  error if it has.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="errorMessage" type="String">Optional. A custom error message. Defaults to
            ///  atropa.data[className].error</param>
        }, 
        
        requires: function(className, requirementFn, errorMessage) {
            /// <summary>Pushes a requirement check into atropa.data.requirements. The test
            ///  tests whether the class is supported in this environment. Sets
            ///  atropa.data[className]&apos;s support to unsupported and error to errorMessage
            ///  if the requirementFn returns false. The requirement checks will all be run
            ///  after the library has loaded.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="requirementFn" type="Function">A function to test whether or not the class
            ///  is supported in this environment. If supported, returns true otherwise
            ///  return false.</param>
            /// <param name="errorMessage" type="String">The error message to use when this class or its
            ///  methods are called in unsupported environments. Defaults to:
            ///  &apos;The atropa.&apos; + className + &apos; class is unsupported in this environment.&apos;;</param>
        }
        
    };

    var $x = window.atropa;
    $x.__namespace = "true";
    $x.__typeName = "atropa";
})(this);

  

  
  
/* vsdoc for atropa.Babbler */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.Babbler = function(wrdCount){
        /// <summary></summary>
        /// <param name="wrdCount" type="Number">The amount of &quot;words&quot; you would like
        /// the babbler to produce.</param>
        /// <returns type="atropa.Babbler"/>
    };

    var $x = window.atropa.Babbler;
    $x.prototype = {
                
        setWordCount: function(wrdCount) {
            /// <summary>Sets the word count.</summary>
            /// <param name="wrdCount" type="Number">The amount of &quot;words&quot; which you want the
            /// babbler to produce.</param>
            /// <returns type="Number">Returns the set word count for this babbler.</returns>
        }, 
        
        resetWordCount: function(wordCount) {
            /// <summary>Resets the word count for this babbler.</summary>
            /// <param name="wordCount" type="Number">The amount of &quot;words&quot; you would like
            /// to set for this babbler.</param>
            /// <returns type="Number">Returns the set word count for this babbler.</returns>
        }, 
        
        getWordCount: function() {
            /// <summary>Gets the current word count.</summary>
            /// <returns type="Number">Returns the word count for this babbler.</returns>
        }, 
        
        generateWord: function(stringMin, stringMax) {
            /// <summary>Generates a word with a specified length. Lowers the word count by one.</summary>
            /// <param name="stringMin" type="Number">the shortest word, in characters.</param>
            /// <param name="stringMax" type="Number">The longest word, in characters.</param>
            /// <returns type="String">Returns a random string of characters
            /// within the specified range of length.</returns>
        }, 
        
        punctuate: function() {
            /// <summary>Provides random punctuation.</summary>
            /// <returns type="String">Returns a random punctuation
            /// character ( . ! or ? ).</returns>
        }, 
        
        generateSentence: function(sentenceMin, sentenceMax) {
            /// <summary>Generates a sentence of specified length in words. The quantity
            ///  of words in the generated sentence will be between the minimum
            ///  and maximum set, with the maximum capped at the current words
            ///  count. The word count will be lowered by the
            ///  quantity of words in the generated sentence. If the word count
            ///  is 0 then there will be no words in the sentence. If the word
            ///  count is 3 then the maximum possible number of words in the
            ///  sentence will be three.</summary>
            /// <param name="sentenceMin" type="Number">The shortest sentence, in words,
            /// you would like returned.</param>
            /// <param name="sentenceMax" type="Number">The longest sentence, in words,
            /// you would like returned.</param>
            /// <returns type="String">Returns a &quot;sentence&quot; within the specified
            /// range of length.</returns>
        }, 
        
        setBabble: function(babbleString) {
            /// <summary>Sets the babble.</summary>
            /// <param name="babbleString" type="String">Specified babble to set.</param>
            /// <returns type="String">Returns the stored babble.</returns>
        }, 
        
        resetBabble: function() {
            /// <summary>Clears the stored babble.</summary>
            /// <returns type="String">Returns the stored babble.</returns>
        }, 
        
        getBabble: function() {
            /// <summary>Gets the last generated babble.</summary>
            /// <returns type="String">Returns the stored babble.</returns>
        }, 
        
        generateBabble: function(wordsCt) {
            /// <summary>Generates babble to a user specified length in words.
            ///  The word count will be zero after this and the stored
            ///  babble will be set to the generated babble.</summary>
            /// <param name="wordsCt" type="Number">The desired word count for the
            /// generated babble.</param>
            /// <returns type="String">Returns babble of specified length in words.</returns>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.Babbler";
})(this);


  
/* vsdoc for atropa.data */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.data = {
        /// <summary></summary>
        /// <returns type="atropa.data"/>
                
    };

    var $x = window.atropa.data;
    $x.__namespace = "true";
    $x.__typeName = "atropa.data";
})(this);

  

  
/* vsdoc for atropa.random */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.random = {
        /// <summary></summary>
        /// <returns type="atropa.random"/>
                
        string: function(stringLength, characterClass) {
            /// <summary>Gives you a random string whose length and characters you specify.</summary>
            /// <param name="stringLength" type="Number">This is the length of the string.</param>
            /// <param name="characterClass" type="String">Optional. May be one of:
            ///  numeric, caps, lower, alpha, alphanumeric, punctuation, vowel, consonant
            ///  This is the type of characters you want returned to you. Defaults to
            ///  alphanumeric.</param>
            /// <returns type="String">A random string of specified length and composition.</returns>
        }, 
        
        integer: function(min, max) {
            /// <summary>Generates a random number between the specified min and max value.</summary>
            /// <param name="min" type="Number">The lowest number you want returned</param>
            /// <param name="max" type="Number">The highest number you want returned</param>
            /// <returns type="Number">A random number within the specified range.</returns>
        }, 
        
        getPropertyName: function(obj) {
            /// <summary>Get a random property name from the given object.</summary>
            /// <param name="obj" type="Object">The object to select a random
            ///  property name from.</param>
            /// <returns type="String">A random property name from the
            ///  given object.</returns>
        }, 
        
        getArrayKey: function(arr) {
            /// <summary>Get a random key from the given array.</summary>
            /// <param name="arr" type="Array">The array to select a random
            ///  key from. The keys of the array must be contiguous.</param>
            /// <returns type="Number">A random integer between 0 and
            ///  &lt;code&gt;arr.length&lt;/code&gt;</returns>
        }, 
        
        getArrayValue: function(arr) {
            /// <summary>Get a random value from the given array.</summary>
            /// <param name="arr" type="Array">The array to select a random
            ///  value from. The keys of the array must be contiguous.</param>
            /// <returns type="Mixed">A random value from the given array.</returns>
        }, 
        
        pullArrayElement: function(arr) {
            /// <summary>Remove a random element from the given array.</summary>
            /// <param name="arr" type="Array">The array to remove a random
            ///  element from. The keys of the array must be contiguous.</param>
            /// <returns type="Mixed">A random value from the given array.</returns>
        }, 
        
        pullProperty: function(obj) {
            /// <summary>Remove a random property from the given object.</summary>
            /// <param name="obj" type="Object">The object to remove a random
            ///  property from.</param>
            /// <returns type="Mixed">A random value from the given object.</returns>
        }
        
    };

    var $x = window.atropa.random;
    $x.__namespace = "true";
    $x.__typeName = "atropa.random";
})(this);

  

  
/* vsdoc for atropa.string */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.string = {
        /// <summary></summary>
        /// <returns type="atropa.string"/>
                
        removeRepeatedWord: function(string) {
            /// <summary>Replaces repeated words and phrases with a single word or phrase.</summary>
            /// <param name="string" type="String">The string to remove repeated words from.</param>
            /// <returns type="String">Returns the given string with repeated words and
            ///  phrases removed.</returns>
        }, 
        
        lineBreaksToParagraphTags: function(string) {
            /// <summary>Creates paragraph breaks at every occurrence of two consecutive line breaks.</summary>
            /// <param name="string" type="String">The string to insert paragraph tags into.</param>
            /// <returns type="String">Returns the given string with paragraph breaks inserted.</returns>
        }, 
        
        lineBreaksToBreakTags: function(string) {
            /// <summary>Creates break tags at every line break.</summary>
            /// <param name="string" type="String">The string to insert break tags into.</param>
            /// <returns type="String">Returns the given string with break tags inserted.</returns>
        }, 
        
        normalizeEol: function(string) {
            /// <summary>Normalizes line breaks to `\n`.</summary>
            /// <param name="string" type="String">The string to normalize.</param>
            /// <returns type="String">Returns the given string with normalized line breaks.</returns>
        }, 
        
        ucFirst: function(string) {
            /// <summary>Converts the first character of a given string to
            /// uppercase.</summary>
            /// <param name="string" type="String">The string for which you want the
            /// first letter to be in upper case.</param>
            /// <returns type="String">The given string with it&apos;s first letter capitalized.</returns>
        }, 
        
        camelize: function(string) {
            /// <summary>Converts the given string to camel case.</summary>
            /// <param name="string" type="String">The string to camelize.</param>
            /// <returns type="String">The camelized string.</returns>
        }, 
        
        countWords: function(someText) {
            /// <summary>Counts words.</summary>
            /// <param name="someText" type="String">Plain text.</param>
            /// <returns type="Number">Returns the count of words in someText.</returns>
        }, 
        
        convertEol: function(text, newEOL) {
            /// <summary>Converts end of line markers into whatever you want. 
            /// Automatically detects any of \r\n, \n, or \r and 
            /// replaces it with the user specified EOL marker.</summary>
            /// <param name="text" type="String">The text you want processed.</param>
            /// <param name="newEOL" type="String">The replacement for the current EOL marks.</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        offsetWhiteSpace: function(text, offset) {
            /// <summary>Removes a quantity of leading spaces specified by offset.</summary>
            /// <param name="text" type="String">The text to process.</param>
            /// <param name="offset" type="Number">The amount of spaces you want removed 
            /// from the beginning of the text.</param>
            /// <returns type="">Returns the processed text.</returns>
        }, 
        
        normalizeWhiteSpacePrefix: function(text) {
            /// <summary>Converts all tabs in leading whitespace into four spaces.</summary>
            /// <param name="text" type="String">The text to process</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        normalizeWhiteSpace: function(text) {
            /// <summary>Converts all tabs into four spaces.</summary>
            /// <param name="text" type="String">The text to process</param>
            /// <returns type="String">Returns the processed text.</returns>
        }, 
        
        getOffset: function(text) {
            /// <summary>Counts the number of leading space or tab characters but not both.</summary>
            /// <param name="text" type="String">The text to analyze.</param>
            /// <returns type="Number">Returns the quantity of leading spaces or tabs.</returns>
        }, 
        
        getWords: function(text) {
            /// <summary>Breaks a string into an array of words.</summary>
            /// <param name="text" type="String">The text to analyze.</param>
            /// <returns type="Array">Returns an array of the words in
            ///  the given text.</returns>
        }, 
        
        escapeCdata: function(text) {
            /// <summary>Escapes &lt;code&gt;CDATA&lt;/code&gt; sections in text
            ///  so that the text may be embedded into a 
            ///  &lt;code&gt;CDATA&lt;/code&gt; section. This should be run
            ///  on any text which may contain the string 
            ///  &lt;code&gt;]]>&lt;/code&gt; since said string will effectively
            ///  end the &lt;code&gt;CDATA&lt;/code&gt; section prematurely.</summary>
            /// <param name="text" type="String">The text containing 
            ///  &lt;code&gt;CDATA&lt;/code&gt; sections to escape.</param>
            /// <returns type="Array">Returns a string with escaped
            ///  &lt;code&gt;CDATA&lt;/code&gt; sections.</returns>
        }
        
    };

    var $x = window.atropa.string;
    $x.__namespace = "true";
    $x.__typeName = "atropa.string";
})(this);

  

