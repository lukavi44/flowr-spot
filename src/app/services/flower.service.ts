import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Flower } from '../model/flower.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/flowers';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {
  constructor(private http: HttpClient) {}

  getFlowers(): Observable<Flower[]> {
    return this.http.get(baseUrl).pipe(
      map((data: any) => {
        return data && data.flowers.map((elem: any) => new Flower(elem));
      })
    );
  }
}
