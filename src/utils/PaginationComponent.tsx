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
  handleNext
}: IPaginationViewProps) => {
  return (
    console.log(
      'pageSize',
      pageSize,
      'pageIndex',
      pageIndex,
      'allData',
      allData,
      'previousPage',
      previousPage,
      'nextPage',
      nextPage,
      'canPreviousPage',
      canPreviousPage,
      'canNextPage',
      canNextPage
    ),
    (
      <div className="pagination-parent-view">
        <>
          {nextPageTokenList.length > 0 ? (
            <div className="page-display-part">
              {pageIndex * pageSize + 1} - {(pageIndex + 1) * pageSize} of many
            </div>
          ) : (
            <div className="page-display-part">1 - {allData.length + 1}</div>
          )}

          {(pageIndex + 1) * pageSize > allData.length ? (
            <div className="page-display-part">
              {pageIndex * pageSize + 1} - {allData.length} of {allData.length}
            </div>
          ) : (
            <div className="page-display-part">
              {pageIndex * pageSize + 1} - {(pageIndex + 1) * pageSize} of{' '}
              {allData.length}
            </div>
          )}
        </>

        <div
          role="button"
          className={
            !canPreviousPage ? 'page-move-button disabled' : 'page-move-button'
          }
          onClick={() => previousPage()}
        >
          <iconPrevious.react
            tag="div"
            className="icon-white logo-alignment-style"
          />
        </div>
        <div
          role="button"
          onClick={() => {nextPage(); handleNext()}}
          className={
            !canNextPage ? 'page-move-button disabled' : 'page-move-button'
          }
        >
          <iconNext.react
            tag="div"
            className="icon-white logo-alignment-style"
          />
        </div>
      </div>
    )
  );
};
