import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';
import { TagInfoObj, TagMappingService } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class TagListComponent implements OnInit, OnChanges {

  @Input() tagArr: TagInfoObj[] = [];
  @Input() isExpandable = false;

  public isExpanded = false;
  public summaryTagArr: TagInfoObj[] = [];
  public detailTagArr: TagInfoObj[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isExpandable && 'tagArr' in changes) {
      console.log('test');
      this.summaryTagArr = this.tagArr.slice(0, 5);
      this.detailTagArr = this.tagArr.slice(5);
    }
  }

  public toggleIsExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
}
