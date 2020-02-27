import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListchildComponent } from './cart-listchild.component';

describe('CartListchildComponent', () => {
  let component: CartListchildComponent;
  let fixture: ComponentFixture<CartListchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartListchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
