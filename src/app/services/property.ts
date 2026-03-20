import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://127.0.0.1:8000/api/inmuebles';

  constructor(private http: HttpClient) { }

  getProperties(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}