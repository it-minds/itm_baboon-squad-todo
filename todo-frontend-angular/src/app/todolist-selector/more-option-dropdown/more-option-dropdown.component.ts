import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { ButtonConfiguration } from 'src/app/models/button-config.model';
import { NewTodoDTO } from 'src/app/models/new-todo-DTO.model';
import { Todo } from 'src/app/models/todo.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TemplateRef, ViewContainerRef } from '@angular/core';



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

  addAboveBtnConfig: ButtonConfiguration= {
    styles: {
      position: 'relative',
      width: '150px',
      height: '60px',
      backgroundColor: '#fff',
      color: '#000000',
      fontFamily: 'sans-serif',
      fontSize: '20px',
      borderRadius: '10px',
      marginTop: '20px',
      border: 'none',
      opacity: '1'
    }
  };
  addBelowBtnConfig: ButtonConfiguration= {
    styles: {
      position: 'relative',
      width: '150px',
      height: '60px',
      backgroundColor: '#fff',
      color: '#000000',
      fontFamily: 'sans-serif',
      fontSize: '20px',
      borderRadius: '0px',
      marginTop: '20px',
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

  }
  addBelowClick(){
    
  }
  editNameClick(){
    
  }
  editDeadlineClick(){
    
  }
  deleteClick(){
    this.Delete.emit() 
  }
}
