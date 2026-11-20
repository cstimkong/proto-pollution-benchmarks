(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JSC = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var justCurryIt$1 = curry$b;

	/*
	  function add(a, b, c) {
	    return a + b + c;
	  }
	  curry(add)(1)(2)(3); // 6
	  curry(add)(1)(2)(2); // 5
	  curry(add)(2)(4, 3); // 9

	  function add(...args) {
	    return args.reduce((sum, n) => sum + n, 0)
	  }
	  var curryAdd4 = curry(add, 4)
	  curryAdd4(1)(2, 3)(4); // 10

	  function converter(ratio, input) {
	    return (input*ratio).toFixed(1);
	  }
	  const curriedConverter = curry(converter)
	  const milesToKm = curriedConverter(1.62);
	  milesToKm(35); // 56.7
	  milesToKm(10); // 16.2
	*/

	function curry$b(fn, arity) {
	  return function curried() {
	    if (arity == null) {
	      arity = fn.length;
	    }
	    var args = [].slice.call(arguments);
	    if (args.length >= arity) {
	      return fn.apply(this, args);
	    } else {
	      return function() {
	        return curried.apply(this, args.concat([].slice.call(arguments)));
	      };
	    }
	  };
	}

	var pubsub = {exports: {}};

	/**
	 * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
	 * License: MIT - http://mrgnrdrck.mit-license.org
	 *
	 * https://github.com/mroderick/PubSubJS
	 */

	(function (module, exports) {
		(function (root, factory){

		    var PubSub = {};

		    if (root.PubSub) {
		        PubSub = root.PubSub;
		        console.warn("PubSub already loaded, using existing version");
		    } else {
		        root.PubSub = PubSub;
		        factory(PubSub);
		    }
		    // CommonJS and Node.js module support
		    {
		        if (module !== undefined && module.exports) {
		            exports = module.exports = PubSub; // Node.js specific `module.exports`
		        }
		        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec
		        module.exports = exports = PubSub; // CommonJS
		    }

		}(( typeof window === 'object' && window ) || commonjsGlobal, function (PubSub){

		    var messages = {},
		        lastUid = -1,
		        ALL_SUBSCRIBING_MSG = '*';

		    function hasKeys(obj){
		        var key;

		        for (key in obj){
		            if ( Object.prototype.hasOwnProperty.call(obj, key) ){
		                return true;
		            }
		        }
		        return false;
		    }

		    /**
		     * Returns a function that throws the passed exception, for use as argument for setTimeout
		     * @alias throwException
		     * @function
		     * @param { Object } ex An Error object
		     */
		    function throwException( ex ){
		        return function reThrowException(){
		            throw ex;
		        };
		    }

		    function callSubscriberWithDelayedExceptions( subscriber, message, data ){
		        try {
		            subscriber( message, data );
		        } catch( ex ){
		            setTimeout( throwException( ex ), 0);
		        }
		    }

		    function callSubscriberWithImmediateExceptions( subscriber, message, data ){
		        subscriber( message, data );
		    }

		    function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
		        var subscribers = messages[matchedMessage],
		            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
		            s;

		        if ( !Object.prototype.hasOwnProperty.call( messages, matchedMessage ) ) {
		            return;
		        }

		        for (s in subscribers){
		            if ( Object.prototype.hasOwnProperty.call(subscribers, s)){
		                callSubscriber( subscribers[s], originalMessage, data );
		            }
		        }
		    }

		    function createDeliveryFunction( message, data, immediateExceptions ){
		        return function deliverNamespaced(){
		            var topic = String( message ),
		                position = topic.lastIndexOf( '.' );

		            // deliver the message as it is now
		            deliverMessage(message, message, data, immediateExceptions);

		            // trim the hierarchy and deliver message to each level
		            while( position !== -1 ){
		                topic = topic.substr( 0, position );
		                position = topic.lastIndexOf('.');
		                deliverMessage( message, topic, data, immediateExceptions );
		            }

		            deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);
		        };
		    }

		    function hasDirectSubscribersFor( message ) {
		        var topic = String( message ),
		            found = Boolean(Object.prototype.hasOwnProperty.call( messages, topic ) && hasKeys(messages[topic]));

		        return found;
		    }

		    function messageHasSubscribers( message ){
		        var topic = String( message ),
		            found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG),
		            position = topic.lastIndexOf( '.' );

		        while ( !found && position !== -1 ){
		            topic = topic.substr( 0, position );
		            position = topic.lastIndexOf( '.' );
		            found = hasDirectSubscribersFor(topic);
		        }

		        return found;
		    }

		    function publish( message, data, sync, immediateExceptions ){
		        message = (typeof message === 'symbol') ? message.toString() : message;

		        var deliver = createDeliveryFunction( message, data, immediateExceptions ),
		            hasSubscribers = messageHasSubscribers( message );

		        if ( !hasSubscribers ){
		            return false;
		        }

		        if ( sync === true ){
		            deliver();
		        } else {
		            setTimeout( deliver, 0 );
		        }
		        return true;
		    }

		    /**
		     * Publishes the message, passing the data to it's subscribers
		     * @function
		     * @alias publish
		     * @param { String } message The message to publish
		     * @param {} data The data to pass to subscribers
		     * @return { Boolean }
		     */
		    PubSub.publish = function( message, data ){
		        return publish( message, data, false, PubSub.immediateExceptions );
		    };

		    /**
		     * Publishes the message synchronously, passing the data to it's subscribers
		     * @function
		     * @alias publishSync
		     * @param { String } message The message to publish
		     * @param {} data The data to pass to subscribers
		     * @return { Boolean }
		     */
		    PubSub.publishSync = function( message, data ){
		        return publish( message, data, true, PubSub.immediateExceptions );
		    };

		    /**
		     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe
		     * @function
		     * @alias subscribe
		     * @param { String } message The message to subscribe to
		     * @param { Function } func The function to call when a new message is published
		     * @return { String }
		     */
		    PubSub.subscribe = function( message, func ){
		        if ( typeof func !== 'function'){
		            return false;
		        }

		        message = (typeof message === 'symbol') ? message.toString() : message;

		        // message is not registered yet
		        if ( !Object.prototype.hasOwnProperty.call( messages, message ) ){
		            messages[message] = {};
		        }

		        // forcing token as String, to allow for future expansions without breaking usage
		        // and allow for easy use as key names for the 'messages' object
		        var token = 'uid_' + String(++lastUid);
		        messages[message][token] = func;

		        // return token for unsubscribing
		        return token;
		    };

		    PubSub.subscribeAll = function( func ){
		        return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);
		    };

		    /**
		     * Subscribes the passed function to the passed message once
		     * @function
		     * @alias subscribeOnce
		     * @param { String } message The message to subscribe to
		     * @param { Function } func The function to call when a new message is published
		     * @return { PubSub }
		     */
		    PubSub.subscribeOnce = function( message, func ){
		        var token = PubSub.subscribe( message, function(){
		            // before func apply, unsubscribe message
		            PubSub.unsubscribe( token );
		            func.apply( this, arguments );
		        });
		        return PubSub;
		    };

		    /**
		     * Clears all subscriptions
		     * @function
		     * @public
		     * @alias clearAllSubscriptions
		     */
		    PubSub.clearAllSubscriptions = function clearAllSubscriptions(){
		        messages = {};
		    };

		    /**
		     * Clear subscriptions by the topic
		     * @function
		     * @public
		     * @alias clearAllSubscriptions
		     * @return { int }
		     */
		    PubSub.clearSubscriptions = function clearSubscriptions(topic){
		        var m;
		        for (m in messages){
		            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){
		                delete messages[m];
		            }
		        }
		    };

		    /**
		       Count subscriptions by the topic
		     * @function
		     * @public
		     * @alias countSubscriptions
		     * @return { Array }
		    */
		    PubSub.countSubscriptions = function countSubscriptions(topic){
		        var m;
		        // eslint-disable-next-line no-unused-vars
		        var token;
		        var count = 0;
		        for (m in messages) {
		            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
		                for (token in messages[m]) {
		                    count++;
		                }
		                break;
		            }
		        }
		        return count;
		    };


		    /**
		       Gets subscriptions by the topic
		     * @function
		     * @public
		     * @alias getSubscriptions
		    */
		    PubSub.getSubscriptions = function getSubscriptions(topic){
		        var m;
		        var list = [];
		        for (m in messages){
		            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){
		                list.push(m);
		            }
		        }
		        return list;
		    };

		    /**
		     * Removes subscriptions
		     *
		     * - When passed a token, removes a specific subscription.
		     *
			 * - When passed a function, removes all subscriptions for that function
		     *
			 * - When passed a topic, removes all subscriptions for that topic (hierarchy)
		     * @function
		     * @public
		     * @alias subscribeOnce
		     * @param { String | Function } value A token, function or topic to unsubscribe from
		     * @example // Unsubscribing with a token
		     * var token = PubSub.subscribe('mytopic', myFunc);
		     * PubSub.unsubscribe(token);
		     * @example // Unsubscribing with a function
		     * PubSub.unsubscribe(myFunc);
		     * @example // Unsubscribing from a topic
		     * PubSub.unsubscribe('mytopic');
		     */
		    PubSub.unsubscribe = function(value){
		        var descendantTopicExists = function(topic) {
		                var m;
		                for ( m in messages ){
		                    if ( Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0 ){
		                        // a descendant of the topic exists:
		                        return true;
		                    }
		                }

		                return false;
		            },
		            isTopic    = typeof value === 'string' && ( Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value) ),
		            isToken    = !isTopic && typeof value === 'string',
		            isFunction = typeof value === 'function',
		            result = false,
		            m, message, t;

		        if (isTopic){
		            PubSub.clearSubscriptions(value);
		            return;
		        }

		        for ( m in messages ){
		            if ( Object.prototype.hasOwnProperty.call( messages, m ) ){
		                message = messages[m];

		                if ( isToken && message[value] ){
		                    delete message[value];
		                    result = value;
		                    // tokens are unique, so we can just stop here
		                    break;
		                }

		                if (isFunction) {
		                    for ( t in message ){
		                        if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value){
		                            delete message[t];
		                            result = true;
		                        }
		                    }
		                }
		            }
		        }

		        return result;
		    };
		}));
	} (pubsub, pubsub.exports));

	var uri_all = {exports: {}};

	/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */

	(function (module, exports) {
		(function (global, factory) {
			factory(exports) ;
		}(commonjsGlobal, (function (exports) {
		function merge() {
		    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
		        sets[_key] = arguments[_key];
		    }

		    if (sets.length > 1) {
		        sets[0] = sets[0].slice(0, -1);
		        var xl = sets.length - 1;
		        for (var x = 1; x < xl; ++x) {
		            sets[x] = sets[x].slice(1, -1);
		        }
		        sets[xl] = sets[xl].slice(1);
		        return sets.join('');
		    } else {
		        return sets[0];
		    }
		}
		function subexp(str) {
		    return "(?:" + str + ")";
		}
		function typeOf(o) {
		    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
		}
		function toUpperCase(str) {
		    return str.toUpperCase();
		}
		function toArray(obj) {
		    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
		}
		function assign(target, source) {
		    var obj = target;
		    if (source) {
		        for (var key in source) {
		            obj[key] = source[key];
		        }
		    }
		    return obj;
		}

		function buildExps(isIRI) {
		    var ALPHA$$ = "[A-Za-z]",
		        DIGIT$$ = "[0-9]",
		        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
		        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
		        //expanded
		    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
		        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
		        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
		        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
		        //subset, excludes bidi control characters
		    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
		        //subset
		    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$);
		        subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*");
		        subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*");
		        var DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
		        //relaxed parsing rules
		    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
		        H16$ = subexp(HEXDIG$$ + "{1,4}"),
		        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
		        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
		        //                           6( h16 ":" ) ls32
		    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
		        //                      "::" 5( h16 ":" ) ls32
		    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
		        //[               h16 ] "::" 4( h16 ":" ) ls32
		    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
		        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
		    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
		        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
		    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
		        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
		    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
		        //[ *4( h16 ":" ) h16 ] "::"              ls32
		    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
		        //[ *5( h16 ":" ) h16 ] "::"              h16
		    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
		        //[ *6( h16 ":" ) h16 ] "::"
		    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
		        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+");
		        //RFC 6874, with relaxed parsing rules
		    subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+");
		        //RFC 6874
		    subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*");
		        var PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]"));
		        subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+");
		        subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*");
		    return {
		        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
		        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
		        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
		        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
		        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
		        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
		        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
		        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
		        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
		        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
		        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
		        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
		        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
		    };
		}
		var URI_PROTOCOL = buildExps(false);

		var IRI_PROTOCOL = buildExps(true);

		var slicedToArray = function () {
		  function sliceIterator(arr, i) {
		    var _arr = [];
		    var _n = true;
		    var _d = false;
		    var _e = undefined;

		    try {
		      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
		        _arr.push(_s.value);

		        if (i && _arr.length === i) break;
		      }
		    } catch (err) {
		      _d = true;
		      _e = err;
		    } finally {
		      try {
		        if (!_n && _i["return"]) _i["return"]();
		      } finally {
		        if (_d) throw _e;
		      }
		    }

		    return _arr;
		  }

		  return function (arr, i) {
		    if (Array.isArray(arr)) {
		      return arr;
		    } else if (Symbol.iterator in Object(arr)) {
		      return sliceIterator(arr, i);
		    } else {
		      throw new TypeError("Invalid attempt to destructure non-iterable instance");
		    }
		  };
		}();













		var toConsumableArray = function (arr) {
		  if (Array.isArray(arr)) {
		    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

		    return arr2;
		  } else {
		    return Array.from(arr);
		  }
		};

		/** Highest positive signed 32-bit float value */

		var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		var base = 36;
		var tMin = 1;
		var tMax = 26;
		var skew = 38;
		var damp = 700;
		var initialBias = 72;
		var initialN = 128; // 0x80
		var delimiter = '-'; // '\x2D'

		/** Regular expressions */
		var regexPunycode = /^xn--/;
		var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
		var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

		/** Error messages */
		var errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		};

		/** Convenience shortcuts */
		var baseMinusTMin = base - tMin;
		var floor = Math.floor;
		var stringFromCharCode = String.fromCharCode;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error$1(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var result = [];
			var length = array.length;
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			while (counter < length) {
				var value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// It's a high surrogate, and there is a next character.
					var extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) {
						// Low surrogate.
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// It's an unmatched surrogate; only append this code unit, in case the
						// next code unit is the high surrogate of a surrogate pair.
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		var ucs2encode = function ucs2encode(array) {
			return String.fromCodePoint.apply(String, toConsumableArray(array));
		};

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		var basicToDigit = function basicToDigit(codePoint) {
			if (codePoint - 0x30 < 0x0A) {
				return codePoint - 0x16;
			}
			if (codePoint - 0x41 < 0x1A) {
				return codePoint - 0x41;
			}
			if (codePoint - 0x61 < 0x1A) {
				return codePoint - 0x61;
			}
			return base;
		};

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		var digitToBasic = function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		};

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		var adapt = function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		};

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		var decode = function decode(input) {
			// Don't use UCS-2.
			var output = [];
			var inputLength = input.length;
			var i = 0;
			var n = initialN;
			var bias = initialBias;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			var basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (var j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error$1('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				var oldi = i;
				for (var w = 1, k = base;; /* no condition */k += base) {

					if (index >= inputLength) {
						error$1('invalid-input');
					}

					var digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error$1('overflow');
					}

					i += digit * w;
					var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

					if (digit < t) {
						break;
					}

					var baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error$1('overflow');
					}

					w *= baseMinusT;
				}

				var out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error$1('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output.
				output.splice(i++, 0, n);
			}

			return String.fromCodePoint.apply(String, output);
		};

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		var encode = function encode(input) {
			var output = [];

			// Convert the input in UCS-2 to an array of Unicode code points.
			input = ucs2decode(input);

			// Cache the length.
			var inputLength = input.length;

			// Initialize the state.
			var n = initialN;
			var delta = 0;
			var bias = initialBias;

			// Handle the basic code points.
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _currentValue2 = _step.value;

					if (_currentValue2 < 0x80) {
						output.push(stringFromCharCode(_currentValue2));
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			var basicLength = output.length;
			var handledCPCount = basicLength;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string with a delimiter unless it's empty.
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				var m = maxInt;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var currentValue = _step2.value;

						if (currentValue >= n && currentValue < m) {
							m = currentValue;
						}
					}

					// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
					// but guard against overflow.
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				var handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error$1('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var _currentValue = _step3.value;

						if (_currentValue < n && ++delta > maxInt) {
							error$1('overflow');
						}
						if (_currentValue == n) {
							// Represent delta as a generalized variable-length integer.
							var q = delta;
							for (var k = base;; /* no condition */k += base) {
								var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
								if (q < t) {
									break;
								}
								var qMinusT = q - t;
								var baseMinusT = base - t;
								output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
								q = floor(qMinusT / baseMinusT);
							}

							output.push(stringFromCharCode(digitToBasic(q, 0)));
							bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
							delta = 0;
							++handledCPCount;
						}
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}

				++delta;
				++n;
			}
			return output.join('');
		};

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		var toUnicode = function toUnicode(input) {
			return mapDomain(input, function (string) {
				return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
			});
		};

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		var toASCII = function toASCII(input) {
			return mapDomain(input, function (string) {
				return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
			});
		};

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		var punycode = {
			/**
		  * A string representing the current Punycode.js version number.
		  * @memberOf punycode
		  * @type String
		  */
			'version': '2.1.0',
			/**
		  * An object of methods to convert from JavaScript's internal character
		  * representation (UCS-2) to Unicode code points, and back.
		  * @see <https://mathiasbynens.be/notes/javascript-encoding>
		  * @memberOf punycode
		  * @type Object
		  */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/**
		 * URI.js
		 *
		 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
		 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
		 * @see http://github.com/garycourt/uri-js
		 */
		/**
		 * Copyright 2011 Gary Court. All rights reserved.
		 *
		 * Redistribution and use in source and binary forms, with or without modification, are
		 * permitted provided that the following conditions are met:
		 *
		 *    1. Redistributions of source code must retain the above copyright notice, this list of
		 *       conditions and the following disclaimer.
		 *
		 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
		 *       of conditions and the following disclaimer in the documentation and/or other materials
		 *       provided with the distribution.
		 *
		 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
		 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
		 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
		 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
		 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
		 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
		 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
		 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
		 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		 *
		 * The views and conclusions contained in the software and documentation are those of the
		 * authors and should not be interpreted as representing official policies, either expressed
		 * or implied, of Gary Court.
		 */
		var SCHEMES = {};
		function pctEncChar(chr) {
		    var c = chr.charCodeAt(0);
		    var e = void 0;
		    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
		    return e;
		}
		function pctDecChars(str) {
		    var newStr = "";
		    var i = 0;
		    var il = str.length;
		    while (i < il) {
		        var c = parseInt(str.substr(i + 1, 2), 16);
		        if (c < 128) {
		            newStr += String.fromCharCode(c);
		            i += 3;
		        } else if (c >= 194 && c < 224) {
		            if (il - i >= 6) {
		                var c2 = parseInt(str.substr(i + 4, 2), 16);
		                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
		            } else {
		                newStr += str.substr(i, 6);
		            }
		            i += 6;
		        } else if (c >= 224) {
		            if (il - i >= 9) {
		                var _c = parseInt(str.substr(i + 4, 2), 16);
		                var c3 = parseInt(str.substr(i + 7, 2), 16);
		                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
		            } else {
		                newStr += str.substr(i, 9);
		            }
		            i += 9;
		        } else {
		            newStr += str.substr(i, 3);
		            i += 3;
		        }
		    }
		    return newStr;
		}
		function _normalizeComponentEncoding(components, protocol) {
		    function decodeUnreserved(str) {
		        var decStr = pctDecChars(str);
		        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
		    }
		    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
		    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
		    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
		    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
		    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
		    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
		    return components;
		}

		function _stripLeadingZeros(str) {
		    return str.replace(/^0*(.*)/, "$1") || "0";
		}
		function _normalizeIPv4(host, protocol) {
		    var matches = host.match(protocol.IPV4ADDRESS) || [];

		    var _matches = slicedToArray(matches, 2),
		        address = _matches[1];

		    if (address) {
		        return address.split(".").map(_stripLeadingZeros).join(".");
		    } else {
		        return host;
		    }
		}
		function _normalizeIPv6(host, protocol) {
		    var matches = host.match(protocol.IPV6ADDRESS) || [];

		    var _matches2 = slicedToArray(matches, 3),
		        address = _matches2[1],
		        zone = _matches2[2];

		    if (address) {
		        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
		            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
		            last = _address$toLowerCase$2[0],
		            first = _address$toLowerCase$2[1];

		        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
		        var lastFields = last.split(":").map(_stripLeadingZeros);
		        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
		        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
		        var lastFieldsStart = lastFields.length - fieldCount;
		        var fields = Array(fieldCount);
		        for (var x = 0; x < fieldCount; ++x) {
		            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
		        }
		        if (isLastFieldIPv4Address) {
		            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
		        }
		        var allZeroFields = fields.reduce(function (acc, field, index) {
		            if (!field || field === "0") {
		                var lastLongest = acc[acc.length - 1];
		                if (lastLongest && lastLongest.index + lastLongest.length === index) {
		                    lastLongest.length++;
		                } else {
		                    acc.push({ index: index, length: 1 });
		                }
		            }
		            return acc;
		        }, []);
		        var longestZeroFields = allZeroFields.sort(function (a, b) {
		            return b.length - a.length;
		        })[0];
		        var newHost = void 0;
		        if (longestZeroFields && longestZeroFields.length > 1) {
		            var newFirst = fields.slice(0, longestZeroFields.index);
		            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
		            newHost = newFirst.join(":") + "::" + newLast.join(":");
		        } else {
		            newHost = fields.join(":");
		        }
		        if (zone) {
		            newHost += "%" + zone;
		        }
		        return newHost;
		    } else {
		        return host;
		    }
		}
		var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
		var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
		function parse(uriString) {
		    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		    var components = {};
		    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
		    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
		    var matches = uriString.match(URI_PARSE);
		    if (matches) {
		        if (NO_MATCH_IS_UNDEFINED) {
		            //store each component
		            components.scheme = matches[1];
		            components.userinfo = matches[3];
		            components.host = matches[4];
		            components.port = parseInt(matches[5], 10);
		            components.path = matches[6] || "";
		            components.query = matches[7];
		            components.fragment = matches[8];
		            //fix port number
		            if (isNaN(components.port)) {
		                components.port = matches[5];
		            }
		        } else {
		            //IE FIX for improper RegExp matching
		            //store each component
		            components.scheme = matches[1] || undefined;
		            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
		            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
		            components.port = parseInt(matches[5], 10);
		            components.path = matches[6] || "";
		            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
		            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
		            //fix port number
		            if (isNaN(components.port)) {
		                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
		            }
		        }
		        if (components.host) {
		            //normalize IP hosts
		            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
		        }
		        //determine reference type
		        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
		            components.reference = "same-document";
		        } else if (components.scheme === undefined) {
		            components.reference = "relative";
		        } else if (components.fragment === undefined) {
		            components.reference = "absolute";
		        } else {
		            components.reference = "uri";
		        }
		        //check for reference errors
		        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
		            components.error = components.error || "URI is not a " + options.reference + " reference.";
		        }
		        //find scheme handler
		        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
		        //check if scheme can't handle IRIs
		        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
		            //if host component is a domain name
		            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
		                //convert Unicode IDN -> ASCII IDN
		                try {
		                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
		                } catch (e) {
		                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
		                }
		            }
		            //convert IRI -> URI
		            _normalizeComponentEncoding(components, URI_PROTOCOL);
		        } else {
		            //normalize encodings
		            _normalizeComponentEncoding(components, protocol);
		        }
		        //perform scheme specific parsing
		        if (schemeHandler && schemeHandler.parse) {
		            schemeHandler.parse(components, options);
		        }
		    } else {
		        components.error = components.error || "URI can not be parsed.";
		    }
		    return components;
		}

		function _recomposeAuthority(components, options) {
		    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
		    var uriTokens = [];
		    if (components.userinfo !== undefined) {
		        uriTokens.push(components.userinfo);
		        uriTokens.push("@");
		    }
		    if (components.host !== undefined) {
		        //normalize IP hosts, add brackets and escape zone separator for IPv6
		        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
		            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
		        }));
		    }
		    if (typeof components.port === "number" || typeof components.port === "string") {
		        uriTokens.push(":");
		        uriTokens.push(String(components.port));
		    }
		    return uriTokens.length ? uriTokens.join("") : undefined;
		}

		var RDS1 = /^\.\.?\//;
		var RDS2 = /^\/\.(\/|$)/;
		var RDS3 = /^\/\.\.(\/|$)/;
		var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
		function removeDotSegments(input) {
		    var output = [];
		    while (input.length) {
		        if (input.match(RDS1)) {
		            input = input.replace(RDS1, "");
		        } else if (input.match(RDS2)) {
		            input = input.replace(RDS2, "/");
		        } else if (input.match(RDS3)) {
		            input = input.replace(RDS3, "/");
		            output.pop();
		        } else if (input === "." || input === "..") {
		            input = "";
		        } else {
		            var im = input.match(RDS5);
		            if (im) {
		                var s = im[0];
		                input = input.slice(s.length);
		                output.push(s);
		            } else {
		                throw new Error("Unexpected dot segment condition");
		            }
		        }
		    }
		    return output.join("");
		}

		function serialize(components) {
		    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
		    var uriTokens = [];
		    //find scheme handler
		    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
		    //perform scheme specific serialization
		    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
		    if (components.host) {
		        //if host component is an IPv6 address
		        if (protocol.IPV6ADDRESS.test(components.host)) ;
		        //TODO: normalize IPv6 address as per RFC 5952

		        //if host component is a domain name
		        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
		                //convert IDN via punycode
		                try {
		                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
		                } catch (e) {
		                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
		                }
		            }
		    }
		    //normalize encoding
		    _normalizeComponentEncoding(components, protocol);
		    if (options.reference !== "suffix" && components.scheme) {
		        uriTokens.push(components.scheme);
		        uriTokens.push(":");
		    }
		    var authority = _recomposeAuthority(components, options);
		    if (authority !== undefined) {
		        if (options.reference !== "suffix") {
		            uriTokens.push("//");
		        }
		        uriTokens.push(authority);
		        if (components.path && components.path.charAt(0) !== "/") {
		            uriTokens.push("/");
		        }
		    }
		    if (components.path !== undefined) {
		        var s = components.path;
		        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
		            s = removeDotSegments(s);
		        }
		        if (authority === undefined) {
		            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
		        }
		        uriTokens.push(s);
		    }
		    if (components.query !== undefined) {
		        uriTokens.push("?");
		        uriTokens.push(components.query);
		    }
		    if (components.fragment !== undefined) {
		        uriTokens.push("#");
		        uriTokens.push(components.fragment);
		    }
		    return uriTokens.join(""); //merge tokens into a string
		}

		function resolveComponents(base, relative) {
		    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		    var skipNormalization = arguments[3];

		    var target = {};
		    if (!skipNormalization) {
		        base = parse(serialize(base, options), options); //normalize base components
		        relative = parse(serialize(relative, options), options); //normalize relative components
		    }
		    options = options || {};
		    if (!options.tolerant && relative.scheme) {
		        target.scheme = relative.scheme;
		        //target.authority = relative.authority;
		        target.userinfo = relative.userinfo;
		        target.host = relative.host;
		        target.port = relative.port;
		        target.path = removeDotSegments(relative.path || "");
		        target.query = relative.query;
		    } else {
		        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
		            //target.authority = relative.authority;
		            target.userinfo = relative.userinfo;
		            target.host = relative.host;
		            target.port = relative.port;
		            target.path = removeDotSegments(relative.path || "");
		            target.query = relative.query;
		        } else {
		            if (!relative.path) {
		                target.path = base.path;
		                if (relative.query !== undefined) {
		                    target.query = relative.query;
		                } else {
		                    target.query = base.query;
		                }
		            } else {
		                if (relative.path.charAt(0) === "/") {
		                    target.path = removeDotSegments(relative.path);
		                } else {
		                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
		                        target.path = "/" + relative.path;
		                    } else if (!base.path) {
		                        target.path = relative.path;
		                    } else {
		                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
		                    }
		                    target.path = removeDotSegments(target.path);
		                }
		                target.query = relative.query;
		            }
		            //target.authority = base.authority;
		            target.userinfo = base.userinfo;
		            target.host = base.host;
		            target.port = base.port;
		        }
		        target.scheme = base.scheme;
		    }
		    target.fragment = relative.fragment;
		    return target;
		}

		function resolve(baseURI, relativeURI, options) {
		    var schemelessOptions = assign({ scheme: 'null' }, options);
		    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
		}

		function normalize(uri, options) {
		    if (typeof uri === "string") {
		        uri = serialize(parse(uri, options), options);
		    } else if (typeOf(uri) === "object") {
		        uri = parse(serialize(uri, options), options);
		    }
		    return uri;
		}

		function equal(uriA, uriB, options) {
		    if (typeof uriA === "string") {
		        uriA = serialize(parse(uriA, options), options);
		    } else if (typeOf(uriA) === "object") {
		        uriA = serialize(uriA, options);
		    }
		    if (typeof uriB === "string") {
		        uriB = serialize(parse(uriB, options), options);
		    } else if (typeOf(uriB) === "object") {
		        uriB = serialize(uriB, options);
		    }
		    return uriA === uriB;
		}

		function escapeComponent(str, options) {
		    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
		}

		function unescapeComponent(str, options) {
		    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
		}

		var handler = {
		    scheme: "http",
		    domainHost: true,
		    parse: function parse(components, options) {
		        //report missing host
		        if (!components.host) {
		            components.error = components.error || "HTTP URIs must have a host.";
		        }
		        return components;
		    },
		    serialize: function serialize(components, options) {
		        var secure = String(components.scheme).toLowerCase() === "https";
		        //normalize the default port
		        if (components.port === (secure ? 443 : 80) || components.port === "") {
		            components.port = undefined;
		        }
		        //normalize the empty path
		        if (!components.path) {
		            components.path = "/";
		        }
		        //NOTE: We do not parse query strings for HTTP URIs
		        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
		        //and not the HTTP spec.
		        return components;
		    }
		};

		var handler$1 = {
		    scheme: "https",
		    domainHost: handler.domainHost,
		    parse: handler.parse,
		    serialize: handler.serialize
		};

		function isSecure(wsComponents) {
		    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
		}
		//RFC 6455
		var handler$2 = {
		    scheme: "ws",
		    domainHost: true,
		    parse: function parse(components, options) {
		        var wsComponents = components;
		        //indicate if the secure flag is set
		        wsComponents.secure = isSecure(wsComponents);
		        //construct resouce name
		        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
		        wsComponents.path = undefined;
		        wsComponents.query = undefined;
		        return wsComponents;
		    },
		    serialize: function serialize(wsComponents, options) {
		        //normalize the default port
		        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
		            wsComponents.port = undefined;
		        }
		        //ensure scheme matches secure flag
		        if (typeof wsComponents.secure === 'boolean') {
		            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
		            wsComponents.secure = undefined;
		        }
		        //reconstruct path from resource name
		        if (wsComponents.resourceName) {
		            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
		                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
		                path = _wsComponents$resourc2[0],
		                query = _wsComponents$resourc2[1];

		            wsComponents.path = path && path !== '/' ? path : undefined;
		            wsComponents.query = query;
		            wsComponents.resourceName = undefined;
		        }
		        //forbid fragment component
		        wsComponents.fragment = undefined;
		        return wsComponents;
		    }
		};

		var handler$3 = {
		    scheme: "wss",
		    domainHost: handler$2.domainHost,
		    parse: handler$2.parse,
		    serialize: handler$2.serialize
		};

		var O = {};
		//RFC 3986
		var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + ("\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" ) + "]";
		var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
		var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
		//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
		//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
		//const WSP$$ = "[\\x20\\x09]";
		//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
		//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
		//const VCHAR$$ = "[\\x21-\\x7E]";
		//const WSP$$ = "[\\x20\\x09]";
		//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
		//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
		//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
		//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
		var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
		var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
		var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
		var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
		var UNRESERVED = new RegExp(UNRESERVED$$, "g");
		var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
		var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
		var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
		var NOT_HFVALUE = NOT_HFNAME;
		function decodeUnreserved(str) {
		    var decStr = pctDecChars(str);
		    return !decStr.match(UNRESERVED) ? str : decStr;
		}
		var handler$4 = {
		    scheme: "mailto",
		    parse: function parse$$1(components, options) {
		        var mailtoComponents = components;
		        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
		        mailtoComponents.path = undefined;
		        if (mailtoComponents.query) {
		            var unknownHeaders = false;
		            var headers = {};
		            var hfields = mailtoComponents.query.split("&");
		            for (var x = 0, xl = hfields.length; x < xl; ++x) {
		                var hfield = hfields[x].split("=");
		                switch (hfield[0]) {
		                    case "to":
		                        var toAddrs = hfield[1].split(",");
		                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
		                            to.push(toAddrs[_x]);
		                        }
		                        break;
		                    case "subject":
		                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
		                        break;
		                    case "body":
		                        mailtoComponents.body = unescapeComponent(hfield[1], options);
		                        break;
		                    default:
		                        unknownHeaders = true;
		                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
		                        break;
		                }
		            }
		            if (unknownHeaders) mailtoComponents.headers = headers;
		        }
		        mailtoComponents.query = undefined;
		        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
		            var addr = to[_x2].split("@");
		            addr[0] = unescapeComponent(addr[0]);
		            if (!options.unicodeSupport) {
		                //convert Unicode IDN -> ASCII IDN
		                try {
		                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
		                } catch (e) {
		                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
		                }
		            } else {
		                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
		            }
		            to[_x2] = addr.join("@");
		        }
		        return mailtoComponents;
		    },
		    serialize: function serialize$$1(mailtoComponents, options) {
		        var components = mailtoComponents;
		        var to = toArray(mailtoComponents.to);
		        if (to) {
		            for (var x = 0, xl = to.length; x < xl; ++x) {
		                var toAddr = String(to[x]);
		                var atIdx = toAddr.lastIndexOf("@");
		                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
		                var domain = toAddr.slice(atIdx + 1);
		                //convert IDN via punycode
		                try {
		                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
		                } catch (e) {
		                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
		                }
		                to[x] = localPart + "@" + domain;
		            }
		            components.path = to.join(",");
		        }
		        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
		        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
		        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
		        var fields = [];
		        for (var name in headers) {
		            if (headers[name] !== O[name]) {
		                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
		            }
		        }
		        if (fields.length) {
		            components.query = fields.join("&");
		        }
		        return components;
		    }
		};

		var URN_PARSE = /^([^\:]+)\:(.*)/;
		//RFC 2141
		var handler$5 = {
		    scheme: "urn",
		    parse: function parse$$1(components, options) {
		        var matches = components.path && components.path.match(URN_PARSE);
		        var urnComponents = components;
		        if (matches) {
		            var scheme = options.scheme || urnComponents.scheme || "urn";
		            var nid = matches[1].toLowerCase();
		            var nss = matches[2];
		            var urnScheme = scheme + ":" + (options.nid || nid);
		            var schemeHandler = SCHEMES[urnScheme];
		            urnComponents.nid = nid;
		            urnComponents.nss = nss;
		            urnComponents.path = undefined;
		            if (schemeHandler) {
		                urnComponents = schemeHandler.parse(urnComponents, options);
		            }
		        } else {
		            urnComponents.error = urnComponents.error || "URN can not be parsed.";
		        }
		        return urnComponents;
		    },
		    serialize: function serialize$$1(urnComponents, options) {
		        var scheme = options.scheme || urnComponents.scheme || "urn";
		        var nid = urnComponents.nid;
		        var urnScheme = scheme + ":" + (options.nid || nid);
		        var schemeHandler = SCHEMES[urnScheme];
		        if (schemeHandler) {
		            urnComponents = schemeHandler.serialize(urnComponents, options);
		        }
		        var uriComponents = urnComponents;
		        var nss = urnComponents.nss;
		        uriComponents.path = (nid || options.nid) + ":" + nss;
		        return uriComponents;
		    }
		};

		var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
		//RFC 4122
		var handler$6 = {
		    scheme: "urn:uuid",
		    parse: function parse(urnComponents, options) {
		        var uuidComponents = urnComponents;
		        uuidComponents.uuid = uuidComponents.nss;
		        uuidComponents.nss = undefined;
		        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
		            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
		        }
		        return uuidComponents;
		    },
		    serialize: function serialize(uuidComponents, options) {
		        var urnComponents = uuidComponents;
		        //normalize UUID
		        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
		        return urnComponents;
		    }
		};

		SCHEMES[handler.scheme] = handler;
		SCHEMES[handler$1.scheme] = handler$1;
		SCHEMES[handler$2.scheme] = handler$2;
		SCHEMES[handler$3.scheme] = handler$3;
		SCHEMES[handler$4.scheme] = handler$4;
		SCHEMES[handler$5.scheme] = handler$5;
		SCHEMES[handler$6.scheme] = handler$6;

		exports.SCHEMES = SCHEMES;
		exports.pctEncChar = pctEncChar;
		exports.pctDecChars = pctDecChars;
		exports.parse = parse;
		exports.removeDotSegments = removeDotSegments;
		exports.serialize = serialize;
		exports.resolveComponents = resolveComponents;
		exports.resolve = resolve;
		exports.normalize = normalize;
		exports.equal = equal;
		exports.escapeComponent = escapeComponent;
		exports.unescapeComponent = unescapeComponent;

		Object.defineProperty(exports, '__esModule', { value: true });

		})));
		
	} (uri_all, uri_all.exports));

	const URI = uri_all.exports;


	const isObject = (value) => typeof value === "object" && !Array.isArray(value) && value !== null;
	const isType = {
	  null: (value) => value === null,
	  boolean: (value) => typeof value === "boolean",
	  object: isObject,
	  array: (value) => Array.isArray(value),
	  number: (value) => typeof value === "number",
	  integer: (value) => Number.isInteger(value),
	  string: (value) => typeof value === "string"
	};
	const jsonTypeOf$2 = (value, type) => isType[type](value);

	const resolveUrl$3 = (contextUrl, url) => {
	  const resolvedUrl = URI.resolve(contextUrl, url, { iri: true });
	  const contextId = URI.resolve(contextUrl, "", { iri: true });
	  if (contextId && URI.parse(resolvedUrl).scheme === "file" && URI.parse(contextUrl).scheme !== "file") {
	    throw Error(`Can't access file '${resolvedUrl}' resource from network context '${contextUrl}'`);
	  }
	  return resolvedUrl;
	};

	const urlFragment$1 = (uri) => URI.unescapeComponent(URI.parse(uri).fragment) || "";

	const CHAR_BACKWARD_SLASH = 47;

	const pathRelative$1 = (from, to) => {
	  if (from === to) {
	    return "";
	  }

	  let toStart = 1;
	  const fromLen = from.length - 1;
	  const toLen = to.length - toStart;

	  // Compare paths to find the longest common path from root
	  const length = fromLen < toLen ? fromLen : toLen;
	  let lastCommonSep = -1;
	  let i = 0;
	  for (; i < length; i++) {
	    const fromCode = from.charCodeAt(i + 1);
	    if (fromCode !== to.charCodeAt(toStart + i)) {
	      break;
	    } else if (fromCode === CHAR_BACKWARD_SLASH) {
	      lastCommonSep = i;
	    }
	  }

	  if (toLen > length) {
	    if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
	      return to.slice(toStart + i + 1);
	    }
	    if (i === 0) {
	      return to.slice(toStart + i);
	    }
	  }
	  if (fromLen > length) {
	    if (from.charCodeAt(i + 1) === CHAR_BACKWARD_SLASH) {
	      lastCommonSep = i;
	    } else if (length === 0) {
	      lastCommonSep = 0;
	    }
	  }

	  let out = "";
	  // Generate the relative path based on the path difference between `to` and `from`
	  for (i = lastCommonSep + 2; i <= from.length; ++i) {
	    if (i === from.length || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
	      out += out.length === 0 ? ".." : "/..";
	    }
	  }

	  toStart += lastCommonSep;

	  // Lastly, append the rest of the destination (`to`) path that comes after
	  // the common path parts
	  if (out.length > 0) {
	    return `${out}${to.slice(toStart, to.length)}`;
	  }

	  if (to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
	    ++toStart;
	  }

	  return to.slice(toStart, to.length);
	};

	var common = { jsonTypeOf: jsonTypeOf$2, resolveUrl: resolveUrl$3, urlFragment: urlFragment$1, pathRelative: pathRelative$1 };

	const curry$a = justCurryIt$1;


	const nil$2 = "";

	const compile$3 = (pointer) => {
	  if (pointer.length > 0 && pointer[0] !== "/") {
	    throw Error("Invalid JSON Pointer");
	  }

	  return pointer.split("/").slice(1).map(unescape);
	};

	const get$2 = (pointer, value = undefined) => {
	  const ptr = compile$3(pointer);

	  const fn = (value) => ptr.reduce(([value, pointer], segment) => {
	    return [applySegment(value, segment, pointer), append(segment, pointer)];
	  }, [value, ""])[0];

	  return value === undefined ? fn : fn(value);
	};

	const set = (pointer, subject = undefined, value = undefined) => {
	  const ptr = compile$3(pointer);
	  const fn = curry$a((subject, value) => _set(ptr, subject, value, nil$2));
	  return subject === undefined ? fn : fn(subject, value);
	};

	const _set = (pointer, subject, value, cursor) => {
	  if (pointer.length === 0) {
	    return value;
	  } else if (pointer.length > 1) {
	    if (Array.isArray(subject)) {
	      const index = pointer.shift();
	      const clonedSubject = [...subject];
	      clonedSubject[index] = _set(pointer, applySegment(subject, index, cursor), value, append(index, cursor));
	      return clonedSubject;
	    } else {
	      const segment = pointer.shift();
	      return { ...subject, [segment]: _set(pointer, applySegment(subject, segment, cursor), value, append(segment, cursor)) };
	    }
	  } else if (Array.isArray(subject)) {
	    const clonedSubject = [...subject];
	    const segment = computeSegment(subject, pointer[0]);
	    clonedSubject[segment] = value;
	    return clonedSubject;
	  } else if (typeof subject === "object" && subject !== null) {
	    return { ...subject, [pointer[0]]: value };
	  } else {
	    return applySegment(subject, pointer[0], cursor);
	  }
	};

	const assign = (pointer, subject = undefined, value = undefined) => {
	  const ptr = compile$3(pointer);
	  const fn = curry$a((subject, value) => _assign(ptr, subject, value, nil$2));
	  return subject === undefined ? fn : fn(subject, value);
	};

	const _assign = (pointer, subject, value, cursor) => {
	  if (pointer.length === 0) {
	    return;
	  } else if (pointer.length === 1 && !isScalar(subject)) {
	    const segment = computeSegment(subject, pointer[0]);
	    subject[segment] = value;
	  } else {
	    const segment = pointer.shift();
	    _assign(pointer, applySegment(subject, segment, cursor), value, append(segment, cursor));
	  }
	};

	const unset = (pointer, subject = undefined) => {
	  const ptr = compile$3(pointer);
	  const fn = (subject) => _unset(ptr, subject, nil$2);
	  return subject === undefined ? fn : fn(subject);
	};

	const _unset = (pointer, subject, cursor) => {
	  if (pointer.length == 0) {
	    return undefined;
	  } else if (pointer.length > 1) {
	    const segment = pointer.shift();
	    const value = applySegment(subject, segment, cursor);
	    return { ...subject, [segment]: _unset(pointer, value, append(segment, cursor)) };
	  } else if (Array.isArray(subject)) {
	    return subject.filter((_, ndx) => ndx != pointer[0]);
	  } else if (typeof subject === "object" && subject !== null) {
	    // eslint-disable-next-line no-unused-vars
	    const { [pointer[0]]: _, ...result } = subject;
	    return result;
	  } else {
	    return applySegment(subject, pointer[0], cursor);
	  }
	};

	const remove = (pointer, subject = undefined) => {
	  const ptr = compile$3(pointer);
	  const fn = (subject) => _remove(ptr, subject, nil$2);
	  return subject === undefined ? fn : fn(subject);
	};

	const _remove = (pointer, subject, cursor) => {
	  if (pointer.length === 0) {
	    return;
	  } else if (pointer.length > 1) {
	    const segment = pointer.shift();
	    const value = applySegment(subject, segment, cursor);
	    _remove(pointer, value, append(segment, cursor));
	  } else if (Array.isArray(subject)) {
	    subject.splice(pointer[0], 1);
	  } else if (typeof subject === "object" && subject !== null) {
	    delete subject[pointer[0]];
	  } else {
	    applySegment(subject, pointer[0], cursor);
	  }
	};

	const append = curry$a((segment, pointer) => pointer + "/" + escape$1(segment));

	const escape$1 = (segment) => segment.toString().replace(/~/g, "~0").replace(/\//g, "~1");
	const unescape = (segment) => segment.toString().replace(/~1/g, "/").replace(/~0/g, "~");
	const computeSegment = (value, segment) => Array.isArray(value) && segment === "-" ? value.length : segment;

	const applySegment = (value, segment, cursor = "") => {
	  if (value === undefined) {
	    throw TypeError(`Value at '${cursor}' is undefined and does not have property '${segment}'`);
	  } else if (value === null) {
	    throw TypeError(`Value at '${cursor}' is null and does not have property '${segment}'`);
	  } else if (isScalar(value)) {
	    throw TypeError(`Value at '${cursor}' is a ${typeof value} and does not have property '${segment}'`);
	  } else {
	    const computedSegment = computeSegment(value, segment);
	    return value[computedSegment];
	  }
	};

	const isScalar = (value) => value === null || typeof value !== "object";

	var lib$3 = { nil: nil$2, append, get: get$2, set, assign, unset, remove };

	const $__value = Symbol("$__value");
	const $__href = Symbol("$__href");

	const cons$1 = (href, value) => Object.freeze({
	  [$__href]: href,
	  [$__value]: value
	});

	const isReference = (ref) => ref && ref[$__href] !== undefined;
	const href = (ref) => ref[$__href];
	const value$2 = (ref) => ref[$__value];

	var reference = { cons: cons$1, isReference, href, value: value$2 };

	const JsonPointer$3 = lib$3;
	const curry$9 = justCurryIt$1;
	const { resolveUrl: resolveUrl$2, jsonTypeOf: jsonTypeOf$1 } = common;
	const Reference$2 = reference;


	const nil$1 = Object.freeze({ id: "", pointer: "", instance: undefined, value: undefined });
	const cons = (instance, id = "") => Object.freeze({ ...nil$1, id: resolveUrl$2(id, ""), instance, value: instance });

	const get$1 = (url, instance = nil$1) => {
	  if (!url.startsWith("#")) {
	    throw Error(`No JSON document found at '${url.split("#")[0]}'`);
	  }

	  return Object.freeze({ ...instance, pointer: url.substr(1) });
	};

	const uri$1 = (doc) => `${doc.id}#${encodeURI(doc.pointer)}`;
	const value$1 = (doc) => Reference$2.isReference(doc.value) ? Reference$2.value(doc.value) : doc.value;
	const has$1 = (key, doc) => key in value$1(doc);
	const typeOf$1 = curry$9((doc, type) => jsonTypeOf$1(value$1(doc), type));

	const step$1 = (key, doc) => Object.freeze({
	  ...doc,
	  pointer: JsonPointer$3.append(key, doc.pointer),
	  value: value$1(doc)[key]
	});

	const entries$3 = (doc) => Object.keys(value$1(doc))
	  .map((key) => [key, step$1(key, doc)]);

	const keys$1 = (doc) => Object.keys(value$1(doc));

	const map$4 = curry$9((fn, doc) => value$1(doc)
	  .map((item, ndx, array, thisArg) => fn(step$1(ndx, doc), ndx, array, thisArg)));

	const forEach = curry$9((fn, doc) => value$1(doc)
	  .forEach((item, ndx, array, thisArg) => fn(step$1(ndx, doc), ndx, array, thisArg)));

	const filter$1 = curry$9((fn, doc) => value$1(doc)
	  .map((item, ndx, array, thisArg) => step$1(ndx, doc))
	  .filter((item, ndx, array, thisArg) => fn(item, ndx, array, thisArg)));

	const reduce$3 = curry$9((fn, acc, doc) => value$1(doc)
	  .reduce((acc, item, ndx) => fn(acc, step$1(ndx, doc), ndx), acc));

	const every$1 = curry$9((fn, doc) => value$1(doc)
	  .every((item, ndx, array, thisArg) => fn(step$1(ndx, doc), ndx, array, thisArg)));

	const some$1 = curry$9((fn, doc) => value$1(doc)
	  .some((item, ndx, array, thisArg) => fn(step$1(ndx, doc), ndx, array, thisArg)));

	const length$1 = (doc) => value$1(doc).length;

	var instance = {
	  nil: nil$1, cons, get: get$1, uri: uri$1, value: value$1, has: has$1, typeOf: typeOf$1, length: length$1,
	  step: step$1, entries: entries$3, keys: keys$1, map: map$4, forEach, filter: filter$1, reduce: reduce$3, every: every$1, some: some$1
	};

	var entries$2 = async (doc) => Object.entries(await doc);

	var justCurryIt = curry$8;

	/*
	  function add(a, b, c) {
	    return a + b + c;
	  }
	  curry(add)(1)(2)(3); // 6
	  curry(add)(1)(2)(2); // 5
	  curry(add)(2)(4, 3); // 9

	  function add(...args) {
	    return args.reduce((sum, n) => sum + n, 0)
	  }
	  var curryAdd4 = curry(add, 4)
	  curryAdd4(1)(2, 3)(4); // 10

	  function converter(ratio, input) {
	    return (input*ratio).toFixed(1);
	  }
	  const curriedConverter = curry(converter)
	  const milesToKm = curriedConverter(1.62);
	  milesToKm(35); // 56.7
	  milesToKm(10); // 16.2
	*/

	function curry$8(fn, arity) {
	  return function curried() {
	    if (arity == null) {
	      arity = fn.length;
	    }
	    var args = [].slice.call(arguments);
	    if (args.length >= arity) {
	      return fn.apply(this, args);
	    } else {
	      return function() {
	        return curried.apply(this, args.concat([].slice.call(arguments)));
	      };
	    }
	  };
	}

	const curry$7 = justCurryIt;


	var map$3 = curry$7(async (fn, doc) => (await doc).map(fn));

	const curry$6 = justCurryIt;


	var reduce$2 = curry$6(async (fn, acc, doc) => {
	  return (await doc).reduce(async (acc, item) => fn(await acc, item), acc);
	});

	const curry$5 = justCurryIt;
	const reduce$1 = reduce$2;


	var filter = curry$5(async (fn, doc, options = {}) => {
	  return reduce$1(async (acc, item) => {
	    return (await fn(item)) ? acc.concat([item]) : acc;
	  }, [], doc, options);
	});

	const curry$4 = justCurryIt;
	const map$2 = map$3;


	var some = curry$4(async (fn, doc) => {
	  const results = await map$2(fn, doc);
	  return (await Promise.all(results))
	    .some((a) => a);
	});

	const curry$3 = justCurryIt;
	const map$1 = map$3;


	var every = curry$3(async (fn, doc) => {
	  const results = await map$1(fn, doc);
	  return (await Promise.all(results))
	    .every((a) => a);
	});

	const curry$2 = justCurryIt;


	var pipeline$1 = curry$2((fns, doc) => {
	  return fns.reduce(async (acc, fn) => fn(await acc), doc);
	});

	var all = (doc) => Promise.all(doc);

	const pipeline = pipeline$1;
	const entries$1 = entries$2;
	const reduce = reduce$2;


	var allValues = (doc) => {
	  return pipeline([
	    entries$1,
	    reduce(async (acc, [propertyName, propertyValue]) => {
	      acc[propertyName] = await propertyValue;
	      return acc;
	    }, {})
	  ], doc);
	};

	var lib$2 = {
	  entries: entries$2,
	  map: map$3,
	  filter: filter,
	  reduce: reduce$2,
	  some: some,
	  every: every,
	  pipeline: pipeline$1,
	  all: all,
	  allValues: allValues
	};

	var moo$1 = {exports: {}};

	(function (module) {
		(function(root, factory) {
		  if (module.exports) {
		    module.exports = factory();
		  } else {
		    root.moo = factory();
		  }
		}(commonjsGlobal, function() {

		  var hasOwnProperty = Object.prototype.hasOwnProperty;
		  var toString = Object.prototype.toString;
		  var hasSticky = typeof new RegExp().sticky === 'boolean';

		  /***************************************************************************/

		  function isRegExp(o) { return o && toString.call(o) === '[object RegExp]' }
		  function isObject(o) { return o && typeof o === 'object' && !isRegExp(o) && !Array.isArray(o) }

		  function reEscape(s) {
		    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
		  }
		  function reGroups(s) {
		    var re = new RegExp('|' + s);
		    return re.exec('').length - 1
		  }
		  function reCapture(s) {
		    return '(' + s + ')'
		  }
		  function reUnion(regexps) {
		    if (!regexps.length) return '(?!)'
		    var source =  regexps.map(function(s) {
		      return "(?:" + s + ")"
		    }).join('|');
		    return "(?:" + source + ")"
		  }

		  function regexpOrLiteral(obj) {
		    if (typeof obj === 'string') {
		      return '(?:' + reEscape(obj) + ')'

		    } else if (isRegExp(obj)) {
		      // TODO: consider /u support
		      if (obj.ignoreCase) throw new Error('RegExp /i flag not allowed')
		      if (obj.global) throw new Error('RegExp /g flag is implied')
		      if (obj.sticky) throw new Error('RegExp /y flag is implied')
		      if (obj.multiline) throw new Error('RegExp /m flag is implied')
		      return obj.source

		    } else {
		      throw new Error('Not a pattern: ' + obj)
		    }
		  }

		  function objectToRules(object) {
		    var keys = Object.getOwnPropertyNames(object);
		    var result = [];
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      var thing = object[key];
		      var rules = [].concat(thing);
		      if (key === 'include') {
		        for (var j = 0; j < rules.length; j++) {
		          result.push({include: rules[j]});
		        }
		        continue
		      }
		      var match = [];
		      rules.forEach(function(rule) {
		        if (isObject(rule)) {
		          if (match.length) result.push(ruleOptions(key, match));
		          result.push(ruleOptions(key, rule));
		          match = [];
		        } else {
		          match.push(rule);
		        }
		      });
		      if (match.length) result.push(ruleOptions(key, match));
		    }
		    return result
		  }

		  function arrayToRules(array) {
		    var result = [];
		    for (var i = 0; i < array.length; i++) {
		      var obj = array[i];
		      if (obj.include) {
		        var include = [].concat(obj.include);
		        for (var j = 0; j < include.length; j++) {
		          result.push({include: include[j]});
		        }
		        continue
		      }
		      if (!obj.type) {
		        throw new Error('Rule has no type: ' + JSON.stringify(obj))
		      }
		      result.push(ruleOptions(obj.type, obj));
		    }
		    return result
		  }

		  function ruleOptions(type, obj) {
		    if (!isObject(obj)) {
		      obj = { match: obj };
		    }
		    if (obj.include) {
		      throw new Error('Matching rules cannot also include states')
		    }

		    // nb. error and fallback imply lineBreaks
		    var options = {
		      defaultType: type,
		      lineBreaks: !!obj.error || !!obj.fallback,
		      pop: false,
		      next: null,
		      push: null,
		      error: false,
		      fallback: false,
		      value: null,
		      type: null,
		      shouldThrow: false,
		    };

		    // Avoid Object.assign(), so we support IE9+
		    for (var key in obj) {
		      if (hasOwnProperty.call(obj, key)) {
		        options[key] = obj[key];
		      }
		    }

		    // type transform cannot be a string
		    if (typeof options.type === 'string' && type !== options.type) {
		      throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')")
		    }

		    // convert to array
		    var match = options.match;
		    options.match = Array.isArray(match) ? match : match ? [match] : [];
		    options.match.sort(function(a, b) {
		      return isRegExp(a) && isRegExp(b) ? 0
		           : isRegExp(b) ? -1 : isRegExp(a) ? +1 : b.length - a.length
		    });
		    return options
		  }

		  function toRules(spec) {
		    return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec)
		  }

		  var defaultErrorRule = ruleOptions('error', {lineBreaks: true, shouldThrow: true});
		  function compileRules(rules, hasStates) {
		    var errorRule = null;
		    var fast = Object.create(null);
		    var fastAllowed = true;
		    var unicodeFlag = null;
		    var groups = [];
		    var parts = [];

		    // If there is a fallback rule, then disable fast matching
		    for (var i = 0; i < rules.length; i++) {
		      if (rules[i].fallback) {
		        fastAllowed = false;
		      }
		    }

		    for (var i = 0; i < rules.length; i++) {
		      var options = rules[i];

		      if (options.include) {
		        // all valid inclusions are removed by states() preprocessor
		        throw new Error('Inheritance is not allowed in stateless lexers')
		      }

		      if (options.error || options.fallback) {
		        // errorRule can only be set once
		        if (errorRule) {
		          if (!options.fallback === !errorRule.fallback) {
		            throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')")
		          } else {
		            throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')")
		          }
		        }
		        errorRule = options;
		      }

		      var match = options.match.slice();
		      if (fastAllowed) {
		        while (match.length && typeof match[0] === 'string' && match[0].length === 1) {
		          var word = match.shift();
		          fast[word.charCodeAt(0)] = options;
		        }
		      }

		      // Warn about inappropriate state-switching options
		      if (options.pop || options.push || options.next) {
		        if (!hasStates) {
		          throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')")
		        }
		        if (options.fallback) {
		          throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')")
		        }
		      }

		      // Only rules with a .match are included in the RegExp
		      if (match.length === 0) {
		        continue
		      }
		      fastAllowed = false;

		      groups.push(options);

		      // Check unicode flag is used everywhere or nowhere
		      for (var j = 0; j < match.length; j++) {
		        var obj = match[j];
		        if (!isRegExp(obj)) {
		          continue
		        }

		        if (unicodeFlag === null) {
		          unicodeFlag = obj.unicode;
		        } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
		          throw new Error('If one rule is /u then all must be')
		        }
		      }

		      // convert to RegExp
		      var pat = reUnion(match.map(regexpOrLiteral));

		      // validate
		      var regexp = new RegExp(pat);
		      if (regexp.test("")) {
		        throw new Error("RegExp matches empty string: " + regexp)
		      }
		      var groupCount = reGroups(pat);
		      if (groupCount > 0) {
		        throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: … ) instead")
		      }

		      // try and detect rules matching newlines
		      if (!options.lineBreaks && regexp.test('\n')) {
		        throw new Error('Rule should declare lineBreaks: ' + regexp)
		      }

		      // store regex
		      parts.push(reCapture(pat));
		    }


		    // If there's no fallback rule, use the sticky flag so we only look for
		    // matches at the current index.
		    //
		    // If we don't support the sticky flag, then fake it using an irrefutable
		    // match (i.e. an empty pattern).
		    var fallbackRule = errorRule && errorRule.fallback;
		    var flags = hasSticky && !fallbackRule ? 'ym' : 'gm';
		    var suffix = hasSticky || fallbackRule ? '' : '|';

		    if (unicodeFlag === true) flags += "u";
		    var combined = new RegExp(reUnion(parts) + suffix, flags);
		    return {regexp: combined, groups: groups, fast: fast, error: errorRule || defaultErrorRule}
		  }

		  function compile(rules) {
		    var result = compileRules(toRules(rules));
		    return new Lexer({start: result}, 'start')
		  }

		  function checkStateGroup(g, name, map) {
		    var state = g && (g.push || g.next);
		    if (state && !map[state]) {
		      throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')")
		    }
		    if (g && g.pop && +g.pop !== 1) {
		      throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')")
		    }
		  }
		  function compileStates(states, start) {
		    var all = states.$all ? toRules(states.$all) : [];
		    delete states.$all;

		    var keys = Object.getOwnPropertyNames(states);
		    if (!start) start = keys[0];

		    var ruleMap = Object.create(null);
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      ruleMap[key] = toRules(states[key]).concat(all);
		    }
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      var rules = ruleMap[key];
		      var included = Object.create(null);
		      for (var j = 0; j < rules.length; j++) {
		        var rule = rules[j];
		        if (!rule.include) continue
		        var splice = [j, 1];
		        if (rule.include !== key && !included[rule.include]) {
		          included[rule.include] = true;
		          var newRules = ruleMap[rule.include];
		          if (!newRules) {
		            throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')")
		          }
		          for (var k = 0; k < newRules.length; k++) {
		            var newRule = newRules[k];
		            if (rules.indexOf(newRule) !== -1) continue
		            splice.push(newRule);
		          }
		        }
		        rules.splice.apply(rules, splice);
		        j--;
		      }
		    }

		    var map = Object.create(null);
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      map[key] = compileRules(ruleMap[key], true);
		    }

		    for (var i = 0; i < keys.length; i++) {
		      var name = keys[i];
		      var state = map[name];
		      var groups = state.groups;
		      for (var j = 0; j < groups.length; j++) {
		        checkStateGroup(groups[j], name, map);
		      }
		      var fastKeys = Object.getOwnPropertyNames(state.fast);
		      for (var j = 0; j < fastKeys.length; j++) {
		        checkStateGroup(state.fast[fastKeys[j]], name, map);
		      }
		    }

		    return new Lexer(map, start)
		  }

		  function keywordTransform(map) {
		    var reverseMap = Object.create(null);
		    var byLength = Object.create(null);
		    var types = Object.getOwnPropertyNames(map);
		    for (var i = 0; i < types.length; i++) {
		      var tokenType = types[i];
		      var item = map[tokenType];
		      var keywordList = Array.isArray(item) ? item : [item];
		      keywordList.forEach(function(keyword) {
		        (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword);
		        if (typeof keyword !== 'string') {
		          throw new Error("keyword must be string (in keyword '" + tokenType + "')")
		        }
		        reverseMap[keyword] = tokenType;
		      });
		    }

		    // fast string lookup
		    // https://jsperf.com/string-lookups
		    function str(x) { return JSON.stringify(x) }
		    var source = '';
		    source += 'switch (value.length) {\n';
		    for (var length in byLength) {
		      var keywords = byLength[length];
		      source += 'case ' + length + ':\n';
		      source += 'switch (value) {\n';
		      keywords.forEach(function(keyword) {
		        var tokenType = reverseMap[keyword];
		        source += 'case ' + str(keyword) + ': return ' + str(tokenType) + '\n';
		      });
		      source += '}\n';
		    }
		    source += '}\n';
		    return Function('value', source) // type
		  }

		  /***************************************************************************/

		  var Lexer = function(states, state) {
		    this.startState = state;
		    this.states = states;
		    this.buffer = '';
		    this.stack = [];
		    this.reset();
		  };

		  Lexer.prototype.reset = function(data, info) {
		    this.buffer = data || '';
		    this.index = 0;
		    this.line = info ? info.line : 1;
		    this.col = info ? info.col : 1;
		    this.queuedToken = info ? info.queuedToken : null;
		    this.queuedThrow = info ? info.queuedThrow : null;
		    this.setState(info ? info.state : this.startState);
		    this.stack = info && info.stack ? info.stack.slice() : [];
		    return this
		  };

		  Lexer.prototype.save = function() {
		    return {
		      line: this.line,
		      col: this.col,
		      state: this.state,
		      stack: this.stack.slice(),
		      queuedToken: this.queuedToken,
		      queuedThrow: this.queuedThrow,
		    }
		  };

		  Lexer.prototype.setState = function(state) {
		    if (!state || this.state === state) return
		    this.state = state;
		    var info = this.states[state];
		    this.groups = info.groups;
		    this.error = info.error;
		    this.re = info.regexp;
		    this.fast = info.fast;
		  };

		  Lexer.prototype.popState = function() {
		    this.setState(this.stack.pop());
		  };

		  Lexer.prototype.pushState = function(state) {
		    this.stack.push(this.state);
		    this.setState(state);
		  };

		  var eat = hasSticky ? function(re, buffer) { // assume re is /y
		    return re.exec(buffer)
		  } : function(re, buffer) { // assume re is /g
		    var match = re.exec(buffer);
		    // will always match, since we used the |(?:) trick
		    if (match[0].length === 0) {
		      return null
		    }
		    return match
		  };

		  Lexer.prototype._getGroup = function(match) {
		    var groupCount = this.groups.length;
		    for (var i = 0; i < groupCount; i++) {
		      if (match[i + 1] !== undefined) {
		        return this.groups[i]
		      }
		    }
		    throw new Error('Cannot find token type for matched text')
		  };

		  function tokenToString() {
		    return this.value
		  }

		  Lexer.prototype.next = function() {
		    var index = this.index;

		    // If a fallback token matched, we don't need to re-run the RegExp
		    if (this.queuedGroup) {
		      var token = this._token(this.queuedGroup, this.queuedText, index);
		      this.queuedGroup = null;
		      this.queuedText = "";
		      return token
		    }

		    var buffer = this.buffer;
		    if (index === buffer.length) {
		      return // EOF
		    }

		    // Fast matching for single characters
		    var group = this.fast[buffer.charCodeAt(index)];
		    if (group) {
		      return this._token(group, buffer.charAt(index), index)
		    }

		    // Execute RegExp
		    var re = this.re;
		    re.lastIndex = index;
		    var match = eat(re, buffer);

		    // Error tokens match the remaining buffer
		    var error = this.error;
		    if (match == null) {
		      return this._token(error, buffer.slice(index, buffer.length), index)
		    }

		    var group = this._getGroup(match);
		    var text = match[0];

		    if (error.fallback && match.index !== index) {
		      this.queuedGroup = group;
		      this.queuedText = text;

		      // Fallback tokens contain the unmatched portion of the buffer
		      return this._token(error, buffer.slice(index, match.index), index)
		    }

		    return this._token(group, text, index)
		  };

		  Lexer.prototype._token = function(group, text, offset) {
		    // count line breaks
		    var lineBreaks = 0;
		    if (group.lineBreaks) {
		      var matchNL = /\n/g;
		      var nl = 1;
		      if (text === '\n') {
		        lineBreaks = 1;
		      } else {
		        while (matchNL.exec(text)) { lineBreaks++; nl = matchNL.lastIndex; }
		      }
		    }

		    var token = {
		      type: (typeof group.type === 'function' && group.type(text)) || group.defaultType,
		      value: typeof group.value === 'function' ? group.value(text) : text,
		      text: text,
		      toString: tokenToString,
		      offset: offset,
		      lineBreaks: lineBreaks,
		      line: this.line,
		      col: this.col,
		    };
		    // nb. adding more props to token object will make V8 sad!

		    var size = text.length;
		    this.index += size;
		    this.line += lineBreaks;
		    if (lineBreaks !== 0) {
		      this.col = size - nl + 1;
		    } else {
		      this.col += size;
		    }

		    // throw, if no rule with {error: true}
		    if (group.shouldThrow) {
		      throw new Error(this.formatError(token, "invalid syntax"))
		    }

		    if (group.pop) this.popState();
		    else if (group.push) this.pushState(group.push);
		    else if (group.next) this.setState(group.next);

		    return token
		  };

		  if (typeof Symbol !== 'undefined' && Symbol.iterator) {
		    var LexerIterator = function(lexer) {
		      this.lexer = lexer;
		    };

		    LexerIterator.prototype.next = function() {
		      var token = this.lexer.next();
		      return {value: token, done: !token}
		    };

		    LexerIterator.prototype[Symbol.iterator] = function() {
		      return this
		    };

		    Lexer.prototype[Symbol.iterator] = function() {
		      return new LexerIterator(this)
		    };
		  }

		  Lexer.prototype.formatError = function(token, message) {
		    if (token == null) {
		      // An undefined token indicates EOF
		      var text = this.buffer.slice(this.index);
		      var token = {
		        text: text,
		        offset: this.index,
		        lineBreaks: text.indexOf('\n') === -1 ? 0 : 1,
		        line: this.line,
		        col: this.col,
		      };
		    }
		    var start = Math.max(0, token.offset - token.col + 1);
		    var eol = token.lineBreaks ? token.text.indexOf('\n') : token.text.length;
		    var firstLine = this.buffer.substring(start, token.offset + eol);
		    message += " at line " + token.line + " col " + token.col + ":\n\n";
		    message += "  " + firstLine + "\n";
		    message += "  " + Array(token.col).join(" ") + "^";
		    return message
		  };

		  Lexer.prototype.clone = function() {
		    return new Lexer(this.states, this.state)
		  };

		  Lexer.prototype.has = function(tokenType) {
		    return true
		  };


		  return {
		    compile: compile,
		    states: compileStates,
		    error: Object.freeze({error: true}),
		    fallback: Object.freeze({fallback: true}),
		    keywords: keywordTransform,
		  }

		}));
	} (moo$1));

	const moo = moo$1.exports;


	const digit = `[0-9]`;
	const digit19 = `[1-9]`;
	const hexdig = `[0-9a-fA-F]`;

	// String
	const unescaped = `[\\x20-\\x21\\x23-\\x5b\\x5d-\\u{10ffff}]`;
	const escape = `\\\\`;
	const escaped = `${escape}(?:["\\/\\\\brfnt]|u${hexdig}{4})`;
	const char = `(?:${unescaped}|${escaped})`;
	const string = `"${char}*"`;

	// Number
	const int = `(?:0|${digit19}${digit}*)`;
	const frac = `\\.${digit}+`;
	const e = `[eE]`;
	const exp = `${e}[-+]?${digit}+`;
	const number = `-?${int}(?:${frac})?(?:${exp})?`;

	// Whitespace
	const whitespace = `(?:(?:\\r?\\n)|[ \\t])+`;

	var lexer = (json) => {
	  const lexer = moo.states({
	    main: {
	      WS: { match: new RegExp(whitespace, "u"), lineBreaks: true },
	      true: { match: "true", value: () => true },
	      false: { match: "false", value: () => false },
	      null: { match: "null", value: () => null },
	      number: { match: new RegExp(number, "u"), value: parseFloat },
	      string: { match: new RegExp(string, "u"), value: JSON.parse },
	      "{": "{",
	      "}": "}",
	      "[": "[",
	      "]": "]",
	      ":": ":",
	      ",": ",",
	      error: moo.error
	    }
	  });
	  lexer.reset(json);

	  const _next = () => {
	    let token;
	    do {
	      token = lexer.next();
	      if (token?.type === "error") {
	        throw SyntaxError(lexer.formatError(token, "Unrecognized token"));
	      }
	    } while (token?.type === "WS");

	    return token;
	  };

	  let previous;
	  let nextToken = _next();

	  const next = (expectedType = undefined) => {
	    previous = nextToken;
	    nextToken = _next();
	    if (expectedType && previous?.type !== expectedType) {
	      throw SyntaxError(lexer.formatError(previous, `Expected a '${expectedType}'`));
	    }
	    return previous;
	  };

	  const peek = () => nextToken;

	  const defaultErrorToken = { offset: 0, line: 1, col: 0, text: "" };
	  const syntaxError = (message) => {
	    const referenceToken = previous || defaultErrorToken;
	    const errorToken = {
	      ...referenceToken,
	      offset: referenceToken.offset + referenceToken.text.length,
	      col: referenceToken.col + referenceToken.text.length
	    };
	    throw new SyntaxError(lexer.formatError(errorToken, message));
	  };

	  return { next, peek, syntaxError };
	};

	const JsonPointer$2 = lib$3;
	const jsonLexer = lexer;


	const defaultReviver = (key, value) => value;
	const parse$3 = (json, reviver = defaultReviver) => {
	  const lexer = jsonLexer(json);
	  const value =  parseValue(lexer, "", JsonPointer$2.nil, reviver);

	  const token = lexer.peek();
	  if (token) {
	    lexer.syntaxError("A value has been parsed, but more tokens were found");
	  }
	  return value;
	};

	const parseValue = (lexer, key, pointer, reviver) => {
	  let value;
	  const token = lexer.next();
	  switch (token?.type) {
	    case "true":
	    case "false":
	    case "null":
	    case "number":
	    case "string":
	      value = token.value;
	      break;
	    case "{":
	      value = parseObject(lexer, key, pointer, reviver);
	      break;
	    case "[":
	      value = parseArray(lexer, key, pointer, reviver);
	      break;
	    default:
	      lexer.syntaxError("Expected a JSON value");
	  }

	  return reviver(key, value, pointer);
	};

	const parseObject = (lexer, key, pointer, reviver) => {
	  const value = {};

	  if (lexer.peek()?.type !== "}") {
	    parseProperties(lexer, key, pointer, reviver, value);
	  }

	  lexer.next("}");

	  return value;
	};

	const parseProperties = (lexer, key, pointer, reviver, value) => {
	  const propertyName = lexer.next("string").value;
	  lexer.next(":");
	  if (!isValueToken(lexer.peek())) {
	    lexer.syntaxError("Expected a JSON value");
	  }
	  value[propertyName] = parseValue(lexer, propertyName, JsonPointer$2.append(propertyName, pointer), reviver);

	  if (lexer.peek()?.type === ",") {
	    lexer.next(); // burn comma
	    parseProperties(lexer, propertyName, pointer, reviver, value);
	  } else if (isValueToken(lexer.peek())) {
	    lexer.next(",");
	  }
	};

	const parseArray = (lexer, key, pointer, reviver) => {
	  const value = [];

	  if (lexer.peek()?.type !== "]") {
	    parseItems(lexer, 0, pointer, reviver, value);
	  }

	  lexer.next("]");

	  return value;
	};

	const parseItems = (lexer, key, pointer, reviver, value) => {
	  if (!isValueToken(lexer.peek())) {
	    lexer.syntaxError("Expected a JSON value");
	  }
	  value[key] = parseValue(lexer, key, JsonPointer$2.append(key, pointer), reviver);
	  if (lexer.peek()?.type === ",") {
	    lexer.next(); // burn comma
	    parseItems(lexer, key + 1, pointer, reviver, value);
	  } else if (isValueToken(lexer.peek())) {
	    lexer.next(",");
	  }
	};

	const valueType = new Set(["string", "number", "true", "false", "null", "[", "{"]);
	const isValueToken = (token) => valueType.has(token?.type);

	var parse_1 = parse$3;

	const JsonPointer$1 = lib$3;


	const defaultReplacer = (key, value) => value;
	const stringify$1 = (value, replacer = defaultReplacer, space = "") => {
	  return stringifyValue(value, replacer, space, "", JsonPointer$1.nil, 1);
	};

	const stringifyValue = (value, replacer, space, key, pointer, depth) => {
	  value = replacer(key, value, pointer);
	  let result;
	  if (Array.isArray(value)) {
	    result = stringifyArray(value, replacer, space, pointer, depth);
	  } else if (typeof value === "object" && value !== null) {
	    result = stringifyObject(value, replacer, space, pointer, depth);
	  } else {
	    result = JSON.stringify(value);
	  }

	  return result;
	};

	const stringifyArray = (value, replacer, space, pointer, depth) => {
	  if (value.length === 0) {
	    space = "";
	  }
	  const padding = space ? `\n${space.repeat(depth - 1)}` : "";
	  return "[" + padding + space + value
	    .map((item, index) => {
	      const indexPointer = JsonPointer$1.append(index, pointer);
	      return stringifyValue(item, replacer, space, index, indexPointer, depth + 1);
	    })
	    .join(`,${padding}${space}`) + padding + "]";
	};

	const stringifyObject = (value, replacer, space, pointer, depth) => {
	  if (Object.keys(value).length === 0) {
	    space = "";
	  }
	  const padding = space ? `\n${space.repeat(depth - 1)}` : "";
	  const spacing = space ? " " : "";
	  return "{" + padding + space + Object.entries(value)
	    .map(([key, value]) => {
	      const keyPointer = JsonPointer$1.append(key, pointer);
	      return JSON.stringify(key) + ":" + spacing + stringifyValue(value, replacer, space, key, keyPointer, depth + 1);
	    })
	    .join(`,${padding}${space}`) + padding + "}";
	};

	var stringify_1 = stringify$1;

	const parse$2 = parse_1;
	const stringify = stringify_1;


	var lib$1 = { parse: parse$2, stringify };

	var fetch_browser = fetch;

	var contentType = {};

	/*!
	 * content-type
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	/**
	 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
	 *
	 * parameter     = token "=" ( token / quoted-string )
	 * token         = 1*tchar
	 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
	 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
	 *               / DIGIT / ALPHA
	 *               ; any VCHAR, except delimiters
	 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
	 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
	 * obs-text      = %x80-FF
	 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
	 */
	var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g;
	var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/;
	var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;

	/**
	 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
	 *
	 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
	 * obs-text    = %x80-FF
	 */
	var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g;

	/**
	 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
	 */
	var QUOTE_REGEXP = /([\\"])/g;

	/**
	 * RegExp to match type in RFC 7231 sec 3.1.1.1
	 *
	 * media-type = type "/" subtype
	 * type       = token
	 * subtype    = token
	 */
	var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;

	/**
	 * Module exports.
	 * @public
	 */

	contentType.format = format;
	contentType.parse = parse$1;

	/**
	 * Format object to media type.
	 *
	 * @param {object} obj
	 * @return {string}
	 * @public
	 */

	function format (obj) {
	  if (!obj || typeof obj !== 'object') {
	    throw new TypeError('argument obj is required')
	  }

	  var parameters = obj.parameters;
	  var type = obj.type;

	  if (!type || !TYPE_REGEXP.test(type)) {
	    throw new TypeError('invalid type')
	  }

	  var string = type;

	  // append parameters
	  if (parameters && typeof parameters === 'object') {
	    var param;
	    var params = Object.keys(parameters).sort();

	    for (var i = 0; i < params.length; i++) {
	      param = params[i];

	      if (!TOKEN_REGEXP.test(param)) {
	        throw new TypeError('invalid parameter name')
	      }

	      string += '; ' + param + '=' + qstring(parameters[param]);
	    }
	  }

	  return string
	}

	/**
	 * Parse media type to object.
	 *
	 * @param {string|object} string
	 * @return {Object}
	 * @public
	 */

	function parse$1 (string) {
	  if (!string) {
	    throw new TypeError('argument string is required')
	  }

	  // support req/res-like objects as argument
	  var header = typeof string === 'object'
	    ? getcontenttype(string)
	    : string;

	  if (typeof header !== 'string') {
	    throw new TypeError('argument string is required to be a string')
	  }

	  var index = header.indexOf(';');
	  var type = index !== -1
	    ? header.substr(0, index).trim()
	    : header.trim();

	  if (!TYPE_REGEXP.test(type)) {
	    throw new TypeError('invalid media type')
	  }

	  var obj = new ContentType(type.toLowerCase());

	  // parse parameters
	  if (index !== -1) {
	    var key;
	    var match;
	    var value;

	    PARAM_REGEXP.lastIndex = index;

	    while ((match = PARAM_REGEXP.exec(header))) {
	      if (match.index !== index) {
	        throw new TypeError('invalid parameter format')
	      }

	      index += match[0].length;
	      key = match[1].toLowerCase();
	      value = match[2];

	      if (value[0] === '"') {
	        // remove quotes and escapes
	        value = value
	          .substr(1, value.length - 2)
	          .replace(QESC_REGEXP, '$1');
	      }

	      obj.parameters[key] = value;
	    }

	    if (index !== header.length) {
	      throw new TypeError('invalid parameter format')
	    }
	  }

	  return obj
	}

	/**
	 * Get content-type from req/res objects.
	 *
	 * @param {object}
	 * @return {Object}
	 * @private
	 */

	function getcontenttype (obj) {
	  var header;

	  if (typeof obj.getHeader === 'function') {
	    // res-like
	    header = obj.getHeader('content-type');
	  } else if (typeof obj.headers === 'object') {
	    // req-like
	    header = obj.headers && obj.headers['content-type'];
	  }

	  if (typeof header !== 'string') {
	    throw new TypeError('content-type header is missing from object')
	  }

	  return header
	}

	/**
	 * Quote a string if necessary.
	 *
	 * @param {string} val
	 * @return {string}
	 * @private
	 */

	function qstring (val) {
	  var str = String(val);

	  // no need to quote tokens
	  if (TOKEN_REGEXP.test(str)) {
	    return str
	  }

	  if (str.length > 0 && !TEXT_REGEXP.test(str)) {
	    throw new TypeError('invalid parameter value')
	  }

	  return '"' + str.replace(QUOTE_REGEXP, '\\$1') + '"'
	}

	/**
	 * Class to represent a content type.
	 * @private
	 */
	function ContentType (type) {
	  this.parameters = Object.create(null);
	  this.type = type;
	}

	const contentTypeParser = contentType;


	const mediaTypePlugins = {};

	const addPlugin = (contentType, plugin) => {
	  mediaTypePlugins[contentType] = plugin;
	};

	const parse = (response) => {
	  const contentType = contentTypeParser.parse(response.headers.get("content-type"));
	  if (!(contentType.type in mediaTypePlugins)) {
	    throw Error(`${response.url} is not a schema. Found a document with media type: ${contentType.type}`);
	  }
	  return mediaTypePlugins[contentType.type].parse(response, contentType.parameters);
	};

	const getContentType = (path) => {
	  for (const contentType in mediaTypePlugins) {
	    if (mediaTypePlugins[contentType].matcher(path)) {
	      return contentType;
	    }
	  }

	  return "application/octet-stream";
	};

	var mediaTypes = { addPlugin, parse, getContentType };

	const curry$1 = justCurryIt$1;
	const Pact$1 = lib$2;
	const Json = lib$1;
	const JsonPointer = lib$3;
	const { jsonTypeOf, resolveUrl: resolveUrl$1, urlFragment, pathRelative } = common;
	const fetch$1 = fetch_browser;
	const Reference$1 = reference;
	const MediaTypes$1 = mediaTypes;


	const core201909Id = "https://json-schema.org/draft/2019-09/vocab/core";
	const core202012Id = "https://json-schema.org/draft/2020-12/vocab/core";

	// Config
	const config = {};
	const dialectJsonSchemaVersion = {};

	const setConfig = (jsonSchemaVersion, key, value) => {
	  dialectJsonSchemaVersion[jsonSchemaVersion] = jsonSchemaVersion;

	  if (!config[jsonSchemaVersion]) {
	    config[jsonSchemaVersion] = {};
	  }
	  config[jsonSchemaVersion][key] = value;
	};

	const getConfig = (dialectId, key) => {
	  const jsonSchemaVersion = dialectJsonSchemaVersion[dialectId];
	  return config[jsonSchemaVersion]?.[key];
	};

	// Schema Management
	const schemaStore = {};
	const schemaStoreAlias = {};

	const add$1 = (schema, url = "", defaultSchemaVersion = "") => {
	  schema = JSON.parse(JSON.stringify(schema));
	  const externalId = resolveUrl$1(url, "");

	  // Dialect / JSON Schema Version
	  const dialectId = resolveUrl$1(schema["$schema"] || defaultSchemaVersion, "");
	  if (!dialectId) {
	    throw Error("Couldn't determine schema dialect");
	  }
	  delete schema["$schema"];

	  // Determine JSON Schema version
	  if (!(dialectId in dialectJsonSchemaVersion)) {
	    if (schema?.$vocabulary?.[core201909Id] === true && dialectId === getSchemaIdentifier(schema, externalId, core201909Id)[0]) {
	      // Self describing 2019-09 meta-schema
	      dialectJsonSchemaVersion[dialectId] = core201909Id;
	    } else if (schema?.$vocabulary?.[core202012Id] === true && dialectId === getSchemaIdentifier(schema, externalId, core202012Id)[0]) {
	      // Self describing 2020-12 meta-schema
	      dialectJsonSchemaVersion[dialectId] = core202012Id;
	    } else {
	      // Need to look at meta-schema to determine version
	      const metaSchema = schemaStore[dialectId];
	      if (!metaSchema) {
	        throw Error(`Couldn't determine JSON Schema version for dialect: '${dialectId}'`);
	      } else if (metaSchema.vocabulary[core201909Id] === true) {
	        dialectJsonSchemaVersion[dialectId] = core201909Id;
	      } else if (metaSchema.vocabulary[core202012Id] === true) {
	        dialectJsonSchemaVersion[dialectId] = core202012Id;
	      } else {
	        // Assume the jsonSchemaVersion is the meta-schema's dialectId (non-standard behavior)
	        dialectJsonSchemaVersion[dialectId] = dialectJsonSchemaVersion[metaSchema.dialectId];
	      }
	    }
	  }

	  // Internal Identifier
	  const [id, fragment] = getSchemaIdentifier(schema, externalId, dialectJsonSchemaVersion[dialectId]);
	  if (!id) {
	    throw Error("Couldn't determine an identifier for the schema");
	  }
	  const baseToken = getConfig(dialectId, "baseToken");
	  delete schema[baseToken];
	  if (externalId) {
	    schemaStoreAlias[externalId] = id;
	  }

	  const anchorToken = getConfig(dialectId, "anchorToken");
	  if (fragment && baseToken === anchorToken) {
	    schema[anchorToken] = anchorToken !== baseToken ? encodeURI(fragment) : `#${encodeURI(fragment)}`;
	  }

	  // recursiveAnchor
	  const dynamicAnchors = {};
	  const recursiveAnchorToken = getConfig(dialectId, "recursiveAnchorToken");
	  if (schema[recursiveAnchorToken] === true) {
	    dynamicAnchors[""] = `${id}#`;
	    schema[anchorToken] = "";
	    delete schema[recursiveAnchorToken];
	  }

	  // Vocabulary
	  let vocabulary;
	  const vocabularyToken = getConfig(dialectId, "vocabularyToken");
	  if (jsonTypeOf(schema[vocabularyToken], "object")) {
	    vocabulary = schema[vocabularyToken];
	    delete schema[vocabularyToken];
	  } else {
	    vocabulary = { [dialectJsonSchemaVersion[dialectId]]: true };
	  }

	  // Store Schema
	  const anchors = { "": "" };
	  schemaStore[id] = {
	    id: id,
	    dialectId: dialectId,
	    schema: processSchema(schema, id, dialectId, JsonPointer.nil, anchors, dynamicAnchors),
	    anchors: anchors,
	    dynamicAnchors: dynamicAnchors,
	    vocabulary: vocabulary,
	    validated: false
	  };

	  return id;
	};

	const getSchemaIdentifier = (schema, externalId, jsonSchemaVersion) => {
	  const baseToken = config[jsonSchemaVersion]?.["baseToken"];
	  const internalUrl = resolveUrl$1(externalId, schema[baseToken] || "");
	  return [resolveUrl$1(internalUrl, ""), urlFragment(internalUrl)];
	};

	const processSchema = (subject, id, dialectId, pointer, anchors, dynamicAnchors) => {
	  if (jsonTypeOf(subject, "object")) {
	    const embeddedSchemaDialectId = typeof subject.$schema === "string" ? resolveUrl$1(subject.$schema, "") : dialectId;
	    const embeddedEmbeddedToken = getConfig(embeddedSchemaDialectId, "embeddedToken");
	    const embeddedAnchorToken = getConfig(embeddedSchemaDialectId, "anchorToken");
	    if (typeof subject[embeddedEmbeddedToken] === "string" && (embeddedEmbeddedToken !== embeddedAnchorToken || subject[embeddedEmbeddedToken][0] !== "#")) {
	      const ref = resolveUrl$1(id, subject[embeddedEmbeddedToken]);
	      const embeddedBaseToken = getConfig(embeddedSchemaDialectId, "baseToken");
	      subject[embeddedBaseToken] = ref;
	      add$1(subject, ref, dialectId);
	      return Reference$1.cons(subject[embeddedEmbeddedToken], subject);
	    }

	    const anchorToken = getConfig(dialectId, "anchorToken");
	    const dynamicAnchorToken = getConfig(dialectId, "dynamicAnchorToken");
	    if (typeof subject[dynamicAnchorToken] === "string") {
	      dynamicAnchors[subject[dynamicAnchorToken]] = `${id}#${encodeURI(pointer)}`;
	      anchors[subject[dynamicAnchorToken]] = pointer;
	      delete subject[dynamicAnchorToken];
	    }

	    const embeddedToken = getConfig(dialectId, "embeddedToken");
	    if (typeof subject[anchorToken] === "string") {
	      const anchor = anchorToken !== embeddedToken ? subject[anchorToken] : subject[anchorToken].slice(1);
	      anchors[anchor] = pointer;
	      delete subject[anchorToken];
	    }

	    const jrefToken = getConfig(dialectId, "jrefToken");
	    if (typeof subject[jrefToken] === "string") {
	      return Reference$1.cons(subject[jrefToken], subject);
	    }

	    for (const key in subject) {
	      subject[key] = processSchema(subject[key], id, dialectId, JsonPointer.append(key, pointer), anchors, dynamicAnchors);
	    }

	    return subject;
	  } else if (Array.isArray(subject)) {
	    return subject.map((item, ndx) => processSchema(item, id, dialectId, JsonPointer.append(ndx, pointer), anchors, dynamicAnchors));
	  } else {
	    return subject;
	  }
	};

	const hasStoredSchema = (id) => id in schemaStore || id in schemaStoreAlias;
	const getStoredSchema = (id) => schemaStore[schemaStoreAlias[id]] || schemaStore[id];

	const markValidated = (id) => {
	  schemaStore[id].validated = true;
	};

	// Schema Retrieval
	const nil = Object.freeze({
	  id: "",
	  dialectId: undefined,
	  vocabulary: {},
	  pointer: JsonPointer.nil,
	  schema: undefined,
	  value: undefined,
	  anchors: {},
	  dynamicAnchors: {},
	  validated: true
	});

	const get = async (url, contextDoc = nil) => {
	  const resolvedUrl = resolveUrl$1(uri(contextDoc), url);
	  const id = resolveUrl$1(resolvedUrl, "");
	  const fragment = urlFragment(resolvedUrl);

	  if (!hasStoredSchema(id)) {
	    const response = await fetch$1(id, { headers: { Accept: "application/schema+json" } });
	    if (response.status >= 400) {
	      await response.text(); // Sometimes node hangs without this hack
	      throw Error(`Failed to retrieve schema with id: ${id}`);
	    }

	    const [schema, defaultDialectId] = await MediaTypes$1.parse(response);

	    let dialectId;
	    if (schema.$schema) {
	      dialectId = resolveUrl$1(schema.$schema, "");
	    } else if (defaultDialectId) {
	      dialectId = resolveUrl$1(id, defaultDialectId);
	    } else {
	      dialectId = "";
	    }

	    // Make sure the meta-schema is loaded if this isn't a known dialect
	    if (dialectId && id !== dialectId && !(dialectId in dialectJsonSchemaVersion)) {
	      await get(dialectId);
	    }

	    add$1(schema, id, dialectId);
	  }

	  const storedSchema = getStoredSchema(id);
	  const pointer = fragment[0] !== "/" ? getAnchorPointer(storedSchema, fragment) : fragment;
	  const doc = Object.freeze({
	    ...storedSchema,
	    pointer: pointer,
	    value: JsonPointer.get(pointer, storedSchema.schema)
	  });

	  return followReferences$1(doc);
	};

	const followReferences$1 = (doc) => Reference$1.isReference(doc.value) ? get(Reference$1.href(doc.value), doc) : doc;

	const getAnchorPointer = (schema, fragment) => {
	  if (!(fragment in schema.anchors)) {
	    throw Error(`No such anchor '${encodeURI(schema.id)}#${encodeURI(fragment)}'`);
	  }

	  return schema.anchors[fragment];
	};

	// Utility Functions
	const uri = (doc) => `${doc.id}#${encodeURI(doc.pointer)}`;
	const value = (doc) => Reference$1.isReference(doc.value) ? Reference$1.value(doc.value) : doc.value;
	const has = (key, doc) => key in value(doc);
	const typeOf = (doc, type) => jsonTypeOf(value(doc), type);

	const step = (key, doc) => {
	  const storedSchema = getStoredSchema(doc.id);
	  const nextDoc = Object.freeze({
	    ...doc,
	    pointer: JsonPointer.append(key, doc.pointer),
	    value: value(doc)[key],
	    validated: storedSchema.validated
	  });
	  return followReferences$1(nextDoc);
	};

	const keys = (doc) => Object.keys(value(doc));

	const entries = (doc) => Pact$1.pipeline([
	  value,
	  Object.keys,
	  Pact$1.map(async (key) => [key, await step(key, doc)]),
	  Pact$1.all
	], doc);

	const map = curry$1((fn, doc) => Pact$1.pipeline([
	  value,
	  Pact$1.map(async (item, ndx) => fn(await step(ndx, doc), ndx)),
	  Pact$1.all
	], doc));

	const length = (doc) => value(doc).length;

	const toSchemaDefaultOptions = {
	  parentId: "",
	  parentDialect: "",
	  includeEmbedded: true
	};
	const toSchema = (schemaDoc, options = {}) => {
	  const fullOptions = { ...toSchemaDefaultOptions, ...options };

	  const anchorToken = getConfig(schemaDoc.dialectId, "anchorToken");
	  const dynamicAnchorToken = getConfig(schemaDoc.dialectId, "dynamicAnchorToken");

	  const anchors = {};
	  for (const anchor in schemaDoc.anchors) {
	    if (anchor !== "" && !schemaDoc.dynamicAnchors[anchor]) {
	      anchors[schemaDoc.anchors[anchor]] = anchor;
	    }
	  }

	  const dynamicAnchors = {};
	  for (const anchor in schemaDoc.dynamicAnchors) {
	    const pointer = urlFragment(schemaDoc.dynamicAnchors[anchor]);
	    dynamicAnchors[pointer] = anchor;
	  }

	  const schema = JSON.parse(Json.stringify(schemaDoc.schema, (key, value, pointer) => {
	    if (Reference$1.isReference(value)) {
	      const refValue = Reference$1.value(value);
	      const embeddedDialect = typeof refValue.$schema === "string" ? resolveUrl$1(refValue.$schema, "") : schemaDoc.dialectId;
	      const embeddedToken = getConfig(embeddedDialect, "embeddedToken");
	      if (!fullOptions.includeEmbedded && embeddedToken in refValue) {
	        return;
	      } else {
	        return Reference$1.value(value);
	      }
	    } else {
	      if (pointer in anchors) {
	        value = { [anchorToken]: anchors[pointer], ...value };
	      }
	      if (pointer in dynamicAnchors) {
	        value = { [dynamicAnchorToken]: dynamicAnchors[pointer], ...value };
	      }
	      return value;
	    }
	  }));

	  const baseToken = getConfig(schemaDoc.dialectId, "baseToken");
	  const id = relativeUri(fullOptions.parentId, schemaDoc.id);
	  const dialect = fullOptions.parentDialect === schemaDoc.dialectId ? "" : schemaDoc.dialectId;
	  return {
	    ...(id && { [baseToken]: id }),
	    ...(dialect && { $schema: dialect }),
	    ...schema
	  };
	};

	const relativeUri = (from, to) => {
	  if (to.startsWith("file://")) {
	    const pathToSchema = from.slice(7, from.lastIndexOf("/"));
	    return from === "" ? "" : pathRelative(pathToSchema, to.slice(7));
	  } else {
	    return to;
	  }
	};

	var schema = {
	  setConfig, getConfig,
	  add: add$1, get, markValidated,
	  uri, value, getAnchorPointer, typeOf, has, step, keys, entries, map, length,
	  toSchema
	};

	class InvalidSchemaError$2 extends Error {
	  constructor(output) {
	    super("Invalid Schema");
	    this.name = this.constructor.name;
	    this.output = output;
	  }
	}

	var invalidSchemaError = InvalidSchemaError$2;

	const Schema$3 = schema;


	const compile$2 = (schema) => Schema$3.value(schema);
	const interpret$2 = () => true;

	var metaData$2 = { compile: compile$2, interpret: interpret$2 };

	const curry = justCurryIt$1;
	const PubSub$1 = pubsub.exports;
	const { resolveUrl } = common;
	const Instance$2 = instance;
	const Schema$2 = schema;
	const InvalidSchemaError$1 = invalidSchemaError;
	const MediaTypes = mediaTypes;
	const metaData$1 = metaData$2;


	const FLAG = "FLAG", BASIC = "BASIC", DETAILED = "DETAILED", VERBOSE = "VERBOSE";

	let metaOutputFormat = DETAILED;
	let shouldMetaValidate = true;

	MediaTypes.addPlugin("application/schema+json", {
	  parse: async (response, contentTypeParameters) => [
	    await response.json(),
	    contentTypeParameters.schema || contentTypeParameters.profile
	  ],
	  matcher: (path) => path.endsWith(".schema.json")
	});

	const validate$2 = async (schema, value = undefined, outputFormat = undefined) => {
	  const compiled = await compile$1(schema);
	  const interpretAst = (value, outputFormat) => interpret$1(compiled, Instance$2.cons(value), outputFormat);

	  return value === undefined ? interpretAst : interpretAst(value, outputFormat);
	};

	const compile$1 = async (schema) => {
	  const ast = { metaData: {} };
	  const schemaUri = await compileSchema(schema, ast);
	  return { ast, schemaUri };
	};

	const interpret$1 = curry(({ ast, schemaUri }, value, outputFormat = FLAG) => {
	  if (![FLAG, BASIC, DETAILED, VERBOSE].includes(outputFormat)) {
	    throw Error(`The '${outputFormat}' error format is not supported`);
	  }

	  const output = [];
	  const subscriptionToken = PubSub$1.subscribe("result", outputHandler(outputFormat, output));
	  interpretSchema(schemaUri, value, ast, {});
	  PubSub$1.unsubscribe(subscriptionToken);

	  return output[0];
	});

	const outputHandler = (outputFormat, output) => {
	  const resultStack = [];

	  return (message, keywordResult) => {
	    if (message === "result") {
	      const { keyword, absoluteKeywordLocation, instanceLocation, valid } = keywordResult;
	      const result = { keyword, absoluteKeywordLocation, instanceLocation, valid, errors: [] };
	      resultStack.push(result);
	    } else if (message === "result.start") {
	      resultStack.push(message);
	    } else if (message === "result.end") {
	      const result = resultStack.pop();
	      while (resultStack[resultStack.length - 1] !== "result.start") {
	        const topResult = resultStack.pop();

	        const errors = [topResult];
	        if (outputFormat === BASIC) {
	          errors.push(...topResult.errors);
	          delete topResult.errors;
	        }

	        if (outputFormat === VERBOSE || (outputFormat !== FLAG && !topResult.valid)) {
	          result.errors.unshift(...errors);
	        }
	      }
	      resultStack[resultStack.length - 1] = result;

	      output[0] = result;
	    }
	  };
	};

	const setMetaOutputFormat = (format) => {
	  metaOutputFormat = format;
	};

	const setShouldMetaValidate = (isEnabled) => {
	  shouldMetaValidate = isEnabled;
	};

	const _keywords = {};
	const getKeyword = (id) => _keywords[id] || metaData$1;
	const hasKeyword = (id) => id in _keywords;
	const addKeyword = (id, keywordHandler) => {
	  _keywords[id] = {
	    collectEvaluatedItems: (keywordValue, instance, ast, dynamicAnchors, isTop) => keywordHandler.interpret(keywordValue, instance, ast, dynamicAnchors, isTop) && new Set(),
	    collectEvaluatedProperties: (keywordValue, instance, ast, dynamicAnchors, isTop) => keywordHandler.interpret(keywordValue, instance, ast, dynamicAnchors, isTop) && [],
	    ...keywordHandler
	  };
	};

	const _vocabularies = {};
	const defineVocabulary = (id, keywords) => {
	  _vocabularies[id] = keywords;
	};

	const metaValidators = {};
	const compileSchema = async (schema, ast) => {
	  schema = await followReferences(schema);

	  // Vocabularies
	  if (!hasKeyword(`${schema.dialectId}#validate`)) {
	    const metaSchema = await Schema$2.get(schema.dialectId);

	    // Check for mandatory vocabularies
	    const mandatoryVocabularies = Schema$2.getConfig(metaSchema.id, "mandatoryVocabularies") || [];
	    mandatoryVocabularies.forEach((vocabularyId) => {
	      if (!metaSchema.vocabulary[vocabularyId]) {
	        throw Error(`Vocabulary '${vocabularyId}' must be explicitly declared and required`);
	      }
	    });

	    // Load vocabularies
	    Object.entries(metaSchema.vocabulary)
	      .forEach(([vocabularyId, isRequired]) => {
	        if (vocabularyId in _vocabularies) {
	          Object.entries(_vocabularies[vocabularyId])
	            .forEach(([keyword, keywordHandler]) => {
	              addKeyword(`${metaSchema.id}#${keyword}`, keywordHandler);
	            });
	        } else if (isRequired) {
	          throw Error(`Missing required vocabulary: ${vocabularyId}`);
	        }
	      });
	  }

	  // Meta validation
	  if (shouldMetaValidate && !schema.validated) {
	    Schema$2.markValidated(schema.id);

	    // Compile
	    if (!(schema.dialectId in metaValidators)) {
	      const metaSchema = await Schema$2.get(schema.dialectId);
	      const compiledSchema = await compile$1(metaSchema);
	      metaValidators[metaSchema.id] = interpret$1(compiledSchema);
	    }

	    // Interpret
	    const schemaInstance = Instance$2.cons(schema.schema, schema.id);
	    const metaResults = metaValidators[schema.dialectId](schemaInstance, metaOutputFormat);
	    if (!metaResults.valid) {
	      throw new InvalidSchemaError$1(metaResults);
	    }
	  }

	  // Compile
	  if (!(schema.id in ast.metaData)) {
	    ast.metaData[schema.id] = {
	      id: schema.id,
	      dynamicAnchors: schema.dynamicAnchors,
	      anchors: schema.anchors
	    };
	  }
	  return getKeyword(`${schema.dialectId}#validate`).compile(schema, ast);
	};

	const followReferences = async (doc) => {
	  return Schema$2.typeOf(doc, "string") ? followReferences(await Schema$2.get(Schema$2.value(doc), doc)) : doc;
	};

	const interpretSchema = (schemaUri, instance, ast, dynamicAnchors) => {
	  const keywordId = getKeywordId(schemaUri, ast);
	  const id = resolveUrl(schemaUri, "");
	  return getKeyword(keywordId).interpret(schemaUri, instance, ast, { ...ast.metaData[id].dynamicAnchors, ...dynamicAnchors });
	};

	const collectEvaluatedProperties$1 = (schemaUri, instance, ast, dynamicAnchors, isTop) => {
	  const keywordId = getKeywordId(schemaUri, ast);
	  return getKeyword(keywordId).collectEvaluatedProperties(schemaUri, instance, ast, dynamicAnchors, isTop);
	};

	const collectEvaluatedItems$1 = (schemaUri, instance, ast, dynamicAnchors, isTop) => {
	  const keywordId = getKeywordId(schemaUri, ast);
	  return getKeyword(keywordId).collectEvaluatedItems(schemaUri, instance, ast, dynamicAnchors, isTop);
	};

	const getKeywordId = (schemaUri, ast) => {
	  if (!(schemaUri in ast)) {
	    throw Error(`No schema found at ${schemaUri}`);
	  }

	  return ast[schemaUri][0];
	};

	const add = (schema, url = "", defaultSchemaVersion = "") => {
	  const id = Schema$2.add(schema, url, defaultSchemaVersion);
	  delete metaValidators[id];
	};

	var core = {
	  validate: validate$2, compile: compile$1, interpret: interpret$1,
	  setMetaOutputFormat, setShouldMetaValidate, FLAG, BASIC, DETAILED, VERBOSE,
	  add, getKeyword, hasKeyword, defineVocabulary,
	  compileSchema, interpretSchema, collectEvaluatedProperties: collectEvaluatedProperties$1, collectEvaluatedItems: collectEvaluatedItems$1,
	  addMediaTypePlugin: MediaTypes.addPlugin
	};

	const Pact = lib$2;
	const PubSub = pubsub.exports;
	const Core$1 = core;
	const Instance$1 = instance;
	const Schema$1 = schema;


	const compile = async (schema, ast) => {
	  const url = Schema$1.uri(schema);
	  if (!(url in ast)) {
	    ast[url] = false; // Place dummy entry in ast to avoid recursive loops

	    const schemaValue = Schema$1.value(schema);
	    if (!["object", "boolean"].includes(typeof schemaValue)) {
	      throw Error(`No schema found at '${Schema$1.uri(schema)}'`);
	    }

	    ast[url] = [
	      `${schema.dialectId}#validate`,
	      Schema$1.uri(schema),
	      typeof schemaValue === "boolean" ? schemaValue : await Pact.pipeline([
	        Schema$1.entries,
	        Pact.map(([keyword, keywordSchema]) => [`${schema.dialectId}#${keyword}`, keywordSchema]),
	        Pact.filter(([keywordId]) => keywordId !== `${schema.dialectId}#validate`),
	        Pact.map(async ([keywordId, keywordSchema]) => {
	          const keywordAst = await Core$1.getKeyword(keywordId).compile(keywordSchema, ast, schema);
	          return [keywordId, Schema$1.uri(keywordSchema), keywordAst];
	        }),
	        Pact.all
	      ], schema)
	    ];
	  }

	  return url;
	};

	const interpret = (uri, instance, ast, dynamicAnchors) => {
	  const [keywordId, schemaUrl, nodes] = ast[uri];

	  PubSub.publishSync("result.start");
	  const isValid = typeof nodes === "boolean" ? nodes : nodes
	    .every(([keywordId, schemaUrl, keywordValue]) => {
	      PubSub.publishSync("result.start");
	      const isValid = Core$1.getKeyword(keywordId).interpret(keywordValue, instance, ast, dynamicAnchors);

	      PubSub.publishSync("result", {
	        keyword: keywordId,
	        absoluteKeywordLocation: schemaUrl,
	        instanceLocation: Instance$1.uri(instance),
	        valid: isValid,
	        ast: keywordValue
	      });
	      PubSub.publishSync("result.end");
	      return isValid;
	    });

	  PubSub.publishSync("result", {
	    keyword: keywordId,
	    absoluteKeywordLocation: schemaUrl,
	    instanceLocation: Instance$1.uri(instance),
	    valid: isValid,
	    ast: uri
	  });
	  PubSub.publishSync("result.end");
	  return isValid;
	};

	const collectEvaluatedProperties = (uri, instance, ast, dynamicAnchors, isTop = false) => {
	  const nodes = ast[uri][2];

	  if (typeof nodes === "boolean") {
	    return nodes ? [] : false;
	  }

	  return nodes
	    .filter(([keywordId]) => !isTop || !keywordId.endsWith("#unevaluatedProperties"))
	    .reduce((acc, [keywordId, , keywordValue]) => {
	      const propertyNames = acc && Core$1.getKeyword(keywordId).collectEvaluatedProperties(keywordValue, instance, ast, dynamicAnchors);
	      return propertyNames !== false && [...acc, ...propertyNames];
	    }, []);
	};

	const collectEvaluatedItems = (uri, instance, ast, dynamicAnchors, isTop = false) => {
	  const nodes = ast[uri][2];

	  if (typeof nodes === "boolean") {
	    return nodes ? new Set() : false;
	  }

	  return nodes
	    .filter(([keywordId]) => !isTop || !keywordId.endsWith("#unevaluatedItems"))
	    .reduce((acc, [keywordId, , keywordValue]) => {
	      const itemIndexes = acc !== false && Core$1.getKeyword(keywordId).collectEvaluatedItems(keywordValue, instance, ast, dynamicAnchors);
	      return itemIndexes !== false && new Set([...acc, ...itemIndexes]);
	    }, new Set());
	};

	var validate$1 = { compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };

	const metaData = metaData$2;
	const validate = validate$1;


	var keywords = { metaData, validate };

	const Core = core;
	const Schema = schema;
	const Instance = instance;
	const Reference = reference;
	const Keywords = keywords;
	const InvalidSchemaError = invalidSchemaError;


	var lib = { Core, Schema, Instance, Reference, Keywords, InvalidSchemaError };

	exports["default"] = lib;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=json-schema-core-umd.js.map
