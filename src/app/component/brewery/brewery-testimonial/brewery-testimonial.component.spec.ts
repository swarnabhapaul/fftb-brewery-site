import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryTestimonialComponent } from './brewery-testimonial.component';

describe('BreweryTestimonialComponent', () => {
  let component: BreweryTestimonialComponent;
  let fixture: ComponentFixture<BreweryTestimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryTestimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
