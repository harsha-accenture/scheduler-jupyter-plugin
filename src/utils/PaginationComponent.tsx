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
import { ISessionTemplateDisplay } from './ListRuntimeTemplateInterface';
import { LabIcon } from '@jupyterlab/ui-components';
import PreviousIcon from '../../style/icons/previous_page.svg';
import NextIcon from '../../style/icons/next_page.svg';
import { Button } from '@mui/material';
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
interface IVertexDagList {
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
    | IVertexDagList[];
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  nextPageTokenList: string[];
  handleNext: () => void;
  nextTokenPresentFlag: boolean;
  handleNextFlag: boolean;
  startIndex: number;
  pageTotalSize: number;
  notebookApiBufferingFlag: boolean;
  handlePrevious: () => void;
  scheduleListLength: number;
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
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  nextPageTokenList,
  handleNext,
  nextTokenPresentFlag,
  handleNextFlag,
  startIndex,
  pageTotalSize,
  notebookApiBufferingFlag,
  handlePrevious,
  scheduleListLength
}: IPaginationViewProps) => {
  return (
    <div className="pagination-parent-view">
      {startIndex} - {pageTotalSize}
      <>
        {nextPageTokenList.length > 0 ? (
          startIndex === 1 ? (
            nextTokenPresentFlag ? (
              <div className="page-display-part">
                {startIndex} - {scheduleListLength} of many
              </div>
            ) : (
              <div className="page-display-part">
                {startIndex} - {scheduleListLength} of {scheduleListLength}
              </div>
            )
          ) : nextTokenPresentFlag ? (
            <div className="page-display-part">
              {startIndex} - {pageTotalSize} of many
            </div>
          ) : (
            <div className="page-display-part">
              {startIndex} - {pageTotalSize} of {pageTotalSize}
            </div>
          )
        ) : (
          <div className="page-display-part">
            {startIndex} - {scheduleListLength} of {scheduleListLength}
          </div>
        )}
      </>
      <Button
        className={
          !canPreviousPage ? 'page-move-button disabled' : 'page-move-button'
        }
        onClick={() => {
          if (!(notebookApiBufferingFlag || startIndex === 1)) handlePrevious();
        }}
      >
        {notebookApiBufferingFlag || startIndex === 1 ? (
          <iconPrevious.react
            tag="div"
            className="icon-white logo-alignment-style icon-buttons-style-disable"
          />
        ) : (
          <iconPrevious.react
            tag="div"
            className="icon-white logo-alignment-style"
          />
        )}
      </Button>
      <Button
        onClick={() => {
          //nextPage();
          if (!(!nextTokenPresentFlag || notebookApiBufferingFlag))
            handleNext();
        }}
        className={
          !canNextPage ? 'page-move-button disabled' : 'page-move-button'
        }
      >
        {!nextTokenPresentFlag || notebookApiBufferingFlag ? (
          <iconNext.react
            tag="div"
            className="icon-white logo-alignment-style icon-buttons-style-disable"
          />
        ) : (
          <iconNext.react
            tag="div"
            className="icon-white logo-alignment-style"
          />
        )}
      </Button>
    </div>
  );
};
