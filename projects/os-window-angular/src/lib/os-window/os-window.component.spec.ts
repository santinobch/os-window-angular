import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsWindowComponent } from './os-window.component';

describe('OsWindowComponent', () => {
  let component: OsWindowComponent;
  let fixture: ComponentFixture<OsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
