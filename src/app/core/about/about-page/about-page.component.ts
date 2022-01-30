import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  public aboutP1 = `After having worked a few years as a researcher and lecturer at a German university, 
    focusing on anthropological studies of science and technology in the emerging field of 'affective cumputing', 
    I felt the urge to build and practice what I was reading and writing about myself.`
  public aboutP2 = `The decision to change careers and take up coding as my daily routine and profession was helped by
    the fact that I was drawn to practices with a more immediate, more tangible or at least more visible outcome. 
    While I enjoy the analytical engagement with theory and empirical data, and the shifts in your worldview
    you might experience when confronted with a new idea or cultural practice, I was missing the more
    creative engagement with the world; the craftsmanship in the process of carving out the shape of a thing in 
    the most elegant way possible (or at least possible for you at a certain point in time) - a process called
    'Gestaltung' or design. I like that programming allows me to do exactly that and that it frequently triggers interesting
    philosophical reflections and discussions, keeps me curios and constantly in a mode of solving puzzles.`;
  public aboutP3 = `My appreciation for this meditative immersion into a practice of searching for the right shape and form
  goes back to an early engagement with graffiti and street art, accompanied me through my studies of anthropology 
  - albeit much less actively - and currently manifests itself in my daily work as a web developer and the frequent trips
  into the domain of typography and logo design. Given this strong inclination to the visual, I think it is no surprise
  that I focus on frontend development since I feel it comes natural to me.`;

  constructor() { }

  ngOnInit(): void {
  }

}
