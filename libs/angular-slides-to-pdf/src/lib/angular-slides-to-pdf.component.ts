import { Component } from '@angular/core';
import { PresentationComponent } from '../../../presentation/src/lib/presentation/presentation.component';
import * as JsPDF from 'jspdf'
import * as domtoimage from 'dom-to-image';

@Component({
  selector: 'angular-presentation-to-pdf',
  template: ''
})
export class AngularSlidesToPdfComponent {
  constructor(private presentation: PresentationComponent) {

  }

  async toPdf() {
    const width = 1024;
    const height = 600;

    this.presentation.goToSlide(0);

    const doc = new JsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [width, height]
    });


    for (let i = 0; i < this.presentation.slides.length; i++) {
      const el = this.presentation.el.nativeElement.querySelector('slides-slide');
      const slide = el.querySelector('.slide');
      // slide.style.width = width + 'px ';
      // slide.style.height = width + 'px ';

      if (i > 0) {
        doc.addPage();
      }

      const image1 = await domtoimage.toPng(el);
      const image2 = await domtoimage.toPng(slide);
      const image = image1.length === 6 ? image2 : image1;

      doc.addImage(image, 0, 0, width, height);


      this.presentation.nextSlide();
    }

    doc.save('a4.pdf');
  }
}
