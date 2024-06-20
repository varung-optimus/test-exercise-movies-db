import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';
import { Actor } from './types/actor.model';
import { environment } from 'src/environments/environment';
import { ActorFilter } from './types/actor-filter.model';

@Injectable({ providedIn: 'root' })
export class actorsService {
  constructor(private http: HttpClient) { }

  /**
   * Get all actors based on pagination and applied filter
   * @param page page index
   * @param filter filter query
   * @returns actors
   */
  getActors(page: number, filter?: ActorFilter): Observable<Actor[]> {
    let url = `${environment.domain}${environment.api.actors}`;
    // apply filter to url (if applicable)
    if (filter?.name) {
      url += `?name_like=${filter.name}`;
    }
    return this.http.get(url).pipe(
      map(response => <Actor[]>response)
    );
  }

  /**
  * Get a actor by id
  * @param id 
  * @returns 
  */
  getActorById(id: string): Promise<Actor> {
    return firstValueFrom(
      this.http.get(`${environment.domain}${environment.api.actors}/${id}`)
    ) as any;
  }

  /**
   * Create an actor
   * @param actor 
   * @returns 
   */
  create(actor: Partial<Actor>): Promise<Actor> {
    return firstValueFrom(
      this.http.post(`${environment.domain}${environment.api.actors}`, actor)
    ) as any;
  }
}
