import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabCodeDemoPreviewComponent } from './codelab-code-demo-preview.component';

describe('CodelabCodeDemoPreviewComponent', () => {
  let component: CodelabCodeDemoPreviewComponent;
  let fixture: ComponentFixture<CodelabCodeDemoPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodelabCodeDemoPreviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabCodeDemoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
