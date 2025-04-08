/**
 * @license
 * Copyright 2023 Google LLC
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
import { ISessionTemplateDisplay } from './ListRuntimeTemplateInterface';
import { LabIcon } from '@jupyterlab/ui-components';
import PreviousIcon from '../../style/icons/previous_page.svg';
import NextIcon from '../../style/icons/next_page.svg';
import { CircularProgress } from '@mui/material';
interface IBatch {
  batchID: string;
  status: string;
  location: string;
  creationTime: string;
  elapsedTime: string;
  type: string | undefined;
  actions: JSX.Element;
}
interface ITemplate {
  title: string;
  category: string;
  description: string;
}
interface ICluster {
  clusterName: string;
  status: string;
  clusterImage: string;
  region: string;
  zone: string;
  totalWorkersNode: string;
  schedulesDeletion: string;
  actions: React.ReactNode;
}
interface IDagList {
  jobid: string;
  notebookname: string;
  schedule: string;
  scheduleInterval: string;
}
interface IVertexScheduleList {
  displayName: string;
  schedule: string;
  status: string;
}

interface IPaginationViewProps {
  pageSize: number;
  setPageSize: (value: number) => void;
  pageIndex: number;
  allData:
    | IBatch[]
    | ITemplate[]
    | ICluster[]
    | ISessionTemplateDisplay[]
    | IDagList[]
    | IVertexScheduleList[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  currentStartIndex: number;
  currentLastIndex: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  isLoading: boolean;
  scheduleSelected?: string;
  totalCount: number;
}
const iconPrevious = new LabIcon({
  name: 'launcher:previous-icon',
  svgstr: PreviousIcon
});
const iconNext = new LabIcon({
  name: 'launcher:next-icon',
  svgstr: NextIcon
});

export const PaginationComponent = ({
  pageSize,
  setPageSize,
  pageIndex,
  allData,
  canPreviousPage,
  canNextPage,
  scheduleSelected,
  currentStartIndex,
  currentLastIndex,
  handleNextPage,
  handlePreviousPage,
  isLoading,
  totalCount
}: IPaginationViewProps) => {
  return (
    <div className="pagination-parent-view">
      {isLoading ? (
        <div className="icon-buttons-style">
          <CircularProgress
            size={18}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="pagination-numbers">
          {currentStartIndex} - {currentLastIndex} of {totalCount!=0?(`${totalCount}`):(`many`)}
        </div>
      )}
        
        <div
          role={!canPreviousPage || isLoading ? undefined : "button"}
          onClick={() => !canPreviousPage || isLoading ? undefined : handlePreviousPage()}
          aria-disabled={!canPreviousPage || isLoading}
        >
          {(canPreviousPage && !isLoading) ? (
            <iconPrevious.react
              tag="div"
              className="logo-alignment-style"
            />
          ) : (
            <iconPrevious.react
              tag="div"
              className="icon-buttons-style-disable disable-complete-btn"
            />
          )}
        </div>
    

   
        <div
          role={!canNextPage || isLoading ? undefined : "button"}
          onClick={() => !canNextPage || isLoading ? undefined : handleNextPage()}
          aria-disabled={!canNextPage || isLoading}
        >
          {(canNextPage && !isLoading) ? (
            <iconNext.react
              tag="div"
              className="logo-alignment-style"
            />
          ) : (
            <iconNext.react
              tag="div"
              className="icon-buttons-style-disable disable-complete-btn" // Optional class for further styling
            />
          )}
        </div>
    
    </div>

    // <div className="pagination-parent-view pagination ">
    //     <div className="page-display-part pagination-numbers">
    //       {currentStartIndex} - {currentLastIndex} of many
    //     </div>
    // <div className='pagination-button '>
    //   <div
    //     role="button"
    //     // className={
    //     //   !canPreviousPage ? 'page-move-button disabled' : 'page-move-button'
    //     // }
    //     className={
    //         !canPreviousPage ? 'pagination-arrow disabled' : 'pagination-arrow'
    //       }
    //     onClick={() => handlePreviousPage()}
    //   >
    //     <iconPrevious.react
    //       tag="div"
    //       className="icon-white logo-alignment-style"
    //     />
    //   </div>
    //   </div>
    //   <div
    //     role="button"
    //     onClick={() => handleNextPage()}
    //     className={
    //       !canNextPage ? 'pagination-arrow disabled' : 'pagination-arrow'
    //     }
    //   >
    //     <iconNext.react tag="div" className="icon-white logo-alignment-style" />
    //   </div>
    // </div>
  );
};
