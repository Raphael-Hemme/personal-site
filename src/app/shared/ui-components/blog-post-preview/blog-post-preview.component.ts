import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-post-preview',
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.scss']
})
export class BlogPostPreviewComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
