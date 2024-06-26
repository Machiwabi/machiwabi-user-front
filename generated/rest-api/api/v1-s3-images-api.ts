/* tslint:disable */
/* eslint-disable */
/**
 * Nestjs Auth0 Template API
 * Nestjs Auth0 Template API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { AwsS3PresignedUrlEntity } from '../types';
/**
 * V1S3ImagesApi - axios parameter creator
 * @export
 */
export const V1S3ImagesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Pre-Signed URLを取得する
         * @param {string} fileName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSignedUrl: async (fileName: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'fileName' is not null or undefined
            assertParamExists('getSignedUrl', 'fileName', fileName)
            const localVarPath = `/v1/s3-images/get-signed-url`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (fileName !== undefined) {
                localVarQueryParameter['fileName'] = fileName;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * V1S3ImagesApi - functional programming interface
 * @export
 */
export const V1S3ImagesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = V1S3ImagesApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Pre-Signed URLを取得する
         * @param {string} fileName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSignedUrl(fileName: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AwsS3PresignedUrlEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getSignedUrl(fileName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * V1S3ImagesApi - factory interface
 * @export
 */
export const V1S3ImagesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = V1S3ImagesApiFp(configuration)
    return {
        /**
         * 
         * @summary Pre-Signed URLを取得する
         * @param {string} fileName 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSignedUrl(fileName: string, options?: any): AxiosPromise<AwsS3PresignedUrlEntity> {
            return localVarFp.getSignedUrl(fileName, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * V1S3ImagesApi - interface
 * @export
 * @interface V1S3ImagesApi
 */
export interface V1S3ImagesApiInterface {
    /**
     * 
     * @summary Pre-Signed URLを取得する
     * @param {string} fileName 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof V1S3ImagesApiInterface
     */
    getSignedUrl(fileName: string, options?: AxiosRequestConfig): AxiosPromise<AwsS3PresignedUrlEntity>;

}

/**
 * V1S3ImagesApi - object-oriented interface
 * @export
 * @class V1S3ImagesApi
 * @extends {BaseAPI}
 */
export class V1S3ImagesApi extends BaseAPI implements V1S3ImagesApiInterface {
    /**
     * 
     * @summary Pre-Signed URLを取得する
     * @param {string} fileName 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof V1S3ImagesApi
     */
    public getSignedUrl(fileName: string, options?: AxiosRequestConfig) {
        return V1S3ImagesApiFp(this.configuration).getSignedUrl(fileName, options).then((request) => request(this.axios, this.basePath));
    }
}
