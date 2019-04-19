import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonadminComponent } from './nonadmin.component';

describe('NonadminComponent', () => {
  let component: NonadminComponent;
  let fixture: ComponentFixture<NonadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
