import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  constructor(private req: RequestsService, private route: ActivatedRoute) { }

  ngOnInit() {
    //Delete the user and then redirect to the users list. The redirect is handled in the RequestsService.
    this.route.params.subscribe(params => {
      this.req.deleteUser(+params['id'])
    });
  }
}
