import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-delete-user-group',
  templateUrl: './delete-user-group.component.html',
  styleUrls: ['./delete-user-group.component.css']
})
export class DeleteUserGroupComponent {
  constructor(private req: RequestsService, private route: ActivatedRoute) { }

  ngOnInit() {
    //Delete the user group and then redirect to the user groups list. The redirect is handled in the RequestsService.
    this.route.params.subscribe(params => {
      this.req.deleteUserGroup(+params['id'])
    });
  }
}
