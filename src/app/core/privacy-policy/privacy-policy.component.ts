import { AfterViewInit, Component } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading-service/loading.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements AfterViewInit {

  constructor(
    private loadingService: LoadingService
  ) { }

  ngAfterViewInit() {
    this.loadingService.emitAfterViewInitSignal('PRIVACY-POLICY')
  }
}
