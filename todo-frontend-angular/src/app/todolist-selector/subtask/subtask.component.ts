import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subtask } from 'src/app/models/subtask.model';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent implements OnInit {

  constructor() { }

  @Input() subtask?: Subtask;
  @Output() checkboxClick = new EventEmitter<boolean>();


  ngOnInit(): void {
  }

}
