import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from './types/movie.model';
import { environment } from 'src/environments/environment';
import { MovieFilter } from './types/movie-filter.model';

@Injectable({ providedIn: 'root' })
export class moviesService {
  constructor(private http: HttpClient) { }

  /**
   * Get all movies based on pagination and applied filter
   * @param page page index
   * @param filter filter query
   * @returns movies
   */
  getMovies(
    page: number,
    filter: MovieFilter
  ): Observable<Movie[]> {
    let url = `${environment.domain}${environment.api.movies}`;
    url = this._getFilterAppliedUrl(filter, url);
    return this.http.get(url).pipe(
      map(response => <Movie[]>response)
    );
  }

  /**
   * Get a movie by id
   * @param id 
   * @returns 
   */
  getMovieById(id: string): Observable<Movie> {
    return this.http.get(`${environment.domain}${environment.api.movies}/${id}`).pipe(
      map(response => <Movie>response)
    );
  }

  /**
   * Create a movie
   * @param movie 
   * @returns 
   */
  create(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post(`${environment.domain}${environment.api.movies}`, movie).pipe(
      map(response => <Movie>response)
    );
  }

  /**
   * Update a movie
   * @param id 
   * @param movie 
   * @returns 
   */
  edit(id: string, movie: Partial<Movie>): Observable<Movie> {
    return this.http.patch(`${environment.domain}${environment.api.movies}/${id}`, movie).pipe(
      map(response => <Movie>response)
    );
  }

  /**
   * Delete a movie
   * @param id 
   * @returns 
   */
  delete(id: number): Observable<Movie> {
    return this.http.delete(`${environment.domain}${environment.api.movies}/${id}`).pipe(
      map(response => <Movie>response)
    )
  }

  /***
   * =======
   * PRIVATE METHODS
   * =======
   */

  /**
   * Gets base url and filter criteria - builds filter url and returns it
   * @param filter 
   * @param baseUrl 
   */
  private _getFilterAppliedUrl(filter: MovieFilter, baseUrl: string) {
    Object.entries(filter)
      .filter(([key, value]) => !!value)
      .forEach(([key, value], index) => {
        const prefix = index === 0 ? '?' : '&';
        switch (key) {
          case 'title':
            baseUrl += `${prefix}title_like=${value}`;
            break;
          case 'year':
            baseUrl += `${prefix}year=${value}`;
            break;
          case 'rate':
            baseUrl += `${prefix}rate=${value}`;
            break;
        }
      });
    return baseUrl;
  }
}
