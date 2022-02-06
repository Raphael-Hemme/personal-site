import { Injectable } from '@angular/core';

import ioGardenExperimentMetaData from 'src/assets/io-garden-experiment-meta-data.json';


export interface IoGardenExperimentMetaData {
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
}

@Injectable({
  providedIn: 'root'
})
export class IoGardenService {
  private experimentMetaData = ioGardenExperimentMetaData;

  constructor() { }

  public getAllIoGardenExperimentsMetaData(): IoGardenExperimentMetaData[] {
    const resultArr = this.experimentMetaData.filter(el => el.isPublished === true)
    return resultArr;
  }

  public getIoGardenMetaDataById(id: string): IoGardenExperimentMetaData {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    const experimentIndex = publishedExperimentArr.findIndex(el => el.id === id);
    if (experimentIndex === -1) {
      throw new Error('There has been a problem with the provided experiment id.');
    }
    return publishedExperimentArr[experimentIndex];
  }

  public getRandomIoGardenExperimentMetaData(): IoGardenExperimentMetaData {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    const randomIndex = Math.floor(Math.random() * publishedExperimentArr.length);
    return publishedExperimentArr[randomIndex]
  }

  public getAllIoGardenExperimentTags(): string[] {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    const resultArr: string[] = [];
    publishedExperimentArr.forEach(entry => {
      resultArr.push(...entry.tags)
    });
    return resultArr;
  }

  public getIoGardenExperimentsByTag(tag: string): IoGardenExperimentMetaData[] {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    return publishedExperimentArr.filter(el => el.tags.includes(tag));
  }
}
