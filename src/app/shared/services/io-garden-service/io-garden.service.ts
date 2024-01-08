import { Injectable } from '@angular/core';

import ioGardenExperimentMetaData from 'src/assets/io-garden-experiment-meta-data.json';
import { TagInfoObj } from '../tag-mapping-service/tag-mapping.service';
import { result } from 'lodash-es';


export interface IoGardenExperimentMetaData {
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
      throw new Error('There has been a problem with the provided experiment id. Id provided was: ' + id);
    }
    return publishedExperimentArr[experimentIndex];
  }

  public getRandomIoGardenExperimentMetaData(): IoGardenExperimentMetaData {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    const randomIndex = Math.floor(Math.random() * publishedExperimentArr.length);
    return publishedExperimentArr[randomIndex]
  }

  public getAllIoGardenExperimentTags(): TagInfoObj[] {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    const tagStrArr: string[] = [];
    publishedExperimentArr.forEach(entry => {
      tagStrArr.push(...entry.tags)
    });
    return tagStrArr.map((tagName: string) => {
      return {
        name: tagName,
        isActive: false,
        count: tagStrArr.filter(el => el === tagName).length
      };
    });;
  }

  public getAllIoGardenExperimentTagsAndCount(): { name: string, count: number }[] {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    const resultObj: { [key: string]: number } = {};
    publishedExperimentArr.forEach(entry => {
      entry.tags.forEach(tag => {
        if (resultObj[tag]) {
          resultObj[tag]++;
        } else {
          resultObj[tag] = 1;
        }
      });
    });
    const resultArr = Object.keys(resultObj).map(key => {
      return { name: key, count: resultObj[key] }
    });
    return resultArr;
  }

  public getIoGardenExperimentsByTag(tag: string): IoGardenExperimentMetaData[] {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    return publishedExperimentArr.filter(el => el.tags.includes(tag));
  }

  public getIoGardenExperimentCountByTag(tag: string): number {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    return publishedExperimentArr.filter(el => el.tags.includes(tag)).length;
  }
}
