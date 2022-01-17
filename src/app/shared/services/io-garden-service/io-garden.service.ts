import { Injectable } from '@angular/core';

import ioGardenExperimentMetaData from 'src/assets/io-garden-experiment-meta-data.json';


export interface IoGardenExperimentMetaData {
  'id': string;
  'title': string;
  'subtitle'?: string;
  'abstract'?: string;
  'descriptionUrl'?: string;
  'dateOriginal'?: string;
  'dateLastEdited'?: string;
  'phase': number;
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

  public getAllIoGardenExperimentsMetaData(): IoGardenExperimentMetaData[] {
    return this.experimentMetaData;
  }

  public getIoGardenMetaDataById(id: string): IoGardenExperimentMetaData {
    const experimentIndex = this.experimentMetaData.findIndex(el => el.id === id);
    if (experimentIndex === -1) {
      throw new Error('There has been a problem with the provided experiment id.');
/*       return {
        'id': '',
        'title': '',
        'subtitle': '',
        'abstract': '';
        'descriptionUrl': '';
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

  public getRandomIoGardenExperimentMetaData(): IoGardenExperimentMetaData {
    const randomIndex = Math.floor(Math.random() * this.experimentMetaData.length);
    return this.experimentMetaData[randomIndex]
  }

  public getAllIoGardenExperimentTags(): string[] {
    const resultArr: string[] = [];
    this.experimentMetaData.forEach(entry => {
      resultArr.push(...entry.tags)
    });
    return resultArr;
  }

  public getIoGardenExperimentsByTag(tag: string): IoGardenExperimentMetaData[] {
    return this.experimentMetaData.filter(el => el.tags.includes(tag));
  }
}
