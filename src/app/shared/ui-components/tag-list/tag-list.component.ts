import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';
import { TagInfoObj, TagMappingService } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';
import { TooltipDirective } from '../tooltip/tooltip.directive';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],
    standalone: true,
    imports: [
      NgClass,
      TooltipDirective
    ]
})
export class TagListComponent implements OnChanges {

  @Input() tagArr: TagInfoObj[] = [];
  @Input() isExpandable = false;
  @Input() tagsDisplayMatchCount = false;
  @Input() isDisplayedOnWhiteBg = false;
  @Output() tagSelectionEvent = new EventEmitter<TagInfoObj>();

  public isExpanded = false;

  public summaryTagArr: TagInfoObj[] = [];
  public detailTagArr: TagInfoObj[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isExpandable && 'tagArr' in changes) {
      console.log('test', this.tagArr );
      this.summaryTagArr = this.tagArr.slice(0, 5);
      this.detailTagArr = this.tagArr.slice(5);
    }
  }

  public toggleIsExpanded(): void {
    this.isExpanded = !this.isExpanded;
    console.log('isExpanded', this.isExpanded);
  }

  public selectTag(tag: TagInfoObj): void {
    this.tagSelectionEvent.emit(tag);
  }
}
