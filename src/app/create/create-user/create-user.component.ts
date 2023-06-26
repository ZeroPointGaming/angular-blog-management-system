import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestsService } from 'src/app/requests.service';
import { User } from 'src/app/interfaces';
import { SHA256, lib } from 'crypto-js';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  createUserForm!: FormGroup;
  groups: any;

  constructor(private req: RequestsService, private http: HttpClientModule, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      first_name: null,
      last_name: null,
      email: null,
      password: null, 
      confirm_pass: null,
      group: null,
    });

    this.groups = this.loadGroups();
  }

  loadGroups(): void {
    this.req.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  hashPass(pass: string, salt: string) : any {
    return SHA256(pass + salt).toString();
  }

  generateSalt() : string {
    return lib.WordArray.random(16).toString();
  }

  onSubmit(): void {
    if (!this.createUserForm.value.password == this.createUserForm.value.confirm_pass) {
      alert("Your password does not match the confirm password field.");
      return;
    }

    let salt = this.generateSalt();

    const new_user: User = {
      first_name: this.createUserForm.value.first_name,
      last_name: this.createUserForm.value.last_name,
      email: this.createUserForm.value.email,
      salt: salt,
      password: this.hashPass(this.createUserForm.value.password, salt), 
      group: this.createUserForm.value.group.value,
      active: 1,
    }

    if (new_user == null) {
      console.log("Error creating user.");
      return;
    }

    this.req.addUser(new_user);
  }
}
