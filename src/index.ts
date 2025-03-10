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

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  JupyterLab
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { MainAreaWidget, IThemeManager } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { iconCluster } from './utils/Icons';
import { AuthLogin } from './login/AuthLogin';
import { eventEmitter } from './utils/SignalEmitter';
import { Notification } from '@jupyterlab/apputils';
import { DataprocService } from './services/DataprocService';
import { SchedulerService } from './services/SchedulerServices';

/**
 * Initialization data for the scheduler-jupyter-plugin extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'scheduler-jupyter-plugin:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  optional: [ISettingRegistry, IThemeManager, ILauncher],
  activate: async (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null,
    themeManager: IThemeManager,
    launcher: ILauncher
  ) => {
    console.log('JupyterLab extension scheduler-jupyter-plugin is activated!');

    const { commands } = app;

    const createAuthLoginComponentCommand =
      'cloud-scheduler-settings:configure';
    commands.addCommand(createAuthLoginComponentCommand, {
      label: 'Google Scheduler Settings',
      execute: () => {
        const content = new AuthLogin(
          app as JupyterLab,
          launcher as ILauncher,
          settingRegistry as ISettingRegistry,
          themeManager
        );
        const widget = new MainAreaWidget<AuthLogin>({ content });
        widget.title.label = 'Config Setup';
        widget.title.icon = iconCluster;
        app.shell.add(widget, 'main');
      }
    });

    // Capture the signal
    eventEmitter.on('schedulerConfigChange', (message: string) => {
      checkAllApisEnabled();
    });

    const checkAllApisEnabled = async () => {
      const dataprocClusterResponse =
        await DataprocService.listClustersDataprocAPIService();

      const composerListResponse =
        await SchedulerService.listComposersAPICheckService();

      const apiChecks = [
        {
          response: dataprocClusterResponse,
          errorKey: 'error.message',
          errorMessage: 'Cloud Dataproc API has not been used in project',
          notificationMessage: 'The Cloud Dataproc API is not enabled.',
          enableLink:
            'https://console.cloud.google.com/apis/library/dataproc.googleapis.com'
        },
        {
          response: composerListResponse,
          errorKey: 'Error fetching environments list',
          errorMessage: 'Cloud Composer API has not been used in project',
          notificationMessage: 'The Cloud Composer API is not enabled.',
          enableLink:
            'https://console.cloud.google.com/apis/library/composer.googleapis.com'
        }
      ];

      apiChecks.forEach(
        ({
          response,
          errorKey,
          errorMessage,
          notificationMessage,
          enableLink
        }) => {
          const errorValue = errorKey
            .split('.')
            .reduce((acc, key) => acc?.[key], response);
          if (errorValue && errorValue.includes(errorMessage)) {
            Notification.error(notificationMessage, {
              actions: [
                {
                  label: 'Enable',
                  callback: () => window.open(enableLink, '_blank'),
                  displayType: 'link'
                }
              ],
              autoClose: false
            });
          }
        }
      );
    };

    await checkAllApisEnabled();
  }
};

export default plugin;
