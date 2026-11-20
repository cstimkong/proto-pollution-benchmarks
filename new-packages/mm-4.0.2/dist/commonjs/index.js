"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restore = exports.https = exports.http = exports.mm = exports.isMocked = void 0;
exports.mock = mock;
exports.datas = mockDatas;
exports.mockDatas = mockDatas;
exports.data = mockData;
exports.mockData = mockData;
exports.dataWithAsyncDispose = dataWithAsyncDispose;
exports.empty = mockEmpty;
exports.mockEmpty = mockEmpty;
exports.error = mockError;
exports.mockError = mockError;
exports.spy = spy;
exports.errorOnce = errorOnce;
exports.syncError = syncError;
exports.syncEmpty = syncEmpty;
exports.syncData = syncData;
exports.spawn = spawn;
exports.classMethod = classMethod;
const node_events_1 = require("node:events");
const node_http_1 = __importDefault(require("node:http"));
const node_https_1 = __importDefault(require("node:https"));
const node_child_process_1 = __importDefault(require("node:child_process"));
const promises_1 = require("node:timers/promises");
const node_stream_1 = require("node:stream");
const muk_prop_1 = require("@cnpmjs/muk-prop");
Object.defineProperty(exports, "isMocked", { enumerable: true, get: function () { return muk_prop_1.isMocked; } });
Object.defineProperty(exports, "restore", { enumerable: true, get: function () { return muk_prop_1.restore; } });
const is_type_of_1 = __importDefault(require("is-type-of"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const thenify_1 = __importDefault(require("thenify"));
function mock(target, property, value) {
    value = spyFunction(target, property, value);
    return (0, muk_prop_1.muk)(target, property, value);
}
function spyFunction(target, property, fn) {
    if (!is_type_of_1.default.function(fn))
        return fn;
    // support mock with jest.fn()
    if (fn._isMockFunction && fn.mock)
        return fn;
    // don't allow mock async function to common function
    const isGenerator = is_type_of_1.default.generatorFunction(fn);
    const isAsyncLike = !isGenerator && isAsyncLikeFunction(target, property);
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            fn.called = fn.called || 0;
            fn.calledArguments = fn.calledArguments || [];
            fn.calledArguments.push(args);
            fn.lastCalledArguments = args;
            fn.called++;
            const res = Reflect.apply(target, thisArg, args);
            if (isAsyncLike && !is_type_of_1.default.promise(res)) {
                throw new Error(`Can\'t mock async function to normal function for property "${String(property)}"`);
            }
            return res;
        },
    });
}
function isAsyncLikeFunction(target, property) {
    // don't call getter
    // Object.getOwnPropertyDescriptor can't find getter in prototypes
    if (typeof target.__lookupGetter__ === 'function' && target.__lookupGetter__(property))
        return false;
    return is_type_of_1.default.asyncFunction(target[property]) || is_type_of_1.default.generatorFunction(target[property]);
}
function getCallback(args) {
    let index = args.length - 1;
    let callback = args[index];
    while (typeof callback !== 'function') {
        index--;
        if (index < 0) {
            break;
        }
        callback = args[index];
    }
    if (!callback) {
        throw new TypeError('Can\'t find callback function');
    }
    // support thunk fn(a1, a2, cb, cbThunk)
    if (typeof args[index - 1] === 'function') {
        callback = args[index - 1];
    }
    return callback;
}
/**
 * create an error instance
 *
 * @param  {String|Error} error - error
 * @param  {Object} props - props
 * @return {Error} error - error
 */
function _createError(error, props) {
    if (!error) {
        error = new Error('mm mock error');
        error.name = 'MockError';
    }
    if (typeof error === 'string') {
        error = new Error(error);
        error.name = 'MockError';
    }
    Object.assign(error, props);
    return error;
}
function _mockError(mod, method, error, props, timeout, once) {
    if (typeof props === 'number') {
        timeout = props;
        props = {};
    }
    error = _createError(error, props);
    if (typeof timeout !== 'number') {
        timeout = parseInt(String(timeout || '0'), 10);
    }
    const isGeneratorFunction = is_type_of_1.default.generatorFunction(mod[method]);
    const isAsyncFunction = is_type_of_1.default.asyncFunction(mod[method]);
    if (isGeneratorFunction) {
        mock(mod, method, function* () {
            yield promises_1.scheduler.wait(timeout);
            if (once) {
                (0, muk_prop_1.restore)();
            }
            throw error;
        });
    }
    else if (isAsyncFunction) {
        mock(mod, method, async function () {
            await promises_1.scheduler.wait(timeout);
            if (once) {
                (0, muk_prop_1.restore)();
            }
            throw error;
        });
    }
    mock(mod, method, thenify_1.default.withCallback((...args) => {
        const callback = getCallback(args);
        setTimeout(() => {
            if (once) {
                (0, muk_prop_1.restore)();
            }
            callback(error);
        }, timeout);
    }));
}
/**
 * Mock async function error.
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {String|Error} error, error string message or error instance.
 * @param {Object} props, error properties
 * @param {Number} timeout, mock async callback timeout, default is 0.
 */
function mockError(mod, method, error, props, timeout) {
    return _mockError(mod, method, error, props, timeout);
}
/**
 * Mock async function error once.
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {String|Error} error, error string message or error instance.
 * @param {Object} props, error properties
 * @param {Number} timeout, mock async callback timeout, default is 0.
 */
function errorOnce(mod, method, error, props, timeout) {
    return _mockError(mod, method, error, props, timeout, true);
}
/**
 * mock return callback(null, data1, data2).
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {Array} datas, return datas array.
 * @param {Number} timeout, mock async callback timeout, default is 10.
 */
function mockDatas(mod, method, datas, timeout) {
    if (timeout) {
        timeout = parseInt(String(timeout), 10);
    }
    timeout = timeout || 0;
    const isGeneratorFunction = is_type_of_1.default.generatorFunction(mod[method]);
    const isAsyncFunction = is_type_of_1.default.asyncFunction(mod[method]);
    if (isGeneratorFunction) {
        mock(mod, method, function* () {
            yield promises_1.scheduler.wait(timeout);
            return datas;
        });
        return;
    }
    else if (isAsyncFunction) {
        mock(mod, method, async function () {
            await promises_1.scheduler.wait(timeout);
            return datas;
        });
        return;
    }
    if (!Array.isArray(datas)) {
        datas = [datas];
    }
    mock(mod, method, thenify_1.default.withCallback((...args) => {
        const callback = getCallback(args);
        setTimeout(() => {
            callback.apply(mod, [null].concat(datas));
        }, timeout);
    }));
}
/**
 * mock return callback(null, data).
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {Object} data, return data.
 * @param {Number} timeout, mock async callback timeout, default is 0.
 */
function mockData(mod, method, data, timeout) {
    const isGeneratorFunction = is_type_of_1.default.generatorFunction(mod[method]);
    const isAsyncFunction = is_type_of_1.default.asyncFunction(mod[method]);
    if (isGeneratorFunction || isAsyncFunction) {
        return mockDatas(mod, method, data, timeout);
    }
    return mockDatas(mod, method, [data], timeout);
}
function dataWithAsyncDispose(mod, method, data, timeout) {
    data = {
        ...data,
        async [Symbol.asyncDispose]() {
            // do nothing
        },
    };
    return mockData(mod, method, data, timeout);
}
/**
 * mock return callback(null, null).
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {Number} [timeout], mock async callback timeout, default is 0.
 */
function mockEmpty(mod, method, timeout) {
    return mockDatas(mod, method, [null], timeout);
}
/**
 * spy a function
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 */
function spy(mod, method) {
    if (typeof mod[method] !== 'function') {
        throw new Error(`spy target ${String(method)} is not a function`);
    }
    const originalFn = mod[method];
    const wrap = function proxy(...args) {
        return originalFn.apply(this, args);
    };
    mock(mod, method, wrap);
}
/**
 * mock function sync throw error
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {String|Error} error, error string message or error instance.
 * @param {Object} [props], error properties
 */
function syncError(mod, method, error, props) {
    error = _createError(error, props);
    mock(mod, method, () => {
        throw error;
    });
}
/**
 * mock function sync return data
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {Object} data, return data.
 */
function syncData(mod, method, data) {
    mock(mod, method, () => {
        return data;
    });
}
/**
 * mock function sync return nothing
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 */
function syncEmpty(mod, method) {
    return syncData(mod, method);
}
function matchURL(options, params) {
    const url = params && params.url || params;
    const host = params && params.host;
    const pathname = options.path || options.pathname;
    const hostname = options.host || options.hostname;
    let match = false;
    if (pathname) {
        if (!url) {
            match = true;
        }
        else if (typeof url === 'string') {
            match = pathname === url;
        }
        else if (url instanceof RegExp) {
            match = url.test(pathname);
        }
        else if (typeof host === 'string') {
            match = host === hostname;
        }
        else if (host instanceof RegExp) {
            match = host.test(hostname);
        }
    }
    return match;
}
function mockRequest() {
    const req = new node_stream_1.Duplex({
        write() { },
        read() { },
    });
    req.abort = () => {
        req._aborted = true;
        process.nextTick(() => {
            const err = new Error('socket hang up');
            Reflect.set(err, 'code', 'ECONNRESET');
            req.emit('error', err);
        });
    };
    req.socket = { remoteAddress: '127.0.0.1' };
    return req;
}
/**
 * Mock http.request().
 * @param {String|RegExp|Object} url, request url path.
 *   If url is Object, should be {url: $url, host: $host}
 * @param {String|Buffer|ReadStream} data, mock response data.
 *   If data is Array, then res will emit `data` event many times.
 * @param {Object} headers, mock response headers.
 * @param {Number} [delay], response delay time, default is 10.
 */
function mockHttpRequest(url, data, headers, delay) {
    backupOriginalRequest(node_http_1.default);
    return _request(node_http_1.default, url, data, headers, delay);
}
/**
 * Mock https.request().
 * @param {String|RegExp|Object} url, request url path.
 *   If url is Object, should be {url: $url, host: $host}
 * @param {String|Buffer|ReadStream} data, mock response data.
 *   If data is Array, then res will emit `data` event many times.
 * @param {Object} headers, mock response headers.
 * @param {Number} [delay], response delay time, default is 0.
 */
function mockHttpsRequest(url, data, headers, delay) {
    backupOriginalRequest(node_https_1.default);
    return _request(node_https_1.default, url, data, headers, delay);
}
function backupOriginalRequest(mod) {
    if (!mod.__sourceRequest) {
        mod.__sourceRequest = mod.request;
    }
    if (!mod.__sourceGet) {
        mod.__sourceGet = mod.get;
    }
}
function _request(mod, url, data, headers, delay) {
    headers = headers || {};
    if (delay) {
        delay = parseInt(String(delay), 10);
    }
    delay = delay || 0;
    // mod.get = function(options: any, callback: any) {
    //   const req = mod.request(options, callback);
    //   req.end();
    //   return req;
    // };
    mock(mod, 'get', function (options, callback) {
        const req = mod.request(options, callback);
        req.end();
        return req;
    });
    mock(mod, 'request', function (options, callback) {
        let datas = [];
        let stream = null; // read stream
        if (typeof data.read === 'function') {
            stream = data;
        }
        else if (!Array.isArray(data)) {
            datas = [data];
        }
        else {
            for (let i = 0; i < data.length; i++) {
                datas.push(data[i]);
            }
        }
        const match = matchURL(options, url);
        if (!match) {
            return mod.__sourceRequest(options, callback);
        }
        const req = mockRequest();
        if (callback) {
            req.on('response', callback);
        }
        let res;
        if (stream) {
            res = stream;
        }
        else {
            res = new node_stream_1.Readable({
                read() {
                    let chunk = datas.shift();
                    if (!chunk) {
                        if (!req._aborted) {
                            this.push(null);
                        }
                        return;
                    }
                    if (!req._aborted) {
                        if (typeof chunk === 'string') {
                            chunk = Buffer.from(chunk);
                        }
                        if ('charset' in this && this.charset) {
                            chunk = chunk.toString(this.charset);
                        }
                        this.push(chunk);
                    }
                },
            });
            res.setEncoding = function (charset) {
                res.charset = charset;
            };
        }
        res.statusCode = headers.statusCode || 200;
        res.headers = omit(headers, 'statusCode');
        res.socket = req.socket;
        function sendResponse() {
            if (!req._aborted) {
                req.emit('response', res);
            }
        }
        if (delay) {
            setTimeout(sendResponse, delay);
        }
        else {
            setImmediate(sendResponse);
        }
        return req;
    });
}
/**
 * Mock http.request() error.
 * @param {String|RegExp} url, request url path.
 * @param {String|Error} reqError, request error.
 * @param {String|Error} resError, response error.
 * @param {Number} [delay], request error delay time, default is 0.
 */
function mockHttpRequestError(url, reqError, resError, delay) {
    backupOriginalRequest(node_http_1.default);
    _requestError(node_http_1.default, url, reqError, resError, delay);
}
/**
 * Mock https.request() error.
 * @param {String|RegExp} url, request url path.
 * @param {String|Error} reqError, request error.
 * @param {String|Error} resError, response error.
 * @param {Number} [delay], request error delay time, default is 0.
 */
function mockHttpsRequestError(url, reqError, resError, delay) {
    backupOriginalRequest(node_https_1.default);
    _requestError(node_https_1.default, url, reqError, resError, delay);
}
function _requestError(mod, url, reqError, resError, delay) {
    if (delay) {
        delay = parseInt(String(delay), 10);
    }
    delay = delay || 0;
    if (reqError && typeof reqError === 'string') {
        reqError = new Error(reqError);
        reqError.name = 'MockHttpRequestError';
    }
    if (resError && typeof resError === 'string') {
        resError = new Error(resError);
        resError.name = 'MockHttpResponseError';
    }
    mock(mod, 'get', function (options, callback) {
        const req = mod.request(options, callback);
        req.end();
        return req;
    });
    mock(mod, 'request', function (options, callback) {
        const match = matchURL(options, url);
        if (!match) {
            return mod.__sourceRequest(options, callback);
        }
        const req = mockRequest();
        if (callback) {
            req.on('response', callback);
        }
        setTimeout(function () {
            if (reqError) {
                return req.emit('error', reqError);
            }
            const res = new node_stream_1.Duplex({
                read() { },
                write() { },
            });
            res.socket = req.socket;
            res.statusCode = 200;
            res.headers = {
                server: 'MockMateServer',
            };
            process.nextTick(() => {
                if (!req._aborted) {
                    req.emit('error', resError);
                }
            });
            if (!req._aborted) {
                req.emit('response', res);
            }
        }, delay);
        return req;
    });
}
/**
 * mock child_process spawn
 * @param {Integer} code exit code
 * @param {String} stdout stdout
 * @param {String} stderr stderr
 * @param {Integer} timeout stdout/stderr/close event emit timeout
 */
function spawn(code, stdout, stderr, timeout = 0) {
    const evt = new node_events_1.EventEmitter();
    mock(node_child_process_1.default, 'spawn', () => {
        return evt;
    });
    setTimeout(() => {
        stdout && evt.emit('stdout', stdout);
        stderr && evt.emit('stderr', stderr);
        evt.emit('close', code);
        evt.emit('exit', code);
    }, timeout);
}
function omit(obj, key) {
    const newObj = {};
    for (const k in obj) {
        if (k !== key) {
            newObj[k] = obj[k];
        }
    }
    return newObj;
}
/**
 * mock class method from instance
 */
function classMethod(instance, property, value) {
    mock(instance.constructor.prototype, property, value);
}
const mockHttp = {
    request: mockHttpRequest,
    requestError: mockHttpRequestError,
};
exports.http = mockHttp;
const mockHttps = {
    request: mockHttpsRequest,
    requestError: mockHttpsRequestError,
};
exports.https = mockHttps;
const _mock = Object.assign(mock, {
    isMocked: muk_prop_1.isMocked,
    mock,
    mm: mock,
    datas: mockDatas,
    mockDatas,
    data: mockData,
    mockData,
    dataWithAsyncDispose,
    empty: mockEmpty,
    mockEmpty,
    error: mockError,
    mockError,
    spy,
    errorOnce,
    syncError,
    syncEmpty,
    syncData,
    http: mockHttp,
    https: mockHttps,
    spawn,
    restore: muk_prop_1.restore,
    classMethod,
});
exports.mm = _mock;
// import mm from 'mm';
const proxyMock = new Proxy(_mock, {
    apply(target, _, args) {
        return target(args[0], args[1], args[2]);
    },
    get(_target, property, receiver) {
        // import mm from 'mm';
        // mm.isMocked(foo, 'bar')
        return Reflect.get(_target, property, receiver);
    },
});
// import mm from 'mm';
// mm.restore();
exports.default = proxyMock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBaW9CRSxvQkFBSTtBQUVTLDBCQUFLO0FBQ2xCLDhCQUFTO0FBQ0csd0JBQUk7QUFDaEIsNEJBQVE7QUFDUixvREFBb0I7QUFDUCwwQkFBSztBQUNsQiw4QkFBUztBQUNJLDBCQUFLO0FBQ2xCLDhCQUFTO0FBQ1Qsa0JBQUc7QUFDSCw4QkFBUztBQUNULDhCQUFTO0FBQ1QsOEJBQVM7QUFDVCw0QkFBUTtBQUdSLHNCQUFLO0FBRUwsa0NBQVc7QUFycEJiLDZDQUEyQztBQUMzQywwREFBNkI7QUFDN0IsNERBQStCO0FBQy9CLDRFQUFvQztBQUNwQyxtREFBaUQ7QUFDakQsNkNBQStDO0FBQy9DLCtDQUEwRDtBQTBuQnhELHlGQTFuQlksbUJBQVEsT0EwbkJaO0FBb0JSLHdGQTlvQnNCLGtCQUFPLE9BOG9CdEI7QUE3b0JULDREQUE0QjtBQUM1Qiw2REFBNkQ7QUFDN0QsYUFBYTtBQUNiLHNEQUE4QjtBQUU5QixTQUFTLElBQUksQ0FBQyxNQUFXLEVBQUUsUUFBcUIsRUFBRSxLQUFXO0lBQzNELEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QyxPQUFPLElBQUEsY0FBRyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE1BQVcsRUFBRSxRQUFxQixFQUFFLEVBQU87SUFDOUQsSUFBSSxDQUFDLG9CQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLDhCQUE4QjtJQUM5QixJQUFJLEVBQUUsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLElBQUk7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUU3QyxxREFBcUQ7SUFDckQsTUFBTSxX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