import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url: string = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  constructor(
    private http:HttpClient
  ) { }

  getUserData() {
    return this.http.get(this.url);
  }
}
