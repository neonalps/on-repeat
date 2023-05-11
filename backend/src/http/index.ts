import { Dispatcher, request } from 'undici';
import { HTTP_METHOD } from './constants';
import { ApiResponse } from '@src/models/interface/api-response';

const performRequest = async <T> (url: string, options?: { dispatcher?: Dispatcher } & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> & Partial<Pick<Dispatcher.RequestOptions, 'method'>>): Promise<ApiResponse<T>> => {
    const { statusCode, body } = await request(url, options);

    return {
        statusCode,
        body: await body.json() as T
    }
};

const get = async <T> (url: string, options?: { dispatcher?: Dispatcher } & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> & Partial<Pick<Dispatcher.RequestOptions, 'method'>>): Promise<ApiResponse<T>> => {
    return performRequest(url, { ...options, method: HTTP_METHOD.GET });
};

const post = async <T> (url: string, options?: { dispatcher?: Dispatcher } & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> & Partial<Pick<Dispatcher.RequestOptions, 'method'>>): Promise<ApiResponse<T>> => {
    return performRequest(url, { ...options, method: HTTP_METHOD.POST });
};

const http = {
    get,
    post
};

export default http;