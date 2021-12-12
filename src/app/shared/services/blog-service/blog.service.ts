import { Injectable } from '@angular/core';

export interface BlogPostMetaData {
  'id': string;
  'title': string;
  'subtitle'?: string;
  'dateOriginal'?: string;
  'dateLastEdited'?: string;
  'state': number;
  'postPath': string;
  'thumbnailPath': string;
  'tags'?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }


}
