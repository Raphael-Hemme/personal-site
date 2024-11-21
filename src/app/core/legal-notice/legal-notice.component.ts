import { AfterViewInit, Component } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';

@Component({
    selector: 'app-legal-notice',
    imports: [],
    templateUrl: './legal-notice.component.html',
    styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements AfterViewInit {

  constructor(
    private loadingService: LoadingService
  ) { }

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('LEGAL-NOTICE')
  }
}
