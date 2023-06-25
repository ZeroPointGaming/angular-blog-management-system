import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestsService, UserGroup } from 'src/app/requests.service';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent {
  updateUserGroupForm!: FormGroup;
  category_id!: number;

  constructor(private req: RequestsService, private http: HttpClientModule, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateUserGroupForm = this.fb.group({
      name: null
    });

    this.route.params.subscribe(params => {
      this.category_id = +params['id']; // Extract the "id" parameter from the URL
      this.loadCategory(this.category_id); // Load the category using the ID
    });
  }

  loadCategory(id: number) {
    this.req.getUserGroup(id).subscribe(
      (cat: any) => {
        this.updateUserGroupForm.patchValue({
          name: cat.name
        });
      }
    );
  }

  onSubmit(): void {
    const update_cat: UserGroup = {
      name: this.updateUserGroupForm.value.name
    }

    this.req.updateUserGroup(this.category_id, update_cat);
  }
}
