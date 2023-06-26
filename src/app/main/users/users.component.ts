import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestsService } from 'src/app/requests.service';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: any;
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private req: RequestsService) { }

  ngOnInit(): void {
    this.req.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() : void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
