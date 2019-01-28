import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPickerComponent } from './material-picker.component';

describe('MaterialPickerComponent', () => {
  let component: MaterialPickerComponent;
  let fixture: ComponentFixture<MaterialPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
