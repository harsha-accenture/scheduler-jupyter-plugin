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
      setBucketError(formattedResponse.error);
      setIsCreatingNewBucket(false);
      toast.success('Bucket created successfully', toastifyCustomStyle);
    } catch (error) {
      setIsCreatingNewBucket(false);
      SchedulerLoggingService.log(
        'Error creating the cloud storage bucket',
        LOG_LEVEL.ERROR
      );
    }
  };
}
