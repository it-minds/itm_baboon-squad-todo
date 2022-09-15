import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { ButtonConfiguration } from 'src/app/models/button-config.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  deadline: string = '';
  constructor() { }

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
      border: 'none'
    }
  };

  @Input() todo?: Todo;

  @Output() checkboxClick = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.deadline = this.todo?.deadline?.split('T')[0] ?? "";
  }
  onClickEventReceived() {
  }

}
