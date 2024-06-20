import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actor } from '../../actors/types/actor.model';
import { actorsService } from '../../actors/actors.service';
import { Movie } from '../types/movie.model';
import { moviesService } from './../movies.service';
import { ERROR_PRIORITY, InternalError } from 'src/app/shared/types/error.model';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

export interface DialogData {
  movie: Movie;
}

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent {
  public actors: Actor[] = [];
  public submitted = false;
  public pageIndex = 1;
  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    year: new FormControl(0, []),
    actors: new FormControl([] as any, []),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private moviesService: moviesService,
    private actorsService: actorsService,
    private dialogRef: MatDialogRef<MovieDialogComponent>,
    private errorService: ErrorHandlerService
  ) {
    this.formGroup.patchValue({ ...this.data.movie });
  }

  /**
   * ====
   * LIFECYCLE EVENTS
   * ====
   */

  ngOnInit() {
    this._getActors();
  }

  /**
   * =======
   * PUBLIC METHODS
   * =======
   */

  async submit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.data.movie?.id) {
        await this.moviesService.edit(
          this.data.movie.id.toString(),
          this.formGroup.value as any
        );
      } else {
        await this.moviesService.create(this.formGroup.value as any);
      }
      this.dialogRef.close();
    }
  }

  async delete() {
    await this.moviesService.delete(this.data.movie.id);
    this.dialogRef.close();
  }

  /**
   * =======
   * PRIVATE METHODS
   * =======
   */

  /**
   * Gets actors based on current page and filter
   */
  private _getActors() {
    this.actorsService.getActors(this.pageIndex).subscribe((response) => {
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
}
