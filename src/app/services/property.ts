import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PropertyFilters {
  search?: string;
  city?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  status?: string;
  per_page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://127.0.0.1:8000/api/inmuebles';

  constructor(private http: HttpClient) { }

  getProperties(filters?: PropertyFilters): Observable<any> {
    let params = new HttpParams();

    if (filters) {
      if (filters.search) {
        params = params.set('search', filters.search);
      }
      if (filters.city) {
        params = params.set('city', filters.city);
      }
      if (filters.min_price) {
        params = params.set('min_price', filters.min_price.toString());
      }
      if (filters.max_price) {
        params = params.set('max_price', filters.max_price.toString());
      }
      if (filters.bedrooms) {
        params = params.set('bedrooms', filters.bedrooms.toString());
      }
      if (filters.status) {
        params = params.set('status', filters.status);
      }
      if (filters.per_page) {
        params = params.set('per_page', filters.per_page.toString());
      }
    }

    return this.http.get<any>(this.apiUrl, { params });
  }

  searchProperties(query: string): Observable<any> {
    return this.getProperties({ search: query });
  }

  getPropertyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createProperty(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateProperty(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}