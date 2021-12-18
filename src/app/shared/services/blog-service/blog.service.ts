import { Injectable } from '@angular/core';

import blogPostsMetaData from 'src/assets/blog-posts/blog-posts-data.json';


export interface BlogPostMetaData {
  'id': string;
  'title': string;
  'subtitle'?: string;
  'dateOriginal'?: string;
  'dateLastEdited'?: string;
  'state': number;
  'postPath': string;
  'previewImageUrl': string;
  'tags'?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private postsMetaData = blogPostsMetaData;

  constructor() { }

  public getBlogPostsMetaData(): BlogPostMetaData[] {
    return this.postsMetaData;
  }

}
