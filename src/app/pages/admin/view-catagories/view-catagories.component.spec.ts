import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCatagoriesComponent } from './view-catagories.component';

describe('ViewCatagoriesComponent', () => {
  let component: ViewCatagoriesComponent;
  let fixture: ComponentFixture<ViewCatagoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCatagoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCatagoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
