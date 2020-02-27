import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurstoryDetailsComponent } from './ourstory-details.component';

describe('OurstoryDetailsComponent', () => {
  let component: OurstoryDetailsComponent;
  let fixture: ComponentFixture<OurstoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurstoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurstoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
