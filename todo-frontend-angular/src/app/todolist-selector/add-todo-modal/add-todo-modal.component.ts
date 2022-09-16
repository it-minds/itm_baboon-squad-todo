import { Component, EventEmitter, Output, Input, ViewContainerRef  } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import {  NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss']
})
export class AddTodoModalComponent {
  isVisible = false;
  isOkLoading = false;

  ButtonText="Add a new todo";
  addBtnConfig: ButtonConfiguration= {
    styles: {
      position: 'relative',
      width: '170px',
      height: '20px',
      backgroundColor: '#fff',
      color: '#000000',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      borderRadius: '',
      marginTop: '0px',
      border: 'none',
      opacity: '1'
    }
  };
  validateForm: FormGroup<{
    title: FormControl<string | null>;
    datePicker: FormControl<Date | null>;
}> = new FormGroup({
  title: new FormControl<string | null>(null, [Validators.required, Validators.minLength(1)]),
  datePicker: new FormControl<Date | null>(null,[Validators.required,Validators.minLength(8)])
}) 
constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef){
  
}

  showModal(): void {

  }
  ngOnInit(): void {
  }
}