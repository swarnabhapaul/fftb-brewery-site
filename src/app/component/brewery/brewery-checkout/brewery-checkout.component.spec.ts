import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryCheckoutComponent } from './brewery-checkout.component';

describe('BreweryCheckoutComponent', () => {
  let component: BreweryCheckoutComponent;
  let fixture: ComponentFixture<BreweryCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
