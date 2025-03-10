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

import React, { useState } from 'react';
import { SchedulerWidget } from '../../controls/SchedulerWidget';
import { JupyterLab } from '@jupyterlab/application';
import { IThemeManager } from '@jupyterlab/apputils';
import ListNotebookScheduler from './ListNotebookScheduler';
import ExecutionHistory from './ExecutionHistory';
import { scheduleMode } from '../../utils/Const';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

const NotebookJobComponent = ({
  app,
  settingRegistry,
  setCreateCompleted,
  setJobNameSelected,
  setComposerSelected,
  setScheduleMode,
  setScheduleValue,
  setInputFileSelected,
  setParameterDetail,
  setParameterDetailUpdated,
  setSelectedMode,
  setClusterSelected,
  setServerlessSelected,
  setServerlessDataSelected,
  serverlessDataList,
  setServerlessDataList,
  setServerlessList,
  setRetryCount,
  setRetryDelay,
  setEmailOnFailure,
  setEmailonRetry,
  setEmailOnSuccess,
  setEmailList,
  setStopCluster,
  setTimeZoneSelected,
  setEditMode,
  setIsLoadingKernelDetail,
  setIsApiError,
  setApiError,
  setExecutionPageFlag,
  responseKey
}: {
  app: JupyterLab;
  themeManager: IThemeManager;
  settingRegistry: ISettingRegistry;
  setCreateCompleted?: (value: boolean) => void;
  setJobNameSelected?: (value: string) => void;
  setComposerSelected?: (value: string) => void;
  setScheduleMode?: (value: scheduleMode) => void;
  setScheduleValue?: (value: string) => void;

  setInputFileSelected?: (value: string) => void;
  setParameterDetail?: (value: string[]) => void;
  setParameterDetailUpdated?: (value: string[]) => void;
  setSelectedMode?: (value: string) => void;
  setClusterSelected?: (value: string) => void;
  setServerlessSelected?: (value: string) => void;
  setServerlessDataSelected?: (value: Record<string, never>) => void;
  serverlessDataList?: any;
  setServerlessDataList?: (value: string[]) => void;
  setServerlessList?: (value: string[]) => void;
  setRetryCount?: (value: number) => void;
  setRetryDelay?: (value: number) => void;
  setEmailOnFailure?: (value: boolean) => void;
  setEmailonRetry?: (value: boolean) => void;
  setEmailOnSuccess?: (value: boolean) => void;
  setEmailList?: (value: string[]) => void;
  setStopCluster?: (value: boolean) => void;
  setTimeZoneSelected?: (value: string) => void;
  setEditMode?: (value: boolean) => void;
  setIsLoadingKernelDetail?: (value: boolean) => void;
  setIsApiError: (value: boolean) => void;
  setApiError: (value: string) => void;
  setExecutionPageFlag: (value: boolean) => void;
  responseKey: string | null
}): React.JSX.Element => {
  const [showExecutionHistory, setShowExecutionHistory] = useState(false);
  const [composerName, setComposerName] = useState('');
  const [bucketName, setBucketName] = useState('');
  const [dagId, setDagId] = useState('');
  const [backComposerName, setBackComposerName] = useState('');

  const handleDagIdSelection = (composerName: string, dagId: string) => {
    setShowExecutionHistory(true);
    setComposerName(composerName);
    setDagId(dagId);
  };

  const handleBackButton = () => {
    setShowExecutionHistory(false);
    setBackComposerName(composerName);
  };

  return (
    <>
      {showExecutionHistory ? (
        <ExecutionHistory
          composerName={composerName}
          dagId={dagId}
          handleBackButton={handleBackButton}
          bucketName={bucketName}
          setExecutionPageFlag={setExecutionPageFlag}
        />
      ) : (
        <div>
          <div>
            {
              <ListNotebookScheduler
                app={app}
                settingRegistry={settingRegistry}
                handleDagIdSelection={handleDagIdSelection}
                backButtonComposerName={backComposerName}
                setCreateCompleted={setCreateCompleted}
                setJobNameSelected={setJobNameSelected}
                setComposerSelected={setComposerSelected}
                setScheduleMode={setScheduleMode}
                setScheduleValue={setScheduleValue}
                setInputFileSelected={setInputFileSelected}
                setParameterDetail={setParameterDetail}
                setParameterDetailUpdated={setParameterDetailUpdated}
                setSelectedMode={setSelectedMode}
                setClusterSelected={setClusterSelected}
                setServerlessSelected={setServerlessSelected}
                setServerlessDataSelected={setServerlessDataSelected}
                serverlessDataList={serverlessDataList}
                setServerlessDataList={setServerlessDataList}
                setServerlessList={setServerlessList}
                setRetryCount={setRetryCount}
                setRetryDelay={setRetryDelay}
                setEmailOnFailure={setEmailOnFailure}
                setEmailonRetry={setEmailonRetry}
                setEmailOnSuccess={setEmailOnSuccess}
                setEmailList={setEmailList}
                setStopCluster={setStopCluster}
                setTimeZoneSelected={setTimeZoneSelected}
                setEditMode={setEditMode}
                bucketName={bucketName}
                setBucketName={setBucketName}
                setIsLoadingKernelDetail={setIsLoadingKernelDetail}
                setIsApiError={setIsApiError}
                setApiError={setApiError}
                responseKey={responseKey}
              />
            }
          </div>
        </div>
      )}
    </>
  );
};

export class NotebookJobs extends SchedulerWidget {
  app: JupyterLab;
  settingRegistry: ISettingRegistry;
  setIsApiError: (value: boolean) => void;
  setApiError: (value: string) => void;
  setExecutionPageFlag: (value: boolean) => void;
  responseKey: string;

  constructor(
    app: JupyterLab,
    settingRegistry: ISettingRegistry,
    themeManager: IThemeManager,
    setIsApiError: (value: boolean) => void,
    setApiError: (value: string) => void,
    setExecutionPageFlag: (value: boolean) => void,
    responseKey: string
  ) {
    super(themeManager);
    this.app = app;
    this.settingRegistry = settingRegistry;
    this.setIsApiError = setIsApiError;
    this.setApiError = setApiError;
    this.setExecutionPageFlag = setExecutionPageFlag;
    this.responseKey = responseKey;
  }
  renderInternal(): React.JSX.Element {
    return (
      <NotebookJobComponent
        app={this.app}
        settingRegistry={this.settingRegistry}
        themeManager={this.themeManager}
        setIsApiError={this.setIsApiError}
        setApiError={this.setApiError}
        setExecutionPageFlag={this.setExecutionPageFlag}
        responseKey={this.responseKey}
      />
    );
  }
}

export default NotebookJobComponent;
