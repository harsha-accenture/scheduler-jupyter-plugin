/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IAuthCredentials } from '../login/LoginInterfaces';
import { AuthenticationService } from '../services/AuthenticationService';
import { SchedulerLoggingService } from '../services/LoggingService';
import {
  API_HEADER_BEARER,
  API_HEADER_CONTENT_TYPE,
  HTTP_METHOD,
  gcpServiceUrls
} from './Const';

export const authApi = async () => {
  const authService = await AuthenticationService.authCredentialsAPI();
  return authService;
};

export const checkConfig = async (
  setLoginState: React.Dispatch<React.SetStateAction<boolean>>,
  setConfigError: React.Dispatch<React.SetStateAction<boolean>>,
  setLoginError: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  const credentials: IAuthCredentials | undefined = await authApi();
  if (credentials) {
    if (credentials.access_token === '') {
      localStorage.removeItem('loginState');
      if (credentials.config_error === 1) {
        setConfigError(true);
      }
      if (credentials.login_error === 1) {
        setLoginError(true);
      }
    } else {
      setLoginState(true);
    }
  }
};

/**
 * Helper method that wraps fetch and logs the request uri and status codes to
 * jupyter server.
 */
export async function loggedFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const resp = await fetch(input, init);
  // Intentionally not waiting for log response.
  SchedulerLoggingService.logFetch(input, init, resp);
  return resp;
}

export const handleDebounce = (func: any, delay: number) => {
  let timeoutId: any;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Wraps a fetch call with initial authentication to pass credentials to the request
 *
 * @param uri the endpoint to call e.g. "/clusters"
 * @param method the HTTP method used for the request
 * @param regionIdentifier option param to define what region identifier (location, region) to use
 * @param queryParams
 * @returns a promise of the fetch result
 */
export const authenticatedFetch = async (config: {
  baseUrl?: string;
  uri: string;
  method: HTTP_METHOD;
  regionIdentifier?: 'regions' | 'locations' | 'global';
  queryParams?: URLSearchParams;
}) => {
  const { baseUrl, uri, method, regionIdentifier, queryParams } = config;
  const credentials = await authApi();
  // If there is an issue with getting credentials, there is no point continuing the request.
  if (!credentials) {
    throw new Error('Error during authentication');
  }

  const requestOptions = {
    method: method,
    headers: {
      'Content-Type': API_HEADER_CONTENT_TYPE,
      Authorization: API_HEADER_BEARER + credentials.access_token
    }
  };

  const serializedQueryParams = queryParams?.toString();
  const { DATAPROC } = await gcpServiceUrls;
  const base = baseUrl ?? DATAPROC;
  let requestUrl = `${base}/projects/${credentials.project_id}`;

  if (regionIdentifier) {
    switch (regionIdentifier) {
      case 'regions':
        requestUrl = `${requestUrl}/regions/${credentials.region_id}`;
        break;
      case 'locations':
        requestUrl = `${requestUrl}/locations/${credentials.region_id}`;
        break;
      case 'global':
        requestUrl = `${requestUrl}/global`;
        break;
      default:
        assumeNeverHit(regionIdentifier);
    }
  }

  requestUrl = `${requestUrl}/${uri}`;
  if (serializedQueryParams) {
    requestUrl = `${requestUrl}?${serializedQueryParams}`;
  }

  return loggedFetch(requestUrl, requestOptions);
};

export function assumeNeverHit(_: never): void {}
