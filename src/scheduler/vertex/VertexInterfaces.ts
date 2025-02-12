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

import dayjs from 'dayjs';

export interface IMachineType {
  machineType: string;
  acceleratorConfigs: IAcceleratorConfig[];
}

export interface IAcceleratorConfig {
  acceleratorType: string;
  allowedCounts: number[];
}

export interface ICreatePayload {
  input_filename: string;
  display_name: string;
  machine_type: string | null;
  accelerator_type?: string | null;
  accelerator_count?: string | null;
  kernel_name: string | null;
  schedule_value: string | undefined;
  time_zone?: string;
  max_run_count: string | number;
  region: string;
  cloud_storage_bucket: string | null;
  parameters: string[];
  service_account: string | undefined;
  network: string | undefined;
  subnetwork: string | undefined;
  start_time: dayjs.Dayjs | null;
  end_time: dayjs.Dayjs | null;
  gcs_notebook_source?: string;
}
export interface IDagList {
  displayName: string;
  schedule: string;
  status: string;
}
export interface IUpdateSchedulerAPIResponse {
  status: number;
  error: string;
}
export interface ITriggerSchedule {
  metedata: object;
  name: string;
}
export interface IDeleteSchedulerAPIResponse {
  done: boolean;
  metadata: object;
  name: string;
  response: object;
}
export interface IDagRunList {
  jobRunId: string;
  startDate: string;
  endDate: string;
  gcsUrl: string;
  state: string;
  date: Date;
  time: string;
  fileName: string;
}
export interface ISchedulerData {
  name: string;
  displayName: string;
  schedule: string;
  status: string;
  createTime: string;
  lastScheduledRunResponse: ILastScheduledRunResponse;
}

export interface ILastScheduledRunResponse {
  scheduledRunTime: string;
  runResponse: string;
}
