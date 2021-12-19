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

  public getAllBlogPostsMetaData(): BlogPostMetaData[] {
    return this.postsMetaData;
  }

  public getBlogPostMetaDataById(id: string): BlogPostMetaData {
    const postIndex = this.postsMetaData.findIndex(el => el.id === id);
    if (postIndex === -1) {
      throw new Error('There was a problem with the provided blog post id.');
/*       return {
        'id': '',
        'title': '',
        'subtitle': '',
        'dateOriginal': '',
        'dateLastEdited': '',
        'state': 0,
        'postPath': '',
        'previewImageUrl': '',
        'tags': []
      }; */
    }
    return this.postsMetaData[postIndex];
  }


}
