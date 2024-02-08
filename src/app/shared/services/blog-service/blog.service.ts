import { Injectable } from '@angular/core';

import blogPostsMetaData from 'src/assets/blog-posts-meta-data.json';
import { TagInfoObj } from '../tag-mapping-service/tag-mapping.service';


export interface BlogPostMetaData {
  'id': string;
  'title': string;
  'abstract'?: string;
  'descriptionUrl'?: string;
  'dateOriginal'?: string;
  'dateLastEdited'?: string;
  'phase': number;
  'previewImageUrl': string;
  'tags': string[];
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

  public getAllBlogTags(): TagInfoObj[] {
    const publishedPostsArr: BlogPostMetaData[] = this.getAllBlogPostsMetaData();
    const tagStrArr: string[] = [];
    publishedPostsArr.forEach((entry: BlogPostMetaData) => {
      tagStrArr.push(...entry.tags)
    });

    return tagStrArr.map((tagName: string) => {
      return {
        name: tagName,
        isActive: false,
        count: tagStrArr.filter(el => el === tagName).length
      };
    });
  }

  public getBlogPostsByTag(tag: string): BlogPostMetaData[] {
    const publishedPostsArr: BlogPostMetaData[] = this.getAllBlogPostsMetaData();
    return publishedPostsArr.filter(el => el.tags.includes(tag));
  }

  public getBlogPostCountByTag(tag: string): number {
    const publishedExperimentArr: BlogPostMetaData[] = this.getAllBlogPostsMetaData();
    return publishedExperimentArr.filter(el => el.tags.includes(tag)).length;
  }
}
