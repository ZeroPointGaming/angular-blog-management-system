import { Component } from '@angular/core';
import { RequestsService } from '../requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  constructor(private req: RequestsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.req.deleteCategory(+params['id'])
      window.location.href = "/categories";
    });
  }
}
