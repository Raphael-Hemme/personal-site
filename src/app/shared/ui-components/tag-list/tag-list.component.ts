import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { TagInfoObj } from 'src/app/shared/services/tag-mapping-service/tag-mapping.service';
import { TooltipDirective } from '../tooltip/tooltip.directive';

export interface TagListOptions {
  isExpandable: boolean;
  numOfTagsInExpandPreview: number;
  isDisplayedOnWhiteBg: boolean;
  tagsDisplayMatchCount: boolean;
}

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],
    imports: [
        NgClass,
        TooltipDirective
    ]
})
export class TagListComponent {

  @Input() tagArr: TagInfoObj[] = [];
  @Input() options: Partial<TagListOptions> = {
    isExpandable: false,
    numOfTagsInExpandPreview: 0,
    isDisplayedOnWhiteBg: false,
    tagsDisplayMatchCount: false,
  }

  @Output() tagSelectionEvent = new EventEmitter<TagInfoObj>();
  @Output() tagListIsExpandedEvent = new EventEmitter<boolean>();

  public isExpanded = false;

  public toggleIsExpanded(): void {
    this.isExpanded = !this.isExpanded;
    this.tagListIsExpandedEvent.emit(this.isExpanded);
  }

  public selectTag(tag: TagInfoObj): void {
    this.tagSelectionEvent.emit(tag);
  }
}
