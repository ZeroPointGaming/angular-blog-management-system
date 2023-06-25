import { Component } from '@angular/core';
import { RequestsService } from '../../requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  constructor(private req: RequestsService, private route: ActivatedRoute) { }

  ngOnInit() {
    //Delete the category and then redirect to the categories list. The redirect is handled in the RequestsService.
    this.route.params.subscribe(params => {
      this.req.deleteCategory(+params['id'])
    });
  }
}
