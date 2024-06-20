import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Movie } from "../types/movie.model";
import { moviesService } from "./../movies.service";
import { MovieDialogComponent } from "./../movie-dialog/movie-dialog.component";
import { DEFAULT_MOVIE_FILTER, MovieFilter } from "../types/movie-filter.model";

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
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    const movies = await this.moviesService.getMovies(this.pageIndex, this.filter);
    this.movies = movies;
  }

  preview(id: number) {
    const selectedMovie = this.movies.find((m) => m.id === id);
    this.dialog
      .open(MovieDialogComponent, {
        minWidth: "300px",
        data: { movie: selectedMovie },
      })
      .afterClosed()
      .subscribe(async () => {
        this.movies = await this.moviesService.getMovies(this.pageIndex, this.filter);
      });
  }

  async delete(id: number) {
    await this.moviesService.delete(id.toString());
    const movies = await this.moviesService.getMovies(this.pageIndex, this.filter);
    this.movies = movies;
  }

  add() {
    this.preview(0);
  }

  async onSearchChange(e: Event) {
    this.filter.title = (e.target as HTMLInputElement).value;
    this.movies = await this.moviesService.getMovies(this.pageIndex, this.filter);
  }

  async onYearChange(e: Event) {
    this.filter.year = +(e.target as HTMLInputElement).value;
    this.movies = await this.moviesService.getMovies(this.pageIndex, this.filter);
  }

  async onRateChange(e: Event) {
    this.filter.rate = +(e.target as HTMLInputElement).value;
    this.movies = await this.moviesService.getMovies(this.pageIndex, this.filter);
  }
}
