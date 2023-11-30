import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IoGardenService, IoGardenExperimentMetaData } from 'src/app/shared/services/io-garden-service/io-garden.service';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';
import { PreviewCardComponent } from '../../../shared/ui-components/preview-card/preview-card.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-io-garden-page',
    templateUrl: './io-garden-page.component.html',
    styleUrls: ['./io-garden-page.component.scss'],
    standalone: true,
    imports: [NgFor, PreviewCardComponent]
})
export class IoGardenPageComponent implements OnInit, AfterViewInit {

  @ViewChild('ioGardenDetails') ioGardenDetails!: ElementRef<HTMLDetailsElement>;

  public ioWelcomeMain = `Welcome to Io-Garden!`;

  public ioAbstract = `Io-Garden is a digital garden. It is a space to cultivate ideas and concepts - to experiment with algorithms and impressions.`;
/* Io-Garden is my extraterrestrial research lab and open studio. */


  public ioNameExplainer = `Io-Garden is not about input and output. Io-Garden is an experimental space located on Io.\n
    "What?", you might ask and wonder: "Why would you build a digital garden on Io?"\n
    I'm glad you asked!\n
    Born on (or in?) Europa, I felt, Io was underrated and a welcome change of air. Property was affordable and, having figured out a way to utilize the strong electro magnetic interference, I was able to significantly lower my energy costs.\n
    Ok, ok... I admit this is not entirely true. There is, of course, no property law on Io. And that makes it even more attractive doesn't it?\n
    Also, this whole complex was intended to be a digital garden all along. But 'Digital Garden' is quite a long name to stuff into a menu bar. So, I decided to shorten it to '1/0-garden' since 'one / zero' is a nice shorthand for 'digital'. The problem with '1/0-garden', however, is that you should not use numbers to start a JavaScript class name (which was needed for the class based Angular component). That led me to 'i/o' which still resembled '1/0'. But since I'm not a fan of the reductionist approach and effect of the information processing model, I don't use 'i/o' to signify 'input / output' as it usually does.\n
    And, as you might have guessed, there was still a problem left: '/' is also not allowed in class names and also tricky with routing. Hence, that had to go as well... leaving me with 'io-garden.\n 
    I liked the sound of the name and pictures of a lush greenhouse on Io were already taking shape in my mind's eye.\n
    If you struggle with the pronounciation of 'Io-Garden', or are simply more used to one of the languages of Europa or somewhere else in space, you can, of course, also call it for example 'Ionische Gärten' or tell me what this place would be called in your mother tongue.`;

  public ioExplanationIsShown = false;

  public ioExperimentDataArr: IoGardenExperimentMetaData[] = [];

  constructor(
    private ioGardenService: IoGardenService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.ioExperimentDataArr = this.ioGardenService.getAllIoGardenExperimentsMetaData()
  }

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('IO-GARDEN');
  }

  public toggleIoGardenExplanation(): void {
    this.ioExplanationIsShown = !this.ioExplanationIsShown;
  }

  public closeIoGardenDetailedExplanation(): void {
    console.log('closeIoGardenDetailedExplanation')
    this.ioGardenDetails.nativeElement.open = false;
    window.scrollTo(0, 0);
  }
}
