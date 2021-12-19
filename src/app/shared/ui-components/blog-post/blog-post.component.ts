import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  @Input() postId = '';
  @Output() blogPostBackBtnEvent: EventEmitter<boolean> = new EventEmitter()

  public currPath = '';

  constructor() { }

  ngOnInit(): void {
    this.currPath = '/assets/blog-posts/' + this.postId + '.md';
  }
  public handleBlogPostBackBtn() {
    this.blogPostBackBtnEvent.emit(true);
  }

}
