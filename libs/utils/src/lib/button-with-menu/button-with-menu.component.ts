import { Component, ContentChild, ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ButtonWithMenuModalDirective } from './button-with-menu-modal.directive';
import { TemplatePortal } from '@angular/cdk/portal';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'button-with-menu',
  templateUrl: './button-with-menu.component.html',
  styleUrls: ['./button-with-menu.component.scss']
})
export class ButtonWithMenuComponent implements OnDestroy {

  @ContentChild(ButtonWithMenuModalDirective) modal;

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _vcr: ViewContainerRef,
    readonly el: ElementRef,
    readonly overlay: Overlay
  ) {
  }

  open() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.el.nativeElement).withPositions([
        {
          originX: 'center',
          overlayX: 'center',
          originY: 'top',
          overlayY: 'bottom',
        },
      ]);
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const portal = new TemplatePortal(this.modal.template, this._vcr, {
      $implicit: {
        close: () => {
          overlayRef.detach();
        }
      }
    });
    overlayRef.attach(portal);
    overlayRef.backdropClick()
      .pipe(takeUntil(this.destroy))
      .subscribe(() => overlayRef.dispose());
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}