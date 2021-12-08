import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog-service/blog.service';

// import { post } from 'src/assets/blog-posts/2021-01-06-hello-gh-pages-world'

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  // public myMarkdown: any;

  constructor(
    private blogService: BlogService
  ){}

  // public myMarkdown = post;

/*   `
  #test

  \`\`\`javascript
  const a = 'test';
  const myFunc = () => {
    console.log(a);
  }
  \`\`\`
  ` */


  ngOnInit(): void {
/*     this.blogService
      .getBlogPost('http://localhost:4200/test.md')
      .subscribe(res => {
        console.log(res)
        this.myMarkdown = res
      }
    ); */
  }

}
