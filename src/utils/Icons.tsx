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
import ClusterIcon from '../../style/icons/cluster_icon.svg';
import SigninGoogleIcon from '../../style/icons/signin_google_icon.svg';
import GoogleCloudIcon from '../../style/icons/google-cloud.svg';
import ScheduledNotebooksIcon from '../../style/icons/scheduled_notebooks_icon.svg';
import LeftArrowIcon from '../../style/icons/left_arrow_icon.svg';
import ErrorIcon from '../../style/icons/error_icon.svg';
import PlusIcon from '../../style/icons/plus_icon.svg';
import PlusIconDisable from '../../style/icons/plus_icon_disable.svg';
import DeleteIcon from '../../style/icons/delete_icon.svg';

export const iconCluster = new LabIcon({
  name: 'launcher:clusters-icon',
  svgstr: ClusterIcon
});

export const IconsigninGoogle = new LabIcon({
  name: 'launcher:signin_google_icon',
  svgstr: SigninGoogleIcon
});

export const IconGoogleCloud = new LabIcon({
  name: 'launcher:google_cloud_icon',
  svgstr: GoogleCloudIcon
});

export const iconScheduledNotebooks = new LabIcon({
  name: 'launcher:scheduled-notebooks-icon',
  svgstr: ScheduledNotebooksIcon
});

export const iconLeftArrow = new LabIcon({
  name: 'launcher:left-arrow-icon',
  svgstr: LeftArrowIcon
});

export const iconError = new LabIcon({
  name: 'launcher:error-icon',
  svgstr: ErrorIcon
});

export const iconPlus = new LabIcon({
  name: 'launcher:plus-icon',
  svgstr: PlusIcon
});
export const iconPlusDisable = new LabIcon({
  name: 'launcher:plus-disable-icon',
  svgstr: PlusIconDisable
});
export const iconDelete = new LabIcon({
  name: 'launcher:delete-icon',
  svgstr: DeleteIcon
});
