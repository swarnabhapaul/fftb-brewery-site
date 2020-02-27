import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryBlogComponent } from './brewery-blog.component';

describe('BreweryBlogComponent', () => {
  let component: BreweryBlogComponent;
  let fixture: ComponentFixture<BreweryBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
