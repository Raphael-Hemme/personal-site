import { Injectable } from '@angular/core';

import blogPostsMetaData from 'src/assets/blog-posts-meta-data.json';


export interface BlogPostMetaData {
  'id': string;
  'title': string;
  'abstract'?: string;
  'descriptionUrl'?: string;
  'dateOriginal'?: string;
  'dateLastEdited'?: string;
  'phase': number;
  'previewImageUrl': string;
  'tags': any[];
  'isPublished': boolean;
  'category': string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private postsMetaData = blogPostsMetaData;

  constructor() { }

  public getAllBlogPostsMetaData(): BlogPostMetaData[] {
    const resultArr = this.postsMetaData.filter(el => el.isPublished === true)
    return resultArr;
  }

  public getBlogPostMetaDataById(id: string): BlogPostMetaData {
    const postIndex = this.postsMetaData.findIndex(el => el.id === id);
    if (postIndex === -1) {
      throw new Error('There has been a problem with the provided blog post id.');
    }
    return this.postsMetaData[postIndex];
  }

  public getRandomBlogPostMetaData(): BlogPostMetaData {
    const publishedPostsArr = this.getAllBlogPostsMetaData();
    const randomIndex = Math.floor(Math.random() * publishedPostsArr.length);
    return publishedPostsArr[randomIndex]
  }

  public getAllBlogTags(): string[] {
    const publishedPostsArr: BlogPostMetaData[] = this.getAllBlogPostsMetaData();
    const resultArr: string[] = [];
    publishedPostsArr.forEach((entry: BlogPostMetaData) => {
      resultArr.push(...entry.tags)
    });
    return resultArr;
  }

  public getIoGardenExperimentsByTag(tag: string): BlogPostMetaData[] {
    const publishedPostsArr: BlogPostMetaData[] = this.getAllBlogPostsMetaData();
    return publishedPostsArr.filter(el => el.tags.includes(tag));
  }
}
