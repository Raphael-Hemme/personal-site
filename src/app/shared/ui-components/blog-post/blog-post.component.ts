import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  // @Input() postId = '';
  // @Output() blogPostBackBtnEvent: EventEmitter<boolean> = new EventEmitter()

  public currPath = '';
  public currPostId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currPostId = params.get('id')
      console.log(this.currPostId)
    });



    this.currPath = '/assets/blog-posts/' + this.currPostId + '.md';
  }
  public handleBlogPostBackBtn() {
    // this.blogPostBackBtnEvent.emit(true);
    this.router.navigate(['/blog']);
  }

}
