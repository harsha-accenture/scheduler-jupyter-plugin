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
import React from 'react';
import { IThemeManager } from '@jupyterlab/apputils';
import { JupyterLab } from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import {
  Autocomplete,
  TextField,
  Radio,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Input } from '../../controls/MuiWrappedInput';
import { CORN_EXP_DOC_URL } from '../../utils/Const';
import LearnMore from '../common/LearnMore';
import ErrorMessage from '../common/ErrorMessage';
import { iconError, iconDelete, iconPlus } from '../../utils/Icons';

const CreateVertexScheduler = ({
  themeManager,
  app,
  settingRegistry
}: {
  themeManager: IThemeManager;
  app: JupyterLab;
  settingRegistry: ISettingRegistry;
}) => {
  const dummyList = ['select 1', 'select 2', 'select 3'];

  return (
    <>
      <div className="submit-job-container">
        <div className="region-overlay create-scheduler-form-element">
          <Autocomplete
            className="create-scheduler-style"
            options={dummyList}
            renderInput={params => <TextField {...params} label="Region*" />}
            clearIcon={false}
          />
        </div>
        <ErrorMessage message="Region is required" />
        <div className="create-scheduler-form-element">
          <Autocomplete
            className="create-scheduler-style"
            options={dummyList}
            renderInput={params => (
              <TextField {...params} label="Machine type*" />
            )}
            clearIcon={false}
          />
        </div>

        <ErrorMessage message="Machine type is required" />

        <div className="execution-history-main-wrapper">
          <div className="create-scheduler-form-element create-scheduler-form-element-input-fl create-pr">
            <Autocomplete
              className="create-scheduler-style create-scheduler-form-element-input-fl"
              options={dummyList}
              renderInput={params => (
                <TextField {...params} label="Accelerator type*" />
              )}
            />
            <ErrorMessage message="Accelerator type is required" />
          </div>

          <>
            <div className="create-scheduler-form-element create-scheduler-form-element-input-fl">
              <Autocomplete
                className="create-scheduler-style create-scheduler-form-element-input-fl"
                options={dummyList}
                renderInput={params => (
                  <TextField {...params} label="Accelerator count*" />
                )}
              />
              <ErrorMessage message="Accelerator count is required" />
            </div>
          </>
        </div>

        <div className="create-scheduler-form-element">
          <Autocomplete
            className="create-scheduler-style"
            options={dummyList}
            renderInput={params => <TextField {...params} label="Kernel*" />}
            clearIcon={false}
          />
        </div>
        <ErrorMessage message="Kernel is required" />

        <div className="create-scheduler-form-element">
          <Autocomplete
            className="create-scheduler-style"
            options={dummyList}
            renderInput={params => (
              <TextField
                {...params}
                label="Cloud Storage Bucket*"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>
                }}
              />
            )}
            clearIcon={false}
            getOptionLabel={option => option}
            renderOption={(props, option) => {
              // Custom rendering for the "Create new bucket" option
              <li {...props} className="custom-add-bucket">
                {option}
              </li>;

              return <li {...props}>{option}</li>;
            }}
          />
        </div>
        <ErrorMessage message="Cloud storage bucket is required" />

        <span className="tab-description tab-text-sub-cl">
          <span>
            Where results are stored. Select an existing bucket or create a new
            one.
          </span>
        </span>
        <div className="execution-history-main-wrapper">
          <div className="create-scheduler-form-element create-scheduler-form-element-input-fl create-pr">
            <Autocomplete
              className="create-scheduler-style create-scheduler-form-element-input-fl"
              options={dummyList}
              renderInput={params => (
                <TextField {...params} label="Disk Type" />
              )}
              clearIcon={false}
            />
          </div>
          <div className="create-scheduler-form-element create-scheduler-form-element-input-fl create-pr">
            <Input
              className="create-scheduler-style create-scheduler-form-element-input-fl"
              type="number"
              placeholder=""
              Label="Disk Size (in GB)"
            />
          </div>
        </div>
        <div className="create-job-scheduler-title sub-title-heading ">
          Parameters
        </div>
        {/* labelProperties */}
        <div className="job-label-edit-parent">
          <div className="job-label-edit-row">
            <div className="key-message-wrapper">
              <div className="select-text-overlay-label">
                <Input sx={{ margin: 0 }} className="edit-input-style" />
              </div>

              <div role="alert" className="error-key-parent">
                <iconError.react tag="div" className="logo-alignment-style" />
                <div className="error-key-missing">key is required</div>
              </div>
              <div className="error-key-parent">
                <iconError.react tag="div" className="logo-alignment-style" />
                <div className="error-key-missing">
                  Only hyphens (-), underscores (_), lowercase characters, and
                  numbers are allowed. Keys must start with a lowercase
                  character. International characters are allowed.
                </div>
              </div>
              <div className="error-key-parent">
                <iconError.react tag="div" className="logo-alignment-style" />
                <div className="error-key-missing">
                  The key is already present
                </div>
              </div>
            </div>
            <div className="key-message-wrapper">
              <div className="select-text-overlay-label">
                <Input sx={{ margin: 0 }} className="edit-input-style" />
              </div>
              <div className="error-key-parent">
                <iconError.react tag="div" className="logo-alignment-style" />
                <div className="error-key-missing">
                  Only hyphens (-), underscores (_), lowercase characters, and
                  numbers are allowed. International characters are allowed.
                </div>
              </div>
            </div>

            <div role="button" className="labels-delete-icon">
              <iconDelete.react tag="div" className="logo-alignment-style" />
            </div>
          </div>
          <button className="job-add-property-button">
            <iconPlus.react
              tag="div"
              className="icon-black logo-alignment-style job-edit-text"
            />
            <span className="job-edit-text">ADD PARAMETER</span>
          </button>
        </div>

        <div className="create-scheduler-form-element panel-margin">
          <Autocomplete
            className="create-scheduler-style-trigger"
            options={dummyList}
            renderInput={params => (
              <TextField {...params} label="Service account*" />
            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                {/* Todo */}
              </Box>
            )}
          />
        </div>
        <ErrorMessage message="Service account is required" />

        <div className="create-job-scheduler-text-para create-job-scheduler-sub-title">
          Network Configuration
        </div>

        <p>Establishes connectivity for VM instances in the cluster</p>

        <div className="create-scheduler-form-element panel-margin">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel
                value="networkInThisProject"
                className="create-scheduler-label-style"
                control={<Radio size="small" />}
                label={
                  <Typography sx={{ fontSize: 13 }}>
                    Network in this project
                  </Typography>
                }
              />
              <div>
                <span className="sub-para tab-text-sub-cl">
                  Choose a shared VPC network from the project that is different
                  from the clusters project
                </span>
                <div className="learn-more-a-tag learn-more-url">
                  <LearnMore />
                </div>
              </div>
              <FormControlLabel
                value="networkShared"
                className="create-scheduler-label-style"
                control={<Radio size="small" />}
                label={
                  <Typography sx={{ fontSize: 13 }}>
                    Network shared from host project
                  </Typography>
                }
              />
              <span className="sub-para tab-text-sub-cl">
                Choose a shared VPC network from the project that is different
                from the clusters project
              </span>
              <div className="learn-more-a-tag learn-more-url">
                <LearnMore />
              </div>
            </RadioGroup>
          </FormControl>
        </div>

        {/* Network in this project  */}
        <>
          <div className="execution-history-main-wrapper">
            <div className="create-scheduler-form-element create-scheduler-form-element-input-fl create-pr">
              <Autocomplete
                className="create-scheduler-style create-scheduler-form-element-input-fl"
                options={dummyList}
                renderInput={params => (
                  <TextField {...params} label="Primary network*" />
                )}
              />
              <ErrorMessage message="Primary network is required" />
            </div>
            <div className="create-scheduler-form-element create-scheduler-form-element-input-fl">
              <Autocomplete
                className="create-scheduler-style create-scheduler-form-element-input-fl"
                options={dummyList}
                renderInput={params => (
                  <TextField {...params} label="Sub network*" />
                )}
              />
              <ErrorMessage message="Sub network is required" />
            </div>
          </div>
        </>
        <>
          {/* Network shared from host project */}
          <div className="create-scheduler-form-element">
            <Autocomplete
              className="create-scheduler-style"
              options={dummyList}
              renderInput={params => (
                <TextField {...params} label="Shared subnetwork*" />
              )}
            />
          </div>
          <ErrorMessage message="No shared subnetworks are available in this region." />
        </>
        <div className="create-scheduler-label">Schedule</div>
        <div className="create-scheduler-form-element">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel
                value="runNow"
                className="create-scheduler-label-style"
                control={<Radio size="small" />}
                label={<Typography sx={{ fontSize: 13 }}>Run now</Typography>}
              />
              <FormControlLabel
                value="runSchedule"
                className="create-scheduler-label-style"
                control={<Radio size="small" />}
                label={
                  <Typography sx={{ fontSize: 13 }}>
                    Run on a schedule
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="schedule-child-section">
          <div className="create-scheduler-radio-element">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <FormControlLabel
                  value="cronFormat"
                  className="create-scheduler-label-style"
                  control={<Radio size="small" />}
                  label={
                    <Typography sx={{ fontSize: 13 }}>
                      Use UNIX cron format
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="userFriendly"
                  className="create-scheduler-label-style"
                  control={<Radio size="small" />}
                  label={
                    <Typography sx={{ fontSize: 13 }}>
                      Use user-friendly scheduler
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="execution-history-main-wrapper">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="create-scheduler-form-element create-scheduler-form-element-input-fl create-pr">
                <DateTimePicker
                  className="create-scheduler-style create-scheduler-form-element-input-fl"
                  label="Start Date"
                  slotProps={{
                    actionBar: {
                      actions: ['clear']
                    },
                    tabs: {
                      hidden: true
                    },
                    textField: {
                      error: false
                    }
                  }}
                  disablePast
                  closeOnSelect={true}
                />
              </div>
              <div className="create-scheduler-form-element create-scheduler-form-element-input-fl create-pr">
                <DateTimePicker
                  className="create-scheduler-style create-scheduler-form-element-input-fl"
                  label="End Date"
                  slotProps={{
                    actionBar: {
                      actions: ['clear']
                    },
                    field: { clearable: true },
                    tabs: {
                      hidden: true
                    },
                    textField: {
                      error: false
                    }
                  }}
                  disablePast
                  closeOnSelect={true}
                />
                <ErrorMessage message="End date should be greater than Start date" />
              </div>
            </LocalizationProvider>
          </div>
          <div className="create-scheduler-form-element schedule-input-field">
            <Input
              className="create-scheduler-style"
              type="text"
              placeholder=""
              Label="Schedule*"
            />
            <ErrorMessage message="Schedule field is required" />
            <div>
              <span className="tab-description tab-text-sub-cl">
                Schedules are specified using unix-cron format. E.g. every
                minute: "* * * * *", every 3 hours: "0 */3 * * *", every Monday
                at 9:00: "0 9 * * 1".
              </span>
              <div className="learn-more-url">
                <LearnMore path={CORN_EXP_DOC_URL} />
              </div>
            </div>
          </div>
          <div className="create-scheduler-form-element">
            {/* <Cron value={} setValue={} /> */}
          </div>
          <>
            <div className="create-scheduler-form-element">
              <Autocomplete
                className="create-scheduler-style"
                options={dummyList}
                renderInput={params => (
                  <TextField {...params} label="Time Zone*" />
                )}
                clearIcon={false}
              />
            </div>
            <div className="create-scheduler-form-element">
              <Input
                className="create-scheduler-style"
                type="number"
                placeholder=""
                Label="Max runs"
              />
            </div>
          </>
        </div>
        <div className="save-overlay">
          <Button variant="contained" aria-label={'Create Schedule'}>
            <div>CREATE</div>
          </Button>
          <Button variant="outlined" aria-label="cancel Batch">
            <div>CANCEL</div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateVertexScheduler;
