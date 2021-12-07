import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {


  public myMarkdown = `
  #test

  \`\`\`javascript
  const a = 'test';
  const myFunc = () => {
    console.log(a);
  }
  \`\`\`
  `

  constructor() { }

  ngOnInit(): void {
  }

}
