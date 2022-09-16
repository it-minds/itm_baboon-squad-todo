import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodolistModalComponent } from './add-todolist-modal.component';

describe('AddTodolistModalComponent', () => {
  let component: AddTodolistModalComponent;
  let fixture: ComponentFixture<AddTodolistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTodolistModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTodolistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
