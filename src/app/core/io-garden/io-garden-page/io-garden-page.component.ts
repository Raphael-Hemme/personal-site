import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-io-garden-page',
  templateUrl: './io-garden-page.component.html',
  styleUrls: ['./io-garden-page.component.scss']
})
export class IoGardenPageComponent implements OnInit {

  public ioWelcome = `Welcome to Io-Garden! Leave the void behind and enter my humble glasshouse,
    take a look around, have a chat but don't throw rocks.`;

  public ioNameExplainer = `Io-Garden is a space for growing and experimenting with ideas and concepts, algorithms and impressions. Freshly planted seeds and seedlings, as well as shrubs, trees and vines can evolve and flourish und the special greenhouse construction that shields this digital garden from Io's atmosphere. Io-Garden is my extraterrestrial research lab and open atelier.\n
    But why build it on Io you might ask. Well, born on Europa, I felt Io was underrated and a welcome change. Property was and is affordable and, having figured out a way to utilize the strong electro magnetic interference, I was able to significantly lower my energy costs.\n
    Ok, ok I admit this is not the whole truth. There is, of course, no property law on Io. That makes it even more attractive doesn't it?\n
    Also, this whole complex was intended to be a digital garden all along. But 'Digital Garden' is quite a long string of characters to stuff into a menu bar. So, I decided to shorten it to '1/0-garden' since 'one / zero' is a nice shorthand for 'digital'. The problem with '1/0-garden', however, is that you should not use numbers to start a JavaScript / TypeScript class name (which was needed for the class based Angular component). That led me to 'i/o' which still resembled '1/0' and also 'input / output', which was a less welcome but bearable connotation. But, as you will have guessed, there was still a problem left: '/' is also not allowed in class names. Hence, that had to go as well... leaving me with 'io-garden. I liked the sound of the name and pictures of a lush greenhouse on Io were already taking shape as a kind of 'mind palace'.\n
    If you struggle with the pronounciation of 'Io-Garden', or are simply more used to one of the languages of Europa or somewhere else in space, you can, of course, also call it for example 'Ionische Gärten' or tell me what this place is called in your mother tongue.`;

  constructor() { }

  ngOnInit(): void {
  }

}
