import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {

   }

   public addUser(user:any) :Observable<any> {
   	return this.http.post(`/api/user/`,user);
   }

   public getUser(username:string) :Observable<any> {
   	return this.http.get(`/api/user/${username}`);
   }
}
