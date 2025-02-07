export interface IDagRunList {
    jobRunId: string;
    startDate: string;
    endDate: string;
    gcsUrl: string;
    state: string;
    date: Date;
    time: string;
    fileName: string;
}

export interface ISchedulerData {
    name: string
    displayName: string
    schedule: string
    status: string
    createTime: string
    lastScheduledRunResponse: LastScheduledRunResponse
}

export interface LastScheduledRunResponse {
    scheduledRunTime: string
    runResponse: string
}