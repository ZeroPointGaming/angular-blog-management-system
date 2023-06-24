import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../requests.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent {
  updatePostForm!: FormGroup;
  postId: number = 0;
  categories: any;
  selectedCategory: any = null;

  constructor(private req: RequestsService, private http: HttpClientModule, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updatePostForm = this.fb.group({
      title: null,
      author: null,
      summary: null,
      content: null,
      category: null
    });

    this.route.params.subscribe(params => {
      this.postId = +params['id']; // Extract the "id" parameter from the URL
      this.loadPost(this.postId); // Load the post using the ID
    });

    this.categories = this.loadCategories();
  }

  loadPost(postId: number): void {
    this.req.getPost(postId).subscribe(
      (post: any) => {
        this.updatePostForm.patchValue({
          title: post.title,
          author: post.author,
          summary: post.summary,
          content: post.content,
          category: post.category
        });
        this.selectedCategory = post.category;
      }
    );
  }

  loadCategories(): void {
    this.req.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    const post = this.updatePostForm.value;
    this.req.updatePost(this.postId, post);
  }
}
