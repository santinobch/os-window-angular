import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsButtonComponent } from './os-button.component';

describe('OsButtonComponent', () => {
  let component: OsButtonComponent;
  let fixture: ComponentFixture<OsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
