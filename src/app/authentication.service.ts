import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private req: RequestsService) { }
  private api_url = `http://localhost:3000/`;

  login(email: string, password: string) {

  }

  logout() {

  }
}
