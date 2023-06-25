import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestsService } from '../../requests.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  createPostForm!: FormGroup;
  categories: any;

  constructor(private req: RequestsService, private http: HttpClientModule, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      title: null,
      author: null,
      summary: null,
      content: null,
      category: null
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.req.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    const post = this.createPostForm.value;
    this.req.addPost(post);
  }
}
