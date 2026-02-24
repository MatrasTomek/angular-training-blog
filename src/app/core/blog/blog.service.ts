import { Injectable } from '@angular/core';
import { CreatePostInterface } from '../interfaces/create-post.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  url = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  addPost(data: CreatePostInterface): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.url}`, data, { headers });
  }

  getAllPosts(data: GerPostInterface);
}
