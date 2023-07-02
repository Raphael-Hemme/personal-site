import { Component } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search-service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(
    private searchService: SearchService,
  ) { }

  public handleCloseBtnClick(): void {
    this.searchService.toggleSearchComponentIsVisible();
  }


}
