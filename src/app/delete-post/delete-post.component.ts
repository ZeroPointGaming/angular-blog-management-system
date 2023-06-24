import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {
  constructor(private req: RequestsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.req.deletePost(+params['id'])
      window.location.href = "/";
    });
  }
}
