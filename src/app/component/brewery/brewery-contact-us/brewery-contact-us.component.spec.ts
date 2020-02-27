import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryContactUsComponent } from './brewery-contact-us.component';

describe('BreweryContactUsComponent', () => {
  let component: BreweryContactUsComponent;
  let fixture: ComponentFixture<BreweryContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
