import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Category, UserGroup, Post, AuthToken } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) { }
  private api_url = `http://localhost:3000/`;

  //#region "Utility Functions"
  redirect(url: string) {
    window.location.href = url;
  }

  handleError(error: any, action: string, caption: string, redirect: boolean, redirect_url?: string) {
    console.log(`Error ${action} ${caption}: ${error}`);

    if (redirect && redirect_url != null) {
      this.redirect(redirect_url);
    }
  }

  handleResponse(response: any, action: string, caption: string, redirect: boolean, redirect_url?: string) {
    console.log(`${caption} ${action} successfully: ${response}`);

    if (redirect && redirect_url != null) {
      this.redirect(redirect_url);
    }
  }
  //#endregion

  //#region "Get Functions"
  getAllBlogPosts() {
    return this.http.get(`${this.api_url}posts`);
  }

  getAllCategories() {
    return this.http.get<Category[]>(`${this.api_url}categories`);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.api_url}users`);
  }

  getAllGroups() {
    return this.http.get<UserGroup[]>(`${this.api_url}user_groups`);
  }

  getUsersByGroup(group: number) {
    return this.http.get(`${this.api_url}users?group=${group}`);
  }

  getPostsByCategory(category: string) {
    return this.http.get(`${this.api_url}posts?category=${category}`);
  }

  getPost(id: number) {
    return this.http.get(`${this.api_url}posts/${id}`);
  }

  getCategory(id: number) {
    return this.http.get(`${this.api_url}categories/${id}`);
  }

  getUser(id: number) {
    return this.http.get(`${this.api_url}users/${id}`);
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(`${this.api_url}users?email=${email}`);
  }

  getUserGroup(id: number) {
    return this.http.get(`${this.api_url}user_groups/${id}`);
  }

  getUserAuthToken(id: number) {
    return this.http.get<AuthToken>(`${this.api_url}auth_tokens?users_id=${id}`);
  }
  //#endregion

  //#region "Post Functions"
  addCategory(category: Category) {
    this.http.post(`${this.api_url}categories`, category).subscribe({
      next: response => {
        this.handleResponse(response, "added", "Category", true, '/categories');
      },
      error: error => {
        this.handleError(error, 'added', 'category', false);
      }}
    );
  }

  addPost(post: Post) {
    this.http.post(`${this.api_url}posts`, post).subscribe({
      next: response => {
        this.handleResponse(response, "added", "Post", true, '/blog');
      },
      error: error => {
        this.handleError(error, 'added', 'post', false);
      }}
    );
  }

  addUser(user: User) {
    this.http.post(`${this.api_url}users`, user).subscribe({
      next: response => {
        this.handleResponse(response, "added", "User", true, '/users');
      },
      error: error => {
        this.handleError(error, 'added', 'user', false);
      }}
    );
  }

  addGroup(group: UserGroup) {
    this.http.post(`${this.api_url}user_groups`, group).subscribe({
      next: response => {
        this.handleResponse(response, "added", "Group", true, '/groups');
      },
      error: error => {
        this.handleError(error, 'added', 'group', false);
      }}
    );
  }

  addUserAuthToken(token: AuthToken) {
    //Delete the users current authentication token so we dont have duplicates.
    this.deleteAuthToken(token.users_id);

    //Insert the users new authentication token into the auth token table.
    this.http.post(`${this.api_url}auth_tokens`, token).subscribe({
      next: response => {
        this.handleResponse(response, "added", "Auth token", true, '/');
      },
      error: error => {
        this.handleError(error, 'added', 'auth token', false);
      }}
    );
  }
  //#endregion

  //#region "Put Functions"
  updateCategory(id: number, category: any) {
    this.http.put(`${this.api_url}categories/${id}`, category).subscribe({
      next: response => {
        this.handleResponse(response, "updated", "Category", true, '/categories');
      },
      error: error => {
        this.handleError(error, 'updating', 'category', false);
      }}
    );
  }

  updatePost(id: number, post: any): void {
    this.http.put(`${this.api_url}posts/${id}`, post).subscribe({
      next: response => {
        this.handleResponse(response, "updated", "Post", true, `/blog-post/${id}`);
      },
      error: error => {
        this.handleError(error, 'updating', 'post', false);
      }}
    );
  }

  updateUser(id: number, user: User) {
    this.http.put(`${this.api_url}users/${id}`, user).subscribe({
      next: response => {
        this.handleResponse(response, "updated", "User", true, `/user/${id}`);
      },
      error: error => {
        this.handleError(error, 'updating', 'post', false);
      }}
    );
  }

  updateUserGroup(id: number, group: UserGroup) {
    this.http.put(`${this.api_url}user_groups/${id}`, group).subscribe({
      next: response => {
        this.handleResponse(response, "updated", "User", true, `/groups`);
      },
      error: error => {
        this.handleError(error, 'updating', 'post', false);
      }}
    );
  }
  //#endregion

  //#region "Delete Functions"
  deletePost(id: number) : void {
    this.http.delete(`${this.api_url}posts/${id}`).subscribe({
      next: response => {
        this.handleResponse(response, "deleted", "Post", true, '/blog');
      },
      error: error => {
        this.handleError(error, 'deleting', 'post', false);
      }}
    );
  }

  deleteCategory(id: number) : void {
    this.http.delete(`${this.api_url}categories/${id}`).subscribe({
      next: response => {
        this.handleResponse(response, "deleted", "Category", true, '/categories');
      },
      error: error => {
        this.handleError(error, 'deleting', 'category', false);
      }}
    );
  }

  deleteUser(id: number) : void {
    this.http.delete(`${this.api_url}users/${id}`).subscribe({
      next: response => {
        this.handleResponse(response, "deleted", "User", true, '/users');
      },
      error: error => {
        this.handleError(error, 'deleting', 'user', false);
      }}
    );
  }

  deleteUserGroup(id: number) : void {
    this.http.delete(`${this.api_url}user_groups/${id}`).subscribe({
      next: response => {
        this.handleResponse(response, "deleted", "User", true, '/groups');
      },
      error: error => {
        this.handleError(error, 'deleting', 'user group', false);
      }}
    );
  }

  deleteAuthToken(id: number) : void {
    this.http.delete(`${this.api_url}auth_tokens?users_id=${id}`).subscribe({
      next: response => {
        this.handleResponse(response, "deleted", "Auth token", true, '/');
      },
      error: error => {
        this.handleError(error, 'deleting', 'auth token', false);
      }}
    );
  }
  //#endregion
}