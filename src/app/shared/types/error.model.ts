export interface InternalError {
    message: string;
    code?: number;
    priority: ERROR_PRIORITY;
}

export enum ERROR_PRIORITY {
    CRITICAL,
    MAJOR,
    MINOR
}