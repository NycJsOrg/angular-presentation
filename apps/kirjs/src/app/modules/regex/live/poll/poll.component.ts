import { Component, Injectable, Input, OnInit } from '@angular/core';
import { LiveService } from '../live.service';

@Component({
  selector: 'slides-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent {
  @Input() question: string;
  constructor(readonly service: LiveService) {}
}

@Component({
  selector: 'slides-poll-answer',
  template: `
    <li>
      <ng-content></ng-content>
    </li>
  `,
  styleUrls: ['./poll.component.css']
})
export class SlidesAnswerComponent implements OnInit {
  constructor(readonly service: LiveService) {
  }

  ngOnInit() {
  }
}
