import { Component, Input } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  @Input() size = 7; // size in rem

  @Input() type = 'spinner'; // 'spinner' || 'loader'

  constructor(public loadingService: LoadingService) { }

}
