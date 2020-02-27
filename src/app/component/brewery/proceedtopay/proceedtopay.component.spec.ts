import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedtopayComponent } from './proceedtopay.component';

describe('ProceedtopayComponent', () => {
  let component: ProceedtopayComponent;
  let fixture: ComponentFixture<ProceedtopayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedtopayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedtopayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
