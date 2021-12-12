import { Component, Input, OnInit } from '@angular/core';
import { BlogPostMetaData } from '../../services/blog-service/blog.service';

@Component({
  selector: 'app-blog-post-preview',
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.scss']
})
export class BlogPostPreviewComponent implements OnInit {

  @Input() metaData: BlogPostMetaData = {
    'id': '',
    'title': '',
    'subtitle': '',
    'dateOriginal': '',
    'dateLastEdited': '',
    'state': 0,
    'postPath': '',
    'thumbnailPath': '',
    'tags': []
  };

  constructor() { }

  ngOnInit(): void {
  }

}
