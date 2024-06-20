import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Movie } from "../types/movie.model";
import { moviesService } from "./../movies.service";
import { MovieDialogComponent } from "./../movie-dialog/movie-dialog.component";
import { DEFAULT_MOVIE_FILTER, MovieFilter } from "../types/movie-filter.model";
import { errorHandlerService } from "src/app/shared/error-handler.service";
import { ERROR_PRIORITY, InternalError } from "src/app/shared/types/error.model";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent {
  movies: Movie[] = [];
  filter: MovieFilter = DEFAULT_MOVIE_FILTER;
  pageIndex = 1;

  constructor(
    private moviesService: moviesService,
    private dialog: MatDialog,
    private errorService: errorHandlerService
  ) { }

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
  preview(id: number) {
    this.dialog
      .open(MovieDialogComponent, {
        minWidth: "300px",
        data: { movie: this._findMovieById(id) },
      })
      .afterClosed()
      .subscribe(() => {
        this._getMovies();
      });
  }

  async delete(id: number) {
    await this.moviesService.delete(id.toString());
    this._getMovies();
  }

  add() {
    this.preview(0);
  }

  async onSearchChange(e: Event) {
    this.filter.title = (e.target as HTMLInputElement).value;
    this._getMovies();
  }

  async onYearChange(e: Event) {
    this.filter.year = +(e.target as HTMLInputElement).value;
    this._getMovies();
  }

  async onRateChange(e: Event) {
    this.filter.rate = +(e.target as HTMLInputElement).value;
    this._getMovies();
  }

  /**
   * =======
   * PRIVATE METHODS
   * =======
   */

  /**
   * Gets movies based on current page and filter
   */
  private _getMovies() {
    this.moviesService.getMovies(this.pageIndex, this.filter).subscribe((response) => {
      this.movies = response;
    }, (err: Error) => {
      let error: InternalError = {
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
