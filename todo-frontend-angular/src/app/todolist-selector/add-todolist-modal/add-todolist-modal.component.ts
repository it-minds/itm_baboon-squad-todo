import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todolist-modal',
  templateUrl: './add-todolist-modal.component.html',
  styleUrls: ['./add-todolist-modal.component.scss']
})
export class AddTodolistModalComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  validateForm = new FormGroup({
    title: new FormControl<string>("", [Validators.required, Validators.minLength(1)]),
  })
  constructor() { }

  @Output() addTodolistSubmit = new EventEmitter<string>();

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleSubmit(): void {
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      const newTodolistTitle: string = this.validateForm.value.title!;
      this.addTodoSubmit.emit(newTodolistTitle)
      this.validateForm.reset()
      this.isVisible = false;
      this.isOkLoading = false;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateForm.reset()
  }
}