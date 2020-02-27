import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryOurStoryComponent } from './brewery-our-story.component';

describe('BreweryOurStoryComponent', () => {
  let component: BreweryOurStoryComponent;
  let fixture: ComponentFixture<BreweryOurStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryOurStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryOurStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
