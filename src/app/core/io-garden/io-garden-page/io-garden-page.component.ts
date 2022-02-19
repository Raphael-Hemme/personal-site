import { Component, OnInit } from '@angular/core';
import { IoGardenService, IoGardenExperimentMetaData } from 'src/app/shared/services/io-garden-service/io-garden.service';

@Component({
  selector: 'app-io-garden-page',
  templateUrl: './io-garden-page.component.html',
  styleUrls: ['./io-garden-page.component.scss']
})
export class IoGardenPageComponent implements OnInit {

  public ioWelcomeMain = `Welcome to Io-Garden!`;

  public ioAbstract = `Leave the void behind and enter my humble glasshouse on Io.\n Take a look around, tinker with things but, please, don't throw rocks.\n\n Io-Garden is a space to cultivate ideas and concepts - to experiment with algorithms and impressions.\n
    Freshly planted seedlings can evolve and flourish, as can the vines and trees sprawling under the special greenhouse construction that shields this digital garden from Io's atmosphere.`;
/* Io-Garden is my extraterrestrial research lab and open studio. */


  public ioNameExplainer = `Why build a laboratory greenhouse on Io?\n
    Well, born on (or in?) Europa, I felt, Io was underrated and a welcome change of air. Property was affordable and, having figured out a way to utilize the strong electro magnetic interference, I was able to significantly lower my energy costs.\n
    Ok, ok... I admit this is not entirely true.\n There is, of course, no property law on Io. And that makes it even more attractive doesn't it?\n
    Also, this whole complex was intended to be a digital garden all along. But 'Digital Garden' is quite a long name to stuff into a menu bar. So, I decided to shorten it to '1/0-garden' since 'one / zero' is a nice shorthand for 'digital'. The problem with '1/0-garden', however, is that you should not use numbers to start a JavaScript class name (which was needed for the class based Angular component). That led me to 'i/o' which still resembled '1/0'. Since I'm concerned about the reductionist approach and effect of the information processing model, I don't use 'i/o' to signify 'input / output' as it usually does.\n
    But, as you will have guessed, there was still a problem left: '/' is also not allowed in class names. Hence, that had to go as well... leaving me with 'io-garden.\n I liked the sound of the name and pictures of a lush greenhouse on Io were already taking shape in my mind's eye.\n
    If you struggle with the pronounciation of 'Io-Garden', or are simply more used to one of the languages of Europa or somewhere else in space, you can, of course, also call it for example 'Ionische Gärten' or tell me what this place would be called in your mother tongue.`;

  public ioExplanationIsShown = false;

  public ioExperimentDataArr: IoGardenExperimentMetaData[] = [];

  constructor(
    private ioGardenService: IoGardenService,
  ) { }

  ngOnInit(): void {
    this.ioExperimentDataArr = this.ioGardenService.getAllIoGardenExperimentsMetaData()

  }

  public toggleIoGardenExplanation(): void {
    this.ioExplanationIsShown = !this.ioExplanationIsShown;
  }
}
