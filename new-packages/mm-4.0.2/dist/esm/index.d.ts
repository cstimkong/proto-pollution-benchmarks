import { Readable } from 'node:stream';
import { isMocked, restore } from '@cnpmjs/muk-prop';
declare function mock(target: any, property: PropertyKey, value?: any): void;
export type MockError = Error | string;
/**
 * Mock async function error.
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {String|Error} error, error string message or error instance.
 * @param {Object} props, error properties
 * @param {Number} timeout, mock async callback timeout, default is 0.
 */
declare function mockError(mod: any, method: string | symbol, error?: MockError, props?: Record<string, any> | number, timeout?: number): void;
/**
 * Mock async function error once.
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {String|Error} error, error string message or error instance.
 * @param {Object} props, error properties
 * @param {Number} timeout, mock async callback timeout, default is 0.
 */
declare function errorOnce(mod: any, method: string | symbol, error?: MockError, props?: Record<string, any> | number, timeout?: number): void;
/**
 * mock return callback(null, data1, data2).
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {Array} datas, return datas array.
 * @param {Number} timeout, mock async callback timeout, default is 10.
 */
declare function mockDatas(mod: any, method: string | symbol, datas: any[] | any, timeout?: number): void;
/**
 * mock return callback(null, data).
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {Object} data, return data.
 * @param {Number} timeout, mock async callback timeout, default is 0.
 */
declare function mockData(mod: any, method: string | symbol, data: any, timeout?: number): void;
declare function dataWithAsyncDispose(mod: any, method: string | symbol, data: any, timeout?: number): void;
/**
 * mock return callback(null, null).
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {Number} [timeout], mock async callback timeout, default is 0.
 */
declare function mockEmpty(mod: any, method: string | symbol, timeout?: number): void;
/**
 * spy a function
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 */
declare function spy(mod: any, method: string | symbol): void;
/**
 * mock function sync throw error
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {String|Error} error, error string message or error instance.
 * @param {Object} [props], error properties
 */
declare function syncError(mod: any, method: string | symbol, error?: MockError, props?: Record<string, any>): void;
/**
 * mock function sync return data
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 * @param {Object} data, return data.
 */
declare function syncData(mod: any, method: string | symbol, data?: any): void;
/**
 * mock function sync return nothing
 *
 * @param {Object} mod, module object
 * @param {String} method, mock module object method name.
 */
declare function syncEmpty(mod: any, method: string | symbol): void;
export type RequestURL = string | RegExp | URL | object;
export type ResponseData = string | Buffer | Readable;
/**
 * Mock http.request().
 * @param {String|RegExp|Object} url, request url path.
 *   If url is Object, should be {url: $url, host: $host}
 * @param {String|Buffer|ReadStream} data, mock response data.
 *   If data is Array, then res will emit `data` event many times.
 * @param {Object} headers, mock response headers.
 * @param {Number} [delay], response delay time, default is 10.
 */
declare function mockHttpRequest(url: RequestURL, data: ResponseData, headers?: Record<string, any>, delay?: number): void;
/**
 * Mock https.request().
 * @param {String|RegExp|Object} url, request url path.
 *   If url is Object, should be {url: $url, host: $host}
 * @param {String|Buffer|ReadStream} data, mock response data.
 *   If data is Array, then res will emit `data` event many times.
 * @param {Object} headers, mock response headers.
 * @param {Number} [delay], response delay time, default is 0.
 */
declare function mockHttpsRequest(url: RequestURL, data: ResponseData, headers?: Record<string, any>, delay?: number): void;
/**
 * Mock http.request() error.
 * @param {String|RegExp} url, request url path.
 * @param {String|Error} reqError, request error.
 * @param {String|Error} resError, response error.
 * @param {Number} [delay], request error delay time, default is 0.
 */
declare function mockHttpRequestError(url: RequestURL, reqError?: MockError, resError?: MockError, delay?: number): void;
/**
 * Mock https.request() error.
 * @param {String|RegExp} url, request url path.
 * @param {String|Error} reqError, request error.
 * @param {String|Error} resError, response error.
 * @param {Number} [delay], request error delay time, default is 0.
 */
declare function mockHttpsRequestError(url: RequestURL, reqError?: MockError, resError?: MockError, delay?: number): void;
/**
 * mock child_process spawn
 * @param {Integer} code exit code
 * @param {String} stdout stdout
 * @param {String} stderr stderr
 * @param {Integer} timeout stdout/stderr/close event emit timeout
 */
declare function spawn(code: number, stdout: string, stderr: string, timeout?: number): void;
/**
 * mock class method from instance
 */
declare function classMethod(instance: any, property: PropertyKey, value?: any): void;
declare const mockHttp: {
    request: typeof mockHttpRequest;
    requestError: typeof mockHttpRequestError;
};
declare const mockHttps: {
    request: typeof mockHttpsRequest;
    requestError: typeof mockHttpsRequestError;
};
declare const _mock: typeof mock & {
    isMocked: typeof isMocked;
    mock: typeof mock;
    mm: typeof mock;
    datas: typeof mockDatas;
    mockDatas: typeof mockDatas;
    data: typeof mockData;
    mockData: typeof mockData;
    dataWithAsyncDispose: typeof dataWithAsyncDispose;
    empty: typeof mockEmpty;
    mockEmpty: typeof mockEmpty;
    error: typeof mockError;
    mockError: typeof mockError;
    spy: typeof spy;
    errorOnce: typeof errorOnce;
    syncError: typeof syncError;
    syncEmpty: typeof syncEmpty;
    syncData: typeof syncData;
    http: {
        request: typeof mockHttpRequest;
        requestError: typeof mockHttpRequestError;
    };
    https: {
        request: typeof mockHttpsRequest;
        requestError: typeof mockHttpsRequestError;
    };
    spawn: typeof spawn;
    restore: typeof restore;
    classMethod: typeof classMethod;
};
declare const proxyMock: ((target: any, property: PropertyKey, value?: any) => void) & typeof _mock;
export default proxyMock;
export { isMocked, mock, _mock as mm, mockDatas as datas, mockDatas, mockData as data, mockData, dataWithAsyncDispose, mockEmpty as empty, mockEmpty, mockError as error, mockError, spy, errorOnce, syncError, syncEmpty, syncData, mockHttp as http, mockHttps as https, spawn, restore, classMethod, };
