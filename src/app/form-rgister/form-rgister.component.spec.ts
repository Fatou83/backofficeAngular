import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRgisterComponent } from './form-rgister.component';

describe('FormRgisterComponent', () => {
  let component: FormRgisterComponent;
  let fixture: ComponentFixture<FormRgisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRgisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRgisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
