import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  messages: string[];

  constructor(private logger: LoggerService) {
  }

  ngOnInit() {
    this.logger.getMessages().subscribe(
      nextError => {},
      onError => {},
      () => {}
    )
  }
}
