import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  createGroupForm!: FormGroup;

  constructor(private req: RequestsService, private http: HttpClientModule, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createGroupForm = this.fb.group({
      name: null
    });
  }

  onSubmit(): void {
    this.req.addGroup({name: this.createGroupForm.value.name});
  }
}
