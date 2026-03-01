import { Injectable } from '@angular/core';
import { CreatePostInterface } from '../interfaces/create-post.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetPostInterface } from '../interfaces/get-post.interface';
import { PostInterface, ResPostInterface } from '../interfaces/post.interface';
import { CreateCommentInterface } from '../interfaces/dialog-form.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  url = 'http://localhost:8080/api/posts';
  urlComment = 'http://localhost:8080/api/comments';
  urlDelete = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  addPost(data: CreatePostInterface): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.url, data, { headers });
  }

  getAllPosts(data: GetPostInterface): Observable<ResPostInterface> {
    return this.http.get<ResPostInterface>(
      `${this.url}?page=${data.page}&size=${data.size}`,
    );
  }

  getPostById(id: string): Observable<PostInterface> {
    return this.http.get<PostInterface>(`${this.url}/${id}`);
  }

  addComment(data: CreateCommentInterface): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.urlComment, data, { headers });
  }

  deletePost(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.url}/${id}`, { headers });
  }
}
