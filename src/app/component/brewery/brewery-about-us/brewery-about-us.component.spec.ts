import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryAboutUsComponent } from './brewery-about-us.component';

describe('BreweryAboutUsComponent', () => {
  let component: BreweryAboutUsComponent;
  let fixture: ComponentFixture<BreweryAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
