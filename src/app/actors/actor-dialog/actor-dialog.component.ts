import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { actorsService } from '../actors.service';
import { Actor } from 'src/app/actors/types/actor.model';

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
    private actorsService: actorsService,
    private dialogRef: MatDialogRef<ActorDialogComponent>
  ) {}

  async add() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      await this.actorsService.create(this.formGroup.value as any);
      this.dialogRef.close();
    }
  }
}
