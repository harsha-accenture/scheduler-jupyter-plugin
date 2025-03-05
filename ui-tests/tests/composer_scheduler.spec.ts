/**
* @license
* Copyright 2024 Google LLC
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

import { test, expect, galata } from '@jupyterlab/galata';

// Set a common timeout for all tests
const timeout = 5 * 60 * 1000;

// Function to navigate to Scheduled Jobs listing page
async function navigateToScheduleJobsListingPage(page) {
  await page.locator('//*[@data-category="Google Cloud Resources" and @title="Scheduled Jobs"]').click();
  await page.getByLabel('Composer').click();
  await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
}

/**
* Helper function to check if an input field is not empty.
* @param {Object} page - Playwright page object.
* @param {string} label - Label of the input field.
*/
async function checkInputNotEmpty(page, label) {
  const input = page.getByLabel(label);
  const value = await input.inputValue();
  return value.trim() !== '';
}

async function checkInputFieldsNotEmpty(page) {
  // Validate that all input fields are not empty
  const jobNameNotEmpty = await checkInputNotEmpty(page, 'Job name*');
  const InputfileNotEmpty = await checkInputNotEmpty(page, 'Input file*');
  const EnvironmentNotEmpty = await checkInputNotEmpty(page, 'Environment*');
  const RetrycountNotEmpty = await checkInputNotEmpty(page, 'Retry count');
  const RetrydelayNotEmpty = await checkInputNotEmpty(page, 'Retry delay (minutes)');

  const allFieldsFilled =
    jobNameNotEmpty &&
    InputfileNotEmpty &&
    EnvironmentNotEmpty &&
    RetrycountNotEmpty &&
    RetrydelayNotEmpty;

  return allFieldsFilled;
}

test.describe('Composer scheduling jobs', () => {
  test.skip('Can create job scheduler', async ({ page }) => {
    test.setTimeout(150 * 1000);
    
    // Navigate to the notebook content region
    await page.getByRole('region', { name: 'notebook content' }).click();

    // Locate and select the Python 3 kernel card
    const locator = page.locator('.jp-LauncherCard:visible', {
      hasText: 'Python 3 (ipykernel)'
    });

    const count = await locator.count();
    expect(count).toBeGreaterThan(0);
    if (count > 0) {
      await locator.first().click();
      await page.getByLabel('Untitled.ipynb').getByTitle('Job Scheduler').getByRole('button').click();
      await page.getByLabel('Composer').click();

      // Generate formatted current date string
      const now = new Date();
      const pad = (num: number) => String(num).padStart(2, '0');
      const dateTimeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(Math.floor(now.getMinutes() / 5) * 5)}-${pad(now.getSeconds())}`;

      // Generate new job name
      const jobName = 'test-' + dateTimeStr;
      console.log(jobName);
      
      // Fill in the required fields in the Job Scheduler form
      await page.getByLabel('Job name*').click();
      await page.getByLabel('Job name*').fill(jobName);

      // select environment
      await page.getByLabel('Environment*').click();
      await page.getByRole('option').first().click();

      // Select the first available option for cluster field
      await page.getByLabel('Cluster*').click();
      await page.getByRole('option').first().click();
      

      const inputfields = await checkInputFieldsNotEmpty(page);

      if (!inputfields) {
        await expect(page.getByLabel('Create Schedule')).toBeDisabled();
      } else {
        await expect(
          page.getByLabel('Create Schedule')
        ).not.toBeDisabled();
        await page.pause();
        await page.getByLabel('Create Schedule').click();
        await page.pause();
        await page.getByRole('alert').waitFor({ state: "attached" });
        await expect(page.locator('(//div[@role="alert"and @class="Toastify__toast-body"])[1]')).toContainText('Job scheduler successfully created');
      }
    }
  });
  
  //Test to cancel job creation
  test('Cancel job creation', async ({ page }) => {
    test.setTimeout(150 * 1000);

    // Navigate to the notebook content region
    await page.getByRole('region', { name: 'notebook content' }).click();

    // Locate and select the Python 3 kernel card
    const locator = page.locator('.jp-LauncherCard:visible', {
      hasText: 'Python 3 (ipykernel)'
    });

    const count = await locator.count();
    expect(count).toBeGreaterThan(0);
    if (count > 0) {
      await locator.first().click();
      await page.getByLabel('Untitled.ipynb').getByTitle('Job Scheduler').getByRole('button').click();
      await page.getByLabel('Composer').click();

      // Generate formatted current date string
      const now = new Date();
      const pad = (num: number) => String(num).padStart(2, '0');
      const dateTimeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(Math.floor(now.getMinutes() / 5) * 5)}-${pad(now.getSeconds())}`;

      // Generate new job name
      const jobName = 'test-' + dateTimeStr;
      console.log(jobName);
      
      // Fill in the required fields in the Job Scheduler form
      await page.getByLabel('Job name*').click();
      await page.getByLabel('Job name*').fill(jobName);

      // Select the first available option for dropdown fields
      const dropdownFields = [
        'Environment*',
        'Cluster*',
      ];

      for (const label of dropdownFields) {
        await page.getByLabel(label).click();
        await page.getByRole('option').first().click();
      }

      const inputfields = await checkInputFieldsNotEmpty(page);
      
      if(inputfields){
        await expect(page.getByLabel('cancel Batch')).toBeEnabled();
        await page.getByLabel('cancel Batch').click();
        await expect(page.locator('//div[@class="lm-TabBar-tabLabel" and contains(text(),".ipynb")]')).toBeVisible();
      }
    }
  });

  /**
  * Helper function to validate field error visibility and resolution.
  * @param {Object} page - Playwright page object.
  * @param {string} fieldLabel - Label of the field to validate.
  * @param {string} errorMessage - Error message to check visibility.
  * @param {boolean} isDropdown - Whether the field is a dropdown (default: false).
  * @param {string} [dropdownOption] - Option to select if field is a dropdown.
  */
  async function validateErrorResolution(page, fieldLabel, errorMessage, isDropdown = false, dropdownOption = '') {
    // Ensure the error message is visible
    await expect(page.getByText(errorMessage)).toBeVisible();

    // Interact with the field based on its type
    const field = page.getByLabel(fieldLabel);
    if (isDropdown) {
      await field.click();
      if (dropdownOption) {
        await page.getByRole('option', { name: dropdownOption }).click();
      } else {
        await page.getByRole('option').first().click();
      }
    } else {
      await field.click();
      await field.fill('test_value'); // Fill with a placeholder value
    }

    // Verify the error message is no longer visible
    await expect(page.getByText(errorMessage)).toBeHidden();
  }

  test('Sanity: can perform field validation', async ({ page }) => {
    test.setTimeout(150 * 1000);

    // Navigate to the notebook content
    await page.getByRole('region', { name: 'notebook content' }).click();

    // Locate and select the Python 3 kernel card
    const kernelCard = page.locator('.jp-LauncherCard:visible', {
      hasText: 'Python 3 (ipykernel)',
    });
    const kernelCount = await kernelCard.count();
    expect(kernelCount).toBeGreaterThan(0);

    if (kernelCount > 0) {
      await kernelCard.first().click();

      // Step 3: Open Job Scheduler dialog
      await page.getByLabel('Untitled.ipynb').getByTitle('Job Scheduler').getByRole('button').click();
      await page.getByLabel('Composer').click();

      // Validate all errors and resolve them
      const fieldsToValidate = [
        { label: 'Job name*', error: 'Job name is required', isDropdown: false },
      ];

      for (const field of fieldsToValidate) {
        await validateErrorResolution(page, field.label, field.error, field.isDropdown);
      }
      
      // Check input file field is  disabled
      await expect(page.locator('//input[@disabled]')).toBeDisabled();

      // verify environment dropdown
      const environmentField = page.getByLabel('Environment*');
      await expect(environmentField).toBeVisible();
      await environmentField.click();
      await page.waitForTimeout(10000);
      // await expect(page.getByRole('option')).toBeVisible();
      await page.getByRole('option').first().click(); 

      // verify notebook checkbox is selected in output format
      await page.getByText('Notebook', { exact: true }).isVisible();      
      
      // Add a parameter and validate
      await page.getByRole('button', { name: 'ADD PARAMETER' }).click();
      await expect(page.getByText('key is required')).toBeVisible();
      await expect(page.locator('//button[@class="job-add-property-button-disabled"]')).toBeVisible();
      await expect(page.getByLabel('Create Schedule')).toBeDisabled();
      await page.getByLabel('Key 1*').fill('key1');
      await expect(page.getByText('key is required')).toBeHidden();
      await expect(page.getByRole('button', { name: 'ADD PARAMETER' })).toBeEnabled();

      // Add second parameter and delete it
      await page.getByRole('button', { name: 'ADD PARAMETER' }).click();
      await expect(page.getByText('key is required')).toBeVisible();
      await expect(page.locator('//button[@class="job-add-property-button-disabled"]')).toBeVisible();
      //await expect(page.getByRole('button', { name: 'ADD PARAMETER' })).toBeDisabled();
      await page.getByLabel('Key 2*').fill('key2');
      await expect(page.getByText('key is required')).toBeHidden();
      await page.locator('(//div[@class="labels-delete-icon"])[2]').click();
      await page.getByLabel('Key 2*').isHidden();
      //await expect(page.locator('(//div[@class="job-label-edit-row"])[2]')).toBeHidden();
      await expect(page.getByRole('button', { name: 'ADD PARAMETER' })).toBeEnabled();

      // Check Serverless options
      await expect(page.getByLabel('Serverless')).toBeVisible();
      await page.getByLabel('Serverless').click();
      await expect(page.getByLabel('Serverless*')).toBeVisible();
      await page.getByLabel('Serverless*').click();
      await page.getByRole('option').first().click();

      // Email Recipient
      await page.getByLabel('Email on failure').click();
      await page.getByLabel('Email on retry').click();
      await page.getByLabel('Email on success').click();
      await expect(page.getByLabel('Email recipients')).toBeVisible();
      await expect(page.getByText('Email recipients is required field')).toBeVisible();
      await expect(page.getByLabel('Create Schedule')).toBeDisabled();
      await page.getByLabel('Email recipients').fill('testabc@google.com');
      await page.getByLabel('Email recipients').press('Enter');
      await expect(page.getByText('Email recipients is required field')).toBeHidden();
      
      // Schedule configuration
      await page.getByLabel('Run on a schedule').click();
      await expect(page.getByTitle('week')).toBeVisible();
      await expect(page.locator('//div[@data-testid="custom-select-week-days"]')).toBeVisible();
      await expect(page.locator('//div[@data-testid="custom-select-hours"]')).toBeVisible();
      await expect(page.locator('//div[@data-testid="custom-select-minutes"]')).toBeVisible();
      await expect(page.locator('//div[@class="react-js-cron"]//button')).toBeVisible();
      await expect(page.getByLabel('Time Zone')).not.toBeEmpty();
      
    }
  });
});

// Function to get the first job that has a specific action enabled
async function getJobWithAction(page, action) {
  // Check list of jobs are displayed
  const tableLocator = page.locator('//table[@class="clusters-list-table"]');
  if (await tableLocator.isVisible()) {
    const jobRows = page.locator('//tr[@class="cluster-list-data-parent"]');
    const noOfJobs = await jobRows.count();

    for (let i = 0; i < noOfJobs; i++) {
      const actionIcon = jobRows.nth(i).locator(`//div[@title="${action}"]`);
      if (await actionIcon.isVisible() && await actionIcon.isEnabled()) {
        return jobRows.nth(i);
      }
    }
    return null;
  } else {
    await expect(page.getByText('No rows to display')).toBeVisible();
    return null;
  }
}

test.describe('Composer scheduling jobs listing page validation', () => {

  test('Sanity: Can verify fields on the page', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    // Validate fields and behavior
    await expect(page.getByLabel('Vertex')).toBeVisible();
    await expect(page.getByLabel('Vertex')).not.toBeChecked();
    await expect(page.getByLabel('Composer')).toBeVisible();
    await expect(page.getByLabel('Composer')).toBeChecked();
    const environmentField = page.getByLabel('Environment*');
    await expect(environmentField).toBeVisible();
    await environmentField.click();
    await page.getByRole('option').first().click();
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });

    // Check list of jobs are displayed
    const tableExists = await page.locator('//table[@class="clusters-list-table"]').isVisible();
    if (tableExists) {
      const rowCount = await page.locator('//table[@class="clusters-list-table"]//tr').count();
      expect(rowCount).toBeGreaterThan(0);
    }
    else {
      await expect(page.getByText('No rows to display')).toBeVisible();
    }
  });

  test('Sanity: Can verify listing page headers', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    // Check job table headers if table data is present
    const tableExists = await page.locator('//table[@class="clusters-list-table"]').isVisible();
    if (tableExists) {
      const headers = [
        'Job Name', 'Schedule', 'Status', 'Actions'
      ];
      for (const header of headers) {
        await expect(page.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
      }
    }
    else {
      await expect(page.getByText('No rows to display')).toBeVisible();
    }
  });

  test('Check if job is active or completed or paused', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    // Check the job status
    const tableExists = await page.locator('//table[@class="clusters-list-table"]').isVisible();
    if (tableExists) {
      const parentLocator = page.locator('//tr[@class="cluster-list-data-parent"]');
      const noOfRows = await parentLocator.count();
      for (let i = 0; i < noOfRows; i++) {
        const status = await parentLocator.nth(i).locator('//td[@role="cell"][3]').innerText();

        //check status column text
        expect(['Active', 'Completed', 'Paused']).toContainEqual(status);
        break;
      }
    } else {
      await expect(page.getByText('No rows to display')).toBeVisible();
    }
  });

  test('Check if the job is created to run once or on a schedule', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const parentLocator = page.locator('//tr[@class="cluster-list-data-parent"]');
    const noOfClusters = await parentLocator.count();
    for (let i = 0; i < noOfClusters; i++) {
      const schedulecol = await parentLocator.nth(i).locator('//td[@role="cell"][2]').innerText();
      //check schedule column text
      await ScheduleText(schedulecol);
      break;
    }
    //check schedule column text
    async function ScheduleText(schedulecol) {
      if (schedulecol == 'Once, as soon as possible') {
        console.log('job is created for run once');
      }
      else {
        console.log('job is created for a schedule');
      }
    }
  });

  test.skip('Can edit a notebook', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const jobLocator = await getJobWithAction(page, "Edit Notebook");

    if (jobLocator) {
      await expect(jobLocator.locator('//div[@title="Edit Notebook"]')).toBeEnabled();
      await jobLocator.locator('//div[@title="Edit Notebook"]').click();
      await page.getByRole('progressbar').waitFor({ state: "detached" });
      const kernelpopup = await page.locator('//div[@class="lm-Widget lm-Panel jp-Dialog-content"]').isVisible();
      if(kernelpopup){
        await page.getByLabel('Select Kernel').click();
      }
      else{
        console.log('no kernel popup')
      }
      await expect(page.locator('//div[@class="lm-TabBar-tabLabel" and contains(text(),".ipynb")]')).toBeVisible();
    }

  });

  test('Sanity: Pause a job', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const jobLocator = await getJobWithAction(page, "Pause");
    if (jobLocator) {
      const jobName = await jobLocator.locator('//td[@role="cell"][1]').innerText();
      console.log(`Pausing job: ${jobName}`);
      const msg = 'scheduler ' + jobName + ' updated successfully';

      await jobLocator.locator('//div[@title="Pause"]').click();
      await jobLocator.getByText('Active').waitFor({ state: "detached" });
      await expect(jobLocator.getByText('Paused')).toBeVisible();
      // await expect(page.locator('(//div[@role="alert"and @class="Toastify__toast-body"])[1]')).toContainText(msg);
    } else {
      console.log("No job available to pause.");
    }
  });

  // Test to handle the "Resume" action
  test('Resume a job', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const jobLocator = await getJobWithAction(page, "Resume");
    if (jobLocator) {
      const jobName = await jobLocator.locator('//td[@role="cell"][1]').innerText();
      console.log(`Resuming job: ${jobName}`);
      const msg = 'scheduler ' + jobName + ' updated successfully';

      await jobLocator.locator('//div[@title="Resume"]').click();
      await jobLocator.getByText('Paused').waitFor({ state: "detached" });
      await expect(jobLocator.getByText('Active')).toBeVisible();
      // await expect(page.locator('(//div[@role="alert"and @class="Toastify__toast-body"])[1]')).toContainText(msg);
    } else {
      console.log("No job available to resume.");
    }
  });

  // Test to handle the "Trigger" action
  test('Trigger a job', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const jobLocator = await getJobWithAction(page, "Trigger the job");
    if (jobLocator) {
      const jobName = await jobLocator.locator('//td[@role="cell"][1]').innerText();
      const triggerMessage = `${jobName} triggered successfully`;
      console.log(`Triggering job: ${jobName}`);

      await jobLocator.locator('//div[@title="Trigger the job"]').click();
      // await expect(page.locator('(//div[@role="alert" and @class="Toastify__toast-body"])[1]')).toContainText(triggerMessage);
    } else {
      console.log("No job available to trigger.");
    }
  });

  // Test to handle "Edit Schedule" function
  test('Edit a schedule', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const jobLocator = await getJobWithAction(page, "Edit Schedule");

    if (jobLocator) {
      const jobName = await jobLocator.locator('//td[@role="cell"][1]').innerText();
      const msg = 'Job ' + jobName + ' successfully updated';

      await jobLocator.locator('//div[@title="Edit Schedule"]').click();

      // update retry count
      await page.getByLabel('Retry count').clear();
      await page.getByLabel('Retry count').fill('5');

      // Validate that input fields are not empty
      const inputfields = await checkInputFieldsNotEmpty(page);

      // click update
      if (!inputfields) {
        await expect(page.getByLabel(' Update Schedule')).toBeDisabled();
      } else {
        await expect(
          page.getByLabel(' Update Schedule')
        ).not.toBeDisabled();
        await page.getByLabel(' Update Schedule').click();
      }
      // verify schedule updated
      // await expect(page.locator('(//div[@role="alert"and @class="Toastify__toast-body"])[1]')).toContainText(msg);

    } else {
      console.log("No job available to update.");
    }
  });

  // Test to cancel "Edit Schedule"
  test('Cancel Edit schedule', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const jobLocator = await getJobWithAction(page, "Edit Schedule");

    if (jobLocator) {
      await jobLocator.locator('//div[@title="Edit Schedule"]').click();

      // update retry count
      await page.getByLabel('Retry count').clear();
      await page.getByLabel('Retry count').fill('5');

      // Validate that input fields are not empty
      const inputfields = await checkInputFieldsNotEmpty(page);
    
      // click cancel
      if(inputfields){
        await expect(page.getByLabel('cancel Batch')).not.toBeDisabled();
        await page.getByLabel('cancel Batch').click();
      }  
  
      // verify schedule not updated
      await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
      await expect(page.locator('//div[@class="cluster-details-title"]')).toBeVisible();
      await page.locator('//table[@class="clusters-list-table"]').isVisible();
    } else {
      console.log("No job available to update.");
    }
  });

  // Test to handle the "Delete" action
  test('Sanity: Delete a job', async ({ page }) => {
    test.setTimeout(timeout);
    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const jobLocator = await getJobWithAction(page, "Delete");
    if (jobLocator) {
      const jobName = await jobLocator.locator('//td[@role="cell"][1]').innerText();
      console.log(`Deleting job: ${jobName}`);

      await jobLocator.locator('//div[@title="Delete"]').click();
      await expect(page.getByText(`This will delete ${jobName} and cannot be undone.`)).toBeVisible();
      await page.getByRole('button', { name: 'Delete' }).click();
      await page.waitForTimeout(5000);
      // await expect(page.getByText(`Deleted job ${jobName}. It might take a few minutes to for it to be deleted from the list of jobs.`)).toBeVisible();
    
    } else {
      console.log("No job available to delete.");
    }
  });
});

// Helper to navigate to the Execution History page for the first job
async function navigateToExecutionHistory(page) {
  const jobName = await page.getByRole('cell').first().innerText();
  await page.getByRole('cell').first().click();
  await page.getByText('Loading History').waitFor({ state: "detached" });
  await page.getByText('Loading Dag Runs Task Instances').waitFor({ state: "detached" });
  return jobName;
}

test.describe('Composer scheduling jobs execution history', () => {
  test('Sanity: can verify execution history page', async ({ page }) => {
    test.setTimeout(150 * 1000);

    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const listingTableExists = await page.locator('//table[@class="clusters-list-table"]').isVisible();
    if (listingTableExists) {

      const jobName = await navigateToExecutionHistory(page);

      // Verify job name is displayed
      await expect(page.getByText('Execution History: ' + jobName)).toBeVisible();

      // Verify current date is selected
      const now = new Date();
      const pad = (num: number) => String(num).padStart(2, '0');
      const date = `${pad(now.getDate())}`;
      const selecteddate = await page.locator('//button[@aria-current]').innerText();
      const length = selecteddate.length;
      if (length == 1){
        const date2 = '0' + selecteddate;
        await expect(date2).toContain(date);
      }
      else{
      await expect(selecteddate).toContain(date);
      }

      // Verify future dates are disabled
      await expect(page.locator('(//button[@aria-current]/following-sibling::button)[1]')).toBeDisabled();

      // Check table headers if table data is present
      const historyDataExists = await page.locator('//table[@class="clusters-list-table"]').isVisible();
      if (historyDataExists) {
        const headers = [
          'State', 'Date', 'Time', 'Actions',
        ];
        for (const header of headers) {
          await expect(page.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
        }

        const requiredFields = ["Task Id", "Attempts", "Duration (in seconds)"];

        for (const field of requiredFields) {
          await expect(page.locator(`//div[@class="accordion-row-data" and text()="${field}"]`)).toBeVisible();
        }

        const rowCount = await page.locator('//div[@class="accordion-row-parent"]').count();
        //expect(rowCount).toBeGreaterThanOrEqual(1);
        if(rowCount>0){
        console.log('logs are displayed');
        }
        else{
        await expect(page.getByText('No rows to display')).toBeVisible();
        console.log('no logs are displayed');
        }

      } else {
        await expect(page.getByText('No rows to display')).toBeVisible();
      }
    }
    else {
      await expect(page.getByText('No rows to display')).toBeVisible();
    }

  });

  test('Can download output from execution history page', async ({ page }) => {
    test.setTimeout(150 * 1000);

    await navigateToScheduleJobsListingPage(page);
    await page.getByText('Loading Notebook Schedulers').waitFor({ state: "detached" });
    const listingTableExists = await page.locator('//table[@class="clusters-list-table"]').isVisible();
    if (listingTableExists) {

      const jobName = await navigateToExecutionHistory(page);

      const historyDataExists = await page.locator('//table[@class="clusters-list-table"]').isVisible();
      if (historyDataExists) {

        // Check the status and download the output
        const status = await page.locator('//tr[@class="cluster-list-data-parent"][1]/div/td').first().innerText();

        if (status === 'Success') {
          await page.getByRole('button', { name: 'Download Output' }).first().click();
          await page.getByRole('progressbar').waitFor({ state: "detached" });
          // Check the confirmation message
          // await expect(page.locator('(//div[@role="alert"and @class="Toastify__toast-body"])[1]')).toHaveText(jobName);
          // await expect(page.locator('(//div[@role="alert"and @class="Toastify__toast-body"])[1]')).toHaveText('downloaded successfully');
        } else {
          const downloadButtonClass = await page.getByRole('button', { name: 'Download Output' }).first().getAttribute('class');

          // Verify the download button is disabled
          expect(downloadButtonClass).toContain('disable');

          // Ensure the status is failed or penging
          expect(['Failed', 'pending']).toContainEqual(status);
        }
      } else {
        await expect(page.getByText('No rows to display')).toBeVisible();
      }
    }
    else {
      await expect(page.getByText('No rows to display')).toBeVisible();
    }
  });

});