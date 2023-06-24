import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) { }

  getAllBlogPosts() {
    const url = 'http://localhost:3000/posts';
    return this.http.get(url);
  }

  getAllCategories() {
    const url = 'http://localhost:3000/categories';
    return this.http.get(url);
  }

  getPostsByCategory(category: string) :any {
    const url = `http://localhost:3000/posts?category=${category}`;
    return this.http.get(url);
  }

  getPost(postId: number): any {
    const url = `http://localhost:3000/posts/${postId}`;
    return this.http.get(url);
  }

  getCategory(categoryId: number): any {
    const url = `http://localhost:3000/categories/${categoryId}`;
    return this.http.get(url);
  }

  addCategory(category: string): Observable<any> {
    const url = 'http://localhost:3000/categories';

    return this.http.get<Category[]>(url).pipe(
      switchMap((cats: Category[]) => {
        const nextId = this.getNextCatId(cats);
        const newCategory: Category = { id: nextId, name: category };
        return this.http.post(url, newCategory);
      })
    );
  }

  addPost(post: { title: string, summary: string, content: string, author: string, category: string }) {
    const url = `http://localhost:3000/posts`; 

    // Fetch the existing posts to determine the next ID
    this.http.get<Post[]>(url).subscribe(
      (posts: Post[]) => {
        const nextId = this.getNextPostId(posts);
        const newPost = { id: nextId, ...post };

        // Send the POST request to add the new post
        this.http.post(url, newPost).subscribe(
          response => {
            console.log('Post added successfully:', response);
            // Handle success response if needed
          },
          error => {
            console.error('Error adding post:', error);
            // Handle error response if needed
          }
        );
      },
      error => {
        console.error('Error fetching posts:', error);
        // Handle error response if needed
      }
    );
  }

  deletePost(id: number): void {
    const url = `http://localhost:3000/posts/${id}`;

    this.http.delete(url).subscribe(
      response => {
        console.log('Post deleted successfully:', response);
        // Handle success response if needed
      },
      error => {
        console.error('Error deleting post:', error);
        // Handle error response if needed
      }
    );
  }

  deleteCategory(id: number): void {
    const url = `http://localhost:3000/categories/${id}`;

    this.http.delete(url).subscribe(
      response => {
        console.log('Category deleted successfully:', response);
        // Handle success response if needed
      },
      error => {
        console.error('Error deleting category:', error);
        // Handle error response if needed
      }
    );
  }

  updateCategory(id: number, category: any) {
    const url = `http://localhost:3000/categories/${id}`;

    this.http.put(url, category).subscribe(
      response => {
        console.log('Category updated successfully:', response);
        // Handle success response if needed
      },
      error => {
        console.error('Error updating category:', error);
        // Handle error response if needed
      }
    );
  }

  updatePost(id: number, post: any): void {
    const url = `http://localhost:3000/posts/${id}`;

    this.http.put(url, post).subscribe(
      response => {
        console.log('Post updated successfully:', response);
        // Handle success response if needed
      },
      error => {
        console.error('Error updating post:', error);
        // Handle error response if needed
      }
    );
  }

  private getNextPostId(posts: Post[]): number {
    const maxId = posts.reduce((max, post) => (post.id > max ? post.id : max), 0);
    return maxId + 1;
  }

  private getNextCatId(cats: Category[]): number {
    console.log("getting next cat id");
    const maxId = cats.reduce((max, cat) => (cat.id > max ? cat.id : max), 0);

    console.log(maxId +1);
    return maxId + 1;
  }
}

interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
}