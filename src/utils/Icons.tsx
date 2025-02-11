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
import ScheduledNotebooksIcon from '../../style/icons/scheduled_notebooks_icon.svg';
import LeftArrowIcon from '../../style/icons/left_arrow_icon.svg';
import ErrorIcon from '../../style/icons/error_icon.svg';
import PlusIcon from '../../style/icons/plus_icon.svg';
import PlusIconDisable from '../../style/icons/plus_icon_disable.svg';
import DeleteIcon from '../../style/icons/delete_icon.svg';
import ActiveIcon from '../../style/icons/list_active_icon.svg';
import EditIconDisable from '../../style/icons/scheduler_edit_dag.svg';
import EditNotebookIcon from '../../style/icons/scheduler_edit_calendar.svg';
import FailedIcon from '../../style/icons/list_error_icon.svg';
import ListCompleteIcon from '../../style/icons/list_completed_with_error.svg';
import ListPauseIcon from '../../style/icons/list_pause_icon.svg';
import pauseIcon from '../../style/icons/scheduler_pause.svg';
import playIcon from '../../style/icons/scheduler_play.svg';
import CompletedIcon from '../../style/icons/dag_task_success_icon.svg';
import triggerIcon from '../../style/icons/scheduler_trigger.svg';

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

export const iconActive = new LabIcon({
  name: 'launcher:active-icon',
  svgstr: ActiveIcon
});

export const iconEditDag = new LabIcon({
  name: 'launcher:edit-disable-icon',
  svgstr: EditIconDisable
});

export const iconEditNotebook = new LabIcon({
  name: 'launcher:edit-notebook-icon',
  svgstr: EditNotebookIcon
});

export const iconFailed = new LabIcon({
  name: 'launcher:failed-icon',
  svgstr: FailedIcon
});

export const iconListComplete = new LabIcon({
  name: 'launcher:list-complete-icon',
  svgstr: ListCompleteIcon
});

export const iconListPause = new LabIcon({
  name: 'launcher:list-pause-icon',
  svgstr: ListPauseIcon
});

export const iconPause = new LabIcon({
  name: 'launcher:pause-icon',
  svgstr: pauseIcon
});

export const iconPlay = new LabIcon({
  name: 'launcher:play-icon',
  svgstr: playIcon
});

export const iconSuccess = new LabIcon({
  name: 'launcher:success-icon',
  svgstr: CompletedIcon
});

export const iconTrigger = new LabIcon({
  name: 'launcher:trigger-icon',
  svgstr: triggerIcon
});