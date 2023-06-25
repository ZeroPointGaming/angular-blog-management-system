import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../requests.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  cards: any;

  constructor(private req: RequestsService) { }

  ngOnInit(): void {
    this.req.getAllBlogPosts().subscribe(data => {
      this.cards = data;
    });
  }
}
