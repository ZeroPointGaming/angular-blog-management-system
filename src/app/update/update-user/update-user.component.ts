import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SHA256, lib } from 'crypto-js';
import { RequestsService } from 'src/app/requests.service';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  updateUserForm!: FormGroup;
  groups: any;
  user_id!: number;
  selectedCategory: any = null;

  constructor(private req: RequestsService, private http: HttpClientModule, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      first_name: null,
      last_name: null,
      email: null,
      password: null, 
      confirm_pass: null,
      group: null,
    });

    this.route.params.subscribe(params => {
      this.user_id = +params['id']; // Extract the "id" parameter from the URL
      this.loadUser(this.user_id); // Load the user using the ID
    });

    this.groups = this.loadGroups();
  }

  //Load the loaded users data into the form.
  loadUser(user_id: number): void {
    this.req.getUser(user_id).subscribe(
      (user: any) => {
        this.updateUserForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: null, 
          confirm_pass: null,
          group: user.group,
        });
        this.selectedCategory = user.group;
      }
    );
  }

  //Load the groups for the forms group select input.
  loadGroups(): void {
    this.req.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  hashPass(pass: string, salt: string) : any {
    return SHA256(pass + salt);
  }

  generateSalt() : string {
    return lib.WordArray.random(16).toString();
  }

  onSubmit(): void {
    let updatepass = false;
    let new_user: User;
    if (this.updateUserForm.value.password != "" && this.updateUserForm.value.confirm_pass != "") {
      updatepass = true;
    }

    if (updatepass) {
      if (!this.updateUserForm.value.password == this.updateUserForm.value.confirm_pass) {
        alert("Your password does not match the confirm password field.");
        return;
      }

      let salt = this.generateSalt();

      new_user = {
        first_name: this.updateUserForm.value.first_name,
        last_name: this.updateUserForm.value.last_name,
        email: this.updateUserForm.value.email,
        salt: salt,
        password: this.hashPass(this.updateUserForm.value.password, salt), 
        group: this.updateUserForm.value.group,
        active: 1,
      }
    }
    else {
      new_user = {
        first_name: this.updateUserForm.value.first_name,
        last_name: this.updateUserForm.value.last_name,
        email: this.updateUserForm.value.email,
        group: this.updateUserForm.value.group,
        active: 1,
      }
    }
    
    if (new_user != null) {
      console.log("Error creating user.");
      return;
    }

    this.req.addUser(new_user);
  }
}
