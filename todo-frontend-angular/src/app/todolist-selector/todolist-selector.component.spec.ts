import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistSelectorComponent } from './todolist-selector.component';

describe('TodolistSelectorComponent', () => {
  let component: TodolistSelectorComponent;
  let fixture: ComponentFixture<TodolistSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodolistSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodolistSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
