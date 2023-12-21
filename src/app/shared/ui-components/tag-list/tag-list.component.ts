import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { TagInfoObj, TagMappingService } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class TagListComponent implements OnInit {

  @Input() tags: TagInfoObj[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
