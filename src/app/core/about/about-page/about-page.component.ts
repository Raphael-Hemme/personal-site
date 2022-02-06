import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  public longAboutIsShown = false;
  public anthropologyIsHighlighted = false;
  public devIsHighlighted = false;
  public designIsHighlighted = false;

  public aboutP1 = `After having worked a few years as a researcher and lecturer at a German university, 
    focusing on anthropological studies of science and technology in the emerging field of 'affective cumputing', 
    I felt the urge to build and practice what I was reading and writing about. From an anthropological perspective,
    I was 'going native', although not strictly in the field of 'affective computing'.`
  public aboutP2 = `The decision to change careers and take up coding as my daily routine and profession was helped by
    the fact that I was drawn to practices with a more immediate, more tangible or at least more visible outcome. 
    While I enjoy the analytical engagement with theory and empirical data, and the shifts in your worldview
    you might experience when confronted with a new idea or cultural practice, I was missing the more
    creative engagement with the world; the craftsmanship in the process of carving out the shape of a thing in 
    the most elegant way possible (or at least the most elegant way you can find at a certain point in time) - a process called
    'Gestaltung' or design. I like that programming allows me to do exactly that and that it frequently triggers interesting
    philosophical reflections and discussions, keeps me curios and constantly in a mode of solving puzzles.`;
  public aboutP3 = `My appreciation for this meditative immersion into a practice of searching for the right shape and form
    goes back to an early engagement with graffiti and street art, it accompanied me through my studies of anthropology 
    and the countless hours of refining and sharpening an argument or the general composition of an essay. 
    Currently I enjoy this flow state in my daily work as a web developer and in my frequent trips into the domain of
    typography and logo design. 
    Given a disposition to a more visual style of thinking than most accademic work in the humanities and social 
    sciences faccilitates, I highly appreciate the rapid visual feedback of even the more complex and abstract aspects of 
    frontend development (mostly the contraptions of time and timing in a predominantly syncronous language).` 
  public aboutP4 =  `And yet, I am still fascinated by and eager to learn more about both the socio-cultural context and 
    momentum of computational technology and the more opaque technical layers of backend and systems engineering. Since all those 
    aspects are densly interwoven in the fabric of computation anyway, I think clear distinctions between frontend and backend, 
    technology and cultural context are mere taxonomic devices that can help us make sense of our everyday experiences 
    but shouldn't be taken too seriously.`;

    constructor() { }

  ngOnInit(): void {
  }

  public toggleLongAboutIsShown(): void {
    this.longAboutIsShown = !this.longAboutIsShown;
  }

  public toggleAnthropologyHighlight(): void {
    this.anthropologyIsHighlighted = !this.anthropologyIsHighlighted;
  }

  public toggleDevHighlight(): void {
    this.devIsHighlighted = !this.devIsHighlighted;
  }

  public toggleDesignHighlight(): void {
    this.designIsHighlighted = !this.designIsHighlighted;
  }

}
