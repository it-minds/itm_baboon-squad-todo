import { Component, EventEmitter, Output, } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';



@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss']
})
export class AddTodoModalComponent {
  isVisible = false;
  isOkLoading = false;
  validateForm: FormGroup<{
    title: FormControl<string | null>;
    datePicker: FormControl<Date | null>;
}> = new FormGroup({
  title: new FormControl<string | null>(null, [Validators.required, Validators.minLength(1)]),
  datePicker: new FormControl<Date | null>(null)
}) 
constructor(){}
  showModal(): void {
    this.isVisible = true;
  }
  @Output()
  Submit=new EventEmitter<NewTodoDTO>();
  handleSubmit(): void {
    if(this.validateForm.valid)
    {
      this.isOkLoading = true;
      const newTodo: NewTodoDTO={
        Title: this.validateForm.value.title?? "",
        Deadline: this.validateForm.value.datePicker?.toISOString()?? "",
        Position:0,
        TodoListId: 8
      }
      this.Submit.emit(newTodo)
      this.validateForm.reset()
        this.isVisible = false;
        this.isOkLoading = false;
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.validateForm.valueChanges.subscribe(console.log)
    this.validateForm.statusChanges.subscribe(console.log)
  }
}
