import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryRegistrationComponent } from './brewery-registration.component';

describe('BreweryRegistrationComponent', () => {
  let component: BreweryRegistrationComponent;
  let fixture: ComponentFixture<BreweryRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
