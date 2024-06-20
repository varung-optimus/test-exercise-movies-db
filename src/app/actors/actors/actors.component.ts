import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actor } from '../types/actor.model';
import { actorsService } from '../actors.service';
import { ActorDialogComponent } from '../helpers/actor-dialog/actor-dialog.component';
import { ERROR_PRIORITY, InternalError } from 'src/app/shared/types/error.model';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActorFilter, DEFAULT_ACTOR_FILTER } from '../types/actor-filter.model';
import { Subscription, debounceTime } from 'rxjs';
import { DEFAULT_SETTINGS } from 'src/app/shared/types/default-settings.const';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnDestroy {
  actors: Actor[] = [];
  pageIndex = 1;
  filter: ActorFilter = DEFAULT_ACTOR_FILTER;
  dialogWidth = DEFAULT_SETTINGS.MODAL_WIDTH;
  debounceTime = DEFAULT_SETTINGS.KEY_CHANGES_DELAY;
  filterForm: FormGroup = this.formBuilder.group({
    name: [this.filter.name]
  });

  // Private
  private keyChangesSubscription: Subscription | undefined;

  constructor(
    private actorsService: actorsService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private formBuilder: FormBuilder,
  ) {
    this._subscribeToControlKeyChanges('name');
  }

  /**
   * ====
   * LIFECYCLE EVENTS
   * ====
   */

  ngOnInit() {
    this._getActors();
  }

  ngOnDestroy(): void {
    if (this.keyChangesSubscription) {
      this.keyChangesSubscription.unsubscribe();
    }
  }

  /**
   * =======
   * PUBLIC METHODS
   * =======
   */

  /**
   * Add a new actor
   */
  add() {
    this.dialog
      .open(ActorDialogComponent, {
        minWidth: this.dialogWidth,
      })
      .afterClosed()
      .subscribe(() => {
        this._getActors();
      });
  }

  /**
   * =======
   * PRIVATE METHODS
   * =======
   */

  /**
   * Starts a subscription for key changes on the dynamic control
   * @param controlName control name
   */
  private _subscribeToControlKeyChanges(controlName: string) {
    this.keyChangesSubscription = this.filterForm.controls[controlName].valueChanges.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(value => {
      this.filter[controlName as keyof ActorFilter] = value;
      this._getActors();
    });
  }

  /**
   * Gets actors based on current page and filter
   */
  private _getActors() {
    this.actorsService.getActors(this.pageIndex, this._getFilter()).subscribe((response) => {
      this.actors = response;
    }, (err: Error) => {
      let error: InternalError = {
        friendlyMessage: `Unable to get actors, please try again later!`,
        message: err.message,
        priority: ERROR_PRIORITY.CRITICAL
      };
      this.errorService.handle(error);
    });
  }

  /**
   * Gets applied filter object
   * @returns 
   */
  private _getFilter() {
    return {
      name: this.filterForm.controls['name'].value
    }
  }
}
