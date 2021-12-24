import { Injectable } from '@angular/core';

import ioGardenExperimentMetaData from 'src/assets/io-garden-experiment-meta-data.json';


export interface IoGardenExperimentMetaData {
  'id': string;
  'title': string;
  'subtitle'?: string;
  'abstract': string;
  'dateOriginal'?: string;
  'dateLastEdited'?: string;
  'state': number;
  'selector': string;
  'previewImageUrl': string;
  'tags'?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class IoGardenService {
  private experimentMetaData = ioGardenExperimentMetaData;

  constructor() { }

  public getAllBlogPostsMetaData(): IoGardenExperimentMetaData[] {
    return this.experimentMetaData;
  }

  public getBlogPostMetaDataById(id: string): IoGardenExperimentMetaData {
    const experimentIndex = this.experimentMetaData.findIndex(el => el.id === id);
    if (experimentIndex === -1) {
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
    return this.experimentMetaData[experimentIndex];
  }
}
