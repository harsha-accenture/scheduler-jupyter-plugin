# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


from typing import Dict, List, Optional

from pydantic import BaseModel


class DescribeVertexJob(BaseModel):
    input_filename: str = None
    display_name: str = None
    machine_type: str = None
    accelerator_type: Optional[str] = None
    accelerator_count: Optional[int] = None
    kernel_name: str = None
    schedule_value: str = None
    time_zone: str = None
    max_run_count: Optional[str] = None
    region: str = None
    cloud_storage_bucket: str = None
    parameters: Optional[List[str]] = None
    service_account: str = None
    network: str = None
    subnetwork: str = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    disk_type: str = None
    disk_size: str = None

    @classmethod
    def from_dict(cls, data):
        return cls(**data)


class DescribeBucketName(BaseModel):
    bucket_name: str = None

    @classmethod
    def from_dict(cls, data):
        return cls(**data)
