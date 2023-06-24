import { Component } from '@angular/core';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any;

  constructor(private req: RequestsService) { }

  ngOnInit(): void {
    this.req.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
