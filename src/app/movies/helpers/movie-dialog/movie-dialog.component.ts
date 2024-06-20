import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actor } from '../../../actors/types/actor.model';
import { ActorsService } from '../../../actors/actors.service';
import { Movie } from '../../types/movie.model';
import { MoviesService } from '../../movies.service';
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
  public movieForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    year: new FormControl(0, []),
    actors: new FormControl([] as any, []),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private moviesService: MoviesService,
    private actorsService: ActorsService,
    private dialogRef: MatDialogRef<MovieDialogComponent>,
    private errorService: ErrorHandlerService
  ) {
    this.movieForm.patchValue({ ...this.data.movie });
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

  /**
   * Update the changes made in movie
   */
  submit() {
    this.submitted = true;
    // If form is invalid show errors
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }
    // Form is valid
    if (this.data.movie?.id) {
      this._updateMovie();
    } else {
      this._createMovie();
    }
  }

  /**
   * Delete movie
   */
  delete() {
    this.moviesService.delete(this.data.movie.id).subscribe((response: Movie) => {
      this.dialogRef.close();
    }, (err: Error) => {
      let error: InternalError = {
        friendlyMessage: `Unable to delete movie, please try again later!`,
        message: err.message,
        priority: ERROR_PRIORITY.CRITICAL
      };
      this.errorService.handle(error);
    })
  }

  /**
   * =======
   * PRIVATE METHODS
   * =======
   */

  /**
   * Create movie
   */
  private _createMovie() {
    this.moviesService.create(this.movieForm.value as any).subscribe((response: Movie) => {
      this.dialogRef.close();
    }, (err: Error) => {
      let error: InternalError = {
        friendlyMessage: `Unable to get create movie, please try again later!`,
        message: err.message,
        priority: ERROR_PRIORITY.MAJOR
      };
      this.errorService.handle(error);
    });
  }

  /**
   * Update movie
   */
  private _updateMovie() {
    this.moviesService.update(
      this.data.movie.id.toString(),
      this.movieForm.value as any
    ).subscribe((response: Movie) => {
      this.dialogRef.close();
    }, (err: Error) => {
      let error: InternalError = {
        friendlyMessage: `Unable to get update movie, please try again later!`,
        message: err.message,
        priority: ERROR_PRIORITY.MAJOR
      };
      this.errorService.handle(error);
    });
  }

  /**
   * Gets actors based on current page and filter
   */
  private _getActors() {
    this.actorsService.getActors(this.pageIndex).subscribe((response: Actor[]) => {
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
