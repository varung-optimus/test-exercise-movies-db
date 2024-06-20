import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Movie } from './types/movie.model';

@Injectable({ providedIn: 'root' })
export class moviesService {
  constructor(private http: HttpClient) {}

  getAll(
    page: string,
    filter: { title?: string; year?: number; rate?: number }
  ): Promise<Movie[]> {
    let url = 'http://localhost:3000/movies';
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

  getSingle(id: string): Promise<Movie> {
    return firstValueFrom(
      this.http.get('http://localhost:3000/movies/' + id)
    ) as any;
  }

  create(movie: Partial<Movie>): Promise<Movie> {
    return firstValueFrom(
      this.http.post('http://localhost:3000/movies', movie)
    ) as any;
  }

  edit(id: string, movie: Partial<Movie>): Promise<Movie> {
    return firstValueFrom(
      this.http.patch('http://localhost:3000/movies/' + id, movie)
    ) as any;
  }

  delete(id: string): Promise<Movie> {
    return firstValueFrom(
      this.http.delete('http://localhost:3000/movies/' + id)
    ) as any;
  }
}
