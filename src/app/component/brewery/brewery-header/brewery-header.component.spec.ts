import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryHeaderComponent } from './brewery-header.component';

describe('BreweryHeaderComponent', () => {
  let component: BreweryHeaderComponent;
  let fixture: ComponentFixture<BreweryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
