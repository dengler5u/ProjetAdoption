import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import {IRespComment} from '../interfaces/comment.interface';

const AUTH_API = 'http://localhost:8080/reponse_com/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RespCommentService {
  constructor(private http: HttpClient) { }

  toCreate(respComment: IRespComment): Observable<any> {
    return this.http.post(AUTH_API + 'creerReponseCom', respComment, httpOptions);
  }
}
