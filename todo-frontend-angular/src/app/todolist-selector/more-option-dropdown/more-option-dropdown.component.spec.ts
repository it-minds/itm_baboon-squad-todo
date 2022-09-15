import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreOptionDropdownComponent } from './more-option-dropdown.component';

describe('MoreOptionDropdownComponent', () => {
  let component: MoreOptionDropdownComponent;
  let fixture: ComponentFixture<MoreOptionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreOptionDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreOptionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
