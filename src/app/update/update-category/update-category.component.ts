import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../../requests.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  updateCategoryForm!: FormGroup;
  categoryId: number = 0;

  constructor(private req: RequestsService, private http: HttpClientModule, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateCategoryForm = this.fb.group({
      name: null
    });

    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadCategory(this.categoryId); // Load the post using the ID
    });
  }

  loadCategory(categoryId: number): void {
    this.req.getCategory(categoryId).subscribe(
      (cat: any) => {
        this.updateCategoryForm.patchValue(cat);
      }
    );
  }

  onSubmit(): void {
    const cat = this.updateCategoryForm.value;
    this.req.updateCategory(this.categoryId, cat);
    window.location.href="/categories";
  }
}
