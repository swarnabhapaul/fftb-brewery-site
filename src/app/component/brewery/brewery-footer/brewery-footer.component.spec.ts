import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryFooterComponent } from './brewery-footer.component';

describe('BreweryFooterComponent', () => {
  let component: BreweryFooterComponent;
  let fixture: ComponentFixture<BreweryFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
