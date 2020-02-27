import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryShopComponent } from './brewery-shop.component';

describe('BreweryShopComponent', () => {
  let component: BreweryShopComponent;
  let fixture: ComponentFixture<BreweryShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
