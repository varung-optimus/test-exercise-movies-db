import { Component, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Movie } from "../types/movie.model";
import { MoviesService } from "./../movies.service";
import { MovieDialogComponent } from "../helpers/movie-dialog/movie-dialog.component";
import { DEFAULT_MOVIE_FILTER, MovieFilter } from "../types/movie-filter.model";
import { ErrorHandlerService } from "src/app/shared/error-handler.service";
import { ERROR_PRIORITY, InternalError } from "src/app/shared/types/error.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription, debounceTime } from "rxjs";
import { DEFAULT_SETTINGS } from "src/app/shared/types/default-settings.const";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent implements OnDestroy {
  movies: Movie[] = [];
  pageIndex = 1;
  filter: MovieFilter = DEFAULT_MOVIE_FILTER;
  dialogWidth = DEFAULT_SETTINGS.MODAL_WIDTH;
  debounceTime = DEFAULT_SETTINGS.KEY_CHANGES_DELAY;
  filterForm: FormGroup = this.formBuilder.group({
    title: [this.filter.title],
    year: [this.filter.year],
    rate: [this.filter.rate]
  });

  // Private
  private keyChangesSubscriptions: Subscription[] = [];

  constructor(
    private moviesService: MoviesService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private formBuilder: FormBuilder
  ) { 
    this._subscribeToControlKeyChanges('title');
    this._subscribeToControlKeyChanges('year');
    this._subscribeToControlKeyChanges('rate');
  }

  /**
   * ====
   * LIFECYCLE EVENTS
   * ====
   */
  ngOnInit() {
    this._getMovies();
  }

  ngOnDestroy(): void {
    for (let subscription of this.keyChangesSubscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * =======
   * PUBLIC METHODS
   * =======
   */

  /**
   * Preview a movie
   * @param id 
   */
  preview(id: number = 0) {
    this.dialog
      .open(MovieDialogComponent, {
        minWidth: this.dialogWidth,
        data: { movie: this._findMovieById(id) },
      })
      .afterClosed()
      .subscribe(() => {
        this._getMovies();
      });
  }

  /**
   * Delete a movie by id
   * @param id 
   */
  delete(id: number) {
    this.moviesService.delete(id).subscribe((response) => {
      this._getMovies();
    }, (err) => {
      let error: InternalError = {
        friendlyMessage: `Unable to delete selected movie ${id}`,
        message: err.message,
        priority: ERROR_PRIORITY.CRITICAL
      };
      this.errorService.handle(error);
    })
  }

  /**
   * Add a new movie
   */
  add() {
    this.preview();
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
    let keyChangeSubscription = this.filterForm.controls[controlName].valueChanges.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(value => {
      this.filter[controlName as keyof MovieFilter] = value;
      this._getMovies();
    });

    // Pushing the subscription so it can be destroyed when component destroys
    this.keyChangesSubscriptions.push(keyChangeSubscription);
  }

  /**
   * Gets movies based on current page and filter
   */
  private _getMovies() {
    this.moviesService.getMovies(this.pageIndex, this.filter).subscribe((response) => {
      this.movies = response;
    }, (err: Error) => {
      let error: InternalError = {
        friendlyMessage: `Unable to get movies, please try again later!`,
        message: err.message,
        priority: ERROR_PRIORITY.CRITICAL
      };
      this.errorService.handle(error);
    });
  }

  /**
   * Find a movie by id
   * @param id 
   * @returns movie
   */
  private _findMovieById(id: number) {
    return this.movies.find((m) => m.id === id);
  }
}
