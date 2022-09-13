import { Component, OnInit } from '@angular/core';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss']
})
export class AddTodoModalComponent {
  isVisible = false;
  isOkLoading = false;
  validateForm: FormGroup<{
    title: FormControl<null>;
    datePicker: FormControl<null>;
}> =  this.fb.group({
    title: [null, [Validators.required, Validators.minLength(1)]], 
    datePicker: [null]
  });

  showModal(): void {
    this.isVisible = true;
  }

  handleSubmit(): void {

    if(this.validateForm.valid)
    {
      this.isOkLoading = true;
      
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 3000);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.validateForm.valueChanges.subscribe(console.log)
    this.validateForm.statusChanges.subscribe(console.log)
  }
}
