import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  public aboutP1 = `After having worked a few years as a researcher and lecturer at a German university, 
    focusing on anthropological studies of science and technology in the emerging field of 'affective cumputing', 
    I felt the urge to build and practice myself what I was reading and writing about. From an anthropological perspective,
    I was in the process of 'going native', although not strictly in the field of 'affective computing'.`
  public aboutP2 = `The decision to change careers and take up coding as my daily routine and profession was helped by
    the fact that I was drawn to practices with a more immediate, more tangible or at least more visible outcome. 
    While I enjoy the analytical engagement with theory and empirical data, and the shifts in your worldview
    you might experience when confronted with a new idea or cultural practice, I was missing the more
    creative engagement with the world; the craftsmanship in the process of carving out the shape of a thing in 
    the most elegant way possible (or at least possible for you at a certain point in time) - a process called
    'Gestaltung' or design. I like that programming allows me to do exactly that and that it frequently triggers interesting
    philosophical reflections and discussions, keeps me curios and constantly in a mode of solving puzzles.`;
  public aboutP3 = `My appreciation for this meditative immersion into a practice of searching for the right shape and form
  goes back to an early engagement with graffiti and street art, it accompanied me through my studies of anthropology 
  and the countless hours of refining and sharpening an argument or the general composition of an essay. 
  Currently I enjoy this flow state in my daily work as a web developer and in my frequent trips into the domain of
  typography and logo design. 
  Given a disposition to a more visual style of thinking than most accademic work in the humanities and social sciences faccilitate, 
  I think it is no surprise that I now focus mainly on frontend development since I feel it comes natural to me. And yet, I am still 
  fascinated both by the socio-cultural context and momentum of computational technology and by the technological fabric and the 
   interwoven with user interfaces often more strongly associated with the backend .`;

  constructor() { }

  ngOnInit(): void {
  }

}
