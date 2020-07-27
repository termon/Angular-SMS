import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() message = '';

  isLoading = false;

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
