import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class ButtonComponent implements OnInit {
	
  @Input() buttonConfig: any;
  constructor() {}

  @Output()
 	onTextBtnClick=new EventEmitter();
  ngOnInit() {}
}