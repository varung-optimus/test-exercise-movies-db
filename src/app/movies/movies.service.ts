import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Movie } from './types/movie.model';
import { environment } from 'src/environments/environment.development';

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
    filter: { title?: string; year?: number; rate?: number }
  ): Promise<Movie[]> {
    let url = `${environment.domain}${environment.api.movies}`;
    Object.entries(filter)
      .filter(([key, value]) => !!value)
      .forEach(([key, value], index) => {
        const prefix = index === 0 ? '?' : '&';
        switch (key) {
          case 'title':
            url += `${prefix}title_like=${value}`;
            break;
          case 'year':
            url += `${prefix}year=${value}`;
            break;
          case 'rate':
            url += `${prefix}rate=${value}`;
            break;
        }
      });
    return firstValueFrom(this.http.get(url)) as any;
  }

  /**
   * Get a movie by id
   * @param id 
   * @returns 
   */
  getMovieById(id: string): Promise<Movie> {
    return firstValueFrom(
      this.http.get(`${environment.domain}${environment.api.movies}/${id}`)
    ) as any;
  }

  /**
   * Create a movie
   * @param movie 
   * @returns 
   */
  create(movie: Partial<Movie>): Promise<Movie> {
    return firstValueFrom(
      this.http.post(`${environment.domain}${environment.api.movies}`, movie)
    ) as any;
  }

  /**
   * Update a movie
   * @param id 
   * @param movie 
   * @returns 
   */
  edit(id: string, movie: Partial<Movie>): Promise<Movie> {
    return firstValueFrom(
      this.http.patch(`${environment.domain}${environment.api.movies}/${id}`, movie)
    ) as any;
  }

  /**
   * Delete a movie
   * @param id 
   * @returns 
   */
  delete(id: string): Promise<Movie> {
    return firstValueFrom(
      this.http.delete(`${environment.domain}${environment.api.movies}/${id}`)
    ) as any;
  }
}
