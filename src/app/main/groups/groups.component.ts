import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestsService } from 'src/app/requests.service';
import { UserGroup } from 'src/app/interfaces';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, AfterViewInit {
  groups: any;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<UserGroup>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private req: RequestsService) { }

  ngOnInit(): void {
    this.req.getAllGroups().subscribe((users: UserGroup[]) => {
      this.groups = users;
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() : void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
