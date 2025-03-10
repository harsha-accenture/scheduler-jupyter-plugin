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

import React, { useEffect, useState } from 'react';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel } from '@jupyterlab/notebook';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { IThemeManager } from '@jupyterlab/apputils';
import { JupyterLab } from '@jupyterlab/application';
import { SchedulerWidget } from '../controls/SchedulerWidget';
import { iconLeftArrow } from '../utils/Icons';
import { Input } from '../controls/MuiWrappedInput';
import CreateNotebookScheduler from './composer/CreateNotebookScheduler';
import ErrorMessage from './common/ErrorMessage';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import CreateVertexScheduler from './vertex/CreateVertexScheduler';
import EnableNotifyMessage from './common/EnableNotifyMessage';
import { iconError } from '../utils/Icons';

const NotebookSchedulerComponent = ({
  themeManager,
  app,
  context,
  settingRegistry
}: {
  themeManager: IThemeManager;
  app: JupyterLab;
  context: DocumentRegistry.IContext<INotebookModel> | any;
  settingRegistry: ISettingRegistry;
}): JSX.Element => {
  const [jobNameSelected, setJobNameSelected] = useState<string>('');
  const [inputFileSelected, setInputFileSelected] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [jobNameValidation, setJobNameValidation] = useState<boolean>(true);
  const [jobNameSpecialValidation, setJobNameSpecialValidation] =
    useState<boolean>(false);
  const [jobNameUniqueValidation, setJobNameUniqueValidation] =
    useState<boolean>(true);
  const [createCompleted, setCreateCompleted] =
    context !== '' ? useState(false) : useState(true);
  const [notebookSelector, setNotebookSelector] = useState<string>('vertex');
  const [executionPageFlag, setExecutionPageFlag] = useState<boolean>(true);
  const [isApiError, setIsApiError] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (context !== '') {
      setInputFileSelected(context.path);
    }
  }, []);

  const handleJobNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value.length > 0
      ? setJobNameValidation(true)
      : setJobNameValidation(false);

    //Regex to check job name must contain only letters, numbers, hyphens, and underscores
    const regexp = /^[a-zA-Z0-9-_]+$/;
    event.target.value.search(regexp)
      ? setJobNameSpecialValidation(true)
      : setJobNameSpecialValidation(false);
    setJobNameSelected(event.target.value);
  };

  const handleCancel = async () => {
    if (!editMode) {
      setCreateCompleted(false);
      app.shell.activeWidget?.close();
    } else {
      setCreateCompleted(true);
    }
  };

  const handleSchedulerModeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsApiError(false);
    const newValue = (event.target as HTMLInputElement).value;
    setNotebookSelector(newValue);
  };

  return (
    <div className="component-level">
      {!createCompleted ? (
        <>
          <div className="cluster-details-header">
            <div
              role="button"
              className="back-arrow-icon"
              onClick={handleCancel}
            >
              <iconLeftArrow.react
                tag="div"
                className="icon-white logo-alignment-style"
              />
            </div>
            <div className="create-job-scheduler-title">
              {editMode ? 'Update A Scheduled Job' : 'Create A Scheduled Job'}
            </div>
          </div>
          <div className="common-fields">
            <div className="create-scheduler-form-element">
              <Input
                className="create-scheduler-style"
                value={jobNameSelected}
                onChange={e => handleJobNameChange(e)}
                type="text"
                placeholder=""
                Label="Job name*"
                disabled={editMode}
              />
            </div>
            {jobNameSelected === '' && !editMode && (
              <ErrorMessage message="Job name is required" />
            )}
            {jobNameSpecialValidation && jobNameValidation && !editMode && (
              <ErrorMessage message="Name must contain only letters, numbers, hyphens, and underscores" />
            )}
            {!jobNameUniqueValidation && !editMode && (
              <ErrorMessage message="Job name must be unique for the selected environment" />
            )}

            <div className="create-scheduler-form-element-input-file">
              <Input
                className="create-scheduler-style"
                value={inputFileSelected}
                Label="Input file*"
                disabled={true}
              />
            </div>
          </div>
        </>
      ) : (
        executionPageFlag && (
          <div className="clusters-list-overlay" role="tab">
            <div className="cluster-details-title">Scheduled Jobs</div>
          </div>
        )
      )}
      {executionPageFlag && (
        <div>
          <div className="create-scheduler-form-element sub-para">
            <FormControl>
              <RadioGroup
                className="schedule-radio-btn"
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={notebookSelector}
                onChange={handleSchedulerModeChange}
              >
                <FormControlLabel
                  value="vertex"
                  className="create-scheduler-label-style"
                  control={<Radio size="small" />}
                  label={<Typography sx={{ fontSize: 13 }}>Vertex</Typography>}
                />
                <FormControlLabel
                  value="composer"
                  className="create-scheduler-label-style"
                  control={<Radio size="small" />}
                  label={
                    <Typography sx={{ fontSize: 13 }}>Composer</Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            {isApiError && (
              <div className="error-key-parent enable-error-text-label">
                <iconError.react tag="div" className="logo-alignment-style" />
                <div className="error-key-missing">
                  <EnableNotifyMessage message={apiError} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {notebookSelector === 'composer' ? (
        <CreateNotebookScheduler
          themeManager={themeManager}
          app={app}
          context={context}
          settingRegistry={settingRegistry}
          createCompleted={createCompleted}
          setCreateCompleted={setCreateCompleted}
          jobNameSelected={jobNameSelected}
          setJobNameSelected={setJobNameSelected}
          inputFileSelected={inputFileSelected}
          setInputFileSelected={setInputFileSelected}
          editMode={editMode}
          setEditMode={setEditMode}
          jobNameValidation={jobNameValidation}
          jobNameSpecialValidation={jobNameSpecialValidation}
          jobNameUniqueValidation={jobNameUniqueValidation}
          setJobNameUniqueValidation={setJobNameUniqueValidation}
          setIsApiError={setIsApiError}
          setApiError={setApiError}
          setExecutionPageFlag={setExecutionPageFlag}
        />
      ) : (
        <CreateVertexScheduler
          themeManager={themeManager}
          app={app}
          settingRegistry={settingRegistry}
          createCompleted={createCompleted}
          setCreateCompleted={setCreateCompleted}
          jobNameSelected={jobNameSelected}
          setJobNameSelected={setJobNameSelected}
          inputFileSelected={inputFileSelected}
          setInputFileSelected={setInputFileSelected}
          editMode={editMode}
          setEditMode={setEditMode}
          setExecutionPageFlag={setExecutionPageFlag}
          setIsApiError={setIsApiError}
          setApiError={setApiError}
        />
      )}
    </div>
  );
};

export class NotebookScheduler extends SchedulerWidget {
  app: JupyterLab;
  context: DocumentRegistry.IContext<INotebookModel> | string;
  settingRegistry: ISettingRegistry;

  constructor(
    app: JupyterLab,
    themeManager: IThemeManager,
    settingRegistry: ISettingRegistry,
    context: DocumentRegistry.IContext<INotebookModel> | string
  ) {
    super(themeManager);
    this.app = app;
    this.context = context;
    this.settingRegistry = settingRegistry;
  }

  renderInternal(): React.JSX.Element {
    return (
      <NotebookSchedulerComponent
        themeManager={this.themeManager}
        app={this.app}
        context={this.context}
        settingRegistry={this.settingRegistry}
      />
    );
  }
}
