import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

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

  getUserGroup(id: number) {
    return this.http.get(`${this.api_url}user_groups/${id}`);
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
  //#endregion
}

//#region "Object Interfaces"
export interface Post {
  id?: number; //Id of the post, set to optional because New posts wont have an ID until after they are entered into the database.
  title: string; //Title of the post.
  summary: string; //Summary of the post content.
  content: string; //Main post content.
  author: string; //Author of the post.
  category: string; //Category of post.
  created_on?: string; //Timestamp of creation date.
  created_by?: number; //User id of the creator of the post.
}

export interface Category {
  id?: number; //Id of the category, set to optional because New categories wont have an ID until after they are entered into the database.
  name: string; //Name of the category.
  created_on?: string; //Timestamp of creation date.
  created_by?: number; //User id of the creator of the post.
}

export interface User {
  id?: number //Id of the user, set to optional because New users wont have an ID until after they are entered into the database.
  first_name: string; //First name of the user.
  last_name: string; //Last name of th euser.
  email: string; //Email of the user.
  password?: string; //Password hash of the user.
  salt?: string; //Hash salt for the users password.
  group: number; //Users group id.
  active: number; //Whether or not the user is in an active state.
  created_on?: string; //Timestamp of creation date.
  created_by?: number; //User id of the creator of the post.
}

export interface UserGroup {
  id?: number; //Id of the user group, set to optional because New user groups wont have an ID until after they are entered into the database.
  name: string; //Name of the users group.
  created_on?: string; //Timestamp of creation date.
  created_by?: number; //User id of the creator of the post.
}
//#endregion