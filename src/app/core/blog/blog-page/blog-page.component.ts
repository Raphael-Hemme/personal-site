import { Component, OnInit } from '@angular/core';

import { post } from 'src/assets/blog-posts/2021-01-06-hello-gh-pages-world'

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  constructor(){}

  public myMarkdown = post;

/*   `
  #test

  \`\`\`javascript
  const a = 'test';
  const myFunc = () => {
    console.log(a);
  }
  \`\`\`
  ` */


  ngOnInit(): void {}

}
