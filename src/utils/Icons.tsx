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


import { LabIcon } from '@jupyterlab/ui-components';
import clusterIcon from '../../style/icons/cluster_icon.svg';
import signinGoogleIcon from '../../style/icons/signin_google_icon.svg';
import googleCloudIcon from '../../style/icons/google-cloud.svg';

export const iconCluster = new LabIcon({
  name: 'launcher:clusters-icon',
  svgstr: clusterIcon
});

export const IconsigninGoogle = new LabIcon({
  name: 'launcher:signin_google_icon',
  svgstr: signinGoogleIcon
});

export const IconGoogleCloud = new LabIcon({
  name: 'launcher:google_cloud_icon',
  svgstr: googleCloudIcon
});