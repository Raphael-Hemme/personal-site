import { Injectable } from '@angular/core';

import blogPostsMetaData from 'src/assets/blog-posts-meta-data.json';


export interface IoGardenPostMetaData {
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
export class IoGardenService {
  private postsMetaData = blogPostsMetaData;

  constructor() { }

  public getAllBlogPostsMetaData(): IoGardenPostMetaData[] {
    return this.postsMetaData;
  }

  public getBlogPostMetaDataById(id: string): IoGardenPostMetaData {
    const postIndex = this.postsMetaData.findIndex(el => el.id === id);
    if (postIndex === -1) {
      throw new Error('There has been a problem with the provided experiment id.');
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
