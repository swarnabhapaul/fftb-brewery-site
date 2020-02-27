import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWeLearnedSoFarComponent } from './what-we-learned-so-far.component';

describe('WhatWeLearnedSoFarComponent', () => {
  let component: WhatWeLearnedSoFarComponent;
  let fixture: ComponentFixture<WhatWeLearnedSoFarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatWeLearnedSoFarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatWeLearnedSoFarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
