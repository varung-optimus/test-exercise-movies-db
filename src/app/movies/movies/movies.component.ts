import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Movie } from "../types/movie.model";
import { moviesService } from "./../movies.service";
import { MovieDialogComponent } from "./../movie-dialog/movie-dialog.component";
import { DEFAULT_MOVIE_FILTER, MovieFilter } from "../types/movie-filter.model";
import { errorHandlerService } from "src/app/shared/error-handler.service";
import { ERROR_PRIORITY, InternalError } from "src/app/shared/types/error.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent {
  movies: Movie[] = [];
  filter: MovieFilter = DEFAULT_MOVIE_FILTER;
  pageIndex = 1;
  dialogWidth = '300px';
  debounceTime = 500;
  filterForm: FormGroup = this.formBuilder.group({
    title: [this.filter.title],
    year: [this.filter.year],
    rate: [this.filter.rate]
  });

  constructor(
    private moviesService: moviesService,
    private dialog: MatDialog,
    private errorService: errorHandlerService,
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
    this.filterForm.controls[controlName].valueChanges.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(value => {
      this.filter[controlName as keyof MovieFilter] = value;
      this._getMovies();
    })
  }

  /**
   * Gets movies based on current page and filter
   */
  private _getMovies() {
    this.moviesService.getMovies(this.pageIndex, this.filter).subscribe((response) => {
      this.movies = response;
    }, (err: Error) => {
      let error: InternalError = {
        friendlyMessage: `Unable to get movies from database, please try again later!`,
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
