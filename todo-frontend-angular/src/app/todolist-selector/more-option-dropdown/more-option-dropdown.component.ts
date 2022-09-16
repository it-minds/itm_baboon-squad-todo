import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { Todo } from 'src/app/models/todo.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';



@Component({
  selector: 'app-more-option-dropdown',
  templateUrl: './more-option-dropdown.component.html',
  styleUrls: ['./more-option-dropdown.component.scss']
})
export class MoreOptionDropdownComponent implements OnInit {

  @Output() SubmitAbove=new EventEmitter<NewTodoDTO>();
  @Output() SubmitBelow=new EventEmitter<NewTodoDTO>();
  @Output() EditName=new EventEmitter<Todo>();
  @Output() EditDeadline=new EventEmitter<Todo>();
  @Output() Delete=new EventEmitter<Todo>();

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
  aboveText="Add a new todo above";
  belowText="Add a new todo below";
  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }
  listOfPosition: NzPlacementType[] = ['bottomRight'];
 
  moreBtnConfig: ButtonConfiguration= {
    styles: {
      position: 'relative',
      width: '40px',
      height: '30px',
      backgroundColor: '#fff',
      color: '#42ecf5',
      fontFamily: 'sans-serif',
      fontSize: '40px',
      borderRadius: '10px',
      marginTop: '30px',
      border: 'none',
      opacity: '1'
    }
  };
  @Input() todo?: Todo;
  ngOnInit(): void {
  }
  addAboveClick(){
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: TodoModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        listId: this.todo?.todoListId,
        position :this.todo!.position
      }
    });
    const instance = modal.getContentComponent();
  }
  addBelowClick(){
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: TodoModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        listId: this.todo?.todoListId,
        position :(this.todo!.position-1)
      }
    });
    const instance = modal.getContentComponent();
    
  }
  editNameClick(){
    
  }
  editDeadlineClick(){
    
  }
  deleteClick(){
    this.Delete.emit() 
  }
}
