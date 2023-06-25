import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService, User } from './requests.service';
import { SHA256 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private req: RequestsService) { }

  private user!: User;

  hashPass(pass: string, salt: string) : any {
    return SHA256(pass + salt).toString();
  }
  
  login(email: string, password: string) {
    //If the user did not actually send a password exit the function and throw an error.
    if (!password) {
      throw new Error("Password cannot be undefined or null");
    }

    /***
    If the user sent a password, load the requested user by email to do a password comparison. This is a security vulnerability, this would allow an attacker to 
    just query all of the users password hashes from the database. This should not be included in a production environment and should be converted to a backend 
    based authentication system when possible.
    ***/
    this.req.getUserByEmail(email).subscribe(data => {
      this.user = data;
    });

    if (this.user == null) {
      throw new Error("User does not exist.");
    }

    if (this.hashPass(password, <string>this.user.salt).toString() != this.user.password) {
      throw new Error("Invalid username or password.");
    }
  }

  logout() {

  }
}
