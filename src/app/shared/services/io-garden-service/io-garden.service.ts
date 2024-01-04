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

  public getRecomendedIoGardenExperimentMetaData(): IoGardenExperimentMetaData {
    const publishedExperimentArr: IoGardenExperimentMetaData[] = this.getAllIoGardenExperimentsMetaData();
    const recommendationPool = this.generateRecomendationPool(publishedExperimentArr);
    const randomIndex = Math.floor(Math.random() * recommendationPool.length);
    console.log('recommendation pool', recommendationPool);
    return recommendationPool[randomIndex];
  }

  private generateRecomendationPool(inputArr: IoGardenExperimentMetaData[]): IoGardenExperimentMetaData[] {
    const maxPhasePresent = Math.max(...inputArr.map(el => el.phase));
    const probMap = this.generateProbabilityMap(maxPhasePresent, 5);
    console.log(probMap);
    return inputArr.filter(el => Math.random() < probMap[el.phase]);
  }

  private generateProbabilityMap(presentMaximum: number, fullScale: number) {
    const baseMapArr = [
      [1, 0.2],
      [2, 0.5],
      [3, 0.7],
      [4, 0.9],
      [5, 1.0]
    ]
    if (presentMaximum === fullScale) {
      return Object.fromEntries(baseMapArr);
    } else {
      const resultArr = [];
      for (let i = presentMaximum - 1; i > 0; i--) {
        resultArr.push([i, baseMapArr[i - 1][1]]);
      }
      for (let i = presentMaximum; i <= fullScale; i++) {
        resultArr.push([i, 1.0]);
      }
      return Object.fromEntries(resultArr);
    }
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
