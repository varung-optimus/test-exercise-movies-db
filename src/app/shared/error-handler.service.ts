import { Injectable } from "@angular/core";
import { ERROR_PRIORITY, InternalError } from "./types/error.model";

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {

    /**
     * Handle errors
     * TODO: Enhance this to handle critical / major / minor errors and perform actions
     * @param error 
     */
    handle(error: InternalError) {
        switch (error.priority) {
            case ERROR_PRIORITY.CRITICAL:
                break;

            case ERROR_PRIORITY.MAJOR:
                break;

            case ERROR_PRIORITY.MINOR:
                break;
        }
    }

    /**
     * ====
     * PRIVATE METHODS
     * ====
     */

    private _criticalErrorHandler() {
        // TODO: Critical action e.g. blocking modal / dedicated error page
    }

    private _majorErrorHandler() {
        // TODO: Major action e.g. Snackbar alert
    }

    private _minorErrorHandler() {
        // TODO: Minor action e.g. logging to database
    }
}