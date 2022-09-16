import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { Todo } from 'src/app/models/todo.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { InputModalityDetector } from '@angular/cdk/a11y';



@Component({
  selector: 'app-more-option-dropdown',
  templateUrl: './more-option-dropdown.component.html',
  styleUrls: ['./more-option-dropdown.component.scss']
})
export class MoreOptionDropdownComponent implements OnInit {
  @Output() Delete=new EventEmitter<Todo>();
  @Input() todo?: Todo;
  @Output() moreTodo?: Todo;

  moreBtnConfig: ButtonConfiguration= {
    styles: {
      position: 'relative',
      width: '170px',
      height: '20px',
      backgroundColor: '#fff',
      color: '#0000FF',
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
 
  ngOnInit(): void {
  }
  addAboveClick(){
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: TodoModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        listId: this.todo?.todoListId,
        position :this.todo!.position,
        isNewTodo: true
      },
      nzMaskClosable: false,
      nzFooter:null
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
        position :(this.todo!.position+1),
        isNewTodo: true
      },
      nzMaskClosable: false,
      nzFooter:null
    });
    const instance = modal.getContentComponent();
  }
  editNameClick(){
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: TodoModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        listId: this.todo?.todoListId,
        position :(this.todo!.position),
        isEditTitle: true
      },
      nzMaskClosable: false,
      nzFooter:null
    });
    const instance = modal.getContentComponent();
  }
  editDeadlineClick(){
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: TodoModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        listId: this.todo?.todoListId,
        position :(this.todo!.position),
        isEditDeadline: true,
      },
      nzMaskClosable: false,
      nzFooter:null
    });
    const instance = modal.getContentComponent();
  }
  deleteClick(){
    this.Delete.emit() 
    this.moreTodo= this.todo;
  }
}
