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

import { ConfigService } from '../services/ConfigService';

const { version } = require('../../package.json');
export const LOGIN_STATE = '1';
export const STATUS_SUCCESS = 'SUCCEEDED';
export const API_HEADER_BEARER = 'Bearer ';
export const API_HEADER_CONTENT_TYPE = 'application/json';
export const PLUGIN_ID = 'scheduler_jupyter_plugin:plugin';
export const USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
export const VERSION_DETAIL = version;

export const gcpServiceUrls = (async () => {
  return await ConfigService.gcpServiceUrlsAPI();
})();

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST'
}
