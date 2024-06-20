import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActorsService } from '../../actors.service';
import { Actor } from 'src/app/actors/types/actor.model';
import { ERROR_PRIORITY, InternalError } from 'src/app/shared/types/error.model';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

export interface DialogData {
  actor: Actor;
}

@Component({
  selector: 'app-actor-dialog',
  templateUrl: './actor-dialog.component.html',
  styleUrls: ['./actor-dialog.component.scss'],
})
export class ActorDialogComponent {
  public submitted = false;
  public formGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private actorsService: ActorsService,
    private dialogRef: MatDialogRef<ActorDialogComponent>,
    private errorService: ErrorHandlerService
  ) { }

  /**
   * Add actor
   */
  add() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.actorsService.create(this.formGroup.value as any).subscribe((response) => {
      this.dialogRef.close();
    }, (err: Error) => {
      let error: InternalError = {
        friendlyMessage: `Unable to create actor, please try again later!`,
        message: err.message,
        priority: ERROR_PRIORITY.MAJOR
      };
      this.errorService.handle(error);
    })
  }
}
