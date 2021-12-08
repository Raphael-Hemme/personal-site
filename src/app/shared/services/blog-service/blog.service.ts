import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogPost(id: string) {
    const path = '/src/' + id + '.md'
    return this.http.get('http://localhost:4200/test.md');
  }
}
