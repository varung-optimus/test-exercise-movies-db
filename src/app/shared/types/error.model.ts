export interface InternalError {
    friendlyMessage: string;
    message: string;
    code?: number;
    priority: ERROR_PRIORITY;
}

export enum ERROR_PRIORITY {
    CRITICAL,
    MAJOR,
    MINOR
}