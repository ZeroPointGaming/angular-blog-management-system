import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { RequestsService } from '../../requests.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Category } from 'src/app/interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  categories: any;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private req: RequestsService) { }

  ngOnInit(): void {
    this.req.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.dataSource.data = categories;
    });
  }

  ngAfterViewInit() : void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
