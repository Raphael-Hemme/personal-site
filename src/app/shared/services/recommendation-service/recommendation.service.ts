import { Injectable } from '@angular/core';
import { IoGardenExperimentMetaData, IoGardenService } from '../io-garden-service/io-garden.service';
import { BlogPostMetaData, BlogService } from '../blog-service/blog.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(
    private readonly ioGardenService: IoGardenService,
    private readonly blogService: BlogService
  ) { }

  public getRecomendedContentMetaData(): BlogPostMetaData | IoGardenExperimentMetaData {
    const mergedContentArr: (BlogPostMetaData | IoGardenExperimentMetaData)[] = [
      ...this.ioGardenService.getAllIoGardenExperimentsMetaData(),
      ...this.blogService.getAllBlogPostsMetaData()
    ];
    const recommendationPool = this.generateRecomendationPool(mergedContentArr);
    const randomIndex = Math.floor(Math.random() * recommendationPool.length);
    console.log('recommendation pool length', recommendationPool.length);
    console.log('recommendation pool', recommendationPool);
    return recommendationPool[randomIndex];
  }

  private generateRecomendationPool(
    inputArr: (BlogPostMetaData | IoGardenExperimentMetaData)[]
  ): (BlogPostMetaData | IoGardenExperimentMetaData)[] {
    const maxPhasePresent = Math.max(...inputArr.map(el => el.phase));
    const probMap = this.generateProbabilityMap(maxPhasePresent, 5);
    const resultArr = inputArr.filter(el => Math.random() < probMap[el.phase]);
    if (resultArr.length > 0) {
      return resultArr;
    } else {
      return this.generateRecomendationPool(inputArr);
    }
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
}
