import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from './requests.service';
import { AuthToken, User } from './interfaces';
import { SHA256 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
/***
 * If the user logs in, load the requested user by email to do a password comparison. This is a security vulnerability, this would allow an attacker to 
  just query all of the users password hashes from the database. This should not be included in a production environment and should be converted to a backend 
  based authentication system when possible. All of the authorization code should be on a server sided application to prevent tampering by the end users.
  This is written using json-server as a simple backend data storage solution and not intended for production use.
 ***/
export class AuthenticationService {
  constructor(private http: HttpClient, private req: RequestsService) { }
  private user!: User;
  private timestamp = new Date().getTime();

  hashPass(pass: string, salt: string) : any {
    return SHA256(pass + salt).toString();
  }

  /***
   * Returns a sha256 string representing the user id and the logged in timestamp.
   ***/
  generateAuthenticationToken(id: number) {
    this.timestamp = new Date().getTime();
    return SHA256(`User ${id} logged_in ${this.timestamp.toString()}`).toString();
  }
  
  login(email: string, password: string) {
    //If the user did not actually send a password exit the function and throw an error.
    if (!password) {
      throw new Error("Password cannot be undefined or null");
    }
    
    this.req.getUserByEmail(email).subscribe(data => {
      this.user = data;
    });

    if (this.user == null) {
      throw new Error("User does not exist.");
    }

    if (this.hashPass(password, <string>this.user.salt).toString() != this.user.password) {
      alert("Invalid username or password.");
      throw new Error("Invalid username or password.");
    }

    //Generate the users authentication token.
    let expiration = this.timestamp + (12 * 60 * 60 * 1000)
    let auth_token : AuthToken = { 
      users_id: <number>this.user.id, 
      token: <string>this.generateAuthenticationToken(<number>this.user.id), 
      expiration: expiration
    };

    //Send the users authentication token to the database.
    this.req.addUserAuthToken(auth_token);

    //Send the users authentication token to the local users storage as a json object.
    localStorage.setItem('user', JSON.stringify(auth_token));
  }

  logout() {

  }
}
