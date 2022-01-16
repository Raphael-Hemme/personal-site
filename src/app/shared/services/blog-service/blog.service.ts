import { Injectable } from '@angular/core';

import blogPostsMetaData from 'src/assets/blog-posts-meta-data.json';


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
      throw new Error('There has been a problem with the provided blog post id.');
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

  public getRandomBlogPostMetaData(): BlogPostMetaData {
    const randomIndex = Math.floor(Math.random() * this.postsMetaData.length);
/*     console.log('this.experimentMetaData.length', this.experimentMetaData.length);
    console.log('randomIndex', randomIndex); */
    return this.postsMetaData[randomIndex]
  }

  public getAllBlogTags(): string[] {
    const resultArr: string[] = [];
    this.postsMetaData.forEach(entry => {
      resultArr.push(...entry.tags)
    });
    return resultArr;
  }

  public getIoGardenExperimentsByTag(tag: string): BlogPostMetaData[] {
    return this.postsMetaData.filter(el => el.tags.includes(tag));
  }
}
