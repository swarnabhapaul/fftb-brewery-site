import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryBlogSingleComponent } from './brewery-blog-single.component';

describe('BreweryBlogSingleComponent', () => {
  let component: BreweryBlogSingleComponent;
  let fixture: ComponentFixture<BreweryBlogSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryBlogSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryBlogSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
