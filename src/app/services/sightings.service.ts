import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Sighting,
  SightingComment,
  SightingLike,
} from '../model/sightings.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com//api/v1/sightings';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Accept: 'application/json',
//     'Content-Type': 'application/json; charset=utf-8',
//     'Access-Control-Allow-Credentials': '*',
//     'X-Requested-With': 'XMLHttpRequest',
//   }),
// };

@Injectable({
  providedIn: 'root',
})
export class SightingsService {
  constructor(private http: HttpClient) {}

  getAllSightings(): Observable<Sighting[]> {
    return this.http.get(baseUrl).pipe(
      map((data: any) => {
        return (
          (data && data.sightings.map((elem: any) => new Sighting(elem))) || []
        );
      })
    );
  }

  postSighting(sighting: Sighting): Observable<any> {
    return this.http.post(baseUrl, sighting).pipe(
      map((data: any) => {
        return new Sighting(data);
      })
    );
  }

  // getOneSighting(id: number): Observable<Sighting> {
  //   return this.http.get(`${baseUrl}/${id}`).pipe(
  //     map((data: any) => {
  //       console.log(data, 'iz servise sighting');
  //       return new Sighting(data);
  //     })
  //   );
  // }
  getOne(id: number) {
    return this.http.get<Sighting>(`${baseUrl}/${id}`).pipe(
      map((response) => {
        ({
          id: response.id,
          description: response.description,
          picture: response.picture,
          likes_count: response.likes_count,
          comments_count: response.comments_count,
          created_at: response.created_at,
          flower: response.flower,
          latitude: response.latitude,
          longitude: response.longitude,
          name: response.name,
          user: response.user,
        } as unknown as Sighting);
        const userResponse = { ...response } as Sighting;
        return userResponse;
      })
    );
  }

  getUserSightings(id: number): Observable<Sighting[]> {
    return this.http
      .get(`https://flowrspot-api.herokuapp.com//api/v1/users/${id}/sightings`)
      .pipe(
        map((data: any) => {
          return (
            (data && data.sightings.map((elem: any) => new Sighting(elem))) ||
            []
          );
        })
      );
  }

  getSightingComments(id: number): Observable<SightingComment[]> {
    return this.http.get(`${baseUrl}/${id}/comments`).pipe(
      map((data: any) => {
        return (
          (data &&
            data.comments.map((elem: any) => new SightingComment(elem))) ||
          []
        );
      })
    );
  }

  getSightingLikes(id: number): Observable<SightingLike[]> {
    return this.http.get(`${baseUrl}/${id}/likes`).pipe(
      map((data: any) => {
        return (
          (data && data.likes.map((elem: any) => new SightingLike(elem))) || []
        );
      })
    );
  }

  postSightingComment(sightingId: number, comment: Comment): Observable<any> {
    return this.http
      .post<Comment>(`${baseUrl}/${sightingId}/comments`, comment)
      .pipe(
        map((response: any) => {
          console.log(response);
        })
      );
  }
}
