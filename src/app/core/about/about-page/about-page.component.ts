import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  public aboutP1 = 'After having worked a vew years as a researcher and lecturer at a German university, focusing on studies of science and technology and espsespecially cumputation, I felt the urge to build and practice what I was reading and writing about myself.'

  constructor() { }

  ngOnInit(): void {
  }

}
