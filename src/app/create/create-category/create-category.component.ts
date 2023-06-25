import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestsService } from '../../requests.service';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  createCategoryForm!: FormGroup;

  constructor(private req: RequestsService, private http: HttpClientModule, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createCategoryForm = this.fb.group({
      name: null
    });
  }

  onSubmit(): void {
    this.req.addCategory({name: this.createCategoryForm.value.name});
  }
}
