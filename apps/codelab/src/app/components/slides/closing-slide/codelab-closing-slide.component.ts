import { Component, Input, OnInit } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MenuRouteService } from '../../../codelabs/angular/menu-route.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'codelab-closing-slide',
  templateUrl: './codelab-closing-slide.component.html',
  styleUrls: ['./codelab-closing-slide.component.css']
})
export class CodelabClosingSlideComponent implements OnInit {
  @Input() header: String;
  @Input() body: String;
  @Input() footer: String;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly menuRouteService: MenuRouteService,
    private readonly presentation: SlidesDeckComponent
  ) {
    if (this.presentation != null) {
      let nextLink = this.menuRouteService.getNextLink(this.activeRoute);
      if (nextLink) {
        nextLink = '../../' + nextLink;
      }
      this.presentation.setNext(nextLink);
    }
  }

  ngOnInit() {}
}
