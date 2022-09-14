import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { TodoService } from '../todo.service';


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


// this.fb.group({
//     title: [null, [Validators.required, Validators.minLength(1)]], 
//     datePicker: [null]
//   });

  @Output()
  showModal(): void {
    this.isVisible = true;
  }

  handleSubmit(): void {
    if(this.validateForm.valid)
    {
      this.isOkLoading = true;
      const newTodo: NewTodoDTO={
        Title: this.validateForm.value.title?? "",
        Deadline: this.validateForm.value.datePicker?.toDateString()?? "",
        Position:0,
        TodoListId: 8 
      }
      this.service.addTodo("8",newTodo)
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 1500);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  constructor(private service: TodoService){}

  ngOnInit(): void {
    this.validateForm.valueChanges.subscribe(console.log)
    this.validateForm.statusChanges.subscribe(console.log)
  }
  Submit=new EventEmitter();
}
