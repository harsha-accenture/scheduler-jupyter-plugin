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
import { toast } from 'react-toastify';
import { requestAPI } from '../handler/Handler';
import { SchedulerLoggingService, LOG_LEVEL } from './LoggingService';
import { toastifyCustomStyle } from '../utils/Config';
import path from 'path';

export class StorageServices {
  static cloudStorageAPIService = async (
    setCloudStorageList: (value: string[]) => void,
    setCloudStorageLoading: (value: boolean) => void
  ) => {
    try {
      setCloudStorageLoading(true);
      const formattedResponse: any = await requestAPI('api/storage/listBucket');
      if (formattedResponse.length > 0) {
        setCloudStorageList(formattedResponse);
      } else {
        setCloudStorageList([]);
      }
      setCloudStorageLoading(false);
    } catch (error) {
      setCloudStorageList([]);
      setCloudStorageLoading(false);
      SchedulerLoggingService.log(
        'Error listing cloud storage bucket',
        LOG_LEVEL.ERROR
      );
      toast.error('Failed to fetch cloud storage bucket', toastifyCustomStyle);
    }
  };
  static newCloudStorageAPIService = async (
    bucketName: string,
    setIsCreatingNewBucket: (value: boolean) => void,
    setBucketError: (value: string) => void
  ) => {
    const payload = {
      bucket_name: bucketName
    };
    try {
      setIsCreatingNewBucket(true);
      const formattedResponse: any = await requestAPI(
        'api/storage/createNewBucket',
        {
          body: JSON.stringify(payload),
          method: 'POST'
        }
      );
      if (formattedResponse === null) {
        toast.success('Bucket created successfully', toastifyCustomStyle);
      } else if (formattedResponse?.error) {
        let errorMessage = '400: Bucket not created.';
        if (formattedResponse.error.includes('false')) {
          errorMessage = `${errorMessage} ${formattedResponse.error.split('false:')[1]}`;
        }
        setBucketError(errorMessage);
      }
      setIsCreatingNewBucket(false);
    } catch (error) {
      setIsCreatingNewBucket(false);
      SchedulerLoggingService.log(
        'Error creating the cloud storage bucket',
        LOG_LEVEL.ERROR
      );
    }
  };

  static downloadJobAPIService = async (
    gcsUrl: string | undefined,
    fileName: string | undefined,
    jobRunId: string | undefined,
    setJobDownloadLoading: (value: boolean) => void,
    scheduleName: string
  ) => {
    try {
      const bucketName = gcsUrl?.split('//')[1];
      setJobDownloadLoading(true);
      const formattedResponse: any = await requestAPI(
        `api/storage/downloadOutput?bucket_name=${bucketName}&job_run_id=${jobRunId}&file_name=${fileName}`,
        {
          method: 'POST'
        }
      );
      if (formattedResponse.status === 0) {
        let base_filename = path.basename(
          formattedResponse.downloaded_filename
        );
        toast.success(
          `${base_filename} has been successfully downloaded from the ${scheduleName} job history`,
          toastifyCustomStyle
        );
      } else {
        SchedulerLoggingService.log(
          'Error in downloading the job history',
          LOG_LEVEL.ERROR
        );
        toast.error(
          'Error in downloading the job history',
          toastifyCustomStyle
        );
      }
      setJobDownloadLoading(false);
    } catch (error) {
      setJobDownloadLoading(false);
      SchedulerLoggingService.log(
        'Error in downloading the job history',
        LOG_LEVEL.ERROR
      );
      toast.error('Error in downloading the job history', toastifyCustomStyle);
    }
  };
}
