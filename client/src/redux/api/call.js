'use strict';

import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';

import { getCookie } from 'utils/cookie';
import { requestFail, requestPending, requestSuccess } from './request';
import { SET_IS_404 } from 'containers/App/redux/constants';

const defaultHeaders = (token) => {
    const authHeader = token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...authHeader,
    };
};

export default ({
    type,
    method, // one of 'get', 'post', 'put', 'delete'
    path,
    baseURL,
    params: sagaParams,
    headers,
    responseType,
    appToken,
    auth,
    stealthy,
    success, // Can be function generator to use yield
    fail, // Can be function generator to use yield
    payloadOnSuccess,
    payloadOnFail,
}) =>
    function* (action) {
        const payload = action.payload || {};
        const {
            data,
            params,
            headers: customHeaders,
            success: successCallback,
            fail: failCallback,
            onUploadProgress,
            onDownloadProgress,
            resolve,
            reject,
        } = payload;

        const accessToken = getCookie('appToken');
        const token = appToken || accessToken;
        try {
            if (!stealthy) {
                yield put({
                    type: requestPending(type),
                });
            }

            const finalHeaders = {
                ...defaultHeaders(token),
                ...headers,
                ...(customHeaders ? customHeaders : {}),
            };

            const res = yield call(axios.request, {
                url: typeof path === 'function' ? path(action) : path,
                method: method.toLowerCase(),
                headers: finalHeaders,
                data,
                params: { ...sagaParams, ...params },
                baseURL: baseURL || 'http://localhost:8082/',
                onUploadProgress,
                onDownloadProgress,
                responseType,
            });

            const payload = payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data;
            yield put({
                type: requestSuccess(type),
                payload,
            });

            yield put({
                type: SET_IS_404,
                payload: false,
            });

            if (resolve) {
                // Promise parameter
                yield resolve(payload);
            }

            if (success) {
                yield success(res, action);
            }
            successCallback && successCallback(payload);

            return true;
        } catch (err) {
            let errRes = err;
            if (err.response) {
                errRes = new Error(get(err, 'response.data.message', 'Error'));
            } else {
                yield put({
                    type: SET_IS_404,
                    payload: true,
                });
            }

            const payload = payloadOnFail ? payloadOnFail(errRes, action) : errRes;
            if (!stealthy) {
                yield put({
                    type: requestFail(type),
                    payload,
                    error: true,
                });
            }

            if (reject) {
                // Promise parameter
                yield reject(payload);
            }

            if (fail) {
                yield fail(errRes);
            }

            failCallback && failCallback(errRes);

            return false;
        }
    };
