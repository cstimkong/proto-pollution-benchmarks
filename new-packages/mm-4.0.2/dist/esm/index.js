import { EventEmitter } from 'node:events';
import http from 'node:http';
import https from 'node:https';
import cp from 'node:child_process';
import { scheduler } from 'node:timers/promises';
import { Readable, Duplex } from 'node:stream';
import { muk, isMocked, restore } from '@cnpmjs/muk-prop';
import is from 'is-type-of';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import thenify from 'thenify';
function mock(target, property, value) {
    value = spyFunction(target, property, value);
    return muk(target, property, value);
}
function spyFunction(target, property, fn) {
    if (!is.function(fn))
        return fn;
    // support mock with jest.fn()
    if (fn._isMockFunction && fn.mock)
        return fn;
    // don't allow mock async function to common function
    const isGenerator = is.generatorFunction(fn);
    const isAsyncLike = !isGenerator && isAsyncLikeFunction(target, property);
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            fn.called = fn.called || 0;
            fn.calledArguments = fn.calledArguments || [];
            fn.calledArguments.push(args);
            fn.lastCalledArguments = args;
            fn.called++;
            const res = Reflect.apply(target, thisArg, args);
            if (isAsyncLike && !is.promise(res)) {
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
    return is.asyncFunction(target[property]) || is.generatorFunction(target[property]);
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
    const isGeneratorFunction = is.generatorFunction(mod[method]);
    const isAsyncFunction = is.asyncFunction(mod[method]);
    if (isGeneratorFunction) {
        mock(mod, method, function* () {
            yield scheduler.wait(timeout);
            if (once) {
                restore();
            }
            throw error;
        });
    }
    else if (isAsyncFunction) {
        mock(mod, method, async function () {
            await scheduler.wait(timeout);
            if (once) {
                restore();
            }
            throw error;
        });
    }
    mock(mod, method, thenify.withCallback((...args) => {
        const callback = getCallback(args);
        setTimeout(() => {
            if (once) {
                restore();
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
    const isGeneratorFunction = is.generatorFunction(mod[method]);
    const isAsyncFunction = is.asyncFunction(mod[method]);
    if (isGeneratorFunction) {
        mock(mod, method, function* () {
            yield scheduler.wait(timeout);
            return datas;
        });
        return;
    }
    else if (isAsyncFunction) {
        mock(mod, method, async function () {
            await scheduler.wait(timeout);
            return datas;
        });
        return;
    }
    if (!Array.isArray(datas)) {
        datas = [datas];
    }
    mock(mod, method, thenify.withCallback((...args) => {
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
    const isGeneratorFunction = is.generatorFunction(mod[method]);
    const isAsyncFunction = is.asyncFunction(mod[method]);
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
    const req = new Duplex({
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
    backupOriginalRequest(http);
    return _request(http, url, data, headers, delay);
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
    backupOriginalRequest(https);
    return _request(https, url, data, headers, delay);
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
            res = new Readable({
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
    backupOriginalRequest(http);
    _requestError(http, url, reqError, resError, delay);
}
/**
 * Mock https.request() error.
 * @param {String|RegExp} url, request url path.
 * @param {String|Error} reqError, request error.
 * @param {String|Error} resError, response error.
 * @param {Number} [delay], request error delay time, default is 0.
 */
function mockHttpsRequestError(url, reqError, resError, delay) {
    backupOriginalRequest(https);
    _requestError(https, url, reqError, resError, delay);
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
            const res = new Duplex({
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
    const evt = new EventEmitter();
    mock(cp, 'spawn', () => {
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
const mockHttps = {
    request: mockHttpsRequest,
    requestError: mockHttpsRequestError,
};
const _mock = Object.assign(mock, {
    isMocked,
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
    restore,
    classMethod,
});
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
export default proxyMock;
// import { mm, restore } from 'mm';
export { isMocked, mock, _mock as mm, mockDatas as datas, mockDatas, mockData as data, mockData, dataWithAsyncDispose, mockEmpty as empty, mockEmpty, mockError as error, mockError, spy, errorOnce, syncError, syncEmpty, syncData, mockHttp as http, mockHttps as https, spawn, restore, classMethod, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLElBQUksTUFBTSxXQUFXLENBQUM7QUFDN0IsT0FBTyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMvQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUIsNkRBQTZEO0FBQzdELGFBQWE7QUFDYixPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFOUIsU0FBUyxJQUFJLENBQUMsTUFBVyxFQUFFLFFBQXFCLEVBQUUsS0FBVztJQUMzRCxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0MsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsTUFBVyxFQUFFLFFBQXFCLEVBQUUsRUFBTztJQUM5RCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNoQyw4QkFBOEI7SUFDOUIsSUFBSSxFQUFFLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyxJQUFJO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFFN0MscURBQXFEO0lBQ3JELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FB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