import { Component, Input } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  @Input() message = '';
  @Input() size = 7;

  style = 'spinner'; // 'spinner' || 'loader'

  constructor(public loadingService: LoadingService) { }

}
