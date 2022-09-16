import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { ButtonConfiguration } from 'src/app/models/button-config.model';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss']
})
export class TodoModalComponent {
  isOkLoading = false;
  validateForm: FormGroup<{
    title: FormControl<string | null>;
    datePicker: FormControl<Date | null>;
}> = new FormGroup({
  title: new FormControl<string | null>(null, [Validators.required, Validators.minLength(1)]),
  datePicker: new FormControl<Date | null>(null,[Validators.required,Validators.minLength(8)])
}) 
  constructor() { }
  @Input() listId?: number
  @Input() position?: number;
  
  @Output()
  Submit=new EventEmitter<NewTodoDTO>();
  handleSubmit(): void {
    if(this.validateForm.valid)
    {
      this.isOkLoading = true;
      const position= this.position!=null ? this.position : 0
      const newTodo: NewTodoDTO={
        Title: this.validateForm.value.title?? "",
        Deadline: this.validateForm.value.datePicker?.toISOString()?? "",
        Position:  position,
        TodoListId: this.listId!
      }
      this.Submit.emit(newTodo)
      this.validateForm.reset()
        this.isOkLoading = false;
    }
  }
  handleCancel(): void {
    this.validateForm.reset()
  }
  ngOnInit(): void {
  }

}
