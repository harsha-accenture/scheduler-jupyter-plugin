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
import { Autocomplete, Button, TextField } from '@mui/material';
import ErrorMessage from '../common/ErrorMessage';

function ListVertexScheduler() {
  const dummyList = ['select 1', 'select 2', 'select 3'];
  return (
    <div>
      <div className="create-job-scheduler-title">
        Scheduled Jobs
      </div>
      <div className="select-text-overlay-scheduler">
        <div className="region-overlay create-scheduler-form-element content-pd-space ">
          <Autocomplete
            className="create-scheduler-style"
            options={dummyList}
            renderInput={params => <TextField {...params} label="Region*" />}
            clearIcon={false}
          />
          <ErrorMessage message="Region is required" />
        </div>
        <div className="btn-refresh">
          <Button
            className="btn-refresh-text"
            variant="outlined"
            aria-label="cancel Batch"
          >
            <div>REFRESH</div>
          </Button>
        </div>
      </div>

      <div className="notebook-templates-list-table-parent">
        <table className="clusters-list-table">
          <thead className="scroll-fix-header">
            <tr
              className="cluster-list-table-header"
            >
              <th
                className="clusters-table-header"
              >
                Job Name
              </th>
              <th
                className="clusters-table-header"
              >
                Schedule
              </th>
              <th
                className="clusters-table-header"
              >
                Status
              </th>
              <th
                className="clusters-table-header"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className='clusters-table-body'
          >
            <tr className='cluster-list-data-parent'>
              <td
                className="clusters-table-data"
              >
                test_12
              </td>
              <td
                className="clusters-table-data"
              >
                Run once
              </td>
              <td
                className="clusters-table-data"
              >
                <div className='list-status'>
                  <div className='status-icon-list'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_6021_51380)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM7.5 12.75L3.75 9L4.8075 7.9425L7.5 10.6275L13.1925 4.935L14.25 6L7.5 12.75Z" fill="#188038" />
                      </g>
                      <defs>
                        <clipPath id="clip0_6021_51380">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className='list-status-text '>Completed</div>
                </div>
              </td>
              <td className="clusters-table-data">
                <span className='list-icon-action'>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6142_27145)">
                      <path d="M7.2 12.15L12.15 9L7.2 5.85V12.15ZM9 16.2C8.0125 16.2 7.08125 16.0125 6.20625 15.6375C5.33125 15.2625 4.5625 14.75 3.9 14.1C3.25 13.4375 2.7375 12.6687 2.3625 11.7937C1.9875 10.9187 1.8 9.9875 1.8 9C1.8 8 1.9875 7.06875 2.3625 6.20625C2.7375 5.33125 3.25 4.56875 3.9 3.91875C4.5625 3.25625 5.33125 2.7375 6.20625 2.3625C7.08125 1.9875 8.0125 1.8 9 1.8C10 1.8 10.9313 1.9875 11.7938 2.3625C12.6688 2.7375 13.4313 3.25625 14.0813 3.91875C14.7438 4.56875 15.2625 5.33125 15.6375 6.20625C16.0125 7.06875 16.2 8 16.2 9C16.2 9.9875 16.0125 10.9187 15.6375 11.7937C15.2625 12.6687 14.7438 13.4375 14.0813 14.1C13.4313 14.75 12.6688 15.2625 11.7938 15.6375C10.9313 16.0125 10 16.2 9 16.2ZM9 14.85C10.625 14.85 12.0063 14.2812 13.1438 13.1437C14.2813 12.0062 14.85 10.625 14.85 9C14.85 7.375 14.2813 5.99375 13.1438 4.85625C12.0063 3.71875 10.625 3.15 9 3.15C7.375 3.15 5.99375 3.71875 4.85625 4.85625C3.71875 5.99375 3.15 7.375 3.15 9C3.15 10.625 3.71875 12.0062 4.85625 13.1437C5.99375 14.2812 7.375 14.85 9 14.85Z" fill="#616161" />
                    </g>
                    <defs>
                      <clipPath id="clip0_6142_27145">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </span>
                <span className='list-icon-action'>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6142_27150)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16 7.83973 15.7177 6.7454 15.2181 5.78193L13.7026 7.29737C13.8951 7.8288 14 8.40215 14 9C14 11.7614 11.7614 14 9 14C6.23857 14 4 11.7614 4 9C4 6.23857 6.23857 4 9 4V9L12.5355 5.46446L13 5L13.9497 4.05025C12.683 2.7835 10.933 2 9 2C5.134 2 2 5.134 2 9C2 12.866 5.134 16 9 16C12.866 16 16 12.866 16 9Z" fill="#616161" />
                    </g>
                    <defs>
                      <clipPath id="clip0_6142_27150">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span className='list-icon-action'>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6111_27097)">
                      <path d="M4.05 16.2C3.675 16.2 3.35625 16.0687 3.09375 15.8062C2.83125 15.5437 2.7 15.225 2.7 14.85V4.95C2.7 4.5875 2.83125 4.275 3.09375 4.0125C3.36875 3.7375 3.6875 3.6 4.05 3.6H5.4V1.8H6.75V3.6H11.25V1.8H12.6V3.6H13.95C14.3125 3.6 14.625 3.7375 14.8875 4.0125C15.1625 4.275 15.3 4.5875 15.3 4.95V9H13.95V8.1H4.05V14.85H9.45V16.2H4.05ZM4.05 6.75H13.95V4.95H4.05V6.75ZM4.05 6.75V4.95V6.75ZM10.8 16.2V14.0812L14.7375 10.1625C14.825 10.075 14.925 10.0125 15.0375 9.975C15.15 9.925 15.2625 9.9 15.375 9.9C15.4875 9.9 15.6 9.925 15.7125 9.975C15.825 10.0125 15.925 10.075 16.0125 10.1625L16.8375 11.0062C16.925 11.0937 16.9875 11.1937 17.025 11.3062C17.075 11.4187 17.1 11.5312 17.1 11.6437C17.1 11.7562 17.075 11.8687 17.025 11.9812C16.9875 12.0937 16.925 12.1937 16.8375 12.2812L12.9188 16.2H10.8ZM16.2 11.6437L15.3563 10.8L16.2 11.6437ZM11.7 15.3H12.5438L14.7 13.1437L14.2875 12.7125L13.875 12.3L11.7 14.4562V15.3ZM14.2875 12.7125L13.875 12.3L14.7 13.1437L14.2875 12.7125Z" fill="#616161" />
                    </g>
                    <defs>
                      <clipPath id="clip0_6111_27097">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span className='list-icon-action'>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6111_27086)">
                      <path d="M4.05 13.95H5.00625L12.0375 6.91875L11.0813 5.9625L4.05 12.9937V13.95ZM2.7 15.3V12.4312L12.0375 3.09375C12.175 2.95625 12.325 2.85625 12.4875 2.79375C12.65 2.73125 12.8188 2.7 12.9938 2.7C13.1688 2.7 13.3375 2.73125 13.5 2.79375C13.6625 2.85625 13.8125 2.95625 13.95 3.09375L14.9063 4.05C15.0438 4.1875 15.1438 4.3375 15.2063 4.5C15.2688 4.6625 15.3 4.83125 15.3 5.00625C15.3 5.18125 15.2688 5.35 15.2063 5.5125C15.1438 5.675 15.0438 5.825 14.9063 5.9625L5.56875 15.3H2.7ZM13.95 5.00625L12.9938 4.05L13.95 5.00625ZM11.55 6.45L11.0813 5.9625L12.0375 6.91875L11.55 6.45Z" fill="#616161" />
                    </g>
                    <defs>
                      <clipPath id="clip0_6111_27086">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </span>
                <span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6111_27079)">
                      <path d="M5.85 15.3C5.475 15.3 5.15625 15.1687 4.89375 14.9062C4.63125 14.6437 4.5 14.325 4.5 13.95V4.95H3.6V3.6H7.2V2.7H10.8V3.6H14.4V4.95H13.5V13.95C13.5 14.325 13.3688 14.6437 13.1063 14.9062C12.8438 15.1687 12.525 15.3 12.15 15.3H5.85ZM12.15 4.95H5.85V13.95H12.15V4.95ZM7.2 12.6H8.55V6.3H7.2V12.6ZM9.45 12.6H10.8V6.3H9.45V12.6ZM5.85 4.95V13.95V4.95Z" fill="#616161" />
                    </g>
                    <defs>
                      <clipPath id="clip0_6111_27079">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>

              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div >
  );
}
export default ListVertexScheduler;
